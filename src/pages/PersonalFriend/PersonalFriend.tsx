import { useEffect, useState } from "react";
import { api, setAuthToken } from "../../utils/setAuthToken";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/initState";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { useChatContext } from "../../context/ChatContext";
import { IoChatbubblesOutline } from "react-icons/io5";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import ListFriendPersonalRQ from "../../components/ListFriendPersonalRQ/ListFriendPersonalRQ";
interface Comment {
  content: string;
  images: { linkImage: string; createDate: string }[]; // Đặt kiểu cho mảng images
  linkImage?: string;
  createDate: string;
  userId: string;
  id: string;
  countLike: any;
  islike: boolean;
  videos: { link: string; createDate: string }[]; //
}

interface Info {
  linkImage?: string;
  statusFriend: string;
  userId: string;
  islike: boolean;
  firebaseData: any;
  address: string;
  fullName: string;
  background: string;
  image: any;
  nickname: any;
  career: any;
  workPlace: any;
  provinces: any;
}
interface ResponseData {
  data: Comment[];
  success: boolean;
  message: string;
}
interface ResponseDataInfo {
  data: Info;
  success: boolean;
  message: string;
}
const PersonalFriend = () => {
  const { id } = useParams();
  const currentUser = useSelector((state: RootState) => state.info.info);
  const navigate = useNavigate();
  const [loadInfo, setLoadCmt1] = useState(false);
  const [loadSearch1, setLoadSearch1] = useState(false);
  const [loadSearch2, setLoadSearch2] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const token = useRecoilValue(tokenState);
  const [data, setData] = useState<ResponseDataInfo>({
    data: {
      linkImage: "",
      statusFriend: "",
      userId: "",
      islike: false,
      firebaseData: null,
      address: "",
      fullName: "",
      background: "",
      image: null,
      nickname: null,
      career: null,
      workPlace: null,
      provinces: null,
    },
    success: false,
    message: "",
  });
  const [dataPost, setDataPost] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });
  const loadDataInfo = async () => {
    // Gọi API để lấy dữ liệu

    await api
      .get(`https://truongnetwwork.bsite.net/api/infor/user/${id}`)
      .then((response) => {
        // Cập nhật dữ liệu vào state
        if (response.status === 200) {
          setLoadCmt1(true);
          setLoadSearch1(false);
          setLoadSearch2(false);
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handleAddF = async (idfriend: any) => {
    setAuthToken(token);
    try {
      const id = idfriend;
      const response = await api.post(
        `https://truongnetwwork.bsite.net/api/Friend/send/${id}`
      );

      if (response.status == 200) {
        loadDataInfo();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleAcceptF = async (idfriend: any) => {
    try {
      const id = idfriend;

      const response = await api.post(
        `https://truongnetwwork.bsite.net/api/Friend/accept/${id}`
      );
      console.log(response);
      loadDataInfo();
    } catch (error) {
      console.log("Login failed", error);
    }
  };
  const handleUpLevelF1 = async (idfriend: any) => {
    try {
      const response = await api.post(
        `https://truongnetwwork.bsite.net/api/Friend/updateFriendLevel`,
        {
          user2: idfriend,
          level: "4",
        }
      );

      if (response.status == 200) {
        loadDataInfo();
      }
    } catch (error) {
      console.log("Login failed", error);
    }
  };
  const handleUpLevelF = async (idfriend: any) => {
    // setLoadSearch1(true);
    // setAuthToken(token);
    try {
      const response = await api.post(
        `https://truongnetwwork.bsite.net/api/Friend/updateFriendLevel`,
        {
          user2: idfriend,
          level: "5",
        }
      );

      if (response.status == 200) {
        loadDataInfo();
      }
    } catch (error) {
      console.log("Login failed", error);
    }
  };
  const handleRemoveF = async (idfriend: any) => {
    setLoadSearch2(true);
    setAuthToken(token);
    try {
      const id = idfriend;
      const response = await api.post(
        `https://truongnetwwork.bsite.net/api/Friend/refuseFriend/${id}`
      );

      if (response.status == 200) {
        loadDataInfo();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  const [sb, setSb] = useState(false);

  // Truy cập thuộc tính "firebaseData"

  const handleConfirm = async () => {
    setAuthToken(token);
    try {
      const response = await api.delete(
        `https://truongnetwwork.bsite.net/api/Friend/unfriend/${id}`
      );
      if (response.status == 200) {
        loadDataInfo();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
    // Xử lý khi nhấn xác nhận
    setSb(false);
  };

  const handleCancel = () => {
    // Xử lý khi nhấn hủy
    setSb(false);
  };
  useEffect(() => {
    setAuthToken(token);
    const fetchData = async () => {
      try {
        const response = await api.get<ResponseData>(
          `https://truongnetwwork.bsite.net/api/post/user/${id}`
        );

        // setLengthPost(response.data.data.length);
        // setTotal(response.data.data.length);
        setDataPost(response.data);
        setLoadData(true);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };
    fetchData();
  }, [id]);
  useEffect(() => {
    loadDataInfo();
    // loadDataUserCmt();
  }, [id]);
  const { dispatch } = useChatContext();
  const handleMessage = async () => {
    const combinedId =
      currentUser.data.firebaseData.uid > data.data.firebaseData.uid
        ? currentUser.data.firebaseData.uid + data.data.firebaseData.uid
        : data.data.firebaseData.uid + currentUser.data.firebaseData.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(
          doc(db, "userChats", currentUser.data.firebaseData.uid),
          {
            [combinedId + ".userInfo"]: {
              uid: data.data.firebaseData.uid,
              displayName: data.data.firebaseData.displayName,
              photoURL: data.data.firebaseData.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          }
        );

        await updateDoc(doc(db, "userChats", data.data.firebaseData.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.data.firebaseData.uid,
            displayName: currentUser.data.firebaseData.displayName,
            photoURL: currentUser.data.firebaseData.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log("Loi r");
    }
    dispatch({ type: "CHANGE_USER", payload: data.data.firebaseData });
    navigate("/chat");
  };

  return (
    <>
      <div className=" w-full relative  top-[50px]">
        {/* <!--body start-->
    <!--profile data--> */}
        <div className=" h-auto  flex justify-center ">
          {/* 
      <!--status show icon--> */}
          {/* <ListFriendPersonal /> */}
          <div className=" w-[20%] h-[fit-content] mt-4 flex justify-end px-4 ">
            <div className="bg-white w-[100%]  rounded-lg py-2">
              <div className="px-2">
                <p className="font-[600] text-start mb-2">
                  Info's {data.data?.fullName}
                </p>

                <div className="w-[100%] h-auto rounded-[10px] flex justify-between items-center mb-2  px-2">
                  <div className="flex justify-start items-center">
                    <div className="gap-4">
                      {" "}
                      <p className=" text-[14px] text-[#050505] flex justify-start items-center mb-1">
                        <div className="h-4 w-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            id="map-marker"
                          >
                            <path
                              fill="#6d92f8"
                              d="M12,2a8,8,0,0,0-8,8c0,5.4,7.05,11.5,7.35,11.76a1,1,0,0,0,1.3,0C13,21.5,20,15.4,20,10A8,8,0,0,0,12,2Zm0,17.65c-2.13-2-6-6.31-6-9.65a6,6,0,0,1,12,0C18,13.34,14.13,17.66,12,19.65ZM12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z"
                            ></path>
                          </svg>
                        </div>

                        <span className="ml-2 py-2  text-sm text-[#333] no-underline tracking-normal leading-none">
                          From {data.data.provinces}
                        </span>
                      </p>
                      <p className=" text-[14px] text-[#050505] text-start flex justify-start items-center mb-1">
                        <div className="h-4 w-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            data-name="Layer 1"
                            viewBox="0 0 24 24"
                            id="house-user"
                          >
                            <path
                              fill="#6d92f8"
                              d="m21.664 10.252-9-8a.999.999 0 0 0-1.328 0l-9 8a1 1 0 0 0 1.328 1.496L4 11.449V21a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9.551l.336.299a1 1 0 0 0 1.328-1.496ZM9.184 20a2.982 2.982 0 0 1 5.632 0Zm1.316-5.5A1.5 1.5 0 1 1 12 16a1.502 1.502 0 0 1-1.5-1.5ZM18 20h-1.101a5 5 0 0 0-2.259-3.228 3.468 3.468 0 0 0 .86-2.272 3.5 3.5 0 0 0-7 0 3.468 3.468 0 0 0 .86 2.272A5 5 0 0 0 7.1 20H6V9.671l6-5.333 6 5.333Z"
                            ></path>
                          </svg>
                        </div>

                        <span className="ml-2 py-2  text-sm text-[#33] no-underline tracking-normal leading-none">
                          Lives in {data.data.workPlace}
                        </span>
                      </p>
                      <p className=" text-[14px] text-[#050505] text-start flex justify-start items-center mb-1">
                        <div className="h-4 w-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            id="bag"
                          >
                            <path
                              fill="#6d92f8"
                              d="M19,6H16V5a2,2,0,0,0-2-2H10A2,2,0,0,0,8,5V6H5A3,3,0,0,0,2,9v9a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V9A3,3,0,0,0,19,6ZM10,5h4V6H10ZM20,18a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12.39L8.68,14A1.19,1.19,0,0,0,9,14h6a1.19,1.19,0,0,0,.32-.05L20,12.39Zm0-7.72L14.84,12H9.16L4,10.28V9A1,1,0,0,1,5,8H19a1,1,0,0,1,1,1Z"
                            ></path>
                          </svg>
                        </div>
                        <span className="ml-2 py-2   text-sm text-[#33] no-underline tracking-normal leading-none">
                          Working as a {data.data.career}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-auto w-[60%]  left-[20%]   rounded-xl  ">
            {loadInfo === false ? (
              <div className="w-[100%] mx-auto ">
                <div>
                  <div className="relative py-4">
                    <Skeleton className="h-96 w-full rounded-md object-cover" />

                    <div className="absolute bottom-10 left-6">
                      <Skeleton className="h-28 w-28 rounded-full" />
                      <Skeleton className="h-[10px] w-16" />
                      <Skeleton className="h-[10px] w-16" />
                    </div>

                    <div className="flex flex-row absolute right-6 bottom-10">
                      <div className="flex items-center">
                        <Skeleton className="h-[36px] w-24 ml-2" />
                      </div>
                      <div className="flex items-center">
                        <Skeleton className="h-[36px] w-24 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-[100%] mx-auto ">
                <div>
                  <div className="relative py-4">
                    <img
                      className="h-96 w-full rounded-md object-cover"
                      src={data.data.background}
                      alt="profilePic"
                    ></img>
                    <div className="absolute bottom-10 left-6">
                      <img
                        className="h-28 w-28 rounded-full"
                        src={data.data.image}
                        alt="avatart"
                      />
                      <div className="bg-white p-2 rounded-[12px] mt-2">
                        <p className="py-2 font-roboto  text-sm font-semibold text-black no-underline tracking-normal leading-none">
                          {data.data.fullName}
                        </p>
                        <p className="py-2 font-roboto font-medium text-sm text-black no-underline tracking-normal leading-none">
                          @ {data?.data?.nickname}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center items-center absolute right-6 bottom-10">
                      <div className="flex items-center">
                        <div
                          className=" bg-[#E4E6EB]  px-4 py-2 rounded-[8px] flex items-center justify-around text-[#333]"
                          onClick={handleMessage}
                        >
                          <IoChatbubblesOutline />
                          <button className="text-[15px] font-medium ml-1">
                            Nhắn tin
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-base font-semibold text-gray-700 mr-2">
                          <span>
                            {data.data.statusFriend === "Thêm bạn bè" ? (
                              <>
                                {loadSearch1 == false ? (
                                  <div className="ml-6 bg-[#456fe6] text-white px-4 py-2 rounded-[8px]">
                                    <button
                                      onClick={() => {
                                        handleAddF(data.data.userId);
                                      }}
                                      className="text-[15px] font-medium "
                                    >
                                      Thêm bạn bè
                                    </button>
                                  </div>
                                ) : (
                                  <div className="loaderSe"></div>
                                )}
                              </>
                            ) : data.data.statusFriend === "Phản Hồi" ? (
                              <div className="flex ">
                                <>
                                  {loadSearch1 == false ? (
                                    <div className="ml-6 bg-[#456fe6] text-white px-4 py-2 rounded-[8px]">
                                      <button
                                        onClick={() => {
                                          handleAcceptF(data.data.userId);
                                        }}
                                        className="text-[15px] font-medium "
                                      >
                                        Chấp nhận
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="loaderSe"></div>
                                  )}
                                </>
                                <>
                                  {loadSearch2 == false ? (
                                    <div className="ml-6 bg-[#456fe6] text-white px-4 py-2 rounded-[8px]">
                                      <button
                                        onClick={() => {
                                          handleRemoveF(data.data.userId);
                                        }}
                                        className="text-[15px] font-medium "
                                      >
                                        Từ chối
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="loaderSe"></div>
                                  )}
                                </>
                              </div>
                            ) : data.data.statusFriend === "Hủy lời mời" ? (
                              <div className="ml-6 bg-[#456fe6] text-white px-4 py-2 rounded-[8px]">
                                {" "}
                                <button className="text-[15px] font-medium ">
                                  Chờ xác nhận
                                </button>
                              </div>
                            ) : (
                              <>
                                <label className="popup mb-0 ml-6 bg-[#456fe6] text-white px-4 py-3 rounded-[8px] min-w-[100px]">
                                  <input type="checkbox" />
                                  <div className="burger">
                                    <>
                                      {data.data.statusFriend ==
                                      "Bạn thường" ? (
                                        <>Bạn bè</>
                                      ) : (
                                        <>Bạn thân</>
                                      )}
                                    </>
                                  </div>
                                  <nav className="popup-window">
                                    <ul>
                                      <li>
                                        <button>
                                          <svg
                                            stroke-linejoin="round"
                                            stroke-linecap="round"
                                            stroke-width="2"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            height="14"
                                            width="14"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle
                                              r="4"
                                              cy="7"
                                              cx="9"
                                            ></circle>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                          </svg>
                                          <span>
                                            {" "}
                                            <span>
                                              {data.data.statusFriend ==
                                              "Bạn thường" ? (
                                                <div
                                                  onClick={() => {
                                                    handleUpLevelF(
                                                      data.data.userId
                                                    );
                                                  }}
                                                >
                                                  Bạn thân
                                                </div>
                                              ) : (
                                                <div
                                                  onClick={() => {
                                                    handleUpLevelF1(
                                                      data.data.userId
                                                    );
                                                  }}
                                                >
                                                  Bạn bè
                                                </div>
                                              )}
                                            </span>
                                          </span>
                                        </button>
                                      </li>

                                      <hr />
                                      <li onClick={() => setSb(true)}>
                                        <button>
                                          <svg
                                            stroke-linejoin="round"
                                            stroke-linecap="round"
                                            stroke-width="2"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            height="14"
                                            width="14"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <line
                                              y2="18"
                                              x2="6"
                                              y1="6"
                                              x1="18"
                                            ></line>
                                            <line
                                              y2="18"
                                              x2="18"
                                              y1="6"
                                              x1="6"
                                            ></line>
                                          </svg>
                                          <span>Delete</span>
                                        </button>
                                      </li>
                                    </ul>
                                  </nav>
                                </label>
                              </>
                            )}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 pt-4  w-full">
              {loadData == false ? (
                <div className="flex">
                  <Skeleton className="h-[150px] w-[280px] flex-1 text-center px-4 py-2 m-2" />
                  <Skeleton className="h-[150px] w-[280px] flex-1 text-center px-4 py-2 m-2" />
                  <Skeleton className="h-[150px] w-[280px] flex-1 text-center px-4 py-2 m-2" />
                </div>
              ) : (
                <>
                  {dataPost.data.map((item: Comment) => (
                    <div className="flex-1 text-center py-2 m-2 max-h-[200px]">
                      {item.images.length > 0 ? (
                        <>
                          {item.images.length !== 0 && (
                            <div className="cursor-pointer h-full rounded-md">
                              <img
                                className="h-full object-cover rounded-md"
                                style={{ width: "100%" }}
                                src={
                                  item.images && item.images.length > 0
                                    ? item.images[0].linkImage
                                    : "https://marketinghaiphong.com/wp-content/uploads/2019/06/content-975x523-1.png"
                                }
                                onClick={() => {
                                  navigate(`/post/${item.id}`);
                                }}
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="cursor-pointer h-full rounded-md">
                          <video
                            src={
                              item.videos && item.videos.length > 0
                                ? item.videos[0].link
                                : ""
                            }
                            className="h-full object-cover"
                            style={{ width: "100%" }}
                            onClick={() => {
                              navigate(`/post/${item.id}`);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <ListFriendPersonalRQ />
          {/* <!--post images--> */}
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
              Xác nhận hủy kết bạn
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
              Bạn có muốn chắc chắn hủy kết bạn?
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
                onClick={handleConfirm}
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
    </>
  );
};

export default PersonalFriend;
