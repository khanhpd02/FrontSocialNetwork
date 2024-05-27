import React, { useEffect, memo, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTop from "../components/Header/HeaderTop";

interface IProps {
  children: ReactNode;
}
const PersonalPage: React.FC<IProps> = ({ children }) => {
  const history = useNavigate();
  // const { setUser } = ChatState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token === null) {
      // Kiểm tra nếu hasInfor không tồn tại hoặc có giá trị rỗng
      history("/login");
    }
  }, [token]);
  useEffect(() => {
    const hasInfor = localStorage.getItem("hasInfor");
    if (hasInfor == "false") {
      // Kiểm tra nếu hasInfor không tồn tại hoặc có giá trị rỗng
      history("/add-info");
    }
  }, []);

  return (
    <div
      className="flex h-[100%]"
      style={{
        background: "#f0f2f5",
        display: "flex",
      }}
    >
      <HeaderTop />

      <>{children}</>
    </div>
  );
};

export default memo(PersonalPage);
