import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { api, setAuthToken } from "../../utils/setAuthToken";
import API from "../../services/API";
import toast from "react-hot-toast";
import { BsEmojiSmile } from "react-icons/bs";
import addPosts from "../../assets/add-post.svg";
import { MdOutlineClose } from "react-icons/md";
import { HiOutlineMicrophone } from "react-icons/hi2";
import Picker from "@emoji-mart/react";
import { useDropzone } from "react-dropzone";
import { IoMdClose } from "react-icons/io";
import { Button, Dropdown, Menu } from "antd";
import { addReelss } from "./../../redux/features/Add-Reels/addReelsAPI";
import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";
import setLoadingPage from "../../utils/setLoadingPage";
interface UploadedFile {
  file: File;
  preview: string;
}

interface YourExistingDataType {
  data: any;
  success: any;
}
const AddReels = () => {
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [toggleEmj, setToggleEmj] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Chỉ lấy tệp đầu tiên từ danh sách acceptedFiles
    const file = acceptedFiles[0];
    if (file) {
      const fileWithPreview = {
        file,
        preview: URL.createObjectURL(file),
      };
      setUploadedFiles([fileWithPreview]);
    }
  }, []);

  const handleCancle = () => {
    setContent("");
    setUploadedFiles([]);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Biến cho formData
  const [isChecked, setIsChecked] = useState("1");
  const [Content, setContent] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [audioID, setAudioID] = useState("");
  const [disableVoice, setDisableVoice] = useState(true);
  const [audio, setAudio] = useState([]);
  const handleVoiceClick = () => {
    const recognition = new ((window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition)();
    recognition.interimResults = true;

    recognition.addEventListener("result", (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join("");
      setContent(transcript);
    });

    recognition.start();
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
  //

  const handlePost = async () => {
    setLoadingPage({ value: 30 });
    setIsLoading(true);
    if (uploadedFiles.length == 1) {
      try {
        const formData = new FormData();
        formData.append("Content", Content);
        formData.append("LevelVieW", isChecked);
        formData.append("audioId", audioID);
        formData.append("DisableVoice", disableVoice.toString());

        if (uploadedFiles) {
          // uploadedFiles.map((item, index) => {
          formData.append("File", uploadedFiles[0]?.file);
          // });
        }

        addReelss(dispatch, formData, uploadedFiles[0]?.file.type);
      } catch (error) {
        console.error("Add sai!", error);
      }
    } else {
      toast.error("Hãy thêm video cho Reels");
      setIsLoading(false);
    }
  };
  const error = useSelector((state: RootState) => state.addReels.errorReels);
  type DataType = YourExistingDataType | null;
  const dataAddReels = useSelector(
    (state: RootState) => state.addReels.dataAddReels
  ) as DataType;
  const isFetching = useSelector(
    (state: RootState) => state.addPost.isFetching
  );
  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const token = localStorage.getItem("token");
        setAuthToken(token);
        const res = await api.get(API.GET_AUDIO);
        setAudio(res.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAudio();
  }, []);
  useEffect(() => {
    if (dataAddReels?.success === true) {
      setLoadingPage({ value: 100 });
      setIsLoading(false);

      setContent("");
      setUploadedFiles([]);
    }
    if (error == true && isFetching == false) {
      setIsLoading(false);
      console.log(error);
    }
  }, [dataAddReels, isFetching]);
  const removeImage = (indexToRemove: number) => {
    setUploadedFiles((prevState) =>
      prevState.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleMenuClick = (item: any) => {
    setSelectedItem(item.name);
    setAudioSrc(item.link);
    setAudioID(item.id);
  };
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sử dụng useEffect để theo dõi thay đổi của audioSrc và tự động phát lại âm thanh
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.play();
    }
  }, [audioSrc]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };
  const onChange: CheckboxProps["onChange"] = (e) => {
    setDisableVoice(e.target.checked);
  };
  return (
    <>
      <div className="flex flex-row relative left-[15rem] top-[50px]">
        <div className="  overflow-y-auto ">
          <div className="w-[75vw] py-6 pl-[150px]">
            <div className="flex justify-between">
              <div className=" flex justify-start items-center">
                <img src={addPosts} alt="" />
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    lineHeight: "140%",
                    letterSpacing: "-0.05em",
                    color: "#456fe6",
                    marginLeft: "10px",
                  }}
                >
                  Create Reels
                </h2>
              </div>
              <div className="flex justify-start items-center">
                <div className="radio-inputs">
                  <label className="radio">
                    <input
                      type="radio"
                      name="radio"
                      onChange={() => setIsChecked("1")}
                      checked={isChecked === "1"}
                    />
                    <span className="name">Công khai</span>
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="radio"
                      onChange={() => setIsChecked("2")}
                      checked={isChecked === "2"}
                    />
                    <span className="name">Bạn bè</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-[25px] " style={{ textAlign: "left" }}>
              <label className="text-[#456fe6] font-medium">Caption</label>
              <textarea
                onChange={(e) => setContent(e.target.value)}
                placeholder="What are you thinking?     "
                value={Content}
                className="w-[100%]  h-[80px] mt-2 rounded-md  outline-[#6eb7ed] px-6 py-1"
                //   onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="hidden">
              <h2>{selectedItem}</h2>
              <div onClick={handlePlayPause}>
                <audio ref={audioRef} controls>
                  <source src={audioSrc} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>

            <div className="flex justify-end items-center">
              {" "}
              <div
                onClick={() => setToggleEmj(!toggleEmj)}
                className="cursor-pointer mr-2 bg-white p-2 rounded-[50%] hover:bg-[#456fe6] hover:text-white duration-500"
              >
                {" "}
                <BsEmojiSmile />
              </div>
              <div
                className="cursor-pointer mr-2 bg-white p-2 rounded-[50%] hover:bg-[#456fe6] hover:text-white duration-500"
                onClick={handleVoiceClick}
              >
                <HiOutlineMicrophone />{" "}
              </div>
            </div>

            <div className="mt-[25px]  " style={{ textAlign: "left" }}>
              <label className="text-[#456fe6] font-medium mr-2">Audio</label>
              <Dropdown
                overlay={
                  <Menu>
                    {audio.map((item: any) => (
                      <Menu.Item
                        key={item.key}
                        onClick={() => handleMenuClick(item)}
                      >
                        {item.name}
                      </Menu.Item>
                    ))}
                  </Menu>
                }
                placement="bottomLeft"
                arrow={{ pointAtCenter: true }}
              >
                <Button>
                  {selectedItem === "" ? "Chọn bài hát" : selectedItem}
                </Button>
              </Dropdown>
            </div>
            <div className="mt-[25px]  " style={{ textAlign: "left" }}>
              <label className="text-[#456fe6] font-medium mr-2">
                {" "}
                Disable Voice
              </label>
              <Checkbox onChange={onChange}></Checkbox>
            </div>

            <div className="mt-[22px] " style={{ textAlign: "left" }}>
              <label className="text-[#456fe6] font-medium">Add Reels</label>
              {uploadedFiles.length < 1 && (
                <label
                  className="custum-file-upload w-[100%]  h-[320px]"
                  htmlFor="file"
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
              {uploadedFiles.length > 0 && (
                <div>
                  <label
                    className="custum-file-upload w-[100%]  h-[320px] flex"
                    htmlFor="file"
                  >
                    {uploadedFiles.map((uploadedFile, index) => (
                      <div key={index} className="relative">
                        {uploadedFiles[0]?.file.type === "video/mp4" ? (
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
                        {uploadedFile.file.name}
                      </div>
                    ))}
                  </label>
                </div>
              )}
            </div>
            <div className="mt-[30px] flex justify-end items-center">
              <button
                className="buttonAddP1 py-[18px] bg-red"
                onClick={handleCancle}
              >
                <MdOutlineClose />
                <span>Cancle</span>
              </button>
              <button
                className={`buttonAddP ml-2 ${
                  uploadedFiles.length !== 0
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                onClick={handlePost}
                disabled={uploadedFiles.length === 0}
              >
                {isLoading ? (
                  <div className="loader"></div>
                ) : (
                  <div className="flex items-center">
                    <div className="svg-wrapper-1">
                      <div className="svg-wrapper">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path
                            fill="currentColor"
                            d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <span>Send</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className=" " style={{ display: toggleEmj ? "none" : "block" }}>
          <div className="emoji">
            <Picker onEmojiSelect={addEmoji} />
          </div>
        </div>
      </div>
    </>
  );
};
export default AddReels;
