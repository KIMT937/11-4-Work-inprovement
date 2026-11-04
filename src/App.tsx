import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Table,
  Layers,
  ShieldAlert,
  Copy,
  Printer,
  Sparkles,
  ExternalLink,
  Clock,
  ArrowRight,
  Eye,
  Check,
  LayoutDashboard,
  HelpCircle,
  GitBranch,
} from 'lucide-react';

import MindmapView from './components/MindmapView.tsx';

export default function App() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'document' | 'mindmap' | 'source'>('document');
  const [activeWireframe, setActiveWireframe] = useState<'input' | 'list' | 'summary'>('input');

  const markdownContent = `# 📄 [PRD] 막내 잔업무 경감 및 효율화 웹앱

### 1. 사용자와 문제
- **타깃 사용자**: 사내/팀 내 잔업무 비중이 높은 막내 직원
- **문제정의문**: 막내가 보고서 작성, 자료 정리, 업무 전화, 심부름 등 불필요한 잔업무로 인해 하루 8시간 중 약 3시간 (가정)을 낭비하고 있다.

### 2. 기능 범위
- **Must (핵심 기능 - 2개)**:
  1. 자료 정리 아카이빙/검색: 기존 자료정리(공부/활용용) 및 신규 자료 생성 내역 등록, 목적 태그 및 링크 기록, 검색
  2. 보고서 작성 지원: 작업보고서(책임소재/위험성) 및 보고용 보고서 양식에 맞춘 항목 입력 및 시트 저장
- **Should (다음 우선순위 - 1개)**:
  1. 업무 전화 이력 관리: 업무협조, 확인용, 협업 제안 등 통화 내용 및 요청사항 간편 메모
- **이번에는 안 함**:
  1. 심부름 관리: 자리 이동 및 단순 대면 심부름 관리는 본 버전 범위에서 제외

### 3. 화면 3개
1. 입력 화면: 업무구분(자료 정리 / 보고서 작성 / 업무 전화), 세부유형, 목적·특성, 업무내용 및 자료링크를 한곳에서 간편히 등록하는 폼
2. 목록 화면: 등록된 잔업무 내역을 최신순 카드로 조회하고, 유형별 필터 및 검색창을 통해 과거 작성 자료나 보고서를 빠르게 재활용하는 화면
3. 요약 화면: 업무 분류별 등록 건수와 잔업무 발생 패턴을 한눈에 파악하는 현황 대시보드 (세부 지표 구성: [확인 필요])

### 4. 시트 열 구조 (<내 자료> 원문 반영)
- 등록일시 (날짜/시간, 자동 입력)
- 업무구분 (텍스트, 드롭다운: 자료 정리, 보고서 작성, 업무 전화)
- 세부유형 (텍스트, 드롭다운)
- 목적_특성 (텍스트, 드롭다운/태그)
- 형식여부 (텍스트, 드롭다운: 형식있다, 형식없다)
- 업무내용 (텍스트 장문, 직접 텍스트 입력)
- 자료링크 (URL 링크, 직접 텍스트 입력)

### 5. 완료조건 (Done Criteria)
- [자료 정리]: [입력 화면에서 자료 구분(기존/새 자료), 목적·특성, 링크를 입력하고 저장 버튼을 누르면] + [목록 화면과 구글 시트에 즉시 등록되어 키워드 검색 및 링크 열람이 가능하다.]
- [보고서 작성]: [입력 화면에서 보고서 유형(작업보고서/보고용 보고서), 형식 여부, 상세 내용을 작성하고 제출 버튼을 누르면] + [양식에 맞게 정돈된 보고서 내역이 목록 화면에 카드로 나타나고 시트에 기록된다.]

### 6. 제약사항
- 구글 시트 + Apps Script 웹앱
- 무료 계정 사용
- 실명 · 연락처는 저장하지 않음`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900 pb-16">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">
                업무 개선 웹앱 1장 PRD
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                기획 선배와 함께 완성한 실무용 요구사항 명세서
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher */}
            <div className="flex items-center rounded-lg bg-slate-100 p-1 text-xs font-semibold text-slate-600">
              <button
                onClick={() => setActiveTab('document')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-all ${
                  activeTab === 'document'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                문서 보기
              </button>
              <button
                onClick={() => setActiveTab('mindmap')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-all ${
                  activeTab === 'mindmap'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5" />
                마인드맵 보기
              </button>
              <button
                onClick={() => setActiveTab('source')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-all ${
                  activeTab === 'source'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                원문 마인드맵
              </button>
            </div>

            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
              title="마크다운 복사"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              {copied ? '복사됨' : 'MD 복사'}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-indigo-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              인쇄 / PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        {activeTab === 'mindmap' ? (
          <MindmapView />
        ) : activeTab === 'source' ? (
          /* Original Handwritten Mindmap View */
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
                <Eye className="w-3.5 h-3.5" /> 업로드된 원본 자료
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                막내 잔업무 분석 마인드맵
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                기획 선배 질문의 토대가 되었던 원본 화이트보드 메모 자료입니다.
              </p>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-md bg-slate-900 max-w-3xl w-full">
              <img
                src="/assets/aistudio/image_29985a54.png"
                alt="Original Mindmap"
                className="w-full h-auto object-contain block"
              />
            </div>
          </div>
        ) : (
          /* Document Sheet View */
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-8">
            {/* Document Header */}
            <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700">
                    Product Requirement Document
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold tracking-wider bg-emerald-100 text-emerald-700">
                    Version 1.0 (Draft)
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  막내 잔업무 경감 및 효율화 웹앱 PRD
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  구글 시트 & Apps Script 기반의 초경량 업무 자동화 및 기록 시스템
                </p>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-xl p-3">
                <div className="space-y-0.5">
                  <div className="font-semibold text-slate-700">기획 멘토링 완료</div>
                  <div>규칙 준수: 6문항 / Must 2개 / 제약 3건</div>
                </div>
              </div>
            </div>

            {/* Section 1: 사용자와 문제 */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
                <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">1</span>
                사용자와 문제
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200/70">
                <div className="border-b md:border-b-0 md:border-r border-slate-200 pb-3 md:pb-0 md:pr-4">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    타깃 사용자 (Target User)
                  </div>
                  <div className="text-sm font-bold text-slate-800">
                    사내/팀 내 잔업무 비중이 높은 막내 직원
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    (보고서, 자료정리, 전화 응대, 각종 요청을 떠안기 쉬운 포지션)
                  </div>
                </div>

                <div className="md:col-span-2 space-y-1">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    문제정의문 (Problem Statement)
                  </div>
                  <blockquote className="text-sm font-semibold text-slate-900 bg-white p-3 rounded-lg border border-slate-200/80 leading-relaxed">
                    “막내가 보고서 작성, 자료 정리, 업무 전화, 심부름 등 불필요한 잔업무로 인해 <span className="text-rose-600 font-bold underline decoration-rose-300 decoration-2">하루 8시간 중 약 3시간 (가정)</span>을 낭비하고 있다.”
                  </blockquote>
                </div>
              </div>
            </section>

            {/* Section 2: 기능 (Must / Should / 이번에는 안 함) */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
                  <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">2</span>
                  기능 분류 (MoSCoW 우선순위)
                </div>
                <span className="text-xs text-slate-500">
                  규칙: Must 3개 이하 충족 (현재 2개)
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Must */}
                <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-200/70 space-y-3">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                    <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-600 text-white tracking-wider">
                      MUST (2개)
                    </span>
                    <span className="text-xs text-emerald-800 font-medium">핵심 필수 기능</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800">
                    <li className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">1. 자료 정리 아카이빙/검색</div>
                        <div className="text-slate-600 text-xs mt-0.5">
                          기존 자료정리(공부/활용용) 및 새 자료 등록, 목적 태그 및 링크 기록, 검색
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">2. 보고서 작성 지원</div>
                        <div className="text-slate-600 text-xs mt-0.5">
                          작업보고서(책임소재/위험성) 및 보고용 보고서 양식에 맞춘 항목 입력 및 시트 저장
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Should */}
                <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-200/70 space-y-3">
                  <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                    <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-blue-600 text-white tracking-wider">
                      SHOULD (1개)
                    </span>
                    <span className="text-xs text-blue-800 font-medium">차순위 기능</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800">
                    <li className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-blue-100 shadow-2xs">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">1. 업무 전화 이력 관리</div>
                        <div className="text-slate-600 text-xs mt-0.5">
                          업무협조, 확인용, 협업 제안 등 통화 내용 및 요청사항 간편 메모
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Out of Scope */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-slate-500 text-white tracking-wider">
                      이번에는 안 함
                    </span>
                    <span className="text-xs text-slate-500 font-medium">우선순위 후순위</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800">
                    <li className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                      <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-700">심부름 관리 제외</div>
                        <div className="text-slate-500 text-xs mt-0.5">
                          자리 이동 및 단순 대면 심부름 관리는 우선순위가 낮고 오프라인 성격이 짙어 본 버전에서 제외
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: 화면 3개 */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
                  <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">3</span>
                  화면 구성 (입력 · 목록 · 요약)
                </div>
                <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                  {(['input', 'list', 'summary'] as const).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveWireframe(key)}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        activeWireframe === key
                          ? 'bg-white text-indigo-600 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {key === 'input' ? '1. 입력 화면' : key === 'list' ? '2. 목록 화면' : '3. 요약 화면'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wireframe Mock Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Input Screen Card */}
                <div
                  className={`rounded-xl border p-4 transition-all ${
                    activeWireframe === 'input'
                      ? 'border-indigo-400 ring-2 ring-indigo-100 bg-white shadow-xs'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                      1. 입력 화면 (Form)
                    </span>
                    <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      데이터 인입
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    업무구분(자료 정리 / 보고서 작성 / 업무 전화), 세부유형, 목적·특성, 상세 내용 및 링크를 한곳에서 간편히 등록하는 폼.
                  </p>
                  <div className="bg-white rounded-lg p-2.5 border border-slate-200 text-xs space-y-1.5 text-slate-500 font-mono">
                    <div className="h-6 bg-slate-100 rounded px-2 flex items-center text-[11px]">
                      [드롭다운] 업무구분 선택
                    </div>
                    <div className="h-6 bg-slate-100 rounded px-2 flex items-center text-[11px]">
                      [드롭다운] 세부유형 (조건부 노출)
                    </div>
                    <div className="h-10 bg-slate-100 rounded p-1.5 text-[11px]">
                      업무 상세 내용 작성...
                    </div>
                    <div className="h-6 bg-indigo-600 text-white rounded font-sans font-bold flex items-center justify-center text-[11px]">
                      시트에 저장하기
                    </div>
                  </div>
                </div>

                {/* List Screen Card */}
                <div
                  className={`rounded-xl border p-4 transition-all ${
                    activeWireframe === 'list'
                      ? 'border-indigo-400 ring-2 ring-indigo-100 bg-white shadow-xs'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-indigo-600" />
                      2. 목록 화면 (List & Search)
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      조회 & 검색
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    등록된 잔업무 내역을 최신순 카드로 조회하고, 유형별 필터 및 검색창을 통해 과거 작성 자료나 보고서를 빠르게 재활용.
                  </p>
                  <div className="bg-white rounded-lg p-2.5 border border-slate-200 text-xs space-y-1.5 text-slate-500">
                    <div className="h-6 bg-slate-100 rounded px-2 flex items-center justify-between text-[11px]">
                      <span>🔍 키워드 검색...</span>
                      <span className="text-slate-400">필터</span>
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded border border-slate-100 text-[11px]">
                      <div className="font-bold text-slate-800">[자료 정리] 기존 자료정리</div>
                      <div className="text-slate-500 truncate text-[10px]">공부를 위해 / 활용빈도 높음</div>
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded border border-slate-100 text-[11px]">
                      <div className="font-bold text-slate-800">[보고서] 작업보고서</div>
                      <div className="text-slate-500 truncate text-[10px]">책임소재 / 작업위험성</div>
                    </div>
                  </div>
                </div>

                {/* Summary Screen Card */}
                <div
                  className={`rounded-xl border p-4 transition-all ${
                    activeWireframe === 'summary'
                      ? 'border-indigo-400 ring-2 ring-indigo-100 bg-white shadow-xs'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <Table className="w-4 h-4 text-indigo-600" />
                      3. 요약 화면 (Summary)
                    </span>
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <HelpCircle className="w-3 h-3" />
                      [확인 필요]
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    업무 분류별 등록 건수와 잔업무 발생 패턴을 한눈에 파악하는 현황 대시보드. (세부 지표 구성: <span className="font-semibold text-amber-600">[확인 필요]</span>)
                  </p>
                  <div className="bg-white rounded-lg p-2.5 border border-slate-200 text-xs space-y-2 text-slate-500">
                    <div className="grid grid-cols-2 gap-1.5 text-center">
                      <div className="bg-indigo-50 p-1.5 rounded">
                        <div className="text-[10px] text-indigo-600 font-semibold">이번 주 자료정리</div>
                        <div className="text-sm font-bold text-indigo-900">12건</div>
                      </div>
                      <div className="bg-emerald-50 p-1.5 rounded">
                        <div className="text-[10px] text-emerald-600 font-semibold">보고서 작성</div>
                        <div className="text-sm font-bold text-emerald-900">8건</div>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400 text-center italic">
                      * 추가 통계 지표는 추후 확인 후 확정
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: 시트 열 구조 (<내 자료> 원문 그대로) */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
                  <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">4</span>
                  구글 시트 열 구조 ({'<내 자료>'} 원문 분류 100% 매핑)
                </div>
                <span className="text-xs text-slate-500">
                  Google Sheets Column Schema
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                      <th className="py-2.5 px-3 w-12 text-center">#</th>
                      <th className="py-2.5 px-3">열 이름</th>
                      <th className="py-2.5 px-3">데이터 형식</th>
                      <th className="py-2.5 px-3">입력 방법</th>
                      <th className="py-2.5 px-4">세부 옵션 및 매핑 기준 ({'<내 자료>'} 원문)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 text-center text-slate-400 font-mono text-xs">A</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">등록일시</td>
                      <td className="py-2.5 px-3 font-mono text-xs text-indigo-600">TIMESTAMP</td>
                      <td className="py-2.5 px-3">시스템 자동 입력</td>
                      <td className="py-2.5 px-4 text-slate-500 text-xs">작성 시각 기록 (YYYY-MM-DD HH:mm:ss)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 text-center text-slate-400 font-mono text-xs">B</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">업무구분</td>
                      <td className="py-2.5 px-3 font-mono text-xs text-indigo-600">STRING</td>
                      <td className="py-2.5 px-3">드롭다운 (단일)</td>
                      <td className="py-2.5 px-4 text-xs font-medium text-slate-800">
                        <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono">자료 정리</code>,{' '}
                        <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono">보고서 작성</code>,{' '}
                        <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono">업무 전화</code>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 text-center text-slate-400 font-mono text-xs">C</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">세부유형</td>
                      <td className="py-2.5 px-3 font-mono text-xs text-indigo-600">STRING</td>
                      <td className="py-2.5 px-3">드롭다운 (연동)</td>
                      <td className="py-2.5 px-4 text-xs text-slate-600">
                        <div>• 자료 정리: <span className="font-semibold text-slate-800">기존 자료정리, 새로운 자료 생성</span></div>
                        <div>• 보고서 작성: <span className="font-semibold text-slate-800">작업보고서, 보고용 보고서</span></div>
                        <div>• 업무 전화: <span className="font-semibold text-slate-800">업무협조, 확인용, 협업 제안</span></div>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 text-center text-slate-400 font-mono text-xs">D</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">목적_특성</td>
                      <td className="py-2.5 px-3 font-mono text-xs text-indigo-600">STRING</td>
                      <td className="py-2.5 px-3">드롭다운 / 태그</td>
                      <td className="py-2.5 px-4 text-xs text-slate-600">
                        <div>• 기존 자료정리: <span className="text-slate-800 font-medium">중요도가 낮음, 활용빈도가 높음, 공부를 위해</span></div>
                        <div>• 새로운 자료 생성: <span className="text-slate-800 font-medium">상급자 시간부족</span></div>
                        <div>• 작업보고서: <span className="text-slate-800 font-medium">책임소재, 작업위험성</span></div>
                        <div>• 보고용 보고서: <span className="text-slate-800 font-medium">외부 공유용, 허가용도, 결재용, 정기회의</span></div>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 text-center text-slate-400 font-mono text-xs">E</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">형식여부</td>
                      <td className="py-2.5 px-3 font-mono text-xs text-indigo-600">STRING</td>
                      <td className="py-2.5 px-3">드롭다운 / 라디오</td>
                      <td className="py-2.5 px-4 text-xs text-slate-600">
                        <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-mono">형식있다</code>,{' '}
                        <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-mono">형식없다</code> (보고용 보고서 작성 시 선택)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 text-center text-slate-400 font-mono text-xs">F</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">업무내용</td>
                      <td className="py-2.5 px-3 font-mono text-xs text-indigo-600">TEXT (LONG)</td>
                      <td className="py-2.5 px-3">직접 텍스트 입력</td>
                      <td className="py-2.5 px-4 text-xs text-slate-500">본문 내용, 처리 메모, 핵심 요약</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 text-center text-slate-400 font-mono text-xs">G</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">자료링크</td>
                      <td className="py-2.5 px-3 font-mono text-xs text-indigo-600">URL</td>
                      <td className="py-2.5 px-3">직접 텍스트 입력</td>
                      <td className="py-2.5 px-4 text-xs text-slate-500">구글 드라이브, 시트, 산출물 URL 링크</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 5: 완료조건 (Done Criteria) */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
                  <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">5</span>
                  완료조건 (Must 기능당 1줄, [무엇을 하면] + [무엇이 보인다])
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="shrink-0 px-2 py-1 rounded bg-emerald-600 text-white font-extrabold text-xs">
                    Must 1
                  </span>
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    <span className="bg-white px-2 py-0.5 rounded border border-emerald-200 text-emerald-800 font-semibold mr-1">
                      [입력 화면에서 자료 구분(기존/새 자료), 목적·특성, 링크를 입력하고 저장 버튼을 누르면]
                    </span>
                    <span className="mx-1 font-bold text-emerald-700">+</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-emerald-200 text-slate-900 font-semibold">
                      [목록 화면과 구글 시트에 즉시 등록되어 키워드 검색 및 링크 열람이 가능하다.]
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="shrink-0 px-2 py-1 rounded bg-emerald-600 text-white font-extrabold text-xs">
                    Must 2
                  </span>
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    <span className="bg-white px-2 py-0.5 rounded border border-emerald-200 text-emerald-800 font-semibold mr-1">
                      [입력 화면에서 보고서 유형(작업보고서/보고용 보고서), 형식 여부, 상세 내용을 작성하고 제출 버튼을 누르면]
                    </span>
                    <span className="mx-1 font-bold text-emerald-700">+</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-emerald-200 text-slate-900 font-semibold">
                      [양식에 맞게 정돈된 보고서 내역이 목록 화면에 카드로 나타나고 시트에 기록된다.]
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: 제약사항 */}
            <section className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
                <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">6</span>
                제약사항 (Constraints)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-center">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    인프라 환경
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">
                    구글 시트 + Apps Script 웹앱
                  </div>
                  <div className="text-xs text-slate-500 mt-1">별도 서버 구축 없는 Serverless</div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-center">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    비용 제약
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">
                    구글 무료 계정 범위
                  </div>
                  <div className="text-xs text-slate-500 mt-1">유료 라이선스 및 유료 API 배제</div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-center">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    보안 및 개인정보
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">
                    실명 · 연락처 미저장
                  </div>
                  <div className="text-xs text-slate-500 mt-1">사내 개인정보 수집 리스크 방지</div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
