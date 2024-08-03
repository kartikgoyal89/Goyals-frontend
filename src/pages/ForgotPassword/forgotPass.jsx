import React from "react";
import Meta from "../../components/Meta/Meta";
import "./forgotpass.css";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordToken } from "../../features/users/userSlice.js";

const forgotPasswordSchema = yup.object({
  email: yup.string().required("Email is required!"),
});

const forgotPass = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      dispatch(forgotPasswordToken(values));
    },
  });
  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />

      <div className="auth-wrapper login-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h5 className="text-center mb-3">Reset Your Password</h5>
              <p className="text-center mb-4 mt-0">
                We will send you an email to reset your password
              </p>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex flex-column gap-20"
              >
                <div>
                  <input
                    type="email"
                    placeholder="Email Name"
                    className="form-control"
                    name="email"
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <div className="error ps-2">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>

                <div className="d-flex flex-column align-items-center justify-content-center gap-15">
                  <button className="btn border-0">Submit</button>
                  <Link to="/login">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default forgotPass;
