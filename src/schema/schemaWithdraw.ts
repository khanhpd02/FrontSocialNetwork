import * as yup from "yup";
import { REGEX } from "./regex";
import { WITHDRAW } from "./fieldName";

export const schemaWithdraw = yup.object().shape({
    [WITHDRAW.MONEY]: yup
        .string()
        .required("Vui lòng nhập số tiền.")
        .matches(RegExp(REGEX.MONEY), "Số tiền không hợp lệ.")
        .typeError(""),
    [WITHDRAW.NOTE]: yup
        .string()
});
