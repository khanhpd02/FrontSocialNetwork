import { useCallback, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Button, Dropdown, Menu } from "antd";
import Picker from "@emoji-mart/react";
import { api } from "../../utils/setAuthToken";
import { useRecoilState } from "recoil";
import { ShareS, isSharePost } from "../../recoil/initState";
import { useDropzone } from "react-dropzone";

interface UploadedFile {
  file: File;
  preview: string;
}
interface Props {
  data: any;
}
interface MenuItem {
  key: string;
  label: string;
}
const EditPost = ({ data }: Props) => {
  const { info } = useSelector((state: RootState) => state.info);
  const [lengthAI, setLengthAI] = useState(data.images.length);
  const [lengthVideo, setLengthVideo] = useState(data.videos.length);
  const [stringArray, setStringArray] = useState([""]);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [hiddenIdsV, setHiddenIdsV] = useState<string[]>([]);
  const handleDeleteImage = (id: string) => {
    setLengthAI(lengthAI - 1);
    // Kiểm tra nếu chuỗi đầu tiên là rỗng thì thêm một phần tử mới vào mảng
    if (stringArray.length === 1 && stringArray[0] === "") {
      setStringArray([id]);
    } else {
      const newArray = [...stringArray];
      newArray.push(id);
      setStringArray(newArray);
    }
    // Thêm id vào mảng hiddenIds
    setHiddenIds([...hiddenIds, id]);
  };
  const handleDeleteVideo = (id: string) => {
    setLengthVideo(lengthVideo - 1);
    // Kiểm tra nếu chuỗi đầu tiên là rỗng thì thêm một phần tử mới vào mảng
    if (stringArray.length === 1 && stringArray[0] === "") {
      setStringArray([id]);
    } else {
      const newArray = [...stringArray];
      newArray.push(id);
      setStringArray(newArray);
    }
    // Thêm id vào mảng hiddenIds
    setHiddenIdsV([...hiddenIdsV, id]);
  };
  const [, setLoadShare] = useRecoilState(ShareS);
  const [toggleEmj, setToggleEmj] = useState(true);
  const [load, setLoad] = useState(true);
  const [Content, setContent] = useState(data.content);
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
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPreview = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploadedFiles((prevState) => [...prevState, ...filesWithPreview]);
  }, []);
  const removeImage = (indexToRemove: number) => {
    setUploadedFiles((prevState) =>
      prevState.filter((_, index) => index !== indexToRemove)
    );
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
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
  const handleMenuClick = (item: MenuItem) => {
    setSelectedItem(item);
  };
  const handleBlur = () => {
    setToggleEmj(!toggleEmj);
  };

  const [, setIsSharePost] = useRecoilState(isSharePost);
  const handlePost = async () => {
    setLoad(false);
    try {
      const formData = new FormData();
      formData.append("content", Content);
      formData.append("LevelView", selectedItem?.key);
      formData.append("postId", data.id);

      if (stringArray) {
        stringArray.map((item, index) => {
          formData.append(`ListImageDeleteId[${index}]`, item);
        });
      }
      if (stringArray) {
        stringArray.map((item, index) => {
          formData.append(`ListVideoDeleteId[${index}]`, item);
        });
      }
      if (uploadedFiles) {
        uploadedFiles.map((_: any, index: number) => {
          formData.append("File", uploadedFiles[index]?.file);
        });
      }
      await api
        .put(`https://truongnetwwork.bsite.net/api/post`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Cập nhật dữ liệu vào state
          setIsSharePost(false);
          setLoad(true);
          setLoadShare("0");

          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Add sai!", error);
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
        transition: "width 0.3s ease, height 0.3s ease",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="flex-col"
    >
      <div className="opacity-100 relative rounded-t-[10px] w-[500px] h-[50px] border-solid border-b-[1px] border-[#f0f2f5] bg-white flex justify-center items-center">
        <div className=" ">
          <span className="font-bold text-[20px]">Chỉnh sửa bài viết</span>
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
      <div className="relative  w-[500px] h-[550px] overflow-y-auto border-solid  border-[#f0f2f5] bg-white flex  rounded-b-[10px] pb-6">
        <div className=" w-full">
          <div className="flex pt-4 px-4">
            <img
              src={info.data.image}
              alt="avatar"
              className="h-[50px] w-[50px] rounded-[50%]"
            />
            <div className=" ml-4 text-left">
              <span className="text-[16px] font-[600] ">
                {info.data.fullName}
              </span>
              <div className="flex justify-start items-center ">
                <Dropdown
                  overlay={
                    <Menu>
                      {items.map((item: any) => (
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
                    {selectedItem ? selectedItem.label : items[0]?.label}
                  </Button>
                </Dropdown>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",

              paddingRight: "80px",
            }}
          >
            <input
              placeholder="Your comment .... "
              name="text"
              onChange={(e) => setContent(e.target.value)}
              value={Content}
              className="inputCmt2 "
              //   onKeyDown={handleKey}
              style={{ whiteSpace: "pre-wrap", minHeight: "50px" }}
            />
            <div className="iconCmt2">
              {" "}
              <div
                onClick={() => setToggleEmj(!toggleEmj)}
                onBlur={handleBlur}
                className="cursor-pointer mr-1 bg-white p-2 rounded-[50%] hover:bg-[#456fe6] hover:text-white duration-500"
              >
                {" "}
                <BsEmojiSmile />
              </div>
              <div
                className="cursor-pointer mr-1 bg-white p-2 rounded-[50%] hover:bg-[#456fe6] hover:text-white duration-500"
                onClick={handleVoiceClick}
              >
                <HiOutlineMicrophone />{" "}
              </div>
            </div>
          </div>
          <>
            {load == false ? (
              <div className="w-full h-[320px] flex justify-center items-center">
                {" "}
                <div className="loader2"></div>
              </div>
            ) : (
              <div className="px-4" style={{ textAlign: "left" }}>
                <label className="text-[#456fe6] font-medium">Image Post</label>
                {lengthAI <= 0 &&
                  uploadedFiles.length <= 0 &&
                  lengthVideo <= 0 && (
                    <label
                      htmlFor="file"
                      className="custum-file-upload w-[100%]  h-[300px]"
                      {...getRootProps()}
                    >
                      <div className="icon">
                        <svg
                          viewBox="0 0 24 24"
                          fill=""
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                              fill=""
                            ></path>{" "}
                          </g>
                        </svg>
                      </div>
                      <div className="text">
                        <span>Click to upload image</span>
                      </div>
                      <input {...getInputProps()} />
                    </label>
                  )}
                {(lengthAI > 0 ||
                  uploadedFiles.length > 0 ||
                  lengthVideo > 0) && (
                  <div>
                    <label
                      htmlFor="file"
                      className="custum-file-upload w-[100%]  h-[auto] min-h-[300px] grid grid-cols-2 "
                    >
                      {uploadedFiles.map((uploadedFile, index) => (
                        <div key={index} className="relative w-[fit-content]">
                          {/* <img
                            src={uploadedFile.preview}
                            alt="Uploaded Image"
                            className="max-w-[200px] max-h-[200px] rounded-[10px] cursor-pointer"
                            {...getRootProps()}
                          /> */}
                          {uploadedFiles[index]?.file.type === "video/mp4" ? (
                            <video
                              src={uploadedFile.preview}
                              className="max-w-[200px] max-h-[200px] rounded-[10px] cursor-pointer"
                              {...getRootProps()}
                            />
                          ) : (
                            <img
                              src={uploadedFile.preview}
                              alt="Uploaded Image"
                              className="max-w-[200px] max-h-[200px] rounded-[10px] cursor-pointer"
                              {...getRootProps()}
                            />
                          )}
                          <button
                            className="absolute top-[-10px] right-[-10px] p-2  rounded-full bg-gray-300 transition duration-300"
                            onClick={() => removeImage(index)}
                          >
                            <IoMdClose />
                          </button>
                          {/* {uploadedFile.file.name} */}
                        </div>
                      ))}

                      {data.images.map((_: any, index: number) => (
                        <div className="relative  w-[fit-content]" key={index}>
                          {hiddenIds.includes(data.images[index].id) ? (
                            <></>
                          ) : (
                            <>
                              <img
                                src={data.images[index].linkImage}
                                alt="Uploaded Image"
                                className=" max-h-[200px] rounded-[10px] cursor-pointer "
                                {...getRootProps()}
                              />

                              <button
                                className="absolute top-[-10px] right-[-10px] p-2  rounded-full bg-gray-300 transition duration-300"
                                onClick={() =>
                                  handleDeleteImage(data.images[index].id)
                                }
                              >
                                <IoMdClose />
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                      {data.videos.map((_: any, index: number) => (
                        <div className="relative  w-[fit-content]" key={index}>
                          {hiddenIdsV.includes(data.videos[index].id) ? (
                            <></>
                          ) : (
                            <>
                              <video
                                src={data.videos[index].link}
                                className="max-w-[200px] max-h-[200px] rounded-[10px] cursor-pointer"
                                {...getRootProps()}
                              />
                              <button
                                className="absolute top-[-10px] right-[-10px] p-2  rounded-full bg-gray-300 transition duration-300"
                                onClick={() =>
                                  handleDeleteVideo(data.videos[index].id)
                                }
                              >
                                <IoMdClose />
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                    </label>
                  </div>
                )}
              </div>
            )}
          </>

          <div className="mt-2 px-4 ">
            <button
              className="w-full h-[30px] bg-[#456fe6] rounded-[4px] text-white"
              onClick={handlePost}
            >
              Lưu
            </button>
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

export default EditPost;
