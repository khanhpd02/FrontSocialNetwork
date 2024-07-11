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

import { useNavigate } from "react-router-dom";
import SearChChat, { isChatR } from "../../recoil/initState";
import { useRecoilState } from "recoil";
import BodyChatHome from "./BodyChatHome";
import { FiSearch } from "react-icons/fi";

const ChatHome = () => {
  const currentUser = useSelector((state: RootState) => state.info.info);
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<DocumentData | null>(null);
  const [err, setErr] = useState<boolean>(false);
  const [, setSearChChatR] = useRecoilState(SearChChat);
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
      setIsModeChat(false);
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

  // const handleSelect = async () => {
  //   const combinedId =
  //     currentUser.data.firebaseData.uid > user.Uid
  //       ? currentUser.data.firebaseData.uid + user.Uid
  //       : user.Uid + currentUser.data.firebaseData.uid;
  //   try {
  //     const res = await getDoc(doc(db, "chats", combinedId));

  //     if (!res.exists()) {
  //       console.log(123);
  //       await setDoc(doc(db, "chats", combinedId), { messages: [] });
  //       console.log(user);
  //       await updateDoc(
  //         doc(db, "userChats", currentUser.data.firebaseData.uid),
  //         {
  //           [combinedId + ".userInfo"]: {
  //             uid: user.Uid,
  //             displayName: user.DisplayName,
  //             photoURL: user.PhotoUrl,
  //           },
  //           [combinedId + ".date"]: serverTimestamp(),
  //         }
  //       );
  //       console.log(
  //         user.Uid,
  //         currentUser.data.firebaseData.uid,
  //         currentUser.data.firebaseData.photoURL
  //       );
  //       await updateDoc(doc(db, "userChats", user.Uid), {
  //         [combinedId + ".userInfo"]: {
  //           uid: currentUser.data.firebaseData.uid,
  //           displayName: currentUser.data.firebaseData.displayName,
  //           photoURL: currentUser.data.firebaseData.photoURL,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });
  //       console.log(456);
  //     }
  //   } catch (error) {
  //     console.log("Loi r");
  //   }

  //   setUser(null);
  //   setUsername("");
  //   setSearChChatR("false");
  // };
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
  const [isChat1, setIsChat1] = useRecoilState(isChatR);
  const handleSelect1 = (u: any) => {
    setIsChat1(false);
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
  const [isModeChat, setIsModeChat] = useState(true);
  const handleSearchUser = (e: any) => {
    setUsername(e.target.value);
  };
  return (
    <div className="py-2">
      <div className="bg-white w-[100%] rounded-[10px] px-2 ">
        <div className="flex justify-between items-center">
          <p className="font-[600] text-[16px]">Message</p>
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
        <div className="InputContaiInputContainerUserner flex mt-2">
          <div className="h-[40px] w-[40px] flex justify-center items-center bg-[#f0f2f5] rounded-l-[30px]">
            <FiSearch className=" transform -translate-y-1/2 text-gray-500 mt-4" />
          </div>
          <input
            placeholder="Search.."
            id="input"
            className="inputSearchUser bg-[#f0f2f5] rounded-r-[30px]"
            name="text"
            type="text"
            required
            value={username}
            onKeyDown={handleKey}
            onChange={handleSearchUser}
          />
        </div>
        <div className="w-full flex justify-center items-center mt-2">
          <div className="px-6 w-[50%] cursor-pointer">
            {" "}
            <div
              className={`w-[100%] font-[600] text-[#6d6d6e]  ${
                isModeChat == true
                  ? "border-b-[3px] border-solid border-[#6d6d6e]"
                  : ""
              }`}
              onClick={() => setIsModeChat(true)}
            >
              Chat
            </div>
          </div>
          <div className="px-6 w-[50%] cursor-pointer">
            {" "}
            <div
              className={`w-[100%] font-[600] text-[#6d6d6e]  ${
                isModeChat == false
                  ? "border-b-[3px] border-solid border-[#6d6d6e]"
                  : ""
              }`}
              onClick={() => setIsModeChat(false)}
            >
              User
            </div>
          </div>
        </div>
        {isModeChat === true ? (
          <div className="contacts py-2 flex-1">
            {chats &&
              Object.entries(chats)
                ?.sort((a: any, b: any) => b[1].date - a[1].date)
                .map((chat: any) => {
                  if (
                    chat[1].userInfo &&
                    chat[1].userInfo.displayName &&
                    chat[1].userInfo.photoURL
                  ) {
                    return (
                      <div
                        className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg relative cursor-pointer bg-white"
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
            {isChat1 == false ? <BodyChatHome /> : <></>}
          </div>
        ) : (
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
        )}
        <div
          className="w-full pb-2 cursor-pointer hover:underline duration-700"
          onClick={() => navigate("/chat")}
        >
          <p className="font-[400] pb-1">View all chats</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHome;
