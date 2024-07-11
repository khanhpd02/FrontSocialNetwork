import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Button, Dropdown, Menu } from "antd";
import Picker from "@emoji-mart/react";
import { api } from "../../utils/setAuthToken";
import { useRecoilState } from "recoil";
import { ShareS, isSharePost1 } from "../../recoil/initState";
import toast from "react-hot-toast";

interface Props {
  PostId: string;
}

interface MenuItem {
  key: string;
  label: string;
}

const ShareLayout = ({ PostId }: Props) => {
  const { info } = useSelector((state: RootState) => state.info);
  const [, setLoadShare] = useRecoilState(ShareS);
  const [, setIsSharePost1R] = useRecoilState(isSharePost1);
  const [toggleEmj, setToggleEmj] = useState(true);
  const [Content, setContent] = useState("");

  const items: MenuItem[] = [
    {
      key: "1",
      label: "Công khai",
    },
    {
      key: "2",
      label: "Bạn bè",
    },
  ];

  const [selectedItem, setSelectedItem] = useState<MenuItem>(items[0]);

  const handleBlur = () => {
    setToggleEmj(!toggleEmj);
  };

  const handleMenuClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const addEmoji = (e: any) => {
    const sym = e.unified.split("-");
    const codesArray: number[] = [];
    sym.forEach((el: string) => {
      const code = parseInt(el, 16); // Parse the hexadecimal string to a number
      codesArray.push(code);
    });
    const emoji = String.fromCodePoint(...codesArray);
    setContent(Content + emoji);
  };

  const handleVoiceClick = () => {
    const recognition = new ((window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition)();
    recognition.interimResults = true;

    recognition.addEventListener("result", (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join("");
      setContent(Content + transcript);
    });

    recognition.start();
  };

  const handleShare = async () => {
    try {
      await api
        .post(
          "https://truongnetwwork.bsite.net/api/post/share",
          {
            PostId: PostId,
            LevelView: selectedItem.key,
            content: Content,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            toast.success("Chia sẻ bài Post thành công!");
            setIsSharePost1R(false);
            setLoadShare("0");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(158, 158, 158, 0.5)",
        width: "100%",
        height: "100%",
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="flex-col"
    >
      <div className="opacity-100 relative rounded-t-[10px] w-[500px] h-[50px] border-solid border-b-[1px] border-[#f0f2f5] bg-white flex justify-center items-center">
        <div className=" ">
          <span className="font-bold text-[20px]">Chia sẻ</span>
        </div>
        <div className="absolute " style={{ top: 3, right: 10 }}>
          <div
            className="text-[25px] p-2 cursor-pointer hover:bg-[#f2f2f2] rounded-[50%] duration-500"
            onClick={() => setLoadShare("0")}
          >
            <IoMdClose />
          </div>
        </div>
      </div>
      <div className="relative w-[500px] h-auto border-solid border-[#f0f2f5] bg-white flex rounded-b-[10px] pb-6">
        <div className="w-full">
          <div className="flex pt-4 px-4">
            <img
              src={info.data.image}
              alt="avatar"
              className="h-[50px] w-[50px] rounded-[50%]"
            />
            <div className="ml-4 text-left">
              <span className="text-[16px] font-[600] ">
                {info.data.fullName}
              </span>
              <div className="flex justify-start items-center">
                <Dropdown
                  overlay={
                    <Menu>
                      {items.map((item) => (
                        <Menu.Item
                          key={item.key}
                          onClick={() => handleMenuClick(item)}
                        >
                          {item.label}
                        </Menu.Item>
                      ))}
                    </Menu>
                  }
                  placement="bottomLeft"
                  arrow={{ pointAtCenter: true }}
                >
                  <Button>
                    {selectedItem ? selectedItem.label : items[0].label}
                  </Button>
                </Dropdown>
              </div>
            </div>
          </div>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              placeholder="Your comment .... "
              name="text"
              onChange={(e) => setContent(e.target.value)}
              value={Content}
              className="inputCmt2"
              style={{ whiteSpace: "pre-wrap", minHeight: "50px" }}
            />
            <div className="iconCmt1">
              <div
                onClick={() => setToggleEmj(!toggleEmj)}
                onBlur={handleBlur}
                className="cursor-pointer mr-1 bg-white p-2 rounded-[50%] hover:bg-[#456fe6] hover:text-white duration-500"
              >
                <BsEmojiSmile />
              </div>
              <div
                className="cursor-pointer mr-1 bg-white p-2 rounded-[50%] hover:bg-[#456fe6] hover:text-white duration-500"
                onClick={handleVoiceClick}
              >
                <HiOutlineMicrophone />
              </div>
            </div>
          </div>
          <div className="flex justify-end px-4">
            <div className="ml-6 bg-[#456fe6] text-white px-2 py-1 rounded-[8px] w-[30%]">
              <button className="text-[15px] font-medium" onClick={handleShare}>
                Chia sẻ ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full"
        style={{
          display: toggleEmj ? "none" : "block",
          position: "fixed",
          right: 0,
          top: 0,
        }}
      >
        <div className="emoji">
          <Picker onEmojiSelect={addEmoji} />
        </div>
      </div>
    </div>
  );
};

export default ShareLayout;
