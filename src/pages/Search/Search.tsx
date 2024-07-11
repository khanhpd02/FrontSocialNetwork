import { useEffect, useState } from "react";
import { api, setAuthToken } from "../../utils/setAuthToken";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/initState";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router-dom";
import setLoadingPage from "../../utils/setLoadingPage";
interface Comment {
  // Add the actual properties of a post here
  id: number;
  image: string;
  statusFriend: string;
  gender: boolean;
  address: string;
  workPlace: string;
  fullName: string;
  userId: string;
  // Add other properties as needed
}
interface ResponseData {
  data: Comment[];
  success: boolean;
  message: string;
}
const Search = () => {
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  // const [fullName, setFullName] = useState("");
  const [loadSearch, setLoadSearch] = useState(false);
  const [loadSearch1, setLoadSearch1] = useState(false);
  const [loadSearch2, setLoadSearch2] = useState(false);
  const { fullName } = useParams();
  const [dataCmt, setData] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });
  const hanldDAddF = async () => {
    setAuthToken(token);
    // const postId = idPost;
    // const userId = id;

    return api
      .get<ResponseData>(
        `https://truongnetwwork.bsite.net/api/infor/searchuser`,
        {
          params: { fullname: fullName }, // Use params to send data in the query string
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          setLoadSearch1(false);
          setLoadSearch2(false);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const hanldDltCmtChild = async () => {
      setLoadingPage({ value: 30 });
      setLoadSearch(true);
      setAuthToken(token);
      // const postId = idPost;
      // const userId = id;

      return api
        .get<ResponseData>(
          `https://truongnetwwork.bsite.net/api/infor/searchuser`,
          {
            params: { fullname: fullName }, // Use params to send data in the query string
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setLoadingPage({ value: 100 });
            setData(res.data);

            setLoadSearch(false);
          }
        })
        .catch((err) => console.log(err));
    };
    hanldDltCmtChild();
  }, [fullName]);
  const handleAddF = async (idfriend: any) => {
    setAuthToken(token);
    try {
      const id = idfriend;
      const response = await api.post(
        `https://truongnetwwork.bsite.net/api/Friend/send/${id}`
      );

      if (response.status == 200) {
        hanldDAddF();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  const handleAcceptF = async (idfriend: any) => {
    // setLoadSearch1(true);
    // setAuthToken(token);
    try {
      const id = idfriend;
      const response = await api.post(
        `https://truongnetwwork.bsite.net/api/Friend/accept/${id}`
      );

      if (response.status == 200) {
        hanldDAddF();
      }
    } catch (error) {
      console.log("Login failed", error);
    }
  };
  const handleRemoveF = async (idfriend: any) => {
    setLoadSearch2(true);
    setAuthToken(token);
    try {
      const id = idfriend;
      const response = await api.post(
        `https://truongnetwwork.bsite.net/api/Friend/refuseFriend/${id}`
      );
      if (response.status == 200) {
        hanldDAddF();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <>
      <div className="flex flex-row left-[23rem] top-[50px] relative">
        <div className="  overflow-y-auto ">
          <div className="w-[75vw] py-6 px-2">
            <div className="flex justify-between bg-white py-2 px-2 rounded-lg">
              <div className=" flex justify-start items-center">
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
                  Search Friends
                </h2>
              </div>
            </div>

            <>
              {loadSearch == false ? (
                <>
                  {dataCmt.data.length == 0 ? (
                    <div className=" h-[70vh] mt-10 flex justify-center items-center pb-[150px]">
                      <div className="loaderSearch">
                        <div className="loaderMiniContainer">
                          <div className="barContainer">
                            <span className="bar"></span>
                            <span className="bar bar2"></span>
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 101 114"
                            className="svgIcon"
                          >
                            <circle
                              stroke-width="7"
                              stroke="black"
                              transform="rotate(36.0692 46.1726 46.1727)"
                              r="29.5497"
                              cy="46.1727"
                              cx="46.1726"
                            ></circle>
                            <line
                              stroke-width="7"
                              stroke="black"
                              y2="111.784"
                              x2="97.7088"
                              y1="67.7837"
                              x1="61.7089"
                            ></line>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-10 flex flex-col justify-center items-center">
                      {dataCmt.data.map((item: Comment, index: number) => (
                        <div
                          className="w-[70%] min-[1367px]:w-[65%] h-[90px] bg-white mb-4 rounded-[10px] px-5 pt-5 pb-5  flex justify-between"
                          key={index}
                        >
                          <div className="flex cursor-pointer">
                            <img
                              src={dataCmt.data[index].image}
                              alt=""
                              className="h-[50px] w-[50px] rounded-[50%]"
                              onClick={() =>
                                navigate(
                                  `/personal-user/${dataCmt.data[index].userId}`
                                )
                              }
                            />
                            <div
                              className="ml-4 flex flex-col justify-start text-left"
                              onClick={() =>
                                navigate(
                                  `/personal-user/${dataCmt.data[index].userId}`
                                )
                              }
                            >
                              <span className="text-[12px] font-bold">
                                {item.fullName}
                              </span>
                              <span className="text-[10px] max-w-[100%]">
                                Làm việc tại {item.workPlace} - Sống tại{" "}
                                {item.address}
                              </span>
                              <div
                                className=""
                                onClick={() =>
                                  navigate(
                                    `/personal-user/${dataCmt.data[index].userId}`
                                  )
                                }
                              >
                                {item.gender == false ? (
                                  <span className="text-[10px] max-w-[100%] font-bold">
                                    Giới tính nam
                                  </span>
                                ) : (
                                  <span className="text-[10px] max-w-[100%] font-bold">
                                    Giới tính nữ
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center items-center ml-4">
                            {dataCmt.data[index].statusFriend ===
                            "Thêm bạn bè" ? (
                              <>
                                {loadSearch1 == false ? (
                                  <button
                                    onClick={() => {
                                      handleAddF(item.userId);
                                    }}
                                    className="bg-[#f0f2f5] text-[10px] px-6 py-1 font-bold rounded-[5px] hover:bg-[#456fe6] hover:text-white duration-500"
                                  >
                                    Thêm bạn bè
                                  </button>
                                ) : (
                                  <div className="loaderSe"></div>
                                )}
                              </>
                            ) : dataCmt.data[index].statusFriend ===
                              "Phản Hồi" ? (
                              <div className="flex ">
                                <>
                                  {loadSearch1 == false ? (
                                    <button
                                      onClick={() => {
                                        handleAcceptF(item.userId);
                                      }}
                                      className="bg-[#f0f2f5] text-[10px] px-3 py-1 font-bold rounded-[5px] hover:bg-[#456fe6] hover:text-white duration-500"
                                    >
                                      Chấp nhận
                                    </button>
                                  ) : (
                                    <div className="loaderSe"></div>
                                  )}
                                </>
                                <>
                                  {loadSearch2 == false ? (
                                    <button
                                      onClick={() => {
                                        handleRemoveF(item.userId);
                                      }}
                                      className="bg-[#f0f2f5] text-[10px] px-3 ml-2 py-1 font-bold rounded-[5px] hover:bg-[#456fe6] hover:text-white duration-500"
                                    >
                                      Từ chối
                                    </button>
                                  ) : (
                                    <div className="loaderSe"></div>
                                  )}
                                </>
                              </div>
                            ) : dataCmt.data[index].statusFriend ===
                              "Hủy lời mời" ? (
                              <button className="bg-[#f0f2f5] text-[10px] px-6 py-1 font-bold rounded-[5px] hover:bg-[#456fe6] hover:text-white duration-500">
                                Chờ xác nhận
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  handleRemoveF(item.userId);
                                }}
                                className="bg-[#f0f2f5] text-[10px] px-6 py-1 font-bold rounded-[5px] hover:bg-[#456fe6] hover:text-white duration-500"
                              >
                                Bạn bè
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="mt-10 flex flex-col justify-center items-center">
                    <div className="w-[70%] min-[1367px]:w-[65%] h-[90px] bg-white mb-4 rounded-[10px] px-5 pt-5 pb-5 flex">
                      <div className="w-[50px] h-[50px] ">
                        <Skeleton className="h-[50px] w-[50px] rounded-[50%]" />
                      </div>
                      <div className="w-[50px] h-[50px] ml-4">
                        <Skeleton className="h-[10px] w-[140px]" />
                        <Skeleton className="h-[10px] w-[180px]" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 flex flex-col justify-center items-center">
                    <div className="w-[70%] min-[1367px]:w-[65%] h-[90px] bg-white mb-4 rounded-[10px] px-5 pt-5 pb-5 flex">
                      <div className="w-[50px] h-[50px] ">
                        <Skeleton className="h-[50px] w-[50px] rounded-[50%]" />
                      </div>
                      <div className="w-[50px] h-[50px] ml-4">
                        <Skeleton className="h-[10px] w-[140px]" />
                        <Skeleton className="h-[10px] w-[180px]" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          </div>
        </div>
      </div>
      <div className="w-full h-[100px]"></div>
    </>
  );
};

export default Search;
