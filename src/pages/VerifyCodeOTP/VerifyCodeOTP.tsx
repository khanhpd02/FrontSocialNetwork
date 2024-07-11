import React, { FC, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
// Import Recoil atom
import { ModeChange } from "../../recoil/initState";
import "./style.css";
import { EmailFP } from "../../recoil/initState";
interface Props {}

const VerifyCodeOTP: FC<Props> = () => {
  // const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [, setModeChangeRE] = useRecoilState(ModeChange);
  const inputRefs = [
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
  ];
  const navigate = useNavigate();
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");
  const [pin5, setPin5] = useState("");
  const [pin6, setPin6] = useState("");
  // const [pin, setPin] = useState("0");
  const emailFP = useRecoilValue(EmailFP);
  useEffect(() => {
    if (emailFP === "") navigate("/login");
  }, []);
  const handleInputChange = (index: number, value: string) => {
    value = value.replace(/[^0-9]/g, "");
    switch (index) {
      case 0:
        setPin1(value);
        break;
      case 1:
        setPin2(value);
        break;
      case 2:
        setPin3(value);
        break;
      case 3:
        setPin4(value);
        break;
      case 4:
        setPin5(value);
        break;
      case 5:
        setPin6(value);
        break;
      default:
        break;
    }

    // Move to the next input field if the current input has a value
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };
  const handlePin = async () => {
    const pin = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
    const email = emailFP;
    try {
      const response = await axios.post(
        "https://truongnetwwork.bsite.net/api/auth/VerifyPinForgotPassword",
        {
          email,
          pin,
        }
      );
      if (response.data.data.message == "Xác thực thành công") {
        toast.success("Xác thực thành công!");
        setModeChangeRE(false);
        // Ẩn toast
        navigate("/forgot-password");
      } else {
        toast.error("Xác thực thất bại!");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  //
  return (
    <div className="w-full h-[100vh] flex justify-center items-center flex-col ">
      <div className="container2 flex justify-center items-center">
        <div>
          <h1 className="title text-white">Nhập OTP</h1>
          <form id="otp-form">
            {inputRefs.map((inputRef, index) => (
              <input
                key={index}
                type="text"
                className="otp-input"
                maxLength={1}
                placeholder={`${index + 1}`}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, e.target.value)
                }
                ref={(inputRef as React.RefObject<HTMLInputElement>) || null}
              />
            ))}
          </form>
          <button
            id="verify-btn"
            className="cursor-pointer"
            onClick={handlePin}
          >
            Xác nhận OTP
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default VerifyCodeOTP;
