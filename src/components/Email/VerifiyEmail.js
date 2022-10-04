import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Centered from "../layouts/Centered";
import URL from "../../constants/URL";
import Button from "../UI/Button";

export const VerifiyEmail = () => {
  const [validURL, setValidURL] = useState();
  const [Error, setError] = useState();
  const param = useParams();
  useEffect(() => {
    const VerifiyEmailURL = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `${URL}/user/verifyAccount/${param.id}/${param.token}`,
          withCredentials: true,
        });
        setValidURL(true);
      } catch (error) {
        console.log(error);
        setError(true);
        // setValidURL(false);
      }
    };

    VerifiyEmailURL();
  }, [param]);

  return (
    <>
      <Centered width="6">
        {validURL && (
          <div>
            <h1>Sucessfull verify</h1>
            <Link to="/login">
              <Button buttonStyle="btn-primary" type="button" title="Login" />
              {/* <button>Login</button> */}
            </Link>
          </div>
        )}
        {Error && <h1>404 Not Valid</h1>}
      </Centered>
    </>
  );
};
