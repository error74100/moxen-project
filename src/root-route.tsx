import { Navigate, Route, Routes } from "react-router";
import GlobalLayout from "./components/layout/global-layout";
import IndexPage from "./pages/index-page";
import AboutPage from "./pages/about-page";
import InformationPage from "./pages/information-page";
import FacilitiesPage from "./pages/facilities-page";
import EnvironmentPage from "./pages/environment-page";
import MapPage from "./pages/map-page";
import QnaPage from "./pages/qna-page";
import SignUpPage from "./pages/sign-up-page";
import SignInPage from "./pages/sign-in-page";
import ForgetPasswordPage from "./pages/forget-password-page";
import ResetPasswordPage from "./pages/reset-password-page";
import ProfileDetailPage from "./pages/profile-detail-page";
import QnaDetailPage from "./pages/qna-detail-page";
import QnaWritePage from "./pages/qna-write-page";
import QnaUpdatePage from "./pages/qna-update-page";
import AdminOnlyLayout from "./admin/components/layout/admin-only-layout";
import AdminGlobalLayout from "./admin/components/layout/admin-global-layout";
import AdminDashboardPage from "./admin/pages/admin-dashboard-page";
import AdminUserPage from "./admin/pages/admin-user-page";
import AdminQnaPage from "./admin/pages/admin-qna-page";
import AdminFaqPage from "./admin/pages/admin-faq-page";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/environment" element={<EnvironmentPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/qna" element={<QnaPage />} />
        <Route path="/qna-write" element={<QnaWritePage />} />
        <Route path="/qna/:qnaId" element={<QnaDetailPage />} />
        <Route path="/qna-update/:qnaId" element={<QnaUpdatePage />} />

        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile/:userId" element={<ProfileDetailPage />} />
      </Route>

      {/* 관리자페이지 */}
      <Route element={<AdminOnlyLayout />}>
        <Route element={<AdminGlobalLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/user" element={<AdminUserPage />} />
          <Route path="/admin/qna" element={<AdminQnaPage />} />
          <Route path="/admin/faq" element={<AdminFaqPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}
