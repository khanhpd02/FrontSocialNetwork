import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useChatContext } from "../../context/ChatContext";
import RightChat from "../../components/RightChat/RightChat";
import Logo from "../../assets/LogoLoad.png";
import { useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import SearChChat from "../../recoil/initState";
import { useRecoilState } from "recoil";
const Chat = () => {
  const currentUser = useSelector((state: RootState) => state.info.info);
  const navige = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<DocumentData | null>(null);
  const [err, setErr] = useState<boolean>(false);
  const [searChChatR, setSearChChatR] = useRecoilState(SearChChat);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("DisplayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };
  const handleSelect = async () => {
    if (!user) {
      return;
    }

    const combinedId =
      currentUser.data.firebaseData.uid > user.Uid
        ? currentUser.data.firebaseData.uid + user.Uid
        : user.Uid + currentUser.data.firebaseData.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(
          doc(db, "userChats", currentUser.data.firebaseData.uid),
          {
            [combinedId + ".userInfo"]: {
              uid: user.Uid,
              displayName: user.DisplayName,
              photoURL: user.PhotoUrl,
            },
            [combinedId + ".date"]: serverTimestamp(),
          }
        );

        await updateDoc(doc(db, "userChats", user.Uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.data.firebaseData.uid,
            displayName: currentUser.data.firebaseData.displayName,
            photoURL: currentUser.data.firebaseData.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setUser(null);
    setUsername("");
    setSearChChatR("false");
  };

  const [chats, setChats] = useState<any>([]);

  const { dispatch } = useChatContext();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser.data.firebaseData.uid),
        (doc) => {
          setChats(doc.data());
        }
      );

      return () => {
        unsub();
      };
    };

    currentUser.data.firebaseData.uid && getChats();
  }, [currentUser.data.firebaseData.uid]);

  const handleSelect1 = (u: any) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  const TransTime = (time: any) => {
    if (
      !time ||
      typeof time !== "object" ||
      !time.seconds ||
      !time.nanoseconds
    ) {
      return null; // hoặc trả về một giá trị mặc định khác nếu cần
    }

    const milliseconds = time.seconds * 1000 + time.nanoseconds / 1000000;
    const date = new Date(milliseconds);

    const today = new Date(); // Ngày hiện tại
    const diffTime = Math.abs(today.getTime() - date.getTime()); // Độ chênh lệch thời gian

    // Nếu time là trong cùng một ngày
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    // Nếu time chưa tới quá 7 ngày so với ngày hiện tại
    if (diffTime < 7 * 24 * 60 * 60 * 1000) {
      const diffDays = Math.ceil(diffTime / (24 * 60 * 60 * 1000)); // Số ngày chênh lệch
      return `${diffDays} ngày trước`;
    }

    // Nếu time cách hơn 7 ngày so với ngày hiện tại
    const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000)); // Số tuần chênh lệch
    return `${diffWeeks} tuần trước`;
  };

  return (
    <div className="top-[60px] w-full flex antialiased text-gray-200 bg-white overflow-hidden relative border-t">
      <div className="flex-1 flex flex-col">
        <main className="flex-grow flex flex-row min-h-0">
          <section className="flex flex-col flex-none overflow-auto w-24 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
            <div className="header p-4 flex flex-row justify-between items-center flex-none">
              <div
                className="w-20 h-16 relative flex cursor-pointer  justify-center items-center"
                onClick={() => navige("/")}
              >
                <img
                  className="rounded-full w-[200%] h-full object-cover mt-2"
                  alt="ravisankarchinnam"
                  src={Logo}
                />
              </div>
              <p className="text-md font-bold hidden md:block group-hover:block text-[#456fe6] ">
                Messenger
              </p>
              <span
                onClick={() => {
                  setSearChChatR("true");
                }}
                className="block rounded-full   w-10 h-10 p-2 text-[#456fe6] cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                  <path d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z" />
                </svg>
              </span>
            </div>

            <div className="contacts p-2 flex-1 overflow-y-scroll">
              {Object.entries(chats)
                ?.sort((a: any, b: any) => b[1].date - a[1].date)
                .map((chat: any) => {
                  if (
                    chat[1].userInfo &&
                    chat[1].userInfo.displayName &&
                    chat[1].userInfo.photoURL
                  ) {
                    return (
                      <div
                        className="flex justify-between items-center p-3 hover:bg-[#f2f2f2] rounded-lg relative cursor-pointer"
                        key={chat[0]}
                        onClick={() => handleSelect1(chat[1].userInfo)}
                      >
                        <div className="w-12 h-12 relative flex flex-shrink-0">
                          <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src={chat[1].userInfo.photoURL}
                            alt=""
                          />
                        </div>
                        <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block text-left text-black text-[14px]">
                          <p>{chat[1].userInfo.displayName}</p>
                          <div className="flex items-center text-[12px] text-gray-500">
                            <div className="min-w-0">
                              {chat[1].lastMessage?.text === undefined ? (
                                <p className="truncate">Tin nhắn mới</p>
                              ) : (
                                <p className="truncate">
                                  {chat[1].lastMessage?.text}
                                </p>
                              )}
                            </div>
                            <span aria-hidden="true" className="mx-1">
                              {" "}
                              ·{" "}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate">
                                {/* {chat[1].lastMessage?.text} */}

                                <p className="truncate">
                                  {TransTime(chat[1].date)}
                                </p>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return null; // or render a placeholder if necessary
                  }
                })}
            </div>
          </section>
          <RightChat />
        </main>
      </div>
      {searChChatR === "true" && (
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
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "10px 0px 25px 0px",
              borderRadius: "8px",
              textAlign: "center",
              width: "40%",
              marginTop: "80px",
            }}
          >
            <div className="relative rounded-t-[10px] w-full h-[50px] border-solid border-b-[1px] border-[#f0f2f5] bg-white flex justify-center items-center text-black">
              <div className=" ">
                <span className="font-[600] text-[16px] ">Tin nhắn mới</span>
              </div>
              <div className="absolute " style={{ top: 3, right: 10 }}>
                <div className="text-[25px] p-2 cursor-pointer hover:bg-[#f2f2f2] rounded-[50%] duration-500">
                  <MdOutlineCancel
                    size={20}
                    className="cursor-pointer"
                    onClick={() => {
                      setSearChChatR("false");
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Nội dung form đặt lịch */}
            <div className="flex items-center">
              <label className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <span className="text-black">To:</span>
                </div>
                <input
                  type="text"
                  className=" border border-gray-300 text-gray-900 text-sm  block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-[#ff6d45] outline-none"
                  placeholder="Search Users..."
                  required
                  value={username}
                  onKeyDown={handleKey}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 end-0 flex items-center pe-3"
                >
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="contacts p-2 flex-1 overflow-y-scroll">
              {err && <span>User not found!</span>}

              {user && (
                <div
                  className="flex justify-between items-center p-3 hover:bg-[#f2f2f2] rounded-lg relative cursor-pointer"
                  onClick={handleSelect}
                >
                  <div className="w-12 h-12 relative flex flex-shrink-0">
                    <img
                      className="shadow-md rounded-full w-full h-full object-cover"
                      src={user.PhotoUrl}
                      alt=""
                    />
                  </div>
                  <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block  text-left text-[12px] text-black">
                    <p>{user.DisplayName}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
