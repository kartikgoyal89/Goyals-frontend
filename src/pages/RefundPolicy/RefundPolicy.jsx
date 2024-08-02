import React, { useEffect } from "react";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";

const RefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Meta title={"Refund Policy"} />
      <BreadCrumb title="Refund Policy" />

      <section className="policy-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div
              className="policy"
              style={{ boxShadow: "0 5px 6px rgba(0,0,0,0.05)" }}
            >
              <p>
                At Digitic, we strive to ensure customer satisfaction with every
                purchase. If you are not completely satisfied with your
                purchase, we are here to help.
              </p>
              <h6>Refund Eligibility</h6>
              <ol className="mt-3">
                <li>
                  <strong>Timeframe: </strong>
                  Requests for refunds must be made within 15 days of the
                  purchase date.
                </li>
                <li>
                  <strong>Condition: </strong>
                  Items must be unused, in the same condition that you received
                  them, and in the original packaging.
                </li>
              </ol>
              <h6>How to Request a Refund</h6>
              <ol>
                <li className="mt-1">
                  <strong>Contact Us: </strong>
                  Email us at{" "}
                  <span style={{ color: "rgb(64, 64, 255)" }}>
                    <a href="mailto:kartikgoyal794@gmail.com">
                      kartikgoyal794@gmail.com
                    </a>
                  </span>{" "}
                  with your order number and the reason for your return.
                </li>
                <li className="mt-1">
                  <strong>Approval: </strong>
                  Once your return is received and inspected, we will notify you
                  of the approval or rejection of your refund.
                </li>
                <li className="mt-1">
                  <strong>Processing: </strong>
                  If approved, your refund will be processed, and a credit will
                  automatically be applied to your original method of payment
                  within 7-10 business days.
                </li>
              </ol>
              <h6>Non-Refundable Items</h6>
              <ol>
                <li>Gift cards</li>
                <li>Downloadable software products</li>
                <li>Certain health and personal care items</li>
              </ol>
              <h6>Exchanges</h6>
              <p>
                If you need to exchange an item, please contact us at{" "}
                <span style={{ color: "rgb(64, 64, 255)" }}>
                  <a href="mailto:kartikgoyal794@gmail.com">
                    kartikgoyal794@gmail.com
                  </a>
                </span>
                . We only replace items if they are defective or damaged.
              </p>
              <h6>Shipping Returns</h6>
              <p>
                You will be responsible for paying for your own shipping costs
                for returning your item. Shipping costs are non-refundable.
              </p>
              <h6>Contact Us</h6>
              <p>
                If you have any questions about our refund policy, please
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

export default RefundPolicy;
