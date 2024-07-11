import { Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/setAuthToken";
import { useEffect, useState } from "react";
// import { Skeleton } from "react-loading-skeleton";
interface Comment {
  nickname: string;
  fullName: string;
  userId: string;
  image: string;
  levelFriend: any;
}
interface ResponseData {
  data: Comment[];
  success: boolean;
  message: string;
}
interface ResponseDataRQ {
  data: Comment[];
  success: boolean;
  message: string;
}
const ListFriendPersonal = () => {
  const navigate = useNavigate();
  const [, setLoadCmt1] = useState(false);
  const [, setLoadSearch1] = useState(false);
  const [, setLoadSearch2] = useState(false);
  const [, setLoad] = useState(false);
  const [data, setData] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });
  const [dataRQ, setDataRQ] = useState<ResponseDataRQ>({
    data: [],
    success: false,
    message: "",
  });
  const loadData = async () => {
    // Gọi API để lấy dữ liệu

    await api
      .get<ResponseData>(`https://truongnetwwork.bsite.net/api/Friend/getAll`)
      .then((response) => {
        // Cập nhật dữ liệu vào state
        if (response.status === 200) {
          setLoadCmt1(true);
          setLoad(true);
          setLoadSearch1(false);
          setLoadSearch2(false);
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const loadDataRQ = async () => {
    // Gọi API để lấy dữ liệu

    await api
      .get<ResponseData>(
        `https://truongnetwwork.bsite.net/api/Friend/getAllFriendRequest`
      )
      .then((response) => {
        // Cập nhật dữ liệu vào state
        if (response.status === 200) {
          setDataRQ(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handleAcceptF = async (idfriend: any) => {
    try {
      const id = idfriend;
      const response = await api.post(
        `https://truongnetwwork.bsite.net/api/Friend/accept/${id}`
      );
      console.log(response);
      if (response.status == 200) {
        loadData();
        loadDataRQ();
      }
    } catch (error) {
      console.log("Login failed", error);
    }
  };
  const handleRemoveF = async (idfriend: any) => {
    setLoadSearch2(true);

    try {
      const id = idfriend;
      const response = await api.post(
        `https://truongnetwwork.bsite.net/api/Friend/refuseFriend/${id}`
      );
      console.log(response);
      if (response.status == 200) {
        loadData();
        loadDataRQ();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  useEffect(() => {
    loadData();
    loadDataRQ(); // loadDataUserCmt();
  }, []);
  return (
    <div className=" w-[20%] h-[fit-content] mt-4 flex justify-end px-4 ">
      <div className="w-full">
        <div className="bg-white w-[100%]  rounded-lg py-2">
          <div>
            <p className="font-[600]">List Friend</p>
            {data.data.map((_, index: number) => (
              <Link
                to={`/personal-user/${data.data[index].userId}`}
                className="w-[100%] h-auto rounded-[10px] flex justify-between items-center mb-2 bg-white  hover:bg-slate-50 px-2"
              >
                <div className="flex justify-start items-center">
                  <img
                    src={data.data[index].image}
                    alt=""
                    className="tab-img"
                  />
                  <div>
                    {" "}
                    <p className="font-bold text-[14px] text-[#050505]">
                      {data.data[index].fullName}
                    </p>
                    <p className=" text-[14px] text-[#c1c0c0] text-start">
                      @ {data.data[index].nickname}
                    </p>
                  </div>
                </div>
                <button className="bg-[#f0f2f5] text-[10px] px-2 py-1 font-bold rounded-[5px]   duration-500 ml-4  min-w-[70px]">
                  {data.data[index].levelFriend}
                </button>
              </Link>
            ))}
            <div
              className="cursor-pointer"
              onClick={() => navigate("/list-friend")}
            >
              <p className="text-[12px] hover:underline">View all friends</p>
            </div>
          </div>
        </div>
        {dataRQ?.data.length !== 0 && (
          <div className="bg-white w-[100%]  rounded-lg py-2 mt-6">
            <div>
              {dataRQ.data.map((_, index: number) => (
                <div className="w-[100%] h-auto rounded-[10px] flex justify-start items-center mb-2 bg-white py-2 hover:bg-slate-50">
                  <img
                    src={dataRQ.data[index].image}
                    alt=""
                    className="tab-img"
                    onClick={() =>
                      navigate(`/personal-user/${dataRQ.data[index].userId}`)
                    }
                  />
                  <div>
                    {" "}
                    <p
                      className="font-bold text-[14px] text-[#050505]"
                      onClick={() =>
                        navigate(`/personal-user/${dataRQ.data[index].userId}`)
                      }
                    >
                      {dataRQ.data[index].fullName}
                    </p>
                    <p
                      className=" text-[14px] text-[#c1c0c0] text-start"
                      onClick={() =>
                        navigate(`/personal-user/${dataRQ.data[index].userId}`)
                      }
                    >
                      @ {dataRQ.data[index].nickname}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <button
                      className="bg-[#f0f2f5] text-[10px] px-2 py-1 font-bold rounded-[5px]   duration-500 ml-4 hover:bg-[#93fea3] min-w-[70px]"
                      onClick={() => {
                        handleAcceptF(dataRQ.data[index].userId);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-[#f0f2f5] text-[10px] px-2 py-1 font-bold rounded-[5px]   duration-500 ml-4 hover:bg-[#fe93b3]  min-w-[70px]"
                      onClick={() => {
                        handleRemoveF(dataRQ.data[index].userId);
                      }}
                    >
                      Refuse
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListFriendPersonal;
