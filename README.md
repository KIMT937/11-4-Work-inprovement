# 🚀 막내 업무 개선 웹앱 (Maknae Work Efficiency App)

> **사내 막내 직원의 불필요한 잔업무 시간을 줄이고 생산성을 높이기 위한 구글 시트 연동 1장 PRD 및 웹 애플리케이션**

[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Sheets](https://img.shields.io/badge/Google%20Sheets-Backend-34A853?logo=googlesheets&logoColor=white)](https://sheets.google.com)

---

## 🧭 프로젝트 마인드맵 (Mindmap)

GitHub에서 아래 마인드맵 다이어그램이 네이티브 그래픽으로 바로 렌더링됩니다:

```mermaid
mindmap
  root((막내 업무 개선 앱))
    1. 사용자와 문제
      타깃:: 막내 직원
      소요시간:: 하루 8시간 중 약 3시간 (가정)
      잔업무 4대 영역
        보고서 작성
        자료 정리
        업무 전화
        심부름
    2. 기능 범위 (MoSCoW)
      Must:: 1. 자료 정리 아카이빙/검색
      Must:: 2. 보고서 작성 지원
      Should:: 업무 전화 이력 메모
      제외:: 심부름 관리 (우선순위 낮음)
    3. 화면 3개
      입력 화면 (Form)
      목록 화면 (List / Filter / Search)
      요약 화면 (Summary Dashboard - [확인 필요])
    4. 시트 열 구조 (7개 열)
      A: 등록일시
      B: 업무구분
      C: 세부유형
      D: 목적_특성
      E: 형식여부
      F: 업무내용
      G: 자료링크
    5. 완료조건 (Done)
      Must 1: 자료 정리 등록 및 검색
      Must 2: 보고서 규격 작성 및 저장
    6. 제약사항
      구글 시트 + GAS 웹앱
      무료 계정 운영
      실명·연락처 미저장
```

---

## 📋 1장 PRD 요약 (Summary)

### 1. 사용자와 문제
- **타깃 사용자**: 사내/팀 내 잔업무 비중이 높은 **막내 직원**
- **문제정의문**: 막내가 보고서 작성, 자료 정리, 업무 전화, 심부름 등 불필요한 잔업무로 인해 **하루 8시간 중 약 3시간 (가정)**을 낭비하고 있다.

### 2. 기능 분류 (MoSCoW)
- **Must (핵심 기능 - 2개)**:
  1. **자료 정리 아카이빙 및 검색**: 기존 자료정리(공부/활용용) 및 신규 자료 생성 내역 등록, 목적 태그 및 링크 기록, 검색
  2. **보고서 작성 지원**: 작업보고서(책임소재/위험성) 및 보고용 보고서 양식에 맞춘 항목 입력 및 시트 자동 저장
- **Should (차순위 - 1개)**:
  1. **업무 전화 이력 관리**: 업무협조, 확인용, 협업 제안 등 통화 내용 및 요청사항 간편 메모
- **이번에는 안 함**:
  1. **심부름 관리**: 자리 이동 및 대면 심부름 관리는 우선순위가 낮아 본 버전에서 제외

### 3. 화면 구성 (3개 화면)
1. **입력 화면 (Form)**: 업무구분, 세부유형, 목적·특성, 상세 내용 및 관련 링크 입력
2. **목록 화면 (List)**: 등록된 잔업무 내역 최신순 카드 조회, 유형별 필터 및 키워드 검색
3. **요약 화면 (Summary)**: 업무 분류별 등록 건수 통계 대시보드 *(세부 지표 구성: **[확인 필요]**)*

### 4. 구글 시트 스키마 (7개 열)
| 열 | 열 이름 | 형식 | 입력 방법 | 비고 |
| :---: | :--- | :---: | :--- | :--- |
| **A** | **등록일시** | `TIMESTAMP` | 시스템 자동 | 작성 시각 자동 기록 |
| **B** | **업무구분** | `STRING` | 드롭다운 | `자료 정리`, `보고서 작성`, `업무 전화` |
| **C** | **세부유형** | `STRING` | 드롭다운 (연동) | 업무구분별 하위 세부유형 |
| **D** | **목적_특성** | `STRING` | 드롭다운 / 태그 | 중요도 낮음, 활용빈도 높음, 공부를 위해, 상급자 시간부족 등 |
| **E** | **형식여부** | `STRING` | 드롭다운 | `형식있다`, `형식없다` (보고용 보고서) |
| **F** | **업무내용** | `TEXT` | 직접 입력 | 업무 세부 내용 및 요약 |
| **G** | **자료링크** | `URL` | 직접 입력 | 관련 문서 및 산출물 링크 |

### 5. 완료조건 (Done Criteria)
- **자료 정리**: `[입력 화면에서 자료 구분(기존/새 자료), 목적·특성, 링크를 입력하고 저장 버튼을 누르면]` + `[목록 화면과 구글 시트에 즉시 등록되어 키워드 검색 및 링크 열람이 가능하다.]`
- **보고서 작성**: `[입력 화면에서 보고서 유형(작업보고서/보고용 보고서), 형식 여부, 상세 내용을 작성하고 제출 버튼을 누르면]` + `[양식에 맞게 정돈된 보고서 내역이 목록 화면에 카드로 나타나고 시트에 기록된다.]`

### 6. 제약사항 (Constraints)
- 구글 시트 + Google Apps Script(GAS) 웹앱
- 무료 계정 범위 내 구현
- 실명 및 연락처는 절대 저장하지 않음

---

## 💻 로컬 실행 방법 (Local Development)

```bash
# 1. 의존성 패키지 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 접속 후 인터랙티브 PRD 문서 및 마인드맵을 확인할 수 있습니다.

---

## 📁 주요 파일 구조

```text
├── .gitattributes             # GitHub 파일 인코딩 및 LF 줄바꿈 보장
├── README.md                  # GitHub 메인 설명서 (Mermaid 다이어그램 포함)
├── PRD.md                     # 실무용 1장 PRD 마크다운 전문
├── index.html                 # 웹앱 HTML 엔트리포인트
├── package.json               # 프로젝트 설정 및 패키지 의존성
├── public/assets/aistudio/    # 원본 화이트보드 마인드맵 이미지
└── src/
    ├── App.tsx                # 메인 PRD 대시보드 컴포넌트
    ├── components/
    │   └── MindmapView.tsx    # 인터랙티브 마인드맵 뷰 컴포넌트
    └── main.tsx               # React 마운트 스크립트
```
