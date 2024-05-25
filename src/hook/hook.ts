import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store"; // Adjust the path as necessary

export const useAppDispatch = () => useDispatch<AppDispatch>();
