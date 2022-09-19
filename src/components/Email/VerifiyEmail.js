import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Centered from "../layouts/Centered";
import URL from "../../constants/URL";

export const VerifiyEmail = () => {
  const [validURL, setValidURL] = useState();
  const param = useParams();
  console.log(param);
  console.log(validURL);
  useEffect(() => {
    const VerifiyEmailURL = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `${URL}/user/verifyAccount/${param.id}/${param.token}`,
          // withCredentials: true,
        });
        console.log(res);
        setValidURL(true);
      } catch (error) {
        console.log(error);
        setValidURL(false);
      }
    };
    VerifiyEmailURL();
  }, [param]);

  return (
    <>
      <Centered width="6">
        {!validURL && <h1>404 Not Valid</h1>}
        {validURL && (
          <div>
            <h1>Sucessfull verify</h1>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        )}
      </Centered>
    </>
  );
};
