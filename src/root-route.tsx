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

export default function RootRoute() {
  return (
    <Routes>
      {/* mac test */}
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/environment" element={<EnvironmentPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/qna" element={<QnaPage />} />

        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile-detail" element={<ProfileDetailPage />} />

        <Route path="*" element={<Navigate to={"/"} />} />

        {/* <Route element={<GuestOnlyLayout />}> */}
        {/* <Route path="/sign-in" element={<SignInPage />} /> */}
        {/* </Route> */}

        {/* <Route element={<MemberOnlyLayout />}> */}
        {/* <Route path="/" element={<IndexPage />} /> */}
        {/* </Route> */}
      </Route>
    </Routes>
  );
}
