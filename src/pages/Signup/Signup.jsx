import React, { useState, useEffect } from "react";
import Meta from "../../components/Meta/Meta";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetState } from "../../features/users/userSlice.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const signUpSchema = yup.object({
  firstName: yup.string().defined().required("First name is required!"),
  lastName: yup.string().defined().required("Last name is required!"),
  email: yup.string().required("Email is required!"),
  mobile: yup.number().required("Mobile no. is required!"),
  password: yup.string().required("Password is required!"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const [view, setView] = useState(false);
  const navigate = useNavigate();
  const userState = useSelector((state) => state.auth);
  const { registeredUser, isError, isSuccess, isLoading, message } = userState;

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
      dispatch(resetState());
    },
  });

  useEffect(() => {
    if (isSuccess && registeredUser) {
      setTimeout(() => {
        navigate("/login");
      }, 300);
    }
  }, [registeredUser, isError, isLoading, isSuccess]);

  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />

      <div className=" auth-wrapper login-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h5 className="text-center mb-4">Create Account</h5>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-20"
              >
                <div>
                  <CustomInput
                    type="text"
                    placeholder="First Name"
                    className="form-control mb-0"
                    name="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                  />
                  <div className="error">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>

                <div>
                  <CustomInput
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                  />
                  <div className="error">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div>
                  <CustomInput
                    type="number"
                    placeholder="Contact No."
                    className="form-control"
                    name="Mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                  />
                  <div className="error">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </div>
                <div>
                  <CustomInput
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    name="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>
                <div className="position-relative">
                  {!view ? (
                    <div>
                      <CustomInput
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        name="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                      />
                      <div className="error">
                        {formik.touched.password && formik.errors.password}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <CustomInput
                        type="text"
                        placeholder="Password"
                        className="form-control"
                        name="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                      />
                      <div className="error">
                        {formik.touched.password && formik.errors.password}
                      </div>
                    </div>
                  )}
                  <div
                    className="view-btn position-absolute"
                    onClick={() => setView(!view)}
                  >
                    {!view ? (
                      <LuEye className="view" />
                    ) : (
                      <LuEyeOff className="view" />
                    )}
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-15">
                  <button className="btn border-0">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
