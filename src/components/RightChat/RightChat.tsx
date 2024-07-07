import { useEffect, useRef, useState } from "react";
import { useChatContext } from "../../context/ChatContext";
import BodyRightChat from "./BodyRightChat";
import FooterRightChat from "./FooterRightChat";
import { useRecoilValue } from "recoil";
import { api, setAuthToken } from "../../utils/setAuthToken";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZIM } from "zego-zim-web";
import { tokenState } from "../../recoil/initState";
import ChatScreen from "./ChatScreen";
import { useNavigate } from "react-router-dom";
const RightChat = () => {
  const { data } = useChatContext();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [usersID, setUserID] = useState("");
  const [username, setUserName] = useState("");
  const [name2, setName2] = useState("");
  const [username2, setUserName2] = useState("");
  const token = useRecoilValue(tokenState);
  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);
      try {
        const fullName = data.user?.displayName;
        const responseInfo = await api.get(
          "https://truongnetwwork.bsite.net/api/infor/searchuser",
          {
            params: { fullname: fullName },
          }
        );
        setUserID(responseInfo.data.data?.[0]?.userId);
        setName(responseInfo.data.data?.[0]?.userId.slice(0, 10));
        setUserName(responseInfo.data.data?.[0]?.fullName);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };
    const fetchData1 = async () => {
      setAuthToken(token);
      // setUserName(data.user.displayName);
      // setName(updateUserName(data.user.uid));
      try {
        const responseInfo = await api.get(
          "https://truongnetwwork.bsite.net/api/infor/myinfor"
        );
        setName2(responseInfo.data.data.userId.slice(0, 10));
        setUserName2(responseInfo.data.data.fullName);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };

    const initChat = async () => {
      await fetchData();
      await fetchData1();
      await init();
    };

    initChat();
  }, [data.chatId]);
  useEffect(() => {
    if (name && name2) {
      init();
    }
  }, [name, name2]);
  ///

  const removeVietnameseDiacritics = (str: string): string => {
    const diacriticsMap: { [key: string]: string } = {
      á: "a",
      à: "a",
      ả: "a",
      ã: "a",
      ạ: "a",
      ă: "a",
      ắ: "a",
      ằ: "a",
      ẳ: "a",
      ẵ: "a",
      ặ: "a",
      â: "a",
      ấ: "a",
      ầ: "a",
      ẩ: "a",
      ẫ: "a",
      ậ: "a",
      đ: "d",
      é: "e",
      è: "e",
      ẻ: "e",
      ẽ: "e",
      ẹ: "e",
      ê: "e",
      ế: "e",
      ề: "e",
      ể: "e",
      ễ: "e",
      ệ: "e",
      í: "i",
      ì: "i",
      ỉ: "i",
      ĩ: "i",
      ị: "i",
      ó: "o",
      ò: "o",
      ỏ: "o",
      õ: "o",
      ọ: "o",
      ô: "o",
      ố: "o",
      ồ: "o",
      ổ: "o",
      ỗ: "o",
      ộ: "o",
      ơ: "o",
      ớ: "o",
      ờ: "o",
      ở: "o",
      ỡ: "o",
      ợ: "o",
      ú: "u",
      ù: "u",
      ủ: "u",
      ũ: "u",
      ụ: "u",
      ư: "u",
      ứ: "u",
      ừ: "u",
      ử: "u",
      ữ: "u",
      ự: "u",
      ý: "y",
      ỳ: "y",
      ỷ: "y",
      ỹ: "y",
      ỵ: "y",
    };

    return str.replace(
      /[^A-Za-z0-9]/g,
      (char: string) => diacriticsMap[char] || char
    );
  };

  const removeSpaces = (str: string) => {
    return str.replace(/\s+/g, "");
  };
  // const [calleeId, setCalleeId] = useState(name);
  const zeroCloudInstance = useRef<ZegoUIKitPrebuilt | null>(null);
  async function init() {
    const userName = removeSpaces(removeVietnameseDiacritics(username2));
    const userId =
      removeSpaces(removeVietnameseDiacritics(username2)).slice(1, 5) +
      "_" +
      name;

    const appID = 2143691367; // fill your appID here
    const serverSecret = "9864561fa146539fe74aebc33693f11e";
    const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      "cong",
      userId,
      userName
    );

    zeroCloudInstance.current = ZegoUIKitPrebuilt.create(KitToken);

    // add plugin
    if (zeroCloudInstance.current) {
      zeroCloudInstance.current.addPlugins({ ZIM });
    } else {
      console.error("zeroCloudInstance.current is null or undefined");
    }
  }

  const handleSend = (callType: any) => {
    const callee =
      removeSpaces(removeVietnameseDiacritics(username)).slice(1, 5) +
      "_" +
      name2;
    const usercallee = removeSpaces(removeVietnameseDiacritics(username));

    if (!callee) {
      alert("userID cannot be empty!!");
      return;
    }
    // send call invitation
    if (zeroCloudInstance.current) {
      zeroCloudInstance.current
        .sendCallInvitation({
          callees: [{ userID: callee, userName: usercallee }],
          callType: callType,
          timeout: 60,
        })
        .then((res) => {
          if (res.errorInvitees.length) {
            alert("The user dose not exist or is offline.");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // Handle the case when zeroCloudInstance.current is null
      console.error("zeroCloudInstance.current is null");
    }
  };

  return (
    <>
      {data.chatId === "null" ? (
        <ChatScreen />
      ) : (
        <section className="flex flex-col flex-auto border-l  ">
          <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center border-b">
            <div
              className="flex justify-center items-center"
              onClick={() => {
                navigate(`/personal-user/${usersID}`);
              }}
            >
              <div className="w-12 h-12 mr-4 relative flex justify-center items-center">
                <img
                  className=" rounded-full w-full h-full object-cover"
                  src={data.user?.photoURL}
                  alt=""
                />
              </div>
              <div className="text-sm">
                <p className="font-[600] text-black">
                  {data.user?.displayName}
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="block rounded-full  w-10 h-10 p-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="phone"
                >
                  <path
                    fill="#6563FF"
                    d="M19.44,13c-.22,0-.45-.07-.67-.12a9.44,9.44,0,0,1-1.31-.39,2,2,0,0,0-2.48,1l-.22.45a12.18,12.18,0,0,1-2.66-2,12.18,12.18,0,0,1-2-2.66L10.52,9a2,2,0,0,0,1-2.48,10.33,10.33,0,0,1-.39-1.31c-.05-.22-.09-.45-.12-.68a3,3,0,0,0-3-2.49h-3a3,3,0,0,0-3,3.41A19,19,0,0,0,18.53,21.91l.38,0a3,3,0,0,0,2-.76,3,3,0,0,0,1-2.25v-3A3,3,0,0,0,19.44,13Zm.5,6a1,1,0,0,1-.34.75,1.05,1.05,0,0,1-.82.25A17,17,0,0,1,4.07,5.22a1.09,1.09,0,0,1,.25-.82,1,1,0,0,1,.75-.34h3a1,1,0,0,1,1,.79q.06.41.15.81a11.12,11.12,0,0,0,.46,1.55l-1.4.65a1,1,0,0,0-.49,1.33,14.49,14.49,0,0,0,7,7,1,1,0,0,0,.76,0,1,1,0,0,0,.57-.52l.62-1.4a13.69,13.69,0,0,0,1.58.46q.4.09.81.15a1,1,0,0,1,.79,1Z"
                  ></path>
                </svg>
              </div>
              <div
                onClick={() => {
                  handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall);
                }}
                className="block rounded-full  w-10 h-10 p-2 ml-4 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="video"
                >
                  <path
                    fill="#6563FF"
                    d="M21.53,7.15a1,1,0,0,0-1,0L17,8.89A3,3,0,0,0,14,6H5A3,3,0,0,0,2,9v6a3,3,0,0,0,3,3h9a3,3,0,0,0,3-2.89l3.56,1.78A1,1,0,0,0,21,17a1,1,0,0,0,.53-.15A1,1,0,0,0,22,16V8A1,1,0,0,0,21.53,7.15ZM15,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8h9a1,1,0,0,1,1,1Zm5-.62-3-1.5V11.12l3-1.5Z"
                  ></path>
                </svg>
              </div>
              <div className="block rounded-full  w-10 h-10 p-2 ml-4 cursor-pointer">
                <svg
                  id="info-circle"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#456FE6"
                    d="M12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Zm0-8.5a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0v-3A1,1,0,0,0,12,11.5Zm0-4a1.25,1.25,0,1,0,1.25,1.25A1.25,1.25,0,0,0,12,7.5Z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <BodyRightChat />
          <FooterRightChat />
        </section>
      )}
    </>
  );
};

export default RightChat;
