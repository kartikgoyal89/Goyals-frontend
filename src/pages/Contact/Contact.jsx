import React, { useEffect } from "react";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";
import "./contact.css";
import * as yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  postEnquiry,
  resetState,
} from "../../features/contact/contactSlice.js";

const contactSchema = yup.object({
  name: yup.string().defined().required("Name is required!"),
  email: yup.string().required("Email is required!"),
  mobile: yup.number().required("Mobile no. is required!"),
  comment: yup.string().required("Write a comment!"),
});

const Contact = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(postEnquiry(values));
    },
  });

  const contactState = useSelector((state) => state.enq);

  const { isSuccess, isError, isLoading, contact } = contactState;

  useEffect(() => {
    if (isSuccess && contact) {
      toast.dismiss();
      toast.success("Enquiry sent succesfully!");
    } else if (isError) {
      toast.dismiss();
      toast.error("Something Went Wrong!");
    }
    dispatch(resetState());
    formik.resetForm();
  }, [isLoading, isSuccess, isError]);

  return (
    <>
      <Meta title={"Contact"} />
      <BreadCrumb title="Contact" />

      <div className="contact-wrapper py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 mt-3">
              <div className="inner-contact-wrapper d-flex justify-content-between">
                <div className="contact-div">
                  <h3 className="contact-title mb-4">Contact</h3>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex flex-column gap-20"
                  >
                    <div>
                      <input
                        type="text"
                        placeholder="Name"
                        className="form-control"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                      />
                      <div className="error">
                        {formik.touched.name && formik.errors.name}
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Email"
                        className="form-control"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                      />
                      <div className="error">
                        {formik.touched.email && formik.errors.email}
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Phone Number"
                        className="form-control"
                        name="mobile"
                        value={formik.values.mobile}
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                      />
                      <div className="error">
                        {formik.touched.mobile && formik.errors.mobile}
                      </div>
                    </div>
                    <div>
                      <textarea
                        className="w-100 form-control"
                        placeholder="Comment"
                        cols="30"
                        rows="4"
                        name="comment"
                        value={formik.values.query}
                        onChange={formik.handleChange("comment")}
                        onBlur={formik.handleBlur("comment")}
                      ></textarea>
                      <div className="error">
                        {formik.touched.comment && formik.errors.comment}
                      </div>
                    </div>
                    <div className="contact-btn">
                      <button type="submit" className="btn">
                        Send
                      </button>
                    </div>
                  </form>
                </div>
                <div className="contact-div">
                  <h3 className="contact-title mb-4">Get in touch with us</h3>

                  <div className="d-flex align-items-center gap-10 contact-details mb-3">
                    <img src="/contact1.png" width="20px" alt="" />
                    <p className="mb-0">
                      33 New Montegeomey St Street 750 San Franciso, CA, USA,
                      94105
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-10 contact-details mb-3">
                    <img src="/contact2.png" width="20px" alt="" />
                    <p className="mb-0">(+91) 123456789</p>
                  </div>
                  <div className="d-flex align-items-center gap-10 contact-details mb-3">
                    <img src="/contact3.png" width="20px" alt="" />
                    <p className="mb-0">demo@company.com</p>
                  </div>
                  <div className="d-flex align-items-center gap-10 contact-details mb-3">
                    <img src="/contact4.png" width="20px" alt="" />
                    <p className="mb-0">Monday - Friday 10 AM - 8 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
