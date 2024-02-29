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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/feature/authSlice";

const initialState = {
  email: "",
  password: "",
  comfirmPassword:"",
  firstname:"",
  lastname:""
};
const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password , firstname, lastname, comfirmPassword } = formValue;
  const dispatch = useDispatch();
  const { loading, errors } = useSelector((state) => ({ ...state.auth }));
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== comfirmPassword){
      return toast.error("Passwords do not match")
    }

    if (email && password && firstname && lastname && comfirmPassword) {
      dispatch(signup({ formValue, navigate, toast }));
    }
  };

  useEffect(() => {
    errors && toast.error(errors);
  }, [errors]);
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

          <h5>Register</h5>
          <MDBCardBody>
            <MDBValidation
              onSubmit={handleSubmit}
              noValidate
              className="row g-3"
            >
              <div className="col-md-6">
                <MDBValidationItem
                  feedback="Please provide a valid email."
                  invalid
                >
                  <MDBInput
                    value={firstname}
                    name="firstname"
                    onChange={handleInputChange}
                    id="validationCustom03"
                    required
                    label="First Name"
                  />
                </MDBValidationItem>
              </div>
              <div className="col-md-6">
                <MDBValidationItem
                  feedback="Please provide a valid first name."
                  invalid
                >
                  <MDBInput
                    value={lastname}
                    name="lastname"
                    onChange={handleInputChange}
                    id="validationCustom03"
                    required
                    label="Last Name"
                  />
                </MDBValidationItem>
              </div>
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
                <MDBValidationItem
                  feedback="Please provide a matching password."
                  invalid
                >
                  <MDBInput
                    value={comfirmPassword}
                    name="comfirmPassword"
                    onChange={handleInputChange}
                    id="validationCustom03"
                    required
                    label="Confirm Password"
                  />
                </MDBValidationItem>
              </div>
              <div className="col-md-12">
                <MDBBtn type="submit" color="primary" className="w-100 mt-2">
                  {loading && <MDBSpinner size="sm" />} Register
                </MDBBtn>
              </div>
            </MDBValidation>
          </MDBCardBody>
          <MDBCardFooter>
            <Link to="/Login">
              <p>Already have a account ? Login here</p>
            </Link>
          </MDBCardFooter>
        </MDBCard>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default Register;
