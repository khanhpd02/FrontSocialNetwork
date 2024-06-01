const DOMAIN = "https://truongnetwwork.bsite.net";
// Đây là file chứa API server
const API = {

  LOGIN: DOMAIN + "/api/auth/login",
  REGISTER: DOMAIN + "/api/auth/register",
  VERIFY_PIN: DOMAIN + "/api/auth/VerifyPin",
  RESEND_MAIL: DOMAIN + "/api/auth/ReSendMail",
  ADD_INFO: DOMAIN + "/api/infor/create",
  EDIT_INFO: DOMAIN + "/api/infor/update",
  GET_ALL_POST: DOMAIN + "/api/post",
  GET_ID_POST: DOMAIN + "/api/post/:id",
  POST_IMAGE: DOMAIN + "/api/post/upload",
  ADD_POST: DOMAIN + "/api/post",
  GET_INFO: DOMAIN + "/api/infor/user/:id",
  GET_MY_INFO: DOMAIN + "/api/infor/myinfor",
  POST_INFO: DOMAIN + "/api/infor/create",
  UPDATE_INFO: DOMAIN + "/api/infor/update",
  POST_COMMENT: DOMAIN + "/api/cmt/create",
  GET_ALL_FRIEND: DOMAIN + "/api/Friend/getAll",
  GET_NOT_FRIEND: DOMAIN + "/api/Friend/getAllNotFriend",
  GET_AUDIO: DOMAIN + "/api/audio",
  POST_REELS_IMAGE: DOMAIN + "/api/real/MergeImageWithAudio",
  POST_REELS_VIDEO: DOMAIN + "/api/real/MergeVideoWithAudio",
  GET_ALL_REELS: DOMAIN + "/api/real",
  SEND_OTP_CHANGE: DOMAIN + "/api/auth/sendPinforgotPassword",
  OTP_CHANGE: DOMAIN + "/api/auth/VerifyPinForgotPassword",
  CHANGE_PASSWORD: DOMAIN + "/api/auth/changePasswordForgotPassword",
  // POST_LIKE:DOMAIN + "api/like/{id}"
};
export default API;
