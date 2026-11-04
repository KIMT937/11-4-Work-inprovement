/**
 * Vercel 배포 환경 및 로컬 환경에서 Gemini AI를 안전하게 호출하는 클라이언트 유틸리티.
 *
 * [주요 안전 장치]
 * 1. response.json() 무조건 호출 방지: Content-Type 및 HTTP 상태 코드를 먼저 검사하여
 *    HTML 404 페이지("The page could not be found") 수신 시 'Unexpected token T' 오류가 발생하지 않도록 방어.
 * 2. 상태 코드별(404, 500, 401, 429 등) 명확한 한국어 오류 메시지 매핑.
 * 3. API 키 및 개인정보가 콘솔/에러 로그에 노출되지 않도록 마스킹 및 제외.
 */

export interface GeminiResponse {
  success: boolean;
  text?: string;
  error?: string;
  message?: string;
  statusCode?: number;
}

export interface GeminiOptions {
  model?: string;
  systemInstruction?: string;
}

export async function callGeminiAI(
  prompt: string,
  options: GeminiOptions = {}
): Promise<string> {
  const requestUrl = '/api/gemini';

  try {
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        model: options.model || 'gemini-2.5-flash',
        systemInstruction: options.systemInstruction,
      }),
    });

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    // 1. JSON 응답이 아닌 경우 (Vercel 404 HTML, 502 Bad Gateway 텍스트 등)
    if (!isJson) {
      const rawText = await response.text();
      const status = response.status;

      let debugMessage = `[API 응답 형식 오류] 서버가 JSON이 아닌 응답(${contentType || 'unknown'})을 반환했습니다. (HTTP ${status})`;

      if (status === 404) {
        debugMessage = `[404 Not Found] API 경로('${requestUrl}')를 찾을 수 없습니다. Vercel 배포에 'api/gemini.ts' Serverless Function 및 'vercel.json' 설정이 포함되어 있는지 확인하세요.`;
      } else if (rawText.startsWith('The page c') || rawText.includes('could not be found')) {
        debugMessage = `[Vercel 라우팅 오류] Vercel이 해당 API 경로를 찾지 못해 404 HTML 페이지를 반환했습니다. 'api/gemini.ts' 경로 및 Vercel rewrites 설정을 점검하세요.`;
      }

      console.error(`[AI 연결 오류] Status: ${status}`);
      throw new Error(debugMessage);
    }

    // 2. 정상적인 JSON 응답 파싱
    const data: GeminiResponse = await response.json();

    // 3. HTTP 상태 코드별 에러 처리
    if (!response.ok) {
      const status = response.status;
      const errorMessage = data.message || data.error || 'AI 응답 처리 중 오류가 발생했습니다.';

      console.error(`[AI 호출 실패] Status: ${status}, Message: ${errorMessage}`);

      switch (status) {
        case 401:
        case 403:
          throw new Error('[인증 실패] Gemini API 키가 유효하지 않습니다. Vercel 환경변수(GEMINI_API_KEY)를 확인하세요.');
        case 404:
          throw new Error(`[경로 없음] 요청한 API('${requestUrl}')를 찾을 수 없습니다.`);
        case 429:
          throw new Error('[요청 한도 초과] API 호출 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.');
        case 500:
          throw new Error(`[서버 내부 오류] ${errorMessage}`);
        default:
          throw new Error(`[HTTP ${status}] ${errorMessage}`);
      }
    }

    if (!data.text) {
      throw new Error('AI 모델로부터 전달받은 텍스트 응답이 비어 있습니다.');
    }

    return data.text;
  } catch (error: any) {
    // 안전한 에러 전파 (API 키/개인정보는 절대 콘솔에 찍지 않음)
    const safeError = error?.message || '알 수 없는 네트워크 오류가 발생했습니다.';
    console.error(`[AI 연결 오류] ${safeError}`);
    throw error;
  }
}
