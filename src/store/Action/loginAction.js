import axios from "axios";
import URL from "../../constants/URL";

export const loginAction = async (emailValue, passwordValue) => {
  return await axios({
    method: "POST",
    url: `${URL}/user/login`,
    data: {
      email: emailValue,
      password: passwordValue,
    },
    withCredentials: true,
  });
};
export const signupAction = async (
  nameValue,
  emailValue,
  passwordValue,
  passwordConfirmValue
) => {
  return await axios({
    method: "POST",
    url: `${URL}/user/signup`,
    data: {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      passwordConfirm: passwordConfirmValue,
    },
    withCredentials: true,
  });
};
export const forgetPassword = async (email) => {
  return axios({
    method: "POST",
    url: `${URL}/user/forgotpassword`,
    data: {
      email: email,
      withCredentials: true,
    },
  });
};
export const resetPassword = async (password, passwordConfirm, id, token) => {
  return axios({
    method: "PATCH",
    url: `${URL}/user/resetpassword/${id}/${token}`,
    data: { newPassword: password, newPasswordConfirm: passwordConfirm },
    withCredentials: true,
  });
};
