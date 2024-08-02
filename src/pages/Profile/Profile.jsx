import React, { useState, useEffect } from "react";
import "./profile.css";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";
import Meta from "../../components/Meta/Meta";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../features/users/userSlice.js";
import { TbUserEdit } from "react-icons/tb";

const profileSchema = yup.object({
  firstName: yup.string().required("First Name is required!"),
  lastName: yup.string().required("Last Name is required!"),
  email: yup
    .string()
    .email("Provide a valid Email")
    .required("Email is required!"),
  mobile: yup.number().required("Mobile No. is required!"),
});

const Profile = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const userState = useSelector((state) => state?.auth?.user);
  const [updatedProfile, setUpdatedProfile] = useState(userState);

  useEffect(() => {
    formik.setValues({
      firstName: userState?.firstName,
      lastName: userState?.lastName,
      email: userState?.email,
      mobile: userState?.mobile,
    });
  }, [userState]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userState?.firstName,
      lastName: userState?.lastName,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateProfile(values));
      setUpdatedProfile(values);
      setEdit(true);
    },
  });
  return (
    <>
      <Meta title={"My Profile"} />
      <BreadCrumb title={"My Profile"} />
      <div className="profile-wrapper p-5">
        <div className="container-xxl">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="d-flex justify-content-around">
              <h3>Update Profile</h3>
              <TbUserEdit
                className="fs-3 cursor-pointer"
                onClick={() => setEdit(false)}
              />
            </div>

            <form
              onSubmit={formik.handleSubmit}
              style={{ border: "1px solid #eee" }}
              className="p-4 profile-form"
            >
              <div className="mb-2">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  id="firstName"
                  aria-describedby="firstName"
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                  value={formik.values.firstName}
                  disabled={edit}
                />
                <div className="error">
                  {formik.touched.firstName && formik.errors.firstName}
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  id="lastName"
                  aria-describedby="lastName"
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                  value={formik.values.lastName}
                  disabled={edit}
                />
                <div className="error">
                  {formik.touched.lastName && formik.errors.lastName}
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  aria-describedby="email"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                  disabled={edit}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="mobile" className="form-label">
                  Mobile No.
                </label>
                <input
                  type="number"
                  name="mobile"
                  className="form-control"
                  id="mobile"
                  aria-describedby="mobile"
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                  value={formik.values.mobile}
                  disabled={edit}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
              </div>

              {!edit && (
                <div className="d-flex justify-content-center mt-4">
                  <button
                    type="submit"
                    className="btn w-100 p-2 text-white"
                    style={{
                      backgroundColor: "#232F3E",
                      textTransform: "uppercase",
                    }}
                  >
                    Save
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
