import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidationItem,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, login } from "../redux/feature/authSlice";
import { GoogleLogin } from "react-google-login";
import {gapi} from 'gapi-script'
const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const { loading, errors } = useSelector((state) => ({ ...state.auth }));
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  const googleSuccess = (res) => {
    console.log(res);
    const name = res?.profileObj?.name
    const email = res?.profileObj?.email;
    const googleId = res?.googleId;
    const token = res?.tokenId;
    const result = {name,email,googleId,token}
    dispatch(googleLogin({ result, navigate, toast }));

  };

  const googleFailure = (error) => {
    toast.error(error);
  };

  useEffect(() => {
    errors && toast.error(errors);
  }, [errors]);

  useEffect(() => {
    gapi.load("client:auth2", ()=>{
      gapi.auth2.init({clientId:process.env.REACT_APP_GOOGLE_CLIENT_ID})
    })
  },[])
  
 
  return (
    <>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "500px",
          alignContent: "center",
          marginTop: "120px",
        }}
      >
        <MDBCard alignment="center">
          <MDBIcon fas icon="user-alt" size="2x" className="mt-4" />

          <h5>Sign In</h5>
          <MDBCardBody>
            <MDBValidation
              onSubmit={handleSubmit}
              noValidate
              className="row g-3"
            >
              <div className="col-md-12">
                <MDBValidationItem
                  feedback="Please provide a valid email."
                  invalid
                >
                  <MDBInput
                    value={email}
                    name="email"
                    onChange={handleInputChange}
                    id="validationCustom03"
                    required
                    label="Email"
                  />
                </MDBValidationItem>
              </div>
              <div className="col-md-12">
                <MDBValidationItem
                  feedback="Please provide a valid password."
                  invalid
                >
                  <MDBInput
                    value={password}
                    name="password"
                    onChange={handleInputChange}
                    id="validationCustom03"
                    required
                    label="Password"
                  />
                </MDBValidationItem>
              </div>
              <div className="col-md-12">
                <MDBBtn type="submit" color="primary" className="w-100 mt-2">
                  {loading && <MDBSpinner size="sm" />} Login
                </MDBBtn>
              </div>
            </MDBValidation>
            <br />
            {/* <GoogleLogin
              clientId=""
              render={(renderProps) => {
                <MDBBtn
                style={{width:"100%"}}
                  className="w-100 mt-2"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                 <MDBIcon size="1x" className="me-2" fab icon="google" /> Login with Google
                </MDBBtn>;
              }}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            /> */}
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <MDBBtn
                  style={{ width: "100%" }}
                  className="w-100 mt-2"
                  color="danger"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <MDBIcon size="1x" className="me-2" fab icon="google" />
                  Log In
                </MDBBtn>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            ,
          </MDBCardBody>
          <MDBCardFooter>
            <Link to="/register">
              <p>Don't have an account? Register here</p>
            </Link>
          </MDBCardFooter>
        </MDBCard>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default Login;
