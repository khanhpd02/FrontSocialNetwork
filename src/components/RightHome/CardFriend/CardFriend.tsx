import { useNavigate } from "react-router-dom";
interface Props {
  data: any;
}
const CardFriend = ({ data }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="p-1 border-[2px] border-solid border-white rounded-[10px] mb-3">
      <div className="w-[118px] bg-white flex justify-center items-center rounded-[8px] py-8 ">
        <div className="flex flex-col justify-between items-center cursor-pointer">
          <img
            src={data.image}
            alt="avatar"
            className="h-[40px] w-[40px] rounded-[50%] mb-3"
            onClick={() => navigate(`/personal-user/${data.userId}`)}
          />
          <span
            className="text-[12px] font-medium mb-3"
            style={{ lineHeight: "140%" }}
            onClick={() => navigate(`/personal-user/${data.userId}`)}
          >
            {data.fullName}
          </span>
          <button className="bg-[#f0f2f5] text-[10px] px-6 py-1 font-bold rounded-[5px] hover:bg-[#456fe6] hover:text-white duration-500">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardFriend;
