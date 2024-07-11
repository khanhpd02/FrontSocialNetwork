import { PiWechatLogoLight } from "react-icons/pi";
import { SearChChat } from "../../recoil/initState";
import { useRecoilState } from "recoil";
const ChatScreen = () => {
  const [searChChatR, setSearChChatR] = useRecoilState(SearChChat);
  const hanldeSearch = () => {
    console.log(searChChatR ? "true" : "false");

    setSearChChatR("true");
  };
  return (
    <div className="w-[80%] h-[91vh] bg-white flex justify-center items-center">
      <div className="h-auto w-[30%] text-center ">
        <div className="mx-auto my-auto text-[150px] w-[50%] rounded-[50%] text-black border-solid p-7 flex justify-center items-center">
          <PiWechatLogoLight />
        </div>
        <h1 className="text-[20px] my-3 text-black"> Tin nhắn riêng của bạn</h1>
        <p className="text-[#939393] my-3">
          Gửi ảnh và tin nhắn riêng tư cho bạn bè hoặc nhóm
        </p>
        <button
          className="bg-[#1877f2] text-white py-2 px-5 rounded-xl"
          onClick={hanldeSearch}
        >
          Gửi tin nhắn
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
