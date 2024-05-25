import { useEffect, useState } from "react";
import CardFriend from "./CardFriend/CardFriend";
import Skeleton from "react-loading-skeleton";
import { Empty } from "antd";
interface Props {
  data: any;
}
const RightHome = ({ data }: Props) => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(false); // Set load to false each time component renders
    if (data.success == true) {
      setLoad(true);
    }
  }, [data]);
  return (
    <div className=" py-6  ">
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "700",
          lineHeight: "140%",
          letterSpacing: "-0.05em",
          color: "#456fe6",
          marginLeft: "10px",
          marginBottom: "20px",
        }}
      >
        Add New Friend
      </h2>
      <>
        {load === false ? (
          <div className="flex flex-wrap justify-between">
            <div className="p-1 border-[2px] border-solid border-white rounded-[10px] mb-3">
              <div className="w-[118px] bg-white flex justify-center items-center rounded-[8px] py-8 ">
                <div className="flex flex-col justify-between items-center">
                  <Skeleton className="h-[40px] w-[40px] rounded-[50%] mb-3" />
                  <Skeleton className="h-[10px] w-[100px]" />
                  <Skeleton className="bg-[#f0f2f5] text-[10px] px-6 py-1 font-bold rounded-[5px] hover:bg-[#456fe6] hover:text-white duration-500" />
                </div>
              </div>
            </div>
            <div className="p-1 border-[2px] border-solid border-white rounded-[10px] mb-3">
              <div className="w-[118px] bg-white flex justify-center items-center rounded-[8px] py-8 ">
                <div className="flex flex-col justify-between items-center">
                  <Skeleton className="h-[40px] w-[40px] rounded-[50%] mb-3" />
                  <Skeleton className="h-[10px] w-[100px]" />
                  <Skeleton className="bg-[#f0f2f5] text-[10px] px-6 py-1 font-bold rounded-[5px] hover:bg-[#456fe6] hover:text-white duration-500" />
                </div>
              </div>
            </div>
            <div className="p-1 border-[2px] border-solid border-white rounded-[10px] mb-3">
              <div className="w-[118px] bg-white flex justify-center items-center rounded-[8px] py-8 ">
                <div className="flex flex-col justify-between items-center">
                  <Skeleton className="h-[40px] w-[40px] rounded-[50%] mb-3" />
                  <Skeleton className="h-[10px] w-[100px]" />
                  <Skeleton className="bg-[#f0f2f5] text-[10px] px-6 py-1 font-bold rounded-[5px] hover:bg-[#456fe6] hover:text-white duration-500" />
                </div>
              </div>
            </div>
            <div className="p-1 border-[2px] border-solid border-white rounded-[10px] mb-3">
              <div className="w-[118px] bg-white flex justify-center items-center rounded-[8px] py-8 ">
                <div className="flex flex-col justify-between items-center">
                  <Skeleton className="h-[40px] w-[40px] rounded-[50%] mb-3" />
                  <Skeleton className="h-[10px] w-[100px]" />
                  <Skeleton className="bg-[#f0f2f5] text-[10px] px-6 py-1 font-bold rounded-[5px] hover:bg-[#456fe6] hover:text-white duration-500" />
                </div>
              </div>
            </div>
            <div className="p-1 border-[2px] border-solid border-white rounded-[10px] mb-3">
              <div className="w-[118px] bg-white flex justify-center items-center rounded-[8px] py-8 ">
                <div className="flex flex-col justify-between items-center">
                  <Skeleton className="h-[40px] w-[40px] rounded-[50%] mb-3" />
                  <Skeleton className="h-[10px] w-[100px]" />
                  <Skeleton className="bg-[#f0f2f5] text-[10px] px-6 py-1 font-bold rounded-[5px] hover:bg-[#456fe6] hover:text-white duration-500" />
                </div>
              </div>
            </div>
            <div className="p-1 border-[2px] border-solid border-white rounded-[10px] mb-3">
              <div className="w-[118px] bg-white flex justify-center items-center rounded-[8px] py-8 ">
                <div className="flex flex-col justify-between items-center">
                  <Skeleton className="h-[40px] w-[40px] rounded-[50%] mb-3" />
                  <Skeleton className="h-[10px] w-[100px]" />
                  <Skeleton className="bg-[#f0f2f5] text-[10px] px-6 py-1 font-bold rounded-[5px] hover:bg-[#456fe6] hover:text-white duration-500" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {data.data.length == 0 ? (
              <div className="  flex justify-center items-center">
                <div className="cursor-pointer">
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              </div>
            ) : (
              <div className=" flex  flex-wrap h-auto justify-between">
                {data?.data?.slice(0, 6).map((index: any) => (
                  <CardFriend data={index} />
                ))}{" "}
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default RightHome;
