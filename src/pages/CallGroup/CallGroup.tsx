import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { createRoom } from "../../recoil/initState";
import { useRecoilState } from "recoil";
function randomID(len: any) {
  let result = "";
  if (result) return result;
  const chars =
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  const maxPos = chars.length;
  len = len || 5;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  const urlStr = url.split("?")[1];

  return new URLSearchParams(urlStr);
}
const CallGroup = () => {
  const [, setCreateRoom] = useRecoilState(createRoom);
  const { id } = useParams();
  const { info } = useSelector((state: RootState) => state.info);
  setCreateRoom(false);
  const myMeeting = async (element: any) => {
    // generate Kit Token
    const appID = 2143691367;
    const serverSecret = "9864561fa146539fe74aebc33693f11e";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      id || "",
      randomID(5),
      info.data.fullName
    );
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Coppy link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            id,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
  };

  return (
    <div
      // ref={elementRef}
      className="relative left-[23rem]"
      ref={myMeeting}
      style={{ width: "75vw", height: "100vh" }}
    ></div>
  );
};

export default CallGroup;
