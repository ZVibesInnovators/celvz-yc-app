import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Form, FormGroup, Input, Row, Col, Label } from "reactstrap";
import { AlertContext } from "../../contexts/AlertContextProvider";
import API from "../../services/api";
import "../../components/Register.css";
import { LargeHeroButton } from "../../components/home/CallToActionButtons";
import { AuthContext } from "../../contexts/AuthContext";

const Register = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const { showError, showAlert } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, isLoggedIn } = useContext(AuthContext);


  const [payload, setPayload] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    // dob: ""
  });

  useEffect(() => {
    if (isLoggedIn) {
      // redirect the user to the dashboard if already logged in
      navigate("/")
    }
  }, [isLoggedIn])

  
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!payload.firstName) throw Error("Please input your first name");
      if (!payload.lastName) throw Error("Please input your last name");
      if (!payload.email) throw Error("Please input your Email Address");
      if (!payload.phone) throw Error("Please input your phone number");
      if (!payload.password || payload.password?.length < 6) throw Error("Please input a valid Password");
      if (payload.password !== payload.confirmPassword) throw Error("Passwords do not match");
      setIsSubmitting(true);
      await register(payload);
      setIsSubmitting(false);
    } catch (error) {
      showError(error.message);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setPayload((old) => ({
      ...old, 
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="rtnx">
      <div className="rtn-4">
        <div
          className="rtn-3"
          style={{
            display: "block",
            width: 750,
            color: "white",
          }}
        >
          <div style={{ marginLeft: 120, marginBottom: 50 }}>
            <h2 className="sine">SIGN UP</h2>
            <p style={{ color: "#D3006C" }}>Welcome To The Love Family</p>
          </div>
          <Form className="form-group" onSubmit={handleSubmit}>
            <Row className="form-margin">
              <Col md={6}>
                <FormGroup>
                  <Input
                    className="form-left"
                    type="text"
                    name="fname"
                    onChange={handleChange}
                    value={payload.firstName}
                    placeholder="First Name"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Input
                    className="form-right"
                    type="text"
                    name="lname"
                    onChange={handleChange}
                    value={payload.lastName}
                    placeholder="Last Name"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="form-margin">
              <Col md={6}>
                <FormGroup>
                  <Input
                    className="form-left"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={payload.email}
                    placeholder="Email"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Input
                    className="form-right"
                    type="tel"
                    name="phone"
                    onChange={handleChange}
                    value={payload.phone}
                    placeholder="Phone"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="form-margin">
              <Col md={6}>
                <FormGroup>
                  <Input
                    className="form-left"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={payload.password}
                    placeholder="Password"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Input
                    className="form-right"
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={payload.confirmPassword}
                    placeholder="Confirm Password"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="form-margin mt-5">
              <Col md={6} style={{ display: "flex" }}>
                <LargeHeroButton>
                  SIGN UP
                </LargeHeroButton>
              </Col>
            </Row>
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

export default Register;
