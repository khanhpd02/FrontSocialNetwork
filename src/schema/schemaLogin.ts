import * as yup from "yup";
import { LOGIN, REGISTER } from "./fieldName";
import { REGEX } from "./regex";

export const schemaLogin = yup.object({
  [LOGIN.EMAIL]: yup
    .string()
    .required("Vui lòng nhập Email.")
    .max(120)
    .matches(RegExp(REGEX.EMAIL), "Email không hợp lệ. Vui lòng thử lại")
    .typeError(""),
  [LOGIN.PASSWORD]: yup
    .string()
    .required("Vui lòng nhập mật khẩu.")
    .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự")
    .max(120),
});

export const schemaRegister = yup.object({
    [REGISTER.USERNAME]: yup
      .string()
      .required("Vui lòng nhập thông tin.")
      .min(8, "Tên người dùng chứa ít nhất 6 ký tự")
      .max(120),
    [REGISTER.EMAIL]: yup
      .string()
      .required("Vui lòng nhập Email.")
      .max(120)
      .matches(RegExp(REGEX.EMAIL), "Email không hợp lệ. Vui lòng thử lại")
      .typeError(""),
    [REGISTER.PASSWORD]: yup
      .string()
      .required("Vui lòng nhập mật khẩu.")
      .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự")
      .max(120),
    [REGISTER.CONFIRM_PASSWORD]: yup
      .string()
      .oneOf([yup.ref(REGISTER.PASSWORD)], 'Mật khẩu không khớp')
      .required("Vui lòng nhập mật khẩu.")
      .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự")
      .max(120),
  });
