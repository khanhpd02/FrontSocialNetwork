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
import { useRecoilValue } from "recoil";
import { createRoom } from "./recoil/initState";
import Chat from "./pages/Chat/Chat";
const Admin = React.lazy(() => import("./pages/Admin/Admin"));
const VerifyCode = React.lazy(() => import("./pages/VerifyCode/VerifyCode"));
const AddInfo = React.lazy(() => import("./pages/AddInfo/AddInfo"));

function App() {
  const [loading, setLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const createRoomR = useRecoilValue(createRoom);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Kết thúc trạng thái loading
    }, 3000);

    // Kiểm tra kích thước màn hình khi component được render
    checkScreenSize();
    // // Thêm sự kiện resize để kiểm tra kích thước màn hình khi thay đổi
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
        <>
          {createRoomR === false ? (
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
              <img
                src={Logo2}
                style={{ height: "300px", width: "300px" }}
                alt=""
              />
              {/* <img
                src={LogoSecond}
                style={{
                  height: "100px",
                  width: "auto",
                  position: "absolute",

                  bottom: "30px",
                }}
                alt=""
              /> */}

              <div
                style={{
                  position: "absolute",

                  bottom: "30px",
                }}
                className="flex flex-col justify-center items-center"
              >
                <p className="text-gray-400">from</p>
                <p className="text-[#4da9f0] font-semibold">KTC NETWORK</p>
              </div>
            </div>
          ) : (
            <div className="main_wrapper">
              <div className="main">
                <div className="antenna">
                  <div className="antenna_shadow"></div>
                  <div className="a1"></div>
                  <div className="a1d"></div>
                  <div className="a2"></div>
                  <div className="a2d"></div>
                  <div className="a_base"></div>
                </div>
                <div className="tv">
                  <div className="cruve">
                    <svg
                      xmlSpace="preserve"
                      viewBox="0 0 189.929 189.929"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      className="curve_svg"
                    >
                      <path
                        d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13
        C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z"
                      ></path>
                    </svg>
                  </div>
                  <div className="display_div">
                    <div className="screen_out">
                      <div className="screen_out1">
                        <div className="screen">
                          <span className="notfound_text">
                            {" "}
                            Joining the room
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lines">
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                  </div>
                  <div className="buttons_div">
                    <div className="b1">
                      <div></div>
                    </div>
                    <div className="b2"></div>
                    <div className="speakers">
                      <div className="g1">
                        <div className="g11"></div>
                        <div className="g12"></div>
                        <div className="g13"></div>
                      </div>
                      <div className="g"></div>
                      <div className="g"></div>
                    </div>
                  </div>
                </div>
                <div className="bottom">
                  <div className="base1"></div>
                  <div className="base2"></div>
                  <div className="base3"></div>
                </div>
              </div>
              <div className="text_404">
                <div className="text_4041">K</div>
                <div className="text_4042">T</div>
                <div className="text_4043">C</div>
              </div>
            </div>
          )}
        </>
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
