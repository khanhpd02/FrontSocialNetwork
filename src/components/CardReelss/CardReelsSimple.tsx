import { useEffect, useState } from "react";

import { FaUserFriends } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import CustomVideoReels from "../CustomVideo/CustomVideoReels";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { api, setAuthToken } from "../../utils/setAuthToken";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState, updateReels } from "../../recoil/initState";
import {
  parseISO,
  differenceInHours,
  differenceInCalendarDays,
  differenceInMinutes,
} from "date-fns";
interface Props {
  data: any;
}
const CardReelsSimple = ({ data }: Props) => {
  const { info } = useSelector((state: RootState) => state.info);
  const [videos, setVideos] = useState(data.videos);
  const token = useRecoilValue(tokenState);
  const [, setUpdateReelsR] = useRecoilState(updateReels);
  useEffect(() => {
    setVideos(data.videos);
  }, [data.videos]);
  const hanldDltReels = async () => {
    setAuthToken(token);
    return api
      .post(
        `https://truongnetwwork.bsite.net/api/real/DeleteReels?reelIds=${data.id}`
      )
      .then(() => {
        setUpdateReelsR(false);
        toast.error("Đã xóa Reels");
      })
      .catch((err) => console.log(err));
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
  return (
    <div
      className="w-[500px] h-auto bg-white  mb-10 rounded-[10px] flex flex-col-reverse "
      style={{ position: "relative" }}
    >
      <div>
        <div>
          <>
            <>
              <div className="h-[650px] flex justify-center items-center bg-black rounded-[10px] relative">
                {info?.data?.userId === data.userId ? (
                  <div
                    className="absolute top-4 right-4 bg-[#676767] p-4 rounded-[50%] text-white cursor-pointer"
                    onClick={hanldDltReels}
                  >
                    <IoMdClose />
                  </div>
                ) : (
                  <></>
                )}

                <CustomVideoReels src={videos[0]?.link} />
                <div className="flex flex-col absolute bottom-0 left-1">
                  <div className="py-4 px-4 flex justify-between items-center text-white">
                    <div className="flex items-center ">
                      <img
                        src={data.avatarUrl}
                        alt="avatar"
                        className="h-[45px] w-[45px] rounded-[50%]"
                      />
                      <div className=" ml-4 text-left">
                        <span className="text-[18px] font-[500]">
                          {data.fullName}
                        </span>
                        <div className="flex justify-start items-center ">
                          <span className="text-white text-[12px] mr-2 ">
                            {result}
                          </span>
                          <>
                            {data.levelView == 1 ? (
                              <div className="text-white ">
                                {" "}
                                <FaEarthAmericas />
                              </div>
                            ) : (
                              <div className="text-white">
                                {" "}
                                <FaUserFriends />
                              </div>
                            )}
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pb-4 px-6 flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-white text-[15px] ">
                        {data.content}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </>
        </div>
      </div>
    </div>
  );
};

export default CardReelsSimple;
