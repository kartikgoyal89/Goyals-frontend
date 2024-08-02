import React, { useState, useEffect } from "react";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";
import { Link } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetState } from "../../features/users/userSlice.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./login.css";

const loginSchema = yup.object({
  email: yup.string().required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

const Login = () => {
  const [view, setView] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.auth);
  const { isError, isLoading, isSuccess, loginDetails, message } = userState;

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (isSuccess && userState?.user !== null && loginDetails !== null) {
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/");
      }, 300);
    } else if (isError) {
      toast.error(message?.response?.data?.message || "Something Went Wrong!");
    }
  }, [isSuccess, isError, loginDetails, message, dispatch, navigate]);

  useEffect(() => {
    if (userState.user !== null && !isSuccess && !isLoading) {
      navigate("/");
    }
  }, [userState, navigate, isLoading, isSuccess]);

  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <div className="auth-wrapper login-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h5 className="text-center mb-4">Login</h5>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-20"
              >
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
                <div>
                  <Link to="/forgot-password">Forgot your password?</Link>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-15">
                  <button className="btn border-0">Login</button>
                  <Link to="/signup" className="btn signup">
                    Signup
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
