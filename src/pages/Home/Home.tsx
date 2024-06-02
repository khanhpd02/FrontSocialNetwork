import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { RootState } from "../../redux/store";
import {
  ViewHome,
  isUpdatePost,
  isSharePost,
  isSharePost1,
  updateReels,
} from "../../recoil/initState";
import { useRecoilState, useRecoilValue } from "recoil";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import CardPosts from "../../components/CardPosts/CardPosts";
import { fetchFriend } from "../../redux/features/Not-Friend/friendSlice";
import getPost from "../../redux/features/post/getPostAPI";
import getReels from "../../redux/features/reels/getReelsAPI";
import ChatHome from "./ChatHome";
import CardReels from "../../components/CardReelss/CardReels";
import { useAppDispatch } from "../../hook/hook";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser1 = useSelector((state: RootState) => state.info.info);
  const [isUpdatePostR, setSsUpdatePost] = useRecoilState(isUpdatePost);
  const [isSharePostR, setIsSharePost] = useRecoilState(isSharePost);

  const ViewHomeR = useRecoilValue(ViewHome);
  const [, setAllPostsLoaded] = useState(false);
  const [isSharePost1R, setIsSharePost1R] = useRecoilState(isSharePost1);
  const { info } = useSelector((state: RootState) => state.info);
  const [updateReelsR, setUpdateReelsR] = useRecoilState(updateReels);
  const [loadChat, setLoadChat] = useState(true);
  useEffect(() => {
    const hasInfor = localStorage.getItem("hasInfor");
    if (hasInfor == "false") {
      // Kiểm tra nếu hasInfor không tồn tại hoặc có giá trị rỗng
      navigate("/add-info");
    }
  }, []);
  const [numberPost, setNumberPost] = useState(5);
  const [post, setPost] = useState([]);
  const [reels, setReels] = useState([]);
  useEffect(() => {
    getPost(numberPost.toString()).then((data) => setPost(data));
  }, [numberPost]);
  useEffect(() => {
    if (isUpdatePostR == false) {
      getPost(numberPost.toString()).then((data) => setPost(data));

      setSsUpdatePost(true);
    }
  }, [isUpdatePostR]);
  useEffect(() => {
    if (isSharePostR == false) {
      setNumberPost((prevNumberPost) => prevNumberPost + 1);
      setIsSharePost(true);
    }
  }, [isSharePostR]);
  useEffect(() => {
    if (isSharePost1R == false) {
      setNumberPost((prevNumberPost) => prevNumberPost + 1);
      setIsSharePost1R(true);
    }
  }, [isSharePost1R]);
  useEffect(() => {
    getReels().then((data) => setReels(data));
  }, []);
  useEffect(() => {
    if (updateReelsR === false) {
      console.log(123456);
      getReels().then((data) => setReels(data));
      setUpdateReelsR(true);
    }
  }, [updateReelsR]);
  useEffect(() => {
    dispatch(fetchFriend());
  }, [dispatch]);
  useEffect(() => {
    console.log(currentUser1.success);
    if (currentUser1.success !== undefined) {
      console.log(currentUser1.success);
      setLoadChat(false);
    }
  }, [currentUser1.success]);

  const [, setIsEndOfPage] = useState(false);

  const handleIntersection: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      setNumberPost((prevNumberPost) => prevNumberPost + 2);
    } else {
      setIsEndOfPage(false);
    }
  };

  const observer = useRef(
    new IntersectionObserver(
      handleIntersection,
      { threshold: 1 } // Kích hoạt khi toàn bộ phần tử mục tiêu là nhìn thấy
    )
  );

  const bottomOfPageRef = useRef(null);
  useEffect(() => {
    const currentObserver = observer.current;
    if (bottomOfPageRef.current) {
      setAllPostsLoaded(true);
      currentObserver.observe(bottomOfPageRef.current);
    }
    return () => {
      if (bottomOfPageRef.current) {
        currentObserver.unobserve(bottomOfPageRef.current);
      }
    };
  }, []);
  useEffect(() => {
    if (post.length >= numberPost) {
      setAllPostsLoaded(false); // Nếu đã tải hết, set biến state allPostsLoaded thành true
    }
  }, [post, numberPost]);
  const [, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };

  // Khi component được mount, thêm sự kiện lắng nghe cho việc cuộn trang
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Xóa sự kiện lắng nghe khi component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <>
        {ViewHomeR == true ? (
          <div className=" overflow-y-auto relative left-[20.5rem] top-[50px] w-[58vw]">
            <div className="flex flex-col justify-center items-center mt-6 min-[1920px]:pl-60 pl-16">
              <Link
                to="/add-post"
                className="bg-white w-[61%] h-[45px] min-[1920px]:mr-[12%] mr-[10%] rounded-[20px] flex justify-around items-center "
              >
                <img
                  src={info?.data?.image}
                  alt=""
                  className="rounded-[50px] w-[30px] h-[30px]"
                />
                <input
                  type="text"
                  className="w-[60%] h-full outline-none"
                  placeholder={`What's on your mind, ${info?.data?.fullName}`}
                />
                <div className="w-[15%]  bg-[#456fe6] py-1 text-white  rounded-[20px] cursor-pointer hover:bg-[#458be6]">
                  <p>Post</p>
                </div>
              </Link>
              <CardPosts data={post} />
            </div>

            <div className="">
              {" "}
              <div className=" h-[280px] w-[500px] min-[1920px]:ml-[33%] ml-[21%] bg-white  rounded-[10px]">
                <div className="py-4 px-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Skeleton className="h-[45px] w-[45px] rounded-[50%]" />
                    <div className=" ml-4 text-left">
                      <Skeleton className="h-[10px] w-[70px]" />
                      <div className="flex justify-start items-center ">
                        <Skeleton className="h-[10px] w-[50px]" />
                        <>
                          <Skeleton className="ml-2 h-[13px] w-[13px] rounded-[50%]" />
                        </>
                      </div>
                    </div>
                  </div>
                  <div className="text-[25px] p-2 ">
                    <Skeleton className="h-[30px] w-[30px] rounded-[50%]" />
                  </div>
                </div>
                <div ref={bottomOfPageRef}>
                  {" "}
                  <Skeleton className=" h-[180px] w-[500px] mr-[30%] ml-[0%]" />
                </div>
              </div>
            </div>

            {/* <div
              className=" h-[10px] w-[500px] ml-[21%]  rounded-[10px]"
              ref={bottomOfPageRef}
            ></div> */}
          </div>
        ) : (
          <>
            <div className=" overflow-y-auto relative left-[20.5rem] top-[50px] w-[58vw]">
              {" "}
              <div className="flex justify-center min-[1920px]:pl-60 pl-16">
                <CardReels data={reels} />
              </div>
            </div>
          </>
        )}
        <div className="w-[26vw]   h-[100vh] fixed top-[60px] right-0 px-4 mr-4">
          {/* <RightHome data={friend} /> */}
          {loadChat == false ? <ChatHome /> : <></>}
        </div>
      </>

      <Toaster />
    </>
  );
};

export default Home;
