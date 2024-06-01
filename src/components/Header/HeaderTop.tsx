import React, { useState } from "react";

import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";

const HeaderTop = () => {
  const navigate = useNavigate();

  const [nameSearch, setNameSearch] = useState("");
  const { info } = useSelector((state: RootState) => state.info);

  // useEffect(() => {
  //   dispatch(fetchInfo());
  // }, []);

  const handleSend = () => {
    navigate(`/search/${nameSearch}`);
  };
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="w-full bg-white h-[60px] fixed z-10">
      <div className="flex justify-between my-auto items-center">
        <div className="w-[340px] h-[60px]  flex justify-end items-center ">
          {/* <img
            src={Logo}
            alt=""
            className="w-[50px] pl-2 cursor-pointer"
            onClick={() => navigate("/")}
          /> */}
          <p
            className="text-[#443e44] text-[30px] font-[700]"
            onClick={() => navigate("/")}
          >
            KTCSocial
          </p>
        </div>
        <div className="InputContainer flex min-[1920px]:w-[60%] w-[90%]">
          <div className="h-[40px] w-[40px] flex justify-center items-center bg-[#f0f2f5] rounded-l-[30px]">
            <FiSearch className=" transform -translate-y-1/2 text-gray-500 mt-4" />
          </div>
          <input
            placeholder="Search.."
            id="input"
            className="inputSearchF bg-[#f0f2f5] rounded-r-[30px]"
            name="text"
            type="text"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            onKeyDown={handleKey}
          />
        </div>
        {/* <div className="w-[400px] h-[60px]  flex  justify-around items-center">
          <Link to="/add-post">
            <img
              src={LogoCreate}
              alt=""
              className={`cursor-pointer hover:bg-[#f3f2f2] py-2 px-6 rounded-lg ${
                isS ? "bg-[#f3f2f2]" : ""
              }`}
            />
          </Link>
          <div onClick={hanldeNaviHome}>
            <img
              src={LogoHome}
              alt=""
              className={`cursor-pointer hover:bg-[#f3f2f2] py-2 px-6 rounded-lg ${
                isHome && isHomeR == viewHomeR ? "bg-[#f3f2f2]" : ""
              }`}
            />
          </div>
          <div onClick={hanldeNaviReels}>
            <img
              src={LogoWa}
              alt=""
              className={`cursor-pointer hover:bg-[#f3f2f2] py-2 px-6 rounded-lg ${
                isHome && isRR == viewHomeR ? "bg-[#f3f2f2]" : ""
              }`}
            />
          </div>
        </div> */}
        <div className="w-[340px] h-[60px]  flex justify-start items-center ">
          {/* <ButtonHeader classNames="tab" to="/chat">
            <svg
              viewBox="0 0 12 13"
              width="20"
              height="20"
              fill="currentColor"
              className="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq "
            >
              <g fill-rule="evenodd" transform="translate(-450 -1073)">
                <path d="m459.603 1077.948-1.762 2.851a.89.89 0 0 1-1.302.245l-1.402-1.072a.354.354 0 0 0-.433.001l-1.893 1.465c-.253.196-.583-.112-.414-.386l1.763-2.851a.89.89 0 0 1 1.301-.245l1.402 1.072a.354.354 0 0 0 .434-.001l1.893-1.465c.253-.196.582.112.413.386M456 1073.5c-3.38 0-6 2.476-6 5.82 0 1.75.717 3.26 1.884 4.305.099.087.158.21.162.342l.032 1.067a.48.48 0 0 0 .674.425l1.191-.526a.473.473 0 0 1 .32-.024c.548.151 1.13.231 1.737.231 3.38 0 6-2.476 6-5.82 0-3.344-2.62-5.82-6-5.82"></path>
              </g>
            </svg>
          </ButtonHeader>
          <ButtonHeader classNames="tab" to="/notification">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
              className="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq "
            >
              <path d="M3 9.5a9 9 0 1 1 18 0v2.927c0 1.69.475 3.345 1.37 4.778a1.5 1.5 0 0 1-1.272 2.295h-4.625a4.5 4.5 0 0 1-8.946 0H2.902a1.5 1.5 0 0 1-1.272-2.295A9.01 9.01 0 0 0 3 12.43V9.5zm6.55 10a2.5 2.5 0 0 0 4.9 0h-4.9z"></path>
            </svg>
          </ButtonHeader> */}
          <div
            onClick={() => navigate("/add-post")}
            className="bg-[#456fe6] text-white py-2 px-6 rounded-[20px] cursor-pointer hover:bg-[#458be6]"
          >
            <p>Create</p>
          </div>
          <Link to="/personal">
            {" "}
            <img src={info?.data?.image} alt="" className="tab-img " />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
