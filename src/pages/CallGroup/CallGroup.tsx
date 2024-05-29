import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
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
  const roomID = getUrlParams().get("roomID") || randomID(5);
  const myMeeting = async (element: any) => {
    // generate Kit Token
    const appID = 67139489;
    const serverSecret = "44e3c3e847572cc21bfe9f5f9f3410a5";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );
    console.log(234);
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    console.log(zp);
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
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
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
