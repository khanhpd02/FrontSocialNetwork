interface Props {
  title: string;
  containerStyles: string;
  iconRight: any;
  type: any;
  onClick: any;
}
const CustomButton = ({
  title,
  containerStyles,
  iconRight,
  type,
  onClick,
}: Props) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`inline-flex items-center text-base ${containerStyles}`}
    >
      {title}

      {iconRight && <div className="ml-2">{iconRight}</div>}
    </button>
  );
};

export default CustomButton;
