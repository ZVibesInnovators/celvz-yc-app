import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from "react";
import SyncIcon from '@mui/icons-material/Sync';
import { useParams, useNavigate } from "react-router";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { AlertContext } from "../../contexts/AlertContextProvider";
import API from "../../services/api";
import "../../components/Sign.css";

const Sign = (props) => {
  // const [isAuth, setIsAuth] = useContext(AuthContext);

  // useEffect(() => setIsAuth(false), [])
  const params = useParams();
  const navigate = useNavigate();
  const { showError, showAlert } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signin, setSignIn] = useState(null);

  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setPayload((oldPayload) => ({
      ...oldPayload,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!payload.email) throw Error("Please input your Email Address");
      if (!payload.password) throw Error("Please input your Password");
      setIsSubmitting(true);
      const api = new API();
      const { response } = await api.request("post", `auth/login'`, {
        ...payload,
      });
      showAlert("success", response.message);
      setPayload({
        email: "",
        password: "",
      });
      setIsSubmitting(false);
    } catch (error) {
      showError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rtn">
      <div className="rtn-1">
        <div
          className="rtn-2"
          style={{
            display: "block",
            width: 550,
            color: "white",
          }}
        >
          <h2 className="sine">SIGN IN</h2>
          <p style={{ color: "#D3006C" }}>Welcome To The Love Family</p>
          <Form className="form-group" onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                className="handle"
                type="email"
                name={"email"}
                id="emailField"
                placeholder="Email"
                value={payload.email}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                className="pass-word"
                type="password"
                name={"password"}
                id="passwordField"
                placeholder="Password"
                value={payload.password}
                onChange={handleChange}
              />
            </FormGroup>
            <Button
              className="sine-1"
              style={{ background: "#D3006C" }}
              type="submit"
              disabled={isSubmitting}
            >
              SIGN IN{" "}
              {isSubmitting ? (
                <SyncIcon className="fa-spin" style={{ marginLeft: 20 }} />
              ) : (
                <span></span>
              )}
            </Button>
            {/* <p className='text-center'>
                         <link to="/signup">
                             Don't Have An Account? <span className='text-sign'>Sign Up</span>
                         </link>
                     </p> */}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Sign;
