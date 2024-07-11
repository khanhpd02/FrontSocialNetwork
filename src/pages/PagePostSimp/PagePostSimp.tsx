import { useEffect, useState } from "react";
import { api, setAuthToken } from "../../utils/setAuthToken";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/initState";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import CardPost from "../../components/CardPosts/CardPost/CardPost";

interface Info {
  content: string;
  images: { linkImage: string; createDate: string }[]; // Đặt kiểu cho mảng images
  linkImage?: string;
  createDate: string;
  userId: string;
  id: string;
  countLike: any;
  islike: boolean;
  firebaseData: [];
  address: string;
  length: number;
}
interface ResponseDataInfo {
  data: Info[];
  success: boolean;
  message: string;
}
const PagePostSimp = () => {
  const [, setLoadCmt1] = useState(false);
  const [, setLoadSearch1] = useState(false);
  const [, setLoadSearch2] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const token = useRecoilValue(tokenState);
  const [data, setData] = useState<ResponseDataInfo>({
    data: [],
    success: false,
    message: "",
  });
  let id = "";
  let cmtid = "";
  const path = useParams();
  if (path.cmtid == undefined) {
    id = path.id || "";
  } else {
    id = path.id || "";
    cmtid = path.cmtid || "";
  }

  const loadDataInfo = async () => {
    // Gọi API để lấy dữ liệu
    setAuthToken(token);
    await api
      .get(`https://truongnetwwork.bsite.net/api/post/${id}`)
      .then((response) => {
        // Cập nhật dữ liệu vào state
        if (response.status === 200) {
          setLoadCmt1(true);
          setLoadSearch1(false);
          setLoadSearch2(false);
          setData(response.data.data);
          setLoadData(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Truy cập thuộc tính "firebaseData"

  useEffect(() => {
    loadDataInfo();
    // loadDataUserCmt();
  }, []);
  return (
    <>
      {loadData == false ? (
        <div className="flex relative left-[20rem] top-[100px] w-[58vw]">
          <div className="w-[75vw] flex justify-center  items-center min-[1920px]:pl-60 pl-16">
            {" "}
            <div className=" h-[600px] w-[500px]  ml-[0%] bg-white  rounded-[10px]">
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
              <Skeleton className=" h-[380px] w-[500px] mr-[30%] ml-[0%]" />
              <div className="px-2 py-2">
                <div className="flex justify-start items-center">
                  <Skeleton className="h-[45px] w-[90px] rounded-[30px]" />{" "}
                  <Skeleton className="h-[45px] w-[90px] rounded-[30px] ml-2" />{" "}
                </div>
              </div>
              <div className="px-2 py-2">
                <div className="flex justify-start items-center">
                  <Skeleton className="h-[35px] w-[35px] rounded-[50%]" />
                  <Skeleton className="h-[30px] w-[420px] rounded-[30px] ml-2" />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row relative left-[23rem] top-[50px] w-[58vw] min-[1920px]:pl-28 ">
          <div className="  ">
            <div className="w-[51vw] flex justify-center mt-10">
              <CardPost data={data} cmtid={cmtid} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PagePostSimp;
