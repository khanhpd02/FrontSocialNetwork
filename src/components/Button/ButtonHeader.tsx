import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  classNames: string;
  to: string;
  nameButton?: string;
  children?: ReactNode; // Thêm thuộc tính children vào Props
}

const ButtonHeader: React.FC<Props> = ({
  classNames,
  to,
  nameButton,
  children,
}: Props) => {
  return (
    <Link to={to} className={classNames}>
      {children || nameButton || "Default Button Name"}{" "}
      {/* Sử dụng children nếu có, nếu không sử dụng nameButton, nếu cả hai đều không có, sử dụng Default */}
    </Link>
  );
};

export default ButtonHeader;
