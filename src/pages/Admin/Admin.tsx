import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { tokenState } from "../../recoil/initState";
import { useRecoilValue } from "recoil";
import { api, setAuthToken } from "../../utils/setAuthToken";
import { IoTrashBinOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import localStorage from "redux-persist/es/storage";
import { logoutSuccess } from "../../redux/features/login/loginSlice";
import { FiSearch } from "react-icons/fi";
import { IoReloadOutline } from "react-icons/io5";
import LazyLoadImg from "../../components/common/LazyLoadImg/LazyLoadImg";
import { TfiUnlock } from "react-icons/tfi";
import { IoLockClosedOutline } from "react-icons/io5";
interface Comment {
  userId: string;
  fullName: string;
  image: string; // Assuming image is a string representing the URL
  levelFriend: any;
  career: string;
  id: string;
  phoneNumber: string;
  images: any;
  content: string;
  baned: any;
  // Other prope  rties...
}
interface ResponseData {
  data: Comment[];
  success: boolean;
  message: string;
}
const Admin = () => {
  const { info } = useSelector((state: RootState) => state.info);

  const [dataUser, setDataUser] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });
  const [dataPost, setData] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });
  const to = useRecoilValue(tokenState);
  const [loadUser, setLoadUser] = useState(true);
  const [loadPost, setLoadPost] = useState(true);
  const [active, setActive] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [sb, setSb] = useState(false);
  const [sb1, setSb1] = useState(false);
  const [sbP, setSbP] = useState(false);
  const fetchDataUser = async () => {
    setAuthToken(to);
    try {
      const response = await api.post(
        `https://truongnetwwork.bsite.net/api/admin/user/getAll`
      );
      console.log(response.data.data.images?.[0].linkImage);
      setDataUser(response.data);
      setLoadUser(true);
      //   setLoadData(true);
    } catch (error) {
      console.error("Get post failed", error);
    }
  };
  useEffect(() => {
    fetchDataUser();
  }, []);
  console.log(dataPost);

  const hanldDltUser = async (id: string) => {
    setAuthToken(to);
    console.log(id);
    try {
      // const data =;
      const res = await api.post(
        `https://truongnetwwork.bsite.net/api/admin/user/DeleteUserById?userId=${id}`
      );
      console.log(res.data);
      fetchDataUser();
      setSb(false);
    } catch (error) {
      console.error("Add sai!", error);
    }
  };
  const hanldUnban1 = async (id: string) => {
    setAuthToken(to);
    console.log(id);
    try {
      // const data =;
      const res = await api.post(
        `https://truongnetwwork.bsite.net/api/admin/user/UnBaned?userId=${id}`
      );
      console.log(res.data);
      fetchDataUser();
      setSb1(false);
    } catch (error) {
      console.error("Add sai!", error);
    }
  };

  const fetchData = async () => {
    setAuthToken(to);
    try {
      const response = await api.post(
        `https://truongnetwwork.bsite.net/api/admin/user/GetAllPostsAdmin`
      );
      console.log(response.data.data.images?.[0].linkImage);
      setData(response.data);
      setLoadPost(true);
    } catch (error) {
      console.error("Get post failed", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const hanldDltPost = async (id: string) => {
    setAuthToken(to);
    console.log(id);
    try {
      // const data =;
      const res = await api.post(
        `https://truongnetwwork.bsite.net/api/admin/user/DeletePostAdmin?postId=${id}`
      );
      console.log(res.data);
      fetchData();
      setSbP(false);
    } catch (error) {
      console.error("Add sai!", error);
    }
  };
  console.log(dataUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hasInfor");
    dispatch(logoutSuccess());
    navigate("/login");
  };
  const handleSearchUser = (e: any) => {
    setUsername(e.target.value);
  };
  const hanldSearch = async () => {
    setAuthToken(to);
    setLoadUser(false);
    return api
      .get(`https://truongnetwwork.bsite.net/api/infor/searchuser`, {
        params: { fullname: username }, // Use params to send data in the query string
      })
      .then((res) => {
        if (res.status === 200) {
          setDataUser(res.data.data);
          setLoadUser(true);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      hanldSearch();
    }
  };
  const [idPhuUser, setIdPhuUser] = useState("");
  const [idPhuUser1, setIdPhuUser1] = useState("");
  const [idPhuPost, setIdPhuPost] = useState("");
  const hanldeDelete = (id: string) => {
    setIdPhuUser(id);
    setSb(true);
  };
  const hanldeUnban = (id: string) => {
    setIdPhuUser1(id);
    setSb1(true);
  };
  const handleCancel = () => {
    // Xử lý khi nhấn hủy
    setSb(false);
  };
  const handleCancel1 = () => {
    // Xử lý khi nhấn hủy
    setSb1(false);
  };
  const hanldeDeletePost = (id: string) => {
    setIdPhuPost(id);
    setSbP(true);
  };
  const handleCancelPost = () => {
    // Xử lý khi nhấn hủy
    setSbP(false);
  };
  return (
    <div className="bg-gray-100 font-family-karla flex">
      <aside
        className={`relative bg-[#3d68ff] h-screen w-64 hidden sm:block shadow-xl`}
      >
        <div className="p-6">
          <a
            href="index.html"
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
          >
            Admin
          </a>
          <button className="w-full bg-white text-[#3d68ff] font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
            <i className="fas fa-plus mr-3"></i> New Report
          </button>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
          <a
            href="index.html"
            className="flex items-center bg-[#1947ee] text-white py-4 pl-6 nav-item"
          >
            <i className="fas fa-tachometer-alt mr-3"></i>
            Dashboard
          </a>
        </nav>
      </aside>

      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <div className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
          <div className="w-1/2"></div>
          <div
            x-data="{ isOpen: false }"
            className="relative w-1/2 flex justify-end"
          >
            <div
              onClick={() => setActive(!active)}
              className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
            >
              <img src={info?.data?.image} />
            </div>
            {active === false ? (
              <></>
            ) : (
              <div
                x-show="isOpen"
                className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16"
              >
                <Link
                  to="/"
                  className="block px-4 py-2 hover:bg-[#456fe6] hover:text-white"
                >
                  Back Home
                </Link>

                <div
                  className="block px-4 py-2 hover:bg-[#456fe6] hover:text-white cursor-pointer"
                  onClick={handleLogout}
                >
                  Sign Out
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          x-data="{ isOpen: false }"
          className="w-full bg-sidebar py-5 px-6 sm:hidden"
        >
          <div className="flex items-center justify-between">
            <a
              href="index.html"
              className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
            >
              Admin
            </a>
            <button className="text-white text-3xl focus:outline-none">
              <i x-show="!isOpen" className="fas fa-bars"></i>
              <i x-show="isOpen" className="fas fa-times"></i>
            </button>
          </div>

          <nav className="flex flex-col pt-4">
            <a
              href="index.html"
              className="flex items-center active-nav-link text-white py-2 pl-4 nav-item"
            >
              <i className="fas fa-tachometer-alt mr-3"></i>
              Dashboard
            </a>
            <a
              href="blank.html"
              className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-sticky-note mr-3"></i>
              Blank Page
            </a>
            <a
              href="tables.html"
              className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-table mr-3"></i>
              Tables
            </a>
            <a
              href="forms.html"
              className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-align-left mr-3"></i>
              Forms
            </a>
            <a
              href="tabs.html"
              className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-tablet-alt mr-3"></i>
              Tabbed Content
            </a>
            <a
              href="calendar.html"
              className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-calendar mr-3"></i>
              Calendar
            </a>
            <a
              href="#"
              className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-cogs mr-3"></i>
              Support
            </a>
            <a
              href="#"
              className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-user mr-3"></i>
              My Account
            </a>
            <a
              href="#"
              className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-sign-out-alt mr-3"></i>
              Sign Out
            </a>
            <button className="w-full bg-white cta-btn font-semibold py-2 mt-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
              <i className="fas fa-arrow-circle-up mr-3"></i> Upgrade to Pro!
            </button>
          </nav>
        </div>

        <div className="w-full overflow-x-hidden border-t flex flex-col">
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black pb-6">Dashboard</h1>

            <div className="w-full mt-12">
              <div className="flex items-center">
                <p className="text-xl  flex items-center">
                  <i className="fas fa-list mr-3"></i>{" "}
                  <span>Table User Management</span>
                </p>
                <div className="InputContaiInputContainerUserner flex mr-4">
                  <div className="h-[40px] w-[40px] flex justify-center items-center bg-white rounded-l-[30px] ml-4 ">
                    <FiSearch className=" transform -translate-y-1/2 text-gray-500 mt-4" />
                  </div>
                  <input
                    placeholder="Search.."
                    id="input"
                    className="inputSearchUser bg-white rounded-r-[30px]"
                    name="text"
                    type="text"
                    required
                    value={username}
                    onKeyDown={handleKey}
                    onChange={handleSearchUser}
                  />
                </div>
                <div className="cursor-pointer" onClick={fetchDataUser}>
                  <IoReloadOutline />
                </div>
              </div>
              <div className="bg-white overflow-auto">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5  py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Career
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Phone Number
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  {loadUser == false ? (
                    <div className="min-w-full h-[300px] flex justify-center items-center relative ">
                      <div className="w-full absolute top-[50%] left-[50%]">
                        {" "}
                        <td>
                          <div className="loader"></div>
                        </td>
                      </div>
                    </div>
                  ) : (
                    <tbody>
                      {dataUser.data.map((_, index: number) => (
                        <tr key={index}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={dataUser.data[index]?.image}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {dataUser.data[index]?.fullName}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200  text-sm bg-white text-left">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {dataUser.data[index]?.career}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {dataUser.data[index]?.phoneNumber}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {dataUser.data[index]?.baned.toString() === "true"
                                ? "Locked"
                                : "Active"}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm  ">
                            {dataUser.data[index]?.baned.toString() ===
                            "true" ? (
                              <span
                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                onClick={() =>
                                  hanldeUnban(dataUser.data[index]?.userId)
                                }
                              >
                                <span
                                  aria-hidden
                                  className="absolute inset-0 bg-[#fee4e4] opacity-50 rounded-full cursor-pointer"
                                ></span>
                                <span className="relative">
                                  <IoLockClosedOutline />
                                </span>
                              </span>
                            ) : (
                              <span
                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                onClick={() =>
                                  hanldeDelete(dataUser.data[index]?.userId)
                                }
                              >
                                <span
                                  aria-hidden
                                  className="absolute inset-0 bg-[#fee4e4] opacity-50 rounded-full cursor-pointer"
                                ></span>
                                <span className="relative">
                                  <TfiUnlock />
                                </span>
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>

            <div className="w-full mt-12">
              <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> Table Post Management
              </p>
              <div className="bg-white overflow-auto">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5  py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Content
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Image Post
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  {loadPost == false ? (
                    <div className="min-w-full h-[300px] flex justify-center items-center relative ">
                      <div className="w-full absolute top-[50%] left-[50%]">
                        {" "}
                        <td>
                          <div className="loader"></div>
                        </td>
                      </div>
                    </div>
                  ) : (
                    <tbody>
                      {dataPost.data.map((_, index) => (
                        <tr>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {dataPost.data[index]?.fullName}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200  text-sm bg-white text-left">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {dataPost.data[index]?.content}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                            <div className="flex-shrink-0 w-[60px] h-[60px] ml-8">
                              {/* <img
                                className="w-full h-full "
                                src={dataPost.data[index]?.images[0].linkImage}
                                alt=""
                              /> */}
                              <LazyLoadImg
                                index={index}
                                images={
                                  dataPost.data[index]?.images[0]?.linkImage
                                }
                                className="w-full h-full "
                              />
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm  ">
                            <span
                              className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                              onClick={() =>
                                hanldeDeletePost(dataPost.data[index]?.id)
                              }
                            >
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-[#fee4e4] opacity-50 rounded-full cursor-pointer"
                              ></span>
                              <span className="relative">
                                <IoTrashBinOutline />
                              </span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
      {sb && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            height: "100%",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "25px 20px",
              borderRadius: "16px",
              textAlign: "center",
              width: "20%",
            }}
          >
            {/* Nội dung form đặt lịch */}
            <h2
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "25.2px",
                textAlign: "center",
                color: "#111111",
              }}
            >
              Xác nhận ban user
            </h2>
            <p
              style={{
                marginBottom: "0",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "17.64px",
                textAlign: "center",
                color: "#78828A",
              }}
            >
              Bạn có muốn chắc chắn ban user này?
            </p>
            <div
              style={{
                marginTop: "20px",
                width: "80%",
                display: "flex",
                justifyContent: "space-around",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <button
                onClick={handleCancel}
                style={{
                  marginBottom: "0",
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "17.64px",
                  textAlign: "center",
                  color: "#456fe6",
                  border: "0",
                  background: "transparent ",
                }}
              >
                Hủy
              </button>{" "}
              <button
                onClick={() => hanldDltUser(idPhuUser)}
                style={{
                  borderRadius: "20px",
                  padding: "12px 24px 12px 24px",
                  border: 0,
                  background: "#456fe6",
                  color: "#FEFEFE",
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "17.64px",
                  textAlign: "center",
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
      {sb1 && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            height: "100%",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "25px 20px",
              borderRadius: "16px",
              textAlign: "center",
              width: "20%",
            }}
          >
            {/* Nội dung form đặt lịch */}
            <h2
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "25.2px",
                textAlign: "center",
                color: "#111111",
              }}
            >
              Xác nhận unban user
            </h2>
            <p
              style={{
                marginBottom: "0",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "17.64px",
                textAlign: "center",
                color: "#78828A",
              }}
            >
              Bạn có muốn unban này?
            </p>
            <div
              style={{
                marginTop: "20px",
                width: "80%",
                display: "flex",
                justifyContent: "space-around",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <button
                onClick={handleCancel1}
                style={{
                  marginBottom: "0",
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "17.64px",
                  textAlign: "center",
                  color: "#456fe6",
                  border: "0",
                  background: "transparent ",
                }}
              >
                Hủy
              </button>{" "}
              <button
                onClick={() => hanldUnban1(idPhuUser1)}
                style={{
                  borderRadius: "20px",
                  padding: "12px 24px 12px 24px",
                  border: 0,
                  background: "#456fe6",
                  color: "#FEFEFE",
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "17.64px",
                  textAlign: "center",
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
      {sbP && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            height: "100%",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "25px 20px",
              borderRadius: "16px",
              textAlign: "center",
              width: "20%",
            }}
          >
            {/* Nội dung form đặt lịch */}
            <h2
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "25.2px",
                textAlign: "center",
                color: "#111111",
              }}
            >
              Xác nhận xóa Post
            </h2>
            <p
              style={{
                marginBottom: "0",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "17.64px",
                textAlign: "center",
                color: "#78828A",
              }}
            >
              Bạn có muốn chắc chắn xóa Post này?
            </p>
            <div
              style={{
                marginTop: "20px",
                width: "80%",
                display: "flex",
                justifyContent: "space-around",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <button
                onClick={handleCancelPost}
                style={{
                  marginBottom: "0",
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "17.64px",
                  textAlign: "center",
                  color: "#456fe6",
                  border: "0",
                  background: "transparent ",
                }}
              >
                Hủy
              </button>{" "}
              <button
                onClick={() => hanldDltPost(idPhuPost)}
                style={{
                  borderRadius: "20px",
                  padding: "12px 24px 12px 24px",
                  border: 0,
                  background: "#456fe6",
                  color: "#FEFEFE",
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "17.64px",
                  textAlign: "center",
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
