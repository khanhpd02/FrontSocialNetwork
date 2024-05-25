import * as yup from "yup";
import { ADD_ADDRESS } from "./fieldName";
import { REGEX } from "./regex";

const AD = ADD_ADDRESS;

export const schemaAddAddress = yup.object({
    [AD.NAME]: yup
        .string()
        .required('Vui lòng nhập họ và tên.')
        .min(5, 'Họ và tên tối thiểu 5 ký tự.')
        .max(120),
    [AD.PHONE]: yup
        .string()
        .required('Vui lòng nhập số điện thoại.')
        .matches(RegExp(REGEX.NUMBER_PHONE), "Số điện thoại không đúng."),
    [AD.EMAIL]: yup
        .string()
        .required("Vui lòng nhập địa chỉ email.")
        .max(120)
        .matches(RegExp(REGEX.EMAIL), "Địa chỉ email không đúng.")
        .typeError(""),
    [AD.CITY]: yup
        .string()
        .required('Vui lòng chọn tỉnh/thành phố.'),
    [AD.STATE]: yup
        .string()
        .required('Vui lòng chọn quận/huyện.'),
    [AD.WARD]: yup
        .string()
        .required('Vui lòng chọn xã/phường.'),
    [AD.SHIPPING_ADDRESS]: yup
        .string()
        .required('Vui lòng nhập thêm mô tả.')
        .min(5, 'Nhập mô tả tối thiểu 5 ký tự.')
});