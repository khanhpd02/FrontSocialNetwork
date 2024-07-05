import { useEffect, useRef, useState } from "react";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { api, setAuthToken } from "../../../utils/setAuthToken";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  tokenState,
  ShareS,
  isUpdatePost,
  ImagesRecoil,
  VideosRecoil,
} from "../../../recoil/initState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { BsEmojiSmile } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import Picker from "@emoji-mart/react";
import { addCmt } from "../../../redux/features/Add-Cmt/addCmtAPI";
import { IoTrashBinOutline } from "react-icons/io5";
import CustomVideo from "../../CustomVideo/CustomVideo";
import { useNavigate } from "react-router-dom";
import ShareLayout from "../../shareLayout/shareLayout";
import { MdOutlineEdit } from "react-icons/md";
import toast from "react-hot-toast";
import EditPost from "../../EditPost/EditPost";
import LazyLoadImg from "../../common/LazyLoadImg/LazyLoadImg";
import { ImageSlider } from "../../common/ImgSlider/ImageSlider";
import {
  parseISO,
  differenceInHours,
  differenceInCalendarDays,
  differenceInMinutes,
} from "date-fns";
import { VideoSlider } from "../../common/VideoSlider/VideoSlider";

interface Comment {
  childrenComment: [];
  id: string;
  content: string;
  fullName: string;
  image: string;
}
interface Props {
  data: any;
  cmtid: string;
}
interface ResponseData {
  data: Comment[];
  success: boolean;
  message: string;
}
interface YourExistingDataType {
  data: any;
}
const CardPost = ({ data, cmtid }: Props) => {
  const navigate = useNavigate();
  const wowRef = useRef<HTMLDivElement>(null);
  const scrollToWow = () => {
    if (wowRef.current) {
      wowRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  type DataType = YourExistingDataType | null;
  const [images, setImages] = useState(data.images);
  const [videos, setVideos] = useState(data.videos);
  const token = useRecoilValue(tokenState);
  // const [like, setLike] = useRecoilState(ReloadLike);
  const [toggleEmj, setToggleEmj] = useState(true);
  const [Content, setContent] = useState("");
  const [ContentChild, setContentChild] = useState("");
  const [loadCmt1, setLoadCmt1] = useState(false);
  const [loadCmt, setLoadCmt] = useState(false);
  const [loadCmtChild, setLoadCmtChild] = useState(false);
  const [toggleCmt, setToggleCmt] = useState("");
  const [toggleLoad, setToggleLoad] = useState("");
  const [emo, setEmo] = useState(true);
  const [visibleComments, setVisibleComments] = useState(0);
  const [countData, setCountData] = useState(data.countLike);
  const [IdShare, setIdShare] = useState("");
  const [IdEdit, setIdEdit] = useState("");
  const [loadShare, setLoadShare] = useRecoilState(ShareS);
  const [ImagesRecoilR, setImagesRecoil] = useRecoilState(ImagesRecoil);
  const [VideosRecoilR, setVideosRecoil] = useRecoilState(VideosRecoil);
  const [like, setLike] = useState(data.islike);
  const [dataCmt, setData] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });
  const { info } = useSelector((state: RootState) => state.info);
  const dataAddCmt = useSelector(
    (state: RootState) => state.addCmt.dataAddCmt
  ) as DataType;
  const handleSeeMore = () => {
    setVisibleComments(visibleComments + 2);
  };
  const handleSeeLess = () => {
    setVisibleComments(2);
  };
  const [inputTime] = useState(data.createDate);
  const [result, setResult] = useState("");
  const calculateDifference = () => {
    const parsedInputTime = parseISO(inputTime);
    const currentTime = new Date();

    const totalMinutesDifference = differenceInMinutes(
      currentTime,
      parsedInputTime
    );
    const totalHoursDifference = differenceInHours(
      currentTime,
      parsedInputTime
    );

    if (parsedInputTime.toDateString() === currentTime.toDateString()) {
      // Nếu ngày trùng
      if (totalHoursDifference < 1) {
        const minute = 60 + totalMinutesDifference;

        setResult(`${minute} minutes`);
      } else {
        const hoursDifference = Math.floor(totalMinutesDifference / 60);
        // const minutesDifference = totalMinutesDifference % 60;
        setResult(`${hoursDifference} hours`);
      }
    } else {
      // Nếu ngày không trùng
      const daysDifference = differenceInCalendarDays(
        currentTime,
        parsedInputTime
      );
      // const hoursDifference = totalHoursDifference % 24;
      setResult(`${daysDifference} days`);
    }
  };
  useEffect(() => {
    calculateDifference();
  }, []);
  useEffect(() => {
    setImages(data.images);
  }, [data.images]);
  useEffect(() => {
    setVideos(data.videos);
  }, [data.videos]);
  useEffect(() => {
    if (dataAddCmt?.data.success == true) {
      // setLoadCmt1(false);
      setLoadCmt(false);
      setLoadCmtChild(false);
      setContent("");
      setContentChild("");
      loadData();
    }
  }, [dataAddCmt]);
  const [postId] = useState(data.id);
  const dispatch = useDispatch();
  const handleLike = async () => {
    setAuthToken(token);
    try {
      const id = data.id;
      // if (like == false) {
      //   setCountData(countData + 1);
      //   setLike(true);
      // }
      // if (like == true) {
      //   setCountData(countData - 1);
      //   setLike(false);
      // }
      // setLike(!like);
      // setCountData(data.countLike + 1);
      await api
        .post(`https://truongnetwwork.bsite.net/api/like/${id}`)
        .then((response) => {
          // Cập nhật dữ liệu vào state

          if (response.status == 200) {
            // dispatch(fetchPost());
            // setLike(like + 1);

            try {
              api
                .get(
                  `https://truongnetwwork.bsite.net/api/like/likeonpost/${id}`
                )
                .then((response) => {
                  // Cập nhật dữ liệu vào state
                  if (like == false) {
                    // setCountData(countData + 1);
                    setLike(true);
                    setCountData(response.data.data.length);
                  }
                  if (like == true) {
                    // setCountData(countData - 1);
                    setLike(false);
                    setCountData(response.data.data.length);
                  }
                  //  setCountData(response.data.data.length);
                  // if (response.status !== 200) {
                  //   // dispatch(fetchPost());
                  //   // setLike(like + 1);
                  //   setCountData(data.countLike - 1);
                  // }
                })
                .catch((error) => {
                  console.log(error);
                });
            } catch (e) {
              console.log(e);
            }
            // setCountData(data.countLike - 1);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  useEffect(() => {
    const fetchLike = async () => {
      setAuthToken(token);
      try {
        const id = data.id;

        try {
          const response = await api.get(
            `https://truongnetwwork.bsite.net/api/like/likeonpost/${id}`
          );

          setCountData(response.data.data.length);
        } catch (error) {
          console.log(error);
        }
      } catch (e) {
        console.log(e);
      }
    };

    // Call fetchLike initially
    fetchLike();

    // Call fetchLike every 2 seconds
    const interval = setInterval(fetchLike, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);
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
  const handleVoiceClickChild = () => {
    const recognition = new ((window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition)();
    recognition.interimResults = true;

    recognition.addEventListener("result", (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join("");
      setContentChild(ContentChild + transcript);
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
  const addEmojiChild = (e: any) => {
    const sym = e.unified.split("-");
    const codesArray: number[] = [];

    sym.forEach((el: string) => {
      const code = parseInt(el, 16); // Parse the hexadecimal string to a number
      codesArray.push(code);
    });
    const emoji = String.fromCodePoint(...codesArray);
    setContentChild(ContentChild + emoji);
  };
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleFocus = () => {
    setEmo(true);
    setIsInputFocused(true);
  };
  const handleFocusChild = () => {
    setEmo(false);
    // setIsInputFocused(true);
  };
  const handleBlur = () => {
    setToggleEmj(!toggleEmj);
  };

  const handleAddPostBig = async () => {
    setLoadCmt(true);
    try {
      // const data =;

      addCmt(dispatch, {
        Content: Content,
        postId: postId,
        userId: info.data.userId,
      });
    } catch (error) {
      console.error("Add sai!", error);
    }
  };
  const handleAddPostSmall = async (pId: string) => {
    setLoadCmtChild(true);
    setToggleLoad(pId);
    try {
      // const data =;

      addCmt(dispatch, {
        Content: ContentChild,
        postId: postId,
        userId: info.data.userId,
        parentId: pId,
      });
    } catch (error) {
      console.error("Add sai!", error);
    }
  };
  const loadData = async () => {
    // Gọi API để lấy dữ liệu
    const id = data.id;
    await api
      .get<ResponseData>(
        `https://truongnetwwork.bsite.net/api/cmt/getcmtPost/${id}`
      )
      .then((response) => {
        // Cập nhật dữ liệu vào state
        if (response.status === 200) {
          // scrollToWow();
          setLoadCmt1(true);
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const hanldDltCmtChild = async (pId: string) => {
    setAuthToken(token);
    // const postId = idPost;
    // const userId = id;
    const parentId = pId;
    return api
      .post(`https://truongnetwwork.bsite.net/api/cmt/deleteOrUndo/${parentId}`)
      .then((res) => {
        if (res.status === 200) {
          loadData();
        }
      })
      .catch((err) => console.log(err));
  };
  const [, setSsUpdatePost] = useRecoilState(isUpdatePost);
  const hanldDltPost = async () => {
    setAuthToken(token);

    return api
      .delete(`https://truongnetwwork.bsite.net/api/post/${postId}`)
      .then((res) => {
        if (res.status === 204) {
          setSsUpdatePost(false);
          toast.error("Đã xóa bài viết");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadData();
  }, []);
  const handleShare = () => {
    setIdShare(data.id);
    setLoadShare("1");
  };
  const handleEdit = () => {
    setIdEdit(data.id);
    setLoadShare("2");
  };
  const handleImage = () => {
    setIdEdit(data.id);
    setImagesRecoil(data.images);
    setLoadShare("3");
  };
  const handleVideo = () => {
    setIdEdit(data.id);
    setVideosRecoil(data.videos);
    setLoadShare("4");
  };
  useEffect(() => {
    scrollToWow(); // Scroll sau khi dữ liệu đã được tải
  }, [dataCmt]);
  return (
    <div
      className="w-[500px] h-auto bg-white  mb-10 rounded-[10px]"
      style={{ position: "relative" }}
    >
      <div className="py-4 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={data.avatarUrl}
            alt="avatar"
            className="h-[45px] w-[45px] rounded-[50%] cursor-pointer"
            onClick={() => {
              info.data.userId == data.userId
                ? navigate("/personal")
                : navigate(`/personal-user/${data.userId}`);
            }}
          />
          <div className=" ml-4 text-left">
            <span className="text-[18px] font-[500] ">{data.fullName}</span>
            <div className="flex justify-start items-center ">
              <span className="text-light-3 text-[12px] mr-2 ">{result}</span>
              <>
                {data.levelView == 1 ? (
                  <div className="text-light-3 ">
                    {" "}
                    <FaEarthAmericas />
                  </div>
                ) : (
                  <div className="text-light-3">
                    {" "}
                    <FaUserFriends />
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
        <>
          {info?.data?.userId === data.userId ? (
            <div className="flex">
              <div className="text-[25px] p-2 cursor-pointer hover:bg-[#f2f2f2] rounded-[50%] duration-500">
                <div onClick={handleEdit}>
                  {" "}
                  <MdOutlineEdit />
                </div>
              </div>
              <div className="text-[25px] p-2 cursor-pointer hover:bg-[#f2f2f2] rounded-[50%] duration-500">
                <div onClick={hanldDltPost}>
                  <IoMdClose />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      </div>
      <div className="pb-4 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-[#101010] text-[15px] mr-2">
            {data.content}
          </span>
        </div>
      </div>
      <div>
        <div>
          <>
            {images.length === 2 && videos.length == 0 ? (
              <div className="flex" onClick={handleImage}>
                {images?.map((index: number, item: number) => (
                  <LazyLoadImg
                    index={index}
                    images={images[item]?.linkImage}
                    className="max-h-[300px] w-[50%] mx-[2px] object-cover"
                  />
                ))}
              </div>
            ) : images.length === 3 ? (
              <div className="flex">
                <div className="flex w-[100%]" onClick={handleImage}>
                  <LazyLoadImg
                    index={0}
                    images={images[0]?.linkImage}
                    className="max-h-[360px] w-[50%] px-[1px] h-[auto] object-cover py-[1px]"
                  />

                  <div className="w-[50%] gap-1">
                    <LazyLoadImg
                      index={0}
                      images={images[1]?.linkImage}
                      className="max-h-[180px] w-[100%]  h-[auto] object-cover p-[1px]"
                    />

                    <LazyLoadImg
                      index={0}
                      images={images[2]?.linkImage}
                      className="max-h-[180px] w-[100%] h-[auto]  object-cover	p-[1px] border-solid "
                    />
                  </div>
                </div>
              </div>
            ) : images.length !== 0 && videos.length !== 0 ? (
              <div className="flex">
                {images.length === 1 ? (
                  <img
                    src={images[0]?.linkImage}
                    alt="img"
                    className="w-[50%] mx-[2px] object-cover h-auto"
                    onClick={handleImage}
                  />
                ) : (
                  <div
                    className="w-[50%] mx-[2px] object-cover relative"
                    onClick={handleImage}
                  >
                    <img
                      src={images[0]?.linkImage}
                      className="w-[100%]  h-full object-cover p-[1px] border-solid border-white"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        +{images.length - 1}
                      </span>
                    </div>
                  </div>
                )}
                {videos.length === 1 ? (
                  <CustomVideo
                    src={videos[0]?.link}
                    classsName="w-[100%] max-h-[400px] bg-black min-h-[200px] h-full"
                  />
                ) : (
                  <div
                    className="w-[50%] mx-[2px] object-cover relative"
                    onClick={handleVideo}
                  >
                    <CustomVideo
                      src={videos[0]?.link}
                      classsName="w-[100%] max-h-[400px] bg-black min-h-[200px] h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        +{videos.length - 1}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : images.length === 1 ? (
              <div className="flex" onClick={handleImage}>
                {images?.map((index: number, item: number) => (
                  <LazyLoadImg
                    index={index}
                    images={images[item]?.linkImage}
                    className=" w-[100%] "
                  />
                ))}
              </div>
            ) : images.length >= 4 ? (
              <div className="flex">
                <div className="flex w-[100%]" onClick={handleImage}>
                  <LazyLoadImg
                    index={0}
                    images={images[0]?.linkImage}
                    className="max-h-[360px] w-[50%] px-[1px] h-[auto] object-cover py-[1px]"
                  />

                  <div className="w-[50%] gap-1">
                    <LazyLoadImg
                      index={0}
                      images={images[1]?.linkImage}
                      className="max-h-[180px] w-[100%]  h-[auto] object-cover p-[1px]"
                    />

                    <div className="relative">
                      <LazyLoadImg
                        index={0}
                        images={images[2]?.linkImage}
                        className="max-h-[180px] w-[100%] h-[auto] object-cover p-[1px] border-solid border-white"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          +{images.length - 2}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {videos.length === 2 ? (
                  <div className="flex ">
                    {videos?.map((_: any, item: number) => (
                      <div className="max-w-[50%] flex justify-center items-center bg-black">
                        <CustomVideo
                          src={videos[item]?.link}
                          classsName="w-[100%]  bg-black"
                        />
                      </div>
                    ))}
                  </div>
                ) : videos.length >= 3 ? (
                  <div className="flex ">
                    <div className="max-w-[50%] flex justify-center items-center bg-black">
                      <CustomVideo
                        src={videos[0]?.link}
                        classsName="w-[100%]  bg-black"
                      />
                    </div>
                    <div
                      className="max-w-[50%] flex justify-center items-center bg-black relative"
                      onClick={handleVideo}
                    >
                      <CustomVideo
                        src={videos[1]?.link}
                        classsName="w-[100%]  bg-black"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          +{videos.length - 2}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {videos?.map((_: any, item: number) => (
                      <div className="">
                        <CustomVideo
                          src={videos[item]?.link}
                          classsName="w-[100%] max-h-[400px] bg-black"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </div>
      <div className="px-2 py-2">
        <div className="flex justify-start items-center">
          <button className="buttonTym" onClick={handleLike}>
            {like == false ? (
              <svg
                className="empty"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
              >
                <path fill="none" d="M0 0H24V24H0z"></path>
                <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z"></path>
              </svg>
            ) : (
              <svg
                className="filled"
                height="32"
                width="32"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H24V24H0z" fill="none"></path>
                <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path>
              </svg>
            )}
            {countData} Like
          </button>
          <div className="buttonTym ml-3" onClick={handleShare}>
            <div className="text-[#456fe6]">
              <IoShareSocialOutline />
            </div>{" "}
            Share
          </div>
        </div>
      </div>
      <div className="px-6 py-2">
        <div className="flex justify-start items-top">
          <img
            src={info.data.image || ""}
            alt="avatar"
            className="h-[35px] w-[35px] rounded-[50%]"
          />
          <div style={{ position: "relative", width: "100%" }}>
            <textarea
              placeholder="Your comment .... "
              name="text"
              onChange={(e) => setContent(e.target.value)}
              value={Content}
              className={`${isInputFocused ? "inputCmt1" : "inputCmt"}`}
              onFocus={handleFocus}
              // onKeyDown={handleKey}
            ></textarea>
            <div className={`${isInputFocused ? "iconCmt1" : "iconCmt"}`}>
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
              <div
                className={`cursor-pointer mr-1 bg-white p-2 rounded-[50%] hover:bg-[#456fe6] hover:text-white duration-500 ${
                  Content ? "" : "opacity-50 pointer-events-none"
                }`}
                onClick={handleAddPostBig}
              >
                <IoIosSend />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {loadCmt1 == false ? (
          <div className="flex justify-center items-center">
            {" "}
            <div className="loaderCmt1 "></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        {loadCmt == true ? (
          <div className="flex justify-center items-center">
            {" "}
            <div className="loaderCmt1 "></div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="px-6 py-2">
        <div className="mb-2">
          <>
            {dataCmt.data.map((item: Comment, index: number) => (
              <>
                <div className="flex justify-start items-top mb-1" key={index}>
                  <img
                    src={item.image}
                    alt="avatar"
                    className="h-[30px] w-[30px] rounded-[50%]"
                  />
                  {cmtid == item.id ? (
                    <div className="flex flex-col text-left ml-3 bg-[#b7b7b7] p-2 rounded-xl">
                      <span className="text-[12px] font-bold ">
                        {item.fullName}
                      </span>
                      <span className="text-[12px]" ref={wowRef}>
                        {item.content}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col text-left ml-3 bg-[#f0f2f5] p-2 rounded-xl">
                      <span className="text-[12px] font-bold">
                        {item.fullName}
                      </span>
                      <span className="text-[12px]"> {item.content}</span>
                    </div>
                  )}
                </div>
                <div className="flex px-12 cursor-pointer">
                  <span
                    className="text-[10px]"
                    onClick={() => setToggleCmt(item.id)}
                  >
                    Trả lời
                  </span>
                  <span
                    className="text-[10px] ml-2"
                    onClick={() => hanldDltCmtChild(item.id)}
                  >
                    Xóa
                  </span>
                </div>
                <>
                  {loadCmtChild == true ? (
                    <>
                      {item.id == toggleLoad ? (
                        <div className="flex justify-center items-center">
                          {" "}
                          <div className="loaderCmt1 "></div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>

                {item.childrenComment
                  .slice(0, visibleComments)
                  .map((childComment: any) => (
                    <div className="flex justify-start items-top px-6 mt-2 mb-2">
                      <img
                        src={childComment.image}
                        alt="avatar"
                        className="h-[30px] w-[30px] rounded-[50%]"
                      />
                      <div className="flex justify-center items-center">
                        <div className="flex flex-col text-left ml-3 bg-[#f0f2f5] p-2 rounded-xl">
                          <span className="text-[12px] font-bold">
                            {childComment.fullName}
                          </span>
                          <span className="text-[12px]">
                            {childComment.content + ""}
                          </span>
                        </div>
                        <span
                          onClick={() => hanldDltCmtChild(childComment.id)}
                          className="text-[10px] ml-2 cursor-pointer hover:bg-[#456fe6] hover:text-white p-2 rounded-[50%]"
                        >
                          <IoTrashBinOutline />
                        </span>
                      </div>
                    </div>
                  ))}
                <>
                  {item.childrenComment.length > visibleComments && (
                    <div
                      className="text-[12px] text-black cursor-pointer"
                      onClick={handleSeeMore}
                    >
                      Xem thêm
                    </div>
                  )}
                  {item.childrenComment.length < visibleComments &&
                    visibleComments > 2 && (
                      <div
                        className="text-[12px] text-black cursor-pointer"
                        onClick={handleSeeLess}
                      >
                        Ẩn đi
                      </div>
                    )}
                </>
                {toggleCmt == item.id ? (
                  <div className="px-10 py-2">
                    <div className="flex justify-start items-top">
                      <img
                        src={info.data.image}
                        alt="avatar"
                        className="h-[30px] w-[30px] rounded-[50%]"
                      />
                      <div
                        style={{ position: "relative", width: "90%" }}
                        className="ml-3"
                      >
                        <textarea
                          placeholder="Your comment .... "
                          name="text"
                          onChange={(e) => setContentChild(e.target.value)}
                          value={ContentChild}
                          className="inputCmtCh"
                          onFocus={handleFocusChild}
                        ></textarea>
                        <div className="iconCmtCh">
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
                            onClick={handleVoiceClickChild}
                          >
                            <HiOutlineMicrophone />{" "}
                          </div>
                          <div
                            className="cursor-pointer mr-1 bg-white p-2 rounded-[50%] hover:bg-[#456fe6] hover:text-white duration-500"
                            onClick={() => handleAddPostSmall(item.id)}
                          >
                            <IoIosSend />{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
          </>
        </div>
      </div>
      <div
        className="w-[400px] h-[400px] z-[999]"
        style={{
          display: toggleEmj ? "none" : "block",
          position: "absolute",
          right: -250,
          top: -160,
        }}
      >
        <div className="emoji">
          <Picker onEmojiSelect={emo == true ? addEmoji : addEmojiChild} />
        </div>
      </div>
      {loadShare === "1" && IdShare === data.id && (
        <ShareLayout PostId={data.id} />
      )}
      {loadShare === "2" && IdEdit === data.id && <EditPost data={data} />}
      {loadShare === "3" && IdEdit === data.id && (
        <ImageSlider images={ImagesRecoilR} />
      )}
      {loadShare === "4" && IdEdit === data.id && (
        <VideoSlider videos={VideosRecoilR} />
      )}
    </div>
  );
};

export default CardPost;
