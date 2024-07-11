import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const createRoom = atom({
  key: 'createRoom',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const avatarRC1 = atom({
  key: "avatarRC",
  default:  "",
});
export const tokenState = atom({
  key: "tokenState",
  default: localStorage.getItem("token") || "",
});
export const messageErrorLogin = atom({
  key: "ErrorMessage",
  default: "",
});
export const initState = atom({
  key: "initText",
  default: "",
});
export const Email = atom({
  key: "email",
  default: "",
});
export const Password = atom({
  key: "password",
  default: "",
});
export const EmailRegis = atom({
  key: "emailRegis",
  default: "",
});
export const EmailFP = atom({
  key: "EmailFP",
  default: "",
});
export const ModeChange = atom({
  key: "ModeChange",
  default: true,
});
export const ChatCheck = atom({
  key: "ChatCheck",
  default: "false",
});
export const UpdatePost = atom({
  key: "UpdatePost",
  default: false,
});
export const Reload = atom({
  key: "Reload",
  default: 0,
});
export const ReloadLike = atom({
  key: "ReloadLike",
  default: 0,
});
export const CallGroupR = atom({
  key: "CallGroupR",
  default: "vg2sd",
});
export const SearChChat = atom({
  key: "SearChChat",
  default: "false",
});
// 0 la mặc định, 1 là share, 2 là edit
export const ShareS = atom({
  key: "Shares",
  default: "0",
});
export const SharePS = atom({
  key: "SharePS",
  default: "0",
});
export const ViewHome = atom({
  key: "ViewHome",
  default: true,
});
export const isChatR = atom({
  key: "isChatR",
  default: true,
});
export const isUpdatePost = atom({
  key: "isUpdatePost",
  default: true,
});
export const isSharePost = atom({
  key: "isSharePost",
  default: true,
});
export const ismodalOpened = atom({
  key: "ismodalOpened",
  default: true,
});
export const isLoadmodalOpened = atom({
  key: "isLoadmodalOpened",
  default: true,
});
// export const newinitState = selector({
//   key: "newInitState",
//   get: ({ get }) => {
//     const currentInit = get(initState);
//     return currentInit.filter((init:any) => init.status === "new");
//   },
// });
export const isSharePost1 = atom({
  key: "isSharePost1",
  default: true,
});
export const updateReels = atom({
  key: "updateReels",
  default: true,
})
export const ImagesRecoil = atom({
  key: "ImagesRecoil",
  default: [],
})
export const VideosRecoil = atom({
  key: "VideosRecoil",
  default: [],
})
export const CallR = atom({
  key: "CallR",
  default: {},
})
export default initState;
