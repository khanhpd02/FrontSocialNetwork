import React, { useEffect, memo, ReactNode } from "react";
import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import HeaderTop from "../components/Header/HeaderTop";
import TopLoader from "../components/TopLoader";
// import { api, setAuthToken } from "../utils/setAuthToken";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { ZIM } from "zego-zim-web";
// import { CallR } from "../recoil/initState";
// import { useRecoilState } from "recoil";
interface IProps {
  children: ReactNode;
}
const Public: React.FC<IProps> = ({ children }) => {
  const history = useNavigate();
  // const { setUser } = ChatState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token === null) {
      // Kiểm tra nếu hasInfor không tồn tại hoặc có giá trị rỗng
      history("/login");
    }
  }, [token]);
  useEffect(() => {
    const hasInfor = localStorage.getItem("hasInfor");
    if (hasInfor == "false") {
      // Kiểm tra nếu hasInfor không tồn tại hoặc có giá trị rỗng
      history("/add-info");
    }
  }, []);
  // const [username2, setUserName2] = useState("");
  // const [name2, setName2] = useState("");
  // const [call, setCall] = useRecoilState(CallR);
  // const fetchData1 = async () => {
  //   setAuthToken(token);
  //   // setUserName(data.user.displayName);
  //   // setName(updateUserName(data.user.uid));
  //   try {
  //     const responseInfo = await api.get(
  //       "https://truongnetwwork.bsite.net/api/infor/myinfor"
  //     );
  //     setName2(responseInfo.data.data.userId.slice(0, 10));
  //     setUserName2(responseInfo.data.data.fullName);
  //     console.log(name2, username2);
  //   } catch (error) {
  //     console.error("Get post failed", error);
  //   }
  // };

  // const removeVietnameseDiacritics = (str: string): string => {
  //   console.log(str);
  //   const diacriticsMap: { [key: string]: string } = {
  //     á: "a",
  //     à: "a",
  //     ả: "a",
  //     ã: "a",
  //     ạ: "a",
  //     ă: "a",
  //     ắ: "a",
  //     ằ: "a",
  //     ẳ: "a",
  //     ẵ: "a",
  //     ặ: "a",
  //     â: "a",
  //     ấ: "a",
  //     ầ: "a",
  //     ẩ: "a",
  //     ẫ: "a",
  //     ậ: "a",
  //     đ: "d",
  //     é: "e",
  //     è: "e",
  //     ẻ: "e",
  //     ẽ: "e",
  //     ẹ: "e",
  //     ê: "e",
  //     ế: "e",
  //     ề: "e",
  //     ể: "e",
  //     ễ: "e",
  //     ệ: "e",
  //     í: "i",
  //     ì: "i",
  //     ỉ: "i",
  //     ĩ: "i",
  //     ị: "i",
  //     ó: "o",
  //     ò: "o",
  //     ỏ: "o",
  //     õ: "o",
  //     ọ: "o",
  //     ô: "o",
  //     ố: "o",
  //     ồ: "o",
  //     ổ: "o",
  //     ỗ: "o",
  //     ộ: "o",
  //     ơ: "o",
  //     ớ: "o",
  //     ờ: "o",
  //     ở: "o",
  //     ỡ: "o",
  //     ợ: "o",
  //     ú: "u",
  //     ù: "u",
  //     ủ: "u",
  //     ũ: "u",
  //     ụ: "u",
  //     ư: "u",
  //     ứ: "u",
  //     ừ: "u",
  //     ử: "u",
  //     ữ: "u",
  //     ự: "u",
  //     ý: "y",
  //     ỳ: "y",
  //     ỷ: "y",
  //     ỹ: "y",
  //     ỵ: "y",
  //   };

  //   return str.replace(
  //     /[^A-Za-z0-9]/g,
  //     (char: string) => diacriticsMap[char] || char
  //   );
  // };

  // const removeSpaces = (str: string) => {
  //   return str.replace(/\s+/g, "");
  // };
  // const zeroCloudInstance = useRef<ZegoUIKitPrebuilt | null>(null);
  // async function init() {
  //   const userName = removeSpaces(removeVietnameseDiacritics(username2));
  //   const userId =
  //     removeSpaces(removeVietnameseDiacritics(username2)).slice(1, 5) +
  //     "_" +
  //     name;

  //   const appID = 2143691367; // fill your appID here
  //   const serverSecret = "9864561fa146539fe74aebc33693f11e"; // fill your serverSecret here
  //   console.log("ban dau", userId, userName);
  //   const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
  //     appID,
  //     serverSecret,
  //     "cong",
  //     userId,
  //     userName
  //   );

  //   zeroCloudInstance.current = ZegoUIKitPrebuilt.create(KitToken);
  //   setCall(ZegoUIKitPrebuilt.create(KitToken));
  //   console.log(zeroCloudInstance.current);
  //   // add plugin
  //   if (zeroCloudInstance.current) {
  //     zeroCloudInstance.current.addPlugins({ ZIM });
  //   } else {
  //     console.error("zeroCloudInstance.current is null or undefined");
  //   }
  // }
  // useEffect(() => {
  //   fetchData1();
  // }, [token]);
  // useEffect(() => {
  //   if (name2) {
  //     // init();
  //   }
  // }, [name2]);
  return (
    <div
      className="flex h-[100%]"
      style={{
        background: "#f0f2f5",
        display: "flex",
      }}
    >
      <HeaderTop />
      <TopLoader />
      <Header />
      <>{children}</>
    </div>
  );
};

export default memo(Public);
