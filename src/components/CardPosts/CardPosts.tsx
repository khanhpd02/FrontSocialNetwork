import React, { useEffect, useState } from "react";
import CardPost from "./CardPost/CardPost";
import CardPostShare from "./CardPostShare/CardPostShare";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Empty } from "antd";
import { useNavigate } from "react-router-dom";
interface Props {
  data: any;
}

const CardPosts = ({ data }: Props) => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoad(false); // Set load to false each time component renders
    if (data.success == true) {
      setLoad(true);
    }
  }, [data]);
  return (
    <div className="w-[70%] py-6  ">
      <>
        {load === false ? (
          <div className=" h-[600px] w-[500px] mr-[30%] ml-[0%] bg-white  rounded-[10px]">
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
        ) : (
          <>
            {data.data.length == 0 ? (
              <div className=" w-[500px] h-[500px] flex justify-center items-center border-[1px] border-dashed border-[#b4c7fa] rounded-[10px]">
                <div
                  className="cursor-pointer"
                  onClick={() => navigate("/add-post")}
                >
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              </div>
            ) : (
              <>
                {/* map data và render các CardPost hoặc CardPostShare */}
                {data?.data?.map((item: any, index: number) => (
                  <React.Fragment key={index}>
                    {item.idShare === undefined ? (
                      <CardPost data={item} cmtid="" />
                    ) : (
                      <CardPostShare data={item} />
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default CardPosts;
