import {
  ArrowUpRight,
  MessageSquare,
  MoreHorizontal,
  Users,
} from "lucide-react";

const StatCard = ({
  title,
  value,
  increment,
  icon,
}: {
  title: string;
  value: string;
  increment: string;
  icon: React.ReactNode;
}) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-100 bg-gray-50">
        {icon}
      </div>
      <div className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600">
        <ArrowUpRight size={14} />
        {increment}
      </div>
    </div>
    <div className="mt-4">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h4 className="mt-1 text-2xl font-bold text-gray-900">{value}</h4>
    </div>
  </div>
);

const ChartPlaceholder = ({ title }: { title: string }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <div className="mb-6 flex items-center justify-between">
      <h3 className="font-bold text-gray-800">{title}</h3>
      <button className="text-gray-400 hover:text-gray-600">
        <MoreHorizontal size={20} />
      </button>
    </div>
    {/* 실제 차트가 들어갈 자리 */}
    <div className="flex h-64 items-end justify-between gap-2 px-2">
      {[40, 70, 45, 90, 65, 80, 50, 85, 60, 75, 55, 95].map((height, i) => (
        <div
          key={i}
          className="group relative w-full cursor-pointer rounded-t-sm bg-indigo-100 transition-colors hover:bg-indigo-500"
          style={{ height: `${height}%` }}
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
            {height * 10}
          </div>
        </div>
      ))}
    </div>
    <div className="mt-4 flex justify-between px-1 text-[10px] font-medium text-gray-400">
      <span>1월</span>
      <span>3월</span>
      <span>6월</span>
      <span>9월</span>
      <span>12월</span>
    </div>
  </div>
);

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="space-y-6">
        {/* 1. 상단 통계 카드 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          <StatCard
            title="총 사용자"
            value="1,284명"
            increment="+12%"
            icon={<Users className="text-indigo-600" size={24} />}
          />
          <StatCard
            title="신규 문의"
            value="42건"
            increment="+5%"
            icon={<MessageSquare className="text-emerald-600" size={24} />}
          />
        </div>

        {/* 2. 실제 Chart.js 적용 영역 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 사용자 가입 추이 (Line) */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 font-bold text-gray-800">사용자 가입 추이</h3>
            <div className="h-64">
              <Line options={commonOptions} data={userData} />
            </div>
          </div>

          {/* 문의글 등록 현황 (Bar) */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 font-bold text-gray-800">일주일 문의 현황</h3>
            <div className="h-64">
              <Bar options={commonOptions} data={inquiryData} />
            </div>
          </div>
        </div>

        {/* 3. 하단 테이블 영역 (생략 - 이전과 동일) */}
        <div className="rounded-xl border-2 border-dashed py-10 text-center text-sm text-gray-400">
          최근 목록 테이블이 들어가는 자리입니다.
        </div>
      </div>
    </div>
  );
}
