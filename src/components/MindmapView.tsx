import React, { useState } from 'react';
import {
  GitBranch,
  ChevronRight,
  ChevronDown,
  Maximize2,
  Minimize2,
  Sparkles,
  Info,
  CheckCircle2,
  Layers,
  Table,
  ShieldCheck,
  AlertCircle,
  Clock,
  RotateCcw,
} from 'lucide-react';

interface MindNode {
  id: string;
  label: string;
  badge?: string;
  badgeColor?: string;
  detail?: string;
  color: string;
  icon?: string;
  children?: MindNode[];
}

const MINDMAP_DATA: MindNode = {
  id: 'root',
  label: '막내 업무 개선 앱 (PRD)',
  badge: 'Google Sheets + Apps Script',
  badgeColor: 'bg-indigo-600 text-white',
  color: 'indigo',
  detail: '막내 직원의 잔업무를 줄이고 업무 생산성을 높이기 위한 웹앱 명세서',
  children: [
    {
      id: 'branch-1',
      label: '1. 사용자와 문제',
      badge: '하루 3시간 낭비',
      badgeColor: 'bg-rose-100 text-rose-700',
      color: 'rose',
      detail: '문제정의문: 하루 8시간 중 약 3시간 (가정)을 불필요한 잔업무로 소모',
      children: [
        {
          id: 'b1-1',
          label: '타깃 사용자',
          detail: '사내/팀 내 잔업무 비중이 높은 막내 직원',
          color: 'rose',
        },
        {
          id: 'b1-2',
          label: '소요 시간',
          badge: '(가정)',
          badgeColor: 'bg-rose-50 text-rose-600 border border-rose-200',
          detail: '하루 8시간 근무 중 약 3시간 (37.5%) 시간 낭비 발생',
          color: 'rose',
        },
        {
          id: 'b1-3',
          label: '주요 잔업무 4대 영역',
          detail: '보고서 작성, 자료 정리, 업무 전화, 심부름',
          color: 'rose',
          children: [
            { id: 'b1-3-1', label: '보고서 작성', detail: '작업보고서 / 보고용 보고서', color: 'rose' },
            { id: 'b1-3-2', label: '자료 정리', detail: '기존 자료정리 / 새로운 자료 생성', color: 'rose' },
            { id: 'b1-3-3', label: '업무 전화', detail: '업무협조 / 확인용 / 협업 제안', color: 'rose' },
            { id: 'b1-3-4', label: '심부름', detail: '자리 이동 필요 / 불필요', color: 'rose' },
          ],
        },
      ],
    },
    {
      id: 'branch-2',
      label: '2. 기능 범위 (MoSCoW)',
      badge: 'Must 2개 충족',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      color: 'emerald',
      detail: '규칙 준수: Must는 3개 이하 (현재 2개로 압축)',
      children: [
        {
          id: 'b2-1',
          label: 'Must 1: 자료 정리 아카이빙/검색',
          badge: '핵심 필수',
          badgeColor: 'bg-emerald-600 text-white',
          detail: '기존 자료정리 및 신규 자료 등록, 목적 태그 및 링크 기록, 키워드 검색',
          color: 'emerald',
        },
        {
          id: 'b2-2',
          label: 'Must 2: 보고서 작성 지원',
          badge: '핵심 필수',
          badgeColor: 'bg-emerald-600 text-white',
          detail: '작업보고서 및 보고용 보고서 양식 항목 입력, 시트 자동 저장',
          color: 'emerald',
        },
        {
          id: 'b2-3',
          label: 'Should: 업무 전화 이력 관리',
          badge: '차순위',
          badgeColor: 'bg-blue-100 text-blue-700',
          detail: '업무협조, 확인용, 협업 제안 통화 내용 및 요청사항 간편 메모',
          color: 'emerald',
        },
        {
          id: 'b2-4',
          label: '이번에는 안 함: 심부름 관리',
          badge: '범위 제외',
          badgeColor: 'bg-slate-200 text-slate-700',
          detail: '자리 이동/대면 심부름 관리는 우선순위 낮아 이번 버전 제외',
          color: 'emerald',
        },
      ],
    },
    {
      id: 'branch-3',
      label: '3. 화면 3개',
      badge: 'UI 구조',
      badgeColor: 'bg-indigo-100 text-indigo-700',
      color: 'indigo',
      detail: '입력 폼, 목록 및 검색, 통계 요약 화면',
      children: [
        {
          id: 'b3-1',
          label: '입력 화면 (Form)',
          badge: '인입',
          badgeColor: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
          detail: '업무구분, 세부유형, 목적·특성, 상세 내용 및 URL 링크 등록 폼',
          color: 'indigo',
        },
        {
          id: 'b3-2',
          label: '목록 화면 (List)',
          badge: '조회·재활용',
          badgeColor: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
          detail: '최신순 카드 목록, 유형별 필터링, 키워드 검색 지원',
          color: 'indigo',
        },
        {
          id: 'b3-3',
          label: '요약 화면 (Summary)',
          badge: '[확인 필요]',
          badgeColor: 'bg-amber-100 text-amber-800 border border-amber-300',
          detail: '업무 분류별 건수 통계 카드. (세부 추가 지표 구성은 [확인 필요])',
          color: 'indigo',
        },
      ],
    },
    {
      id: 'branch-4',
      label: '4. 시트 열 구조 (<내 자료>)',
      badge: '7개 컬럼',
      badgeColor: 'bg-amber-100 text-amber-800',
      color: 'amber',
      detail: '원문 마인드맵 용어와 100% 일치하도록 정의된 시트 스키마',
      children: [
        { id: 'b4-1', label: 'A: 등록일시 (TIMESTAMP)', detail: '시스템 자동 입력', color: 'amber' },
        { id: 'b4-2', label: 'B: 업무구분 (단일 선택)', detail: '자료 정리 / 보고서 작성 / 업무 전화', color: 'amber' },
        { id: 'b4-3', label: 'C: 세부유형 (연동 드롭다운)', detail: '기존 자료정리, 새로운 자료 생성, 작업보고서, 보고용 보고서 등', color: 'amber' },
        { id: 'b4-4', label: 'D: 목적_특성 (태그/선택)', detail: '중요도 낮음, 활용빈도 높음, 공부를 위해, 상급자 시간부족 등', color: 'amber' },
        { id: 'b4-5', label: 'E: 형식여부 (라디오)', detail: '형식있다 / 형식없다 (보고용 보고서)', color: 'amber' },
        { id: 'b4-6', label: 'F: 업무내용 (TEXT LONG)', detail: '상세 업무 내용 및 본문', color: 'amber' },
        { id: 'b4-7', label: 'G: 자료링크 (URL)', detail: '구글 드라이브 문서 및 공유 링크', color: 'amber' },
      ],
    },
    {
      id: 'branch-5',
      label: '5. 완료조건 (Done)',
      badge: '[동작] + [결과]',
      badgeColor: 'bg-teal-100 text-teal-800',
      color: 'teal',
      detail: 'Must 기능 하나당 1줄씩 조건과 결과 명시',
      children: [
        {
          id: 'b5-1',
          label: 'Must 1 (자료 정리)',
          detail: '[자료 구분·목적·링크 입력 후 저장] ➔ [목록 및 구글 시트에 즉시 등록되어 검색·열람 가능]',
          color: 'teal',
        },
        {
          id: 'b5-2',
          label: 'Must 2 (보고서 작성)',
          detail: '[보고서 유형·형식·내용 작성 후 제출] ➔ [양식에 맞게 목록 카드 표시 및 시트 정상 기록]',
          color: 'teal',
        },
      ],
    },
    {
      id: 'branch-6',
      label: '6. 제약사항 (Constraints)',
      badge: '3대 원칙',
      badgeColor: 'bg-purple-100 text-purple-800',
      color: 'purple',
      detail: '시스템 구현 환경과 보안 제약 조건',
      children: [
        { id: 'b6-1', label: '플랫폼', detail: '구글 시트 + Google Apps Script(GAS) 웹앱', color: 'purple' },
        { id: 'b6-2', label: '비용', detail: '구글 무료 계정 범위 내 구현 (Zero Cost)', color: 'purple' },
        { id: 'b6-3', label: '보안/개인정보', detail: '실명 및 연락처는 절대 저장하지 않음', color: 'purple' },
      ],
    },
  ],
};

