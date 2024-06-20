import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../../recoil/initState";
import { useRecoilState } from "recoil";
const JoinCallGroup = () => {
  const [value, setValue] = useState("");
  const naviate = useNavigate();
  const [, setCreateRoom] = useRecoilState(createRoom);
  const joinRoom = useCallback(() => {
    // Navigate to the room first
    setCreateRoom(true);
    window.location.replace(`/room/${value}`);
  }, [naviate, value]);

  return (
    <div className="flex flex-row relative left-[23rem]  pt-20 justify-center items-center">
      <div className="w-[75vw] h-[80vh]  flex justify-center items-center">
        <div className="flex flex-col justify-center items-center h-[300px] w-[400px]  mb-20">
          <div className="relative w-[300px] min-w-[200px] h-10 mb-4">
            <input
              className="peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal  outline-none  disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-ơ"
              placeholder="Room ID"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-[#456fe6] text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCallGroup;
