import { GoogleGenAI } from '@google/genai';

/**
 * Vercel Serverless Function: /api/gemini
 * 
 * - Gemini API 키는 오직 서버 환경변수(process.env.GEMINI_API_KEY)에서만 참조합니다.
 * - 클라이언트에 키를 노출하지 않으며, 모든 응답은 application/json 규격으로 반환합니다.
 * - 404, 500, 401, 429 상태 코드를 세분화하여 처리하고 민감정보는 로깅에서 제외합니다.
 */
export default async function handler(req: any, res: any) {
  // 항상 JSON 응답 헤더 보장
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // 1. HTTP 메서드 검증
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'POST 요청만 지원합니다.',
      statusCode: 405,
    });
  }

  // 2. 환경변수 GEMINI_API_KEY 검증
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('[Vercel Serverless Error] GEMINI_API_KEY 환경변수가 설정되지 않았습니다.');
    return res.status(500).json({
      error: 'Configuration Error',
      message: 'Vercel 서버에 GEMINI_API_KEY 환경변수가 설정되지 않았습니다. Vercel Project Settings > Environment Variables를 확인해 주세요.',
      statusCode: 500,
    });
  }

  // 3. 요청 본문(Payload) 파싱 및 검증
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({
        error: 'Bad Request',
        message: '요청 본문이 유효한 JSON 형식이 아닙니다.',
        statusCode: 400,
      });
    }
  }

  const { prompt, contents, model = 'gemini-2.5-flash', systemInstruction } = body || {};
  const query = contents || prompt;

  if (!query) {
    return res.status(400).json({
      error: 'Bad Request',
      message: '요청 본문에 prompt 또는 contents 필드가 필요합니다.',
      statusCode: 400,
    });
  }

  // 4. Gemini SDK 호출
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model,
      contents: query,
      config: systemInstruction ? { systemInstruction } : undefined,
    });

    return res.status(200).json({
      success: true,
      text: response.text || '',
      statusCode: 200,
    });
  } catch (err: any) {
    const status = err?.status || err?.statusCode || 500;
    const safeErrorMessage = err?.message || '알 수 없는 서버 오류';

    // 민감정보(API 키, 유저 데이터)를 제외하고 안전하게 로깅
    console.error(`[Gemini API Error] Status: ${status}, Message: ${safeErrorMessage}`);

    if (status === 401 || status === 403) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Gemini API 키 인증에 실패했습니다. 유효한 API 키인지 확인해 주세요.',
        statusCode: 401,
      });
    }

    if (status === 429) {
      return res.status(429).json({
        error: 'Rate Limit Exceeded',
        message: 'Gemini API 호출 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.',
        statusCode: 429,
      });
    }

    return res.status(status >= 400 && status < 600 ? status : 500).json({
      error: 'Gemini Service Error',
      message: safeErrorMessage,
      statusCode: status,
    });
  }
}