export default function MindmapView() {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    root: true,
    'branch-1': true,
    'branch-2': true,
    'branch-3': true,
    'branch-4': true,
    'branch-5': true,
    'branch-6': true,
    'b1-3': true,
  });
  const [selectedNode, setSelectedNode] = useState<MindNode | null>(MINDMAP_DATA);
  const [searchFilter, setSearchFilter] = useState('');

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    const traverse = (node: MindNode) => {
      allExpanded[node.id] = true;
      node.children?.forEach(traverse);
    };
    traverse(MINDMAP_DATA);
    setExpandedNodes(allExpanded);
  };

  const collapseAll = () => {
    setExpandedNodes({ root: true });
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'rose':
        return {
          border: 'border-rose-300 hover:border-rose-400',
          bg: 'bg-rose-50/70',
          indicator: 'bg-rose-500',
          text: 'text-rose-900',
        };
      case 'emerald':
        return {
          border: 'border-emerald-300 hover:border-emerald-400',
          bg: 'bg-emerald-50/70',
          indicator: 'bg-emerald-500',
          text: 'text-emerald-900',
        };
      case 'indigo':
        return {
          border: 'border-indigo-300 hover:border-indigo-400',
          bg: 'bg-indigo-50/70',
          indicator: 'bg-indigo-500',
          text: 'text-indigo-900',
        };
      case 'amber':
        return {
          border: 'border-amber-300 hover:border-amber-400',
          bg: 'bg-amber-50/70',
          indicator: 'bg-amber-500',
          text: 'text-amber-900',
        };
      case 'teal':
        return {
          border: 'border-teal-300 hover:border-teal-400',
          bg: 'bg-teal-50/70',
          indicator: 'bg-teal-500',
          text: 'text-teal-900',
        };
      case 'purple':
        return {
          border: 'border-purple-300 hover:border-purple-400',
          bg: 'bg-purple-50/70',
          indicator: 'bg-purple-500',
          text: 'text-purple-900',
        };
      default:
        return {
          border: 'border-slate-300 hover:border-slate-400',
          bg: 'bg-white',
          indicator: 'bg-indigo-600',
          text: 'text-slate-900',
        };
    }
  };

  const renderTree = (node: MindNode, level = 0) => {
    const isExpanded = !!expandedNodes[node.id];
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedNode?.id === node.id;
    const colors = getColorClasses(node.color);

    // Search matching
    const isMatched =
      !searchFilter ||
      node.label.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (node.detail && node.detail.toLowerCase().includes(searchFilter.toLowerCase()));

    return (
      <div
        key={node.id}
        className={`relative ${level > 0 ? 'ml-4 sm:ml-8 pl-3 sm:pl-4 border-l-2 border-slate-200' : ''} ${
          !isMatched && searchFilter ? 'opacity-30' : ''
        }`}
      >
        <div className="py-1.5 flex items-start gap-2 group">
          {/* Expand / Collapse Button */}
          {hasChildren ? (
            <button
              onClick={() => toggleNode(node.id)}
              className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-500 hover:bg-slate-100 transition-colors shadow-2xs"
            >
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          ) : (
            <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-slate-300 ml-1.5 mr-1.5" />
          )}

          {/* Node Card */}
          <div
            onClick={() => setSelectedNode(node)}
            className={`cursor-pointer rounded-xl border px-3 py-2 text-xs sm:text-sm transition-all shadow-2xs flex flex-wrap items-center gap-2 ${
              colors.bg
            } ${colors.border} ${
              isSelected
                ? 'ring-2 ring-indigo-500 ring-offset-1 font-bold shadow-xs'
                : 'hover:shadow-xs'
            }`}
          >
            <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${colors.indicator}`} />
            <span className={`font-semibold ${colors.text}`}>{node.label}</span>

            {node.badge && (
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${node.badgeColor}`}>
                {node.badge}
              </span>
            )}
          </div>
        </div>

        {/* Children Nodes */}
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {node.children!.map((child) => renderTree(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Mindmap Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-bold">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              인터랙티브 PRD 마인드맵 뷰
            </h2>
            <p className="text-xs text-slate-500">
              화이트보드 메모에서 발전된 1장 PRD의 전체 맥락과 관계를 한눈에 탐색하세요.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          <input
            type="text"
            placeholder="마인드맵 키워드 검색..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-48"
          />
          <button
            onClick={expandAll}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 font-medium text-slate-700 transition-colors"
          >
            모두 펼치기
          </button>
          <button
            onClick={collapseAll}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 font-medium text-slate-700 transition-colors"
          >
            접기
          </button>
        </div>
      </div>

      {/* Main Mindmap Display & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mindmap Tree Canvas */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs overflow-x-auto min-h-[500px]">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            마인드맵 노드를 클릭하면 우측에서 상세 해설을 볼 수 있습니다.
          </div>
          <div className="mindmap-root">{renderTree(MINDMAP_DATA)}</div>
        </div>

        {/* Selected Node Detail Sidebar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                선택된 항목 상세 정보
              </span>
              <Info className="w-4 h-4 text-slate-400" />
            </div>

            {selectedNode ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base text-slate-900">
                    {selectedNode.label}
                  </span>
                  {selectedNode.badge && (
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${selectedNode.badgeColor}`}>
                      {selectedNode.badge}
                    </span>
                  )}
                </div>

                {selectedNode.detail && (
                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {selectedNode.detail}
                  </div>
                )}

                {selectedNode.children && selectedNode.children.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-slate-600">하위 분류 ({selectedNode.children.length}개)</span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {selectedNode.children.map((c) => (
                        <li
                          key={c.id}
                          onClick={() => setSelectedNode(c)}
                          className="p-2 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-900 border border-slate-100 cursor-pointer transition-colors flex items-center justify-between"
                        >
                          <span className="font-medium">• {c.label}</span>
                          {c.badge && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-500">
                              {c.badge}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                노드를 클릭하면 세부 기획 내용이 표시됩니다.
              </div>
            )}
          </div>

          {/* Quick Context Summary Tip */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3.5 text-xs text-indigo-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-indigo-700">
              <CheckCircle2 className="w-4 h-4" /> 기획 선배 팁
            </div>
            <p className="text-[11px] leading-relaxed text-indigo-900/80">
              화이트보드 마인드맵의 4대 잔업무 중 <span className="font-bold text-indigo-900">자료 정리와 보고서 작성</span>이 Must 2개로 선정되어 구글 시트 웹앱의 핵심 흐름으로 압축 구현됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
