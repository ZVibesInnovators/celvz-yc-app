import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from "react";
import SyncIcon from '@mui/icons-material/Sync';
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Input, Row, Col } from "reactstrap";
import { AlertContext } from "../../contexts/AlertContextProvider";
import "../../components/Sign.css";
import { LargeHeroButton } from "../../components/home/CallToActionButtons";
import { AuthContext } from "../../contexts/AuthContext";

const Sign = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const { showError, showAlert } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isLoggedIn } = useContext(AuthContext);

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

  useEffect(() => {
    if (isLoggedIn) {
      // check if user visited a previous strict page and then redirect back after login
      const strictPage = localStorage.getItem("strictPage");
      if(strictPage) {
          window.location = strictPage
      }else {
        // redirect the user to the dashboard if already logged in
        navigate("/")
      }
    }
  }, [isLoggedIn])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!payload.email) throw Error("Please input your Email Address");
      if (!payload.password) throw Error("Please input your Password");
      setIsSubmitting(true);
      await login(payload);
      setIsSubmitting(false);
    } catch (error) {
      showError(error.message);
      setIsSubmitting(false);
    }
  };

  return (

    <div className="flex-container">
      <div className="gradient">
        <div className="flex-item-left">
          <Col md={6} />
        </div>
        <div className="flex-item-right">
          <Col md={6}>
            <h2 className="flex-h2">SIGN IN</h2>
            <p style={{ color: "#D3006C", textAlign: "end" }}>Welcome To The Love Family</p>
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
              <LargeHeroButton
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
              </LargeHeroButton>
              <p className='text-p'>

                Don't Have An Account? <Link to="/auth/register" style={{ textDecoration: "inherit" }}><span className='text-sign' style={{ color: "#d3006c", fontWeight: "bold" }}>Sign Up</span></Link>

              </p>
            </Form>
          </Col>

        </div>
      </div>

    </div>
    // <div className="rtn" style={{ marginTop: -100 }}>
    //   <div className="rtn-1">
    //     <div
    //       className="rtn-2"
    //       style={{
    //         display: "block",
    //         width: 550,
    //         color: "white",
    //       }}
    //     >
    //       <h2 className="sine">SIGN IN</h2>
    //       <p style={{ color: "#D3006C" }}>Welcome To The Love Family</p>
    //       <Form className="form-group" onSubmit={handleSubmit}>
    //         <FormGroup>
    //           <Input
    //             className="handle"
    //             type="email"
    //             name={"email"}
    //             id="emailField"
    //             placeholder="Email"
    //             value={payload.email}
    //             onChange={handleChange}
    //           />
    //         </FormGroup>
    //         <FormGroup>
    //           <Input
    //             className="pass-word"
    //             type="password"
    //             name={"password"}
    //             id="passwordField"
    //             placeholder="Password"
    //             value={payload.password}
    //             onChange={handleChange}
    //           />
    //         </FormGroup>
    //         <LargeHeroButton
    //           className="sine-1"
    //           style={{ background: "#D3006C" }}
    //           type="submit"
    //           disabled={isSubmitting}
    //         >
    //           SIGN IN{" "}
    //           {isSubmitting ? (
    //             <SyncIcon className="fa-spin" style={{ marginLeft: 20 }} />
    //           ) : (
    //             <span></span>
    //           )}
    //         </LargeHeroButton>
    //         <p className='text-center'>

    //           Don't Have An Account? <Link to="/auth/register" style={{ textDecoration: "inherit"}}><span className='text-sign' style={{ color: "#d3006c", fontWeight: "bold" }}>Sign Up</span></Link>

    //         </p>
    //       </Form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Sign;
