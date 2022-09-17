import axios from "axios";
import URL from "../../constants/URL"

const loginAction = async (emailValue, passwordValue) => {
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
export default loginAction;
