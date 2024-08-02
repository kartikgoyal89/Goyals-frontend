import React from "react";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { resetPassword } from "../../features/users/userSlice.js";

const passwordSchema = yup.object({
  password: yup.string().required("Password is required"),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getToken = location.pathname.split("/")[2];

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      dispatch(resetPassword({ token: getToken, password: values.password }));
      navigate("/login");
    },
  });

  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />

      <div className="auth-wrapper login-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h5 className="text-center mb-3">Reset Password</h5>

              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex flex-column gap-20"
              >
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    name="password"
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                  />
                  <div className="error ms-2">
                    {formik.touched.password && formik.errors.password}
                  </div>
                </div>

                <div className="d-flex flex-column align-items-center justify-content-center gap-15">
                  <button className="btn border-0">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
