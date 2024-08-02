import React, { useEffect } from "react";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";

const ShippingPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Meta title={"Shipping Policy"} />
      <BreadCrumb title="Shipping Policy" />

      <section className="policy-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div
              className="policy"
              style={{ boxShadow: "0 5px 6px rgba(0,0,0,0.05)" }}
            >
              <p className="mb-4">
                At Digitic, we aim to provide reliable and prompt delivery
                services to ensure your shopping experience is seamless.
              </p>
              <h6>Shipping Options and Costs</h6>
              <ol>
                <li className="mt-1">
                  <strong>Standard Shipping: </strong>
                  Delivery within 5-7 business days. Standard shipping rates
                  apply.
                </li>
                <li className="mt-1">
                  <strong>Express Shipping: </strong>
                  Delivery within 2-3 business days. Additional charges apply.
                </li>
              </ol>
              <h6>Order Processing</h6>
              <ol>
                <li>Orders are processed within 1-2 business days.</li>
                <li>
                  Orders are not shipped or delivered on weekends or holidays.
                </li>
              </ol>
              <h6>Shipping Confirmation and Order Tracking</h6>
              <ol>
                <li>
                  You will receive a shipping confirmation email once your order
                  has shipped, containing your tracking number(s).
                </li>
                <li>The tracking number will be active within 24 hours.</li>
              </ol>
              <h6>International Shipping</h6>
              <ol>
                <li>We currently do not ship outside of India.</li>
              </ol>
              <h6>Shipping Delays</h6>
              <ol>
                <li>
                  Delivery delays can occasionally occur due to unforeseen
                  circumstances. We will notify you if there are significant
                  delays.
                </li>
              </ol>
              <h6>Contact Us</h6>
              <p>
                If you have any questions about our shipping policy, please
                contact us at{" "}
                <span style={{ color: "rgb(64, 64, 255)" }}>
                  <a href="mailto:kartikgoyal794@gmail.com">
                    kartikgoyal794@gmail.com
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

export default ShippingPolicy;
