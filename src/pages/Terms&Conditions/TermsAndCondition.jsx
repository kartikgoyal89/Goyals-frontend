import React, { useEffect } from "react";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";

const TermsAndCondition = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Meta title={"Terms & Conditions"} />
      <BreadCrumb title="Terms & Conditions" />

      <section className="policy-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div
              className="policy"
              style={{ boxShadow: "0 5px 6px rgba(0,0,0,0.05)" }}
            >
              <p className="mb-4">
                Welcome to Goyal's Store! By accessing and using our website,
                you agree to comply with and be bound by the following terms and
                conditions.
              </p>
              <h6>Use of the Site</h6>
              <ol>
                <li className="mt-1">
                  <strong>Eligibility: </strong>You must be at least 18 years
                  old to use our services.
                </li>
                <li className="mt-1">
                  <strong>Account: </strong>You are responsible for maintaining
                  the confidentiality of your account and password.
                </li>
                <li className="mt-1">
                  <strong>Prohibited Activities: </strong>You agree not to use
                  the site for any illegal or unauthorized purpose.
                </li>
              </ol>
              <h6>Product Information</h6>
              <ol>
                <li className="mt-1">
                  <strong>Accuracy: </strong>We strive to ensure that product
                  descriptions are accurate. However, we do not warrant that the
                  descriptions or other content are error-free.
                </li>
                <li className="mt-1">
                  <strong>Pricing: </strong>All prices are listed in Indian
                  Rupees (INR). We reserve the right to change prices at any
                  time without notice.
                </li>
              </ol>
              <h6>Order Acceptance</h6>
              <ol>
                <li className="mt-1">
                  <strong>Verification: </strong>We reserve the right to verify
                  any order and request additional information from you.
                </li>
                <li className="mt-1">
                  <strong>Refusal: </strong>We reserve the right to refuse or
                  cancel any order for any reason, including stock availability,
                  errors in product information, or suspected fraud.
                </li>
              </ol>
              <h6>Payment</h6>
              <ol>
                <li className="mt-1">
                  <strong>Methods: </strong>We accept various payment methods,
                  including credit/debit cards and digital wallets.
                </li>
                <li className="mt-1">
                  <strong>Billing: </strong>You agree to provide current,
                  complete, and accurate purchase and account information for
                  all purchases.
                </li>
              </ol>

              <h6>Shipping and Delivery</h6>
              <ol>
                <li className="mt-1">
                  <strong>Methods: </strong>We offer standard and express
                  shipping options.
                </li>
                <li className="mt-1">
                  <strong>Delays: </strong>We are not responsible for delays
                  caused by carriers or other unforeseen events.
                </li>
              </ol>

              <h6>Returns and Refunds</h6>
              <ol>
                <li className="mt-1">
                  <strong>Rights: </strong>All content on this site, including
                  text, graphics, logos, and images, is the property of Goyal's
                  Store.
                </li>
                <li className="mt-1">
                  <strong>Use: </strong>You may not use our intellectual
                  property without our prior written consent.
                </li>
              </ol>

              <h6>Limitation of Liability</h6>
              <ol>
                <li className="mt-1">
                  <strong>Disclaimer: </strong>We do not guarantee that our site
                  will be error-free or that it will operate without
                  disruptions.
                </li>
                <li className="mt-1">
                  <strong>Liability: </strong>Goyal's Store will not be liable
                  for any direct, indirect, incidental, or consequential damages
                  arising from your use of the site.
                </li>
              </ol>
              <h6>Governing Law</h6>
              <p>
                These terms and conditions are governed by and construed in
                accordance with the laws of India.
              </p>

              <h6>Changes to Terms</h6>
              <p>
                We reserve the right to update or modify these terms at any time
                without prior notice. Your continued use of the site after any
                changes constitutes acceptance of the new terms.
              </p>
              <h6>Contact Us</h6>
              <p>
                If you have any questions about our terms and conditions, please
                contact us at{" "}
                <span style={{ color: "rgb(64, 64, 255)" }}>
                  <a href="mailto:goyals.shopping@gmail.com">
                    goyals.shopping@gmail.com
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsAndCondition;
