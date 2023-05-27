import { ToastAndroid } from "react-native";
import { ErrorMessage } from "../types/ErrorMessage";

export const showToast = (message: ErrorMessage) => {
  ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.TOP);
};