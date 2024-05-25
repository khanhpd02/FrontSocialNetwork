import * as yup from "yup";
import { REGEX } from "./regex";
import { CREATE_BANK } from "./fieldName";

const CB = CREATE_BANK

export const schemaCreateBank = yup.object().shape({
    [CB.BANKNAME]: yup
        .string()
        .required("Vui lòng nhập tên ngân hàng.")
        .typeError(""),
    [CB.BANKNUMBER]: yup
        .string()
        .required("Vui lòng nhập số tài khoản.")
        .matches(RegExp(REGEX.MONEY), "Số tài khoản không hợp lệ.")
        .typeError(""),
    [CB.OWNER]: yup
        .string()
        .required("Vui lòng nhập tên chủ tài khoản.")
        .max(120)
        .min(5, "Tối thiểu 5 ký tự.")
        .typeError(""),
});
