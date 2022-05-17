import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Button, Form, FormGroup, Input, Row, Col, Label } from "reactstrap";
import "../../components/Register.css";

const Register = (props) => {
  // const [isAuth, setIsAuth] = useContext(AuthContext);

  // useEffect(() => setIsAuth(false), [])

  return (
    <div className="rtn">
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
          <Form className="form-group">
            <Row className="form-margin">
              <Col md={6}>
                <FormGroup>
                  <Input
                    className="form-left"
                    type="text"
                    name="fname"
                    id="fnameField"
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
                    id="lnameField"
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
                    id="emailField"
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
                    id="phoneField"
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
                    id="passwordField"
                    placeholder="Password"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Input
                    className="form-right"
                    type="password"
                    name="confirm-password"
                    id="confirmPasswordField"
                    placeholder="Confirm Password"
                  />
                </FormGroup>
              </Col>
            </Row>


            <Button className="sine-1" style={{ background: "#D3006C" }}>
              SIGN UP
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

export default Register;
