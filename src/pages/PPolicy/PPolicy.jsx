import React, { useEffect } from "react";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";

const PPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Meta title={"Privacy Policy"} />
      <BreadCrumb title="Privacy Policy" />

      <section className="policy-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div
              className="policy"
              style={{ boxShadow: "0 5px 6px rgba(0,0,0,0.05)" }}
            >
              Welcome to Goyal's Store! We value your privacy and are committed
              to protecting your personal information. This privacy policy
              outlines how we collect, use, disclose, and safeguard your
              information when you use our website and services.
              <h5 className="mt-4 mb-3">Information We Collect</h5>
              <div>
                <strong> 1. Personal Information : </strong>
                When you register on our site, place an order, subscribe to our
                newsletter, or interact with us, we may collect personal
                information such as your name, email address, mailing address,
                phone number, and payment information.
              </div>
              <div className="mt-3">
                <strong>2. Non-Personal Information : </strong> We may collect
                non-personal information such as your browser type, operating
                system, device information, IP address, and browsing behavior on
                our site.
              </div>
              <div className="mt-4">
                <h5>How We Use Your Information</h5>
                <p className="ms-1">
                  We use the information we collect for various purposes,
                  including:
                </p>
                <ol>
                  <li>Processing your orders and transactions.</li>
                  <li>Providing and improving our products and services.</li>
                  <li>Personalizing your shopping experience.</li>
                  <li>
                    Sending you updates, promotional materials, and newsletters.
                  </li>
                  <li>
                    Enhancing our website’s functionality and user experience.
                  </li>
                  <li>
                    Preventing fraudulent activities and ensuring the security
                    of our site.
                  </li>
                </ol>
                <h6>Data Security</h6>
                <p>
                  We implement a variety of security measures to maintain the
                  safety of your personal information. Your personal information
                  is stored in secure networks and is accessible only by a
                  limited number of persons who have special access rights to
                  such systems.
                </p>
                <h6>Cookies</h6>
                <p>
                  We use cookies to enhance your browsing experience. Cookies
                  are small files that a site or its service provider transfers
                  to your computer’s hard drive through your web browser (if you
                  allow) that enables the site’s systems to recognize your
                  browser and capture and remember certain information.
                </p>
                <h6>Your Consent</h6>
                <p>By using our site, you consent to our privacy policy.</p>

                <h6 className="mt-5">Contact Us</h6>
                <p>
                  If you have any questions about this privacy policy, please
                  contact us at:
                </p>
                <p>
                  Email: &nbsp;
                  <span style={{ color: "rgb(64, 64, 255)" }}>
                    <a href="mailto:goyals.shopping@gmail.com">
                      goyals.shopping@gmail.com
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PPolicy;
