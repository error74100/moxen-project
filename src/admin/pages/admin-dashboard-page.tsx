import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { ChevronRight, FileText, User, UsersRound } from "lucide-react";

// 1. Chart.js 필수 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// 2. 공통 차트 옵션 설정
const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // 범례 숨김 (깔끔한 대시보드를 위해)
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: "#f3f4f6" },
    },
    x: {
      grid: { display: false },
    },
  },
};

// 3. 차트 데이터 설정
const userData = {
  labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
  datasets: [
    {
      label: "가입자 수",
      data: [120, 190, 300, 500, 450, 700],
      borderColor: "rgb(79, 70, 229)", // Indigo 600
      backgroundColor: "rgba(79, 70, 229, 0.5)",
      tension: 0.4, // 선을 부드럽게
    },
  ],
};

const inquiryData = {
  labels: ["월", "화", "수", "목", "금", "토", "일"],
  datasets: [
    {
      label: "문의 건수",
      data: [12, 19, 3, 5, 2, 3, 9],
      backgroundColor: "rgba(16, 185, 129, 0.8)", // Emerald 500
      borderRadius: 6,
    },
  ],
};

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto">
      <div className="space-y-6">
        {/* 상단 통계 카드 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <UsersRound size={18} className="text-indigo-500" />
              <h3 className="font-bold text-gray-800">사용자</h3>
            </div>
            <div className="my-4 grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-gray-50 py-3">
                <span className="text-sm font-medium tracking-wider text-gray-500 uppercase">
                  전체
                </span>
                <span className="mt-1 text-lg font-bold text-gray-900">
                  10명
                </span>
              </div>

              <div className="flex flex-col items-center justify-center rounded-lg border border-amber-100 bg-amber-50/50 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium tracking-wider text-amber-700 uppercase">
                    Email 가입
                  </span>
                </div>
                <span className="mt-1 text-lg font-bold text-amber-600">
                  2명
                </span>
              </div>

              <div className="flex flex-col items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50/50 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium tracking-wider text-emerald-700 uppercase">
                    Social 가입
                  </span>
                </div>
                <span className="mt-1 text-lg font-bold text-emerald-600">
                  8명
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-emerald-500" />
              <h3 className="font-bold text-gray-800">문의 현황</h3>
            </div>
            <div className="my-4 grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-gray-50 py-3">
                <span className="text-sm font-medium tracking-wider text-gray-500 uppercase">
                  총 건수
                </span>
                <span className="mt-1 text-lg font-bold text-gray-900">
                  10건
                </span>
              </div>

              <div className="flex flex-col items-center justify-center rounded-lg border border-amber-100 bg-amber-50/50 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium tracking-wider text-amber-700 uppercase">
                    답변대기
                  </span>
                </div>
                <span className="mt-1 text-lg font-bold text-amber-600">
                  2건
                </span>
              </div>

              <div className="flex flex-col items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50/50 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium tracking-wider text-emerald-700 uppercase">
                    답변완료
                  </span>
                </div>
                <span className="mt-1 text-lg font-bold text-emerald-600">
                  8건
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 차트 영역 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 font-bold text-gray-800">사용자 가입 추이</h3>
            <div className="h-64">
              <Line options={commonOptions} data={userData} />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 font-bold text-gray-800">일주일 문의 현황</h3>
            <div className="h-64">
              <Bar options={commonOptions} data={inquiryData} />
            </div>
          </div>
        </div>

        {/* 하단 목록 영역 (최근 가입자 & 최근 문의글) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 왼쪽: 최근 가입자 5개 */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <h3 className="flex items-center gap-2 font-bold text-gray-800">
                <User size={18} className="text-indigo-500" />
                최근 가입자
              </h3>
              <button className="flex items-center text-xs font-medium text-gray-400 hover:text-indigo-600">
                전체보기 <ChevronRight size={14} />
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-600">
                      JD
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        사용자_{i}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-400">2시간 전</span>
                </div>
              ))}
            </div>
          </div>

          {/* 최근 문의글 5개 */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <h3 className="flex items-center gap-2 font-bold text-gray-800">
                <FileText size={18} className="text-emerald-500" />
                최근 문의글
              </h3>
              <button className="flex items-center text-xs font-medium text-gray-400 hover:text-emerald-600">
                전체보기 <ChevronRight size={14} />
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                {
                  title: "로그인이 안 돼요",
                  status: "답변대기",
                  color: "amber",
                },
                {
                  title: "결제 취소 요청합니다",
                  status: "답변완료",
                  color: "emerald",
                },
                {
                  title: "서비스 이용 방법 문의",
                  status: "답변완료",
                  color: "emerald",
                },
                {
                  title: "비밀번호 재설정 관련",
                  status: "답변대기",
                  color: "amber",
                },
                {
                  title: "기능 제안 피드백",
                  status: "답변완료",
                  color: "emerald",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="min-w-0 flex-1 pr-4">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      작성자: 홍길동
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        item.color === "amber"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-[10px] text-gray-400">14:20</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
