import { useEffect, useState } from "react";
import "./style.css";
import type { RadioChangeEvent, DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import { Radio } from "antd";
import { useAppDispatch } from "../../hook/hook";
import { api, setAuthToken } from "../../utils/setAuthToken";
import { fetchInfo } from "../../redux/features/info/infoSlice";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isLoadmodalOpened,
  ismodalOpened,
  tokenState,
} from "../../recoil/initState";
import { IoMdClose } from "react-icons/io";
import API from "../../services/API";
import moment from "moment";
interface Props {
  info: any;
}
interface DataItem {
  code: string;
  fullName: string;
  // Add other properties as necessary
}

interface DataProvide {
  data: DataItem[];
}
interface DataDistrict {
  data: DataItem[];
}
interface DataWar {
  data: DataItem[];
}
function disabledDate(current: any) {
  // Disable all dates after today
  return current && current > moment().endOf("day");
}
const EditInfo = ({ info }: Props) => {
  const token = useRecoilValue(tokenState);

  const [isLoading, setIsLoading] = useState(false);
  const [FullName, setFullName] = useState(info?.data?.fullName);
  const [NickName, setNickName] = useState(info?.data?.nickname);
  const [Career, setCareer] = useState(info?.data?.career);
  const [WorkPlace, setWorkPlace] = useState(info?.data?.workPlace);
  const [DateOfBirth, setDateOfBirth] = useState(info?.data?.dateOfBirth);
  const [PhoneNumber, setPhoneNumber] = useState(info?.data?.phoneNumber);
  const [File, setSelectedFile] = useState<File | null>(null);
  const [FileBackground, setSelectedFileBackground] = useState<File | null>(
    null
  );
  const [Gender, setGender] = useState(info?.data?.gender);
  const [value, setValue] = useState(info?.data?.gender);
  const [Address, setAddress] = useState("");
  const dispatch = useAppDispatch();
  const [, setModalOpened] = useRecoilState(ismodalOpened);
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date);
    setDateOfBirth(dateString);
  };

  const onChangeR = (e: RadioChangeEvent) => {
    setGender(e.target.value);
    setValue(e.target.value);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleFileChangeBg = (event: any) => {
    const file = event.target.files[0];
    setSelectedFileBackground(file);
  };
  const base64UrlDecode = (base64Url: any) => {
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return atob(base64);
  };

  const decodeToken = (token: any) => {
    const [header, payload, signature] = token.split(".");
    const decodedHeader = JSON.parse(base64UrlDecode(header));
    const decodedPayload = JSON.parse(base64UrlDecode(payload));

    return {
      header: decodedHeader,
      payload: decodedPayload,
      signature: signature,
    };
  };
  const tokenDecode = localStorage.getItem("token") || "";
  const idToken = decodeToken(tokenDecode);
  const UserId = idToken.payload.id;
  //
  const [, setLoadModalOpened] = useRecoilState(isLoadmodalOpened);
  const handleLUpdate = async () => {
    setIsLoading(true);
    try {
      // Tạo formData để chứa dữ liệu và file
      const File1 = new FormData();
      const File2 = new FormData();
      if (File) {
        File1.append("File", File);
      }

      if (FileBackground) {
        File2.append("File", FileBackground);
      }

      const data = {
        UserId: UserId,
        FullName: FullName,
        WorkPlace: WorkPlace,
        Gender: Gender,

        PhoneNumber: PhoneNumber,
        File: File,
        Direction: Address,
        DateOfBirth: DateOfBirth,
        Wards: nameWa,
        Districts: nameDi,
        Provinces: nameCi,
        FileBackground: FileBackground,
        Career: Career,
        Nickname: NickName,
      };

      setAuthToken(token);

      try {
        const res = await api.post(API.EDIT_INFO, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(res);
        setLoadModalOpened(false);
        dispatch(fetchInfo());
        setModalOpened(true);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    } catch (error) {
      console.error("Add sai!", error);
    }
  };
  //

  const [dataProvide, setDataProvide] = useState<DataProvide | null>(null);
  const [dataDistrict, setDataDistrict] = useState<DataDistrict | null>(null);
  const [dataWard, setDataWard] = useState<DataWar | null>(null);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict1, setSelectedDistrict1] = useState("01");
  const [selectedWard, setSelectedWard] = useState("01");

  const [nameCi, setNameCi] = useState(info?.data?.provinces);
  const [nameDi, setNameDi] = useState(info?.data?.districts);
  const [nameWa, setNameWa] = useState(info?.data?.wards);

  const loadDataProvide = async () => {
    // Gọi API để lấy dữ liệu
    setAuthToken(token);
    await api
      .get(`https://truongnetwwork.bsite.net/api/Provinces/getAllProvinces`)
      .then((response) => {
        // Cập nhật dữ liệu vào state
        if (response.status === 200) {
          setDataProvide(response.data);
        }
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };
  const loadDataDistrict = async () => {
    // Gọi API để lấy dữ liệu

    await api
      .get(
        `https://truongnetwwork.bsite.net/api/Provinces/getDistrictsByProvinceId/${selectedCity}`
      )
      .then((response) => {
        // Cập nhật dữ liệu vào state
        if (response.status === 200) {
          setDataDistrict(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    loadDataDistrict();
    // loadDataUserCmt();
  }, [selectedCity]);
  const loadDataWard = async () => {
    // Gọi API để lấy dữ liệu

    await api
      .get(
        `https://truongnetwwork.bsite.net/api/Provinces/getWardsByDistrictId/${selectedDistrict1}`
      )
      .then((response) => {
        // Cập nhật dữ liệu vào state
        if (response.status === 200) {
          setDataWard(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    loadDataWard();
  }, [selectedDistrict1]);
  useEffect(() => {
    loadDataProvide();
    // loadDataUserCmt();
  }, []);
  return (
    <div
      className=" w-[auto] bg-[#e2e8f0] h-[100vh] flex justify-center items-center"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(158, 158, 158, 0.5)",
        width: "100%",
        height: "100%",
        zIndex: 999,
        display: "flex",
        transition: "width 0.3s ease, height 0.3s ease",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className=" h-[90%] w-[95%] flex justify-center">
        <div className="absolute " style={{ top: 3, right: 10 }}>
          <div
            className="text-[25px] p-2 cursor-pointer hover:bg-[#f2f2f2] rounded-[50%] duration-500"
            onClick={() => setModalOpened(true)}
          >
            <IoMdClose />
          </div>
        </div>
        <form className="flex flex-col bg-white  p-4 shadow-sm h-[100%] w-[70%] rounded-l-[10px]">
          <h2 className="text-[#56fe6] font-bold text-[30px]">
            Edit Information
          </h2>
          <div className="w-full  py-1 mt-1   flex px-[20px] justify-start items-center">
            <p className="border-[1px] border-solid border-[#6eb7ed] py-[5px] px-[12px] mr-2 rounded-full font-bold text-[#6eb7ed]">
              1
            </p>
            <p className="text-black font-bold">Personal Information</p>
          </div>
          <div className="mt-1 flex justify-around ">
            <div className="w-[30%]">
              <label className="text-gray-600 text-sm">Name</label>
              <input
                placeholder="Your name"
                className="w-full  rounded-md border-[#cdcdcd] border-solid border-[1px] outline-[#6eb7ed] px-2 py-1"
                type="text"
                value={FullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="w-[30%]">
              <label className="text-gray-600 text-sm">Nick name</label>
              <input
                placeholder="Your Nickname"
                className="w-full  rounded-md border-[#cdcdcd] border-solid border-[1px]  outline-[#6eb7ed] px-2 py-1"
                type="text"
                value={NickName}
                onChange={(e) => setNickName(e.target.value)}
              />
            </div>
            <div className="w-[30%]">
              <label className="text-gray-600 text-sm">WorkPlace</label>
              <input
                placeholder="Your WorkPlace"
                className="w-full  rounded-md border-[#cdcdcd] border-solid border-[1px]  outline-[#6eb7ed] px-2 py-1"
                type="text"
                value={WorkPlace}
                onChange={(e) => setWorkPlace(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-1 flex justify-around">
            <div className="w-[30%]">
              <label htmlFor="buttondisplay" className="text-gray-600 text-sm">
                Date
              </label>
              <DatePicker
                disabledDate={disabledDate}
                onChange={onChange}
                placeholder="Birth Day"
                className="w-full pl-[4.5rem] pr-6  rounded-md border-[#cdcdcd] border-solid border-[1px]  outline-[#6eb7ed] px-2 py-1"
              />
            </div>
            <div className="w-[30%]">
              <label className="text-gray-600 text-sm">Career</label>
              <input
                placeholder="Your Career"
                className="w-full  rounded-md border-[#cdcdcd] border-solid border-[1px]  outline-[#6eb7ed] px-2 py-1"
                type="text"
                value={Career}
                onChange={(e) => setCareer(e.target.value)}
              />
            </div>
            <div className="bg-white  rounded-lg w-[30%]">
              <label className="text-gray-600 text-sm">Phone number</label>
              <div className="relative max-w-xs text-gray-500">
                <input
                  type="number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  min={0}
                  value={PhoneNumber}
                  placeholder="+1 (555) 000-000"
                  className="w-full pl-[1em] pr-3 py-1 appearance-none bg-transparent outline-none border focus:border-[#6eb7ed] shadow-sm rounded-md "
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between pr-5">
            <div className="">
              <div className="w-full  py-1 mt-3 flex px-[20px] justify-start items-center">
                <p className="border-[1px] border-solid border-[#6eb7ed] py-[5px] px-[12px] mr-2 rounded-full font-bold text-[#6eb7ed]">
                  2
                </p>
                <p className="text-black font-bold">Avatar User</p>
              </div>

              <form className="file-upload-form mt-1 pl-6">
                {/* <label for="file" className="file-upload-label"> */}
                <label className="file-upload-label">
                  <div className="file-upload-design">
                    <div className="loader1"></div>
                  </div>
                  <input id="file" type="file" onChange={handleFileChange} />
                </label>
              </form>
            </div>
            <div className="">
              <div className="w-full  py-1 mt-3 flex px-[20px] justify-start items-center">
                <p className="border-[1px] border-solid border-[#6eb7ed] py-[5px] px-[12px] mr-2 rounded-full font-bold text-[#6eb7ed]">
                  3
                </p>
                <p className="text-black font-bold">Background User</p>
              </div>

              <form className="file-upload-form mt-1 pl-6">
                {/* <label for="filebg" className="file-upload-label"> */}
                <label className="file-upload-label">
                  <div className="file-upload-design">
                    <div className="loader1"></div>
                  </div>
                  <input
                    id="filebg"
                    type="file"
                    onChange={handleFileChangeBg}
                  />
                </label>
              </form>
            </div>
            <div className="">
              <div className="w-full  py-1 mt-3 flex px-[20px] justify-start items-center">
                <p className="border-[1px] border-solid border-[#6eb7ed] py-[5px] px-[12px] mr-2 rounded-full font-bold text-[#6eb7ed]">
                  4
                </p>
                <p className="text-black font-bold">Gender</p>
              </div>

              <Space
                direction="horizontal"
                className="my-4 w-[100%] flex justify-around mt-6 ml-[20px]"
              >
                <Radio.Group
                  onChange={onChangeR}
                  value={value}
                  className="border-solid border-[1px] border-[#b8b8b8] p-2 rounded-[10px] flex"
                >
                  <Radio value={false}>Nam</Radio>
                  <Radio value={true}>Nữ</Radio>
                </Radio.Group>
              </Space>
            </div>
          </div>
          <div className="w-full  py-1  flex px-[20px] justify-start items-center">
            <p className="border-[1px] border-solid border-[#6eb7ed] py-[5px] px-[12px] mr-2 rounded-full font-bold text-[#6eb7ed]">
              5
            </p>
            <p className="text-black font-bold">Address Information</p>
          </div>
          <div>
            <div className=" w-[100%] flex justify-center items-center mt-3">
              <form className="max-w-[200px] mx-auto">
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    const selectedIndex = e.target.selectedIndex;
                    if (selectedIndex !== -1) {
                      const selectedOption = e.target.options[selectedIndex];
                      const fullName = selectedOption.text;
                      setNameCi(fullName);
                    }
                    // setCity(e.target.options[e.target.selectedIndex].text);
                  }}
                  value={selectedCity}
                >
                  <option selected>Choose a provides</option>
                  {dataProvide?.data?.map((item: DataItem, index: number) => (
                    <option value={item.code} key={index}>
                      {item.fullName}
                    </option>
                  ))}
                </select>
              </form>
              <form className="max-w-[200px] mx-auto">
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    setSelectedDistrict1(e.target.value);
                    const selectedIndex = e.target.selectedIndex;
                    if (selectedIndex !== -1) {
                      const selectedOption = e.target.options[selectedIndex];
                      const fullName = selectedOption.text;
                      setNameDi(fullName);
                    }
                  }}
                  value={selectedDistrict1}
                >
                  <option selected>Choose a district</option>
                  {dataDistrict?.data?.map((_, index: any) => (
                    <option value={dataDistrict.data[index]?.code} key={index}>
                      {dataDistrict.data[index]?.fullName}
                    </option>
                  ))}
                </select>
              </form>
              <form className="max-w-[200px] mx-auto">
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    setSelectedWard(e.target.value);
                    const selectedIndex = e.target.selectedIndex;
                    if (selectedIndex !== -1) {
                      const selectedOption = e.target.options[selectedIndex];
                      const fullName = selectedOption.text;
                      setNameWa(fullName);
                    }
                    // setCity(e.target.options[e.target.selectedIndex].text);
                  }}
                  value={selectedWard}
                >
                  <option selected className="w-[200px]">
                    Choose a district
                  </option>
                  {dataWard?.data?.map((_, index: any) => (
                    <option value={dataWard.data[index]?.code} key={index}>
                      {dataWard.data[index]?.fullName}
                    </option>
                  ))}
                </select>
              </form>
            </div>
            <textarea
              placeholder="Your address"
              className="w-[90%] mt-4 rounded-md border-[#cdcdcd] border-solid border-[1px] outline-[#6eb7ed] px-6 py-1"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-center mt-2">
            <div
              className="button1 w-[18%] justify-center"
              onClick={handleLUpdate}
            >
              {isLoading ? (
                <div className="loader"></div>
              ) : (
                <>
                  <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                          fill="currentColor"
                          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <span>Send</span>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInfo;
