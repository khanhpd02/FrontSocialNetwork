import { Suspense, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import { publicRoutes } from "./routes";
import Logo2 from "../src/assets/LogoLoad.png";
import QR from "../src/assets/image-qr-code.png";
import { Toaster } from "react-hot-toast";
import React from "react";
import PersonalPage from "./pages/PersonalPage";
import Personal from "./pages/Personal/Personal";
import PersonalFriend from "./pages/PersonalFriend/PersonalFriend";
import ForgotPass from "./pages/ForgotPass/ForgotPass";
import VerifyCodeOTP from "./pages/VerifyCodeOTP/VerifyCodeOTP";
const Chat = React.lazy(() => import("./pages/Chat/Chat"));
const Admin = React.lazy(() => import("./pages/Admin/Admin"));
const VerifyCode = React.lazy(() => import("./pages/VerifyCode/VerifyCode"));
const AddInfo = React.lazy(() => import("./pages/AddInfo/AddInfo"));

function App() {
  const [loading, setLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Kết thúc trạng thái loading
    }, 3000);

    // Kiểm tra kích thước màn hình khi component được render
    checkScreenSize();
    // Thêm sự kiện resize để kiểm tra kích thước màn hình khi thay đổi
    window.addEventListener("resize", checkScreenSize);

    // Xóa sự kiện khi component unmount để tránh memory leak
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Hàm kiểm tra kích thước màn hình
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 1366);
  };

  return (
    <>
      {loading ? (
        <div
          className="duration-700 transition-all fixed w-full bottom-0 overflow-hidden z-[9999999]"
          style={{
            height: "100vh",
            width: "100vw",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Logo2} style={{ height: "300px", width: "300px" }} alt="" />

          <div
            className="loader2"
            style={{
              position: "absolute",

              bottom: "30px",
            }}
          ></div>
        </div>
      ) : (
        <>
          <Suspense>
            <Router>
              <div className="App ">
                {isSmallScreen ? (
                  <div className="min-h-screen bg-gray flex justify-center items-center">
                    <main className="w-80 bg-white font-outfit text-center rounded-[20px]">
                      <img
                        src={QR}
                        alt="QR code"
                        className="p-4 rounded-[10px]"
                      />

                      <h1 className="text-size-22 font-bold text-dark_blue leading-7 px-4 pt-2 pb-4">
                        We do not support mobile
                      </h1>

                      <p className="text-size-15 text-gray_blue leading-5 tracking-wide px-7 pb-9">
                        Scan the QR code to visit our App!
                      </p>
                    </main>
                  </div>
                ) : (
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/verifyPinOTP" element={<VerifyCodeOTP />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/forgot-password" element={<ForgotPass />} />
                    <Route path="/verify" element={<VerifyCode />} />
                    <Route
                      path="personal"
                      element={
                        <PersonalPage>
                          <Personal />
                        </PersonalPage>
                      }
                    />
                    <Route
                      path="/personal-user/:id"
                      element={
                        <PersonalPage>
                          <PersonalFriend />
                        </PersonalPage>
                      }
                    />
                    <Route
                      path="/chat"
                      element={
                        <PersonalPage>
                          <Chat />
                        </PersonalPage>
                      }
                    />
                    <Route path="/add-info" element={<AddInfo />} />

                    {publicRoutes.map((publicRoute, index) => {
                      const Layout = publicRoute.layout;
                      const Page = publicRoute.component;
                      return (
                        <Route
                          key={index}
                          path={publicRoute.path}
                          element={
                            <Layout>
                              <Page />
                            </Layout>
                          }
                        />
                      );
                    })}
                  </Routes>
                )}
              </div>
            </Router>
          </Suspense>
        </>
      )}
      <Toaster />
    </>
  );
}

export default App;
