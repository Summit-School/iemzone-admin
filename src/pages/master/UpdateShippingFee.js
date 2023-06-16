import React from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor } from "../../components/elements";
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/shippingData.json";
//
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateShippingFee } from "../../redux/reducers/shipping";
import PulseLoader from "react-spinners/PulseLoader";
import userId from "../../userId";

export default function CategoryUpload() {
  const [shippingAmount, setShippingAmount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const id = userId();

  const uploadCategoryHandler = () => {
    setLoading(true);
    const data = {
      id: id,
      shippingFee: shippingAmount,
    };
    dispatch(updateShippingFee(data), setLoading(true))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Fee Created Success");
          setLoading(false);
        }
        if (res.meta.requestStatus === "rejected") {
          setLoading(false);
          toast.error("Failed");
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title={data?.pageTitle}>
              {data?.breadcrumb.map((item, index) => (
                <li key={index} className="mc-breadcrumb-item">
                  {item.path ? (
                    <Anchor className="mc-breadcrumb-link" href={item.path}>
                      {item.text}
                    </Anchor>
                  ) : (
                    item.text
                  )}
                </li>
              ))}
            </Breadcrumb>
          </CardLayout>
        </Col>
        <Col xl={12}>
          <CardLayout>
            <CardHeader title="basic information" dotsMenu={data?.dotsMenu} />
            <Row>
              <Col xl={12}>
                <LabelField
                  shippingFxn={setShippingAmount}
                  type="number"
                  label="New Amount"
                  fieldSize="w-100 h-md"
                />
              </Col>
            </Row>
          </CardLayout>
        </Col>

        <Col xl={12}>
          <CardLayout>
            <Anchor
              className="mc-btn w-100 primary mt-5"
              text={loading ? <PulseLoader color="#fff" size={8} /> : "publish"}
              icon="cloud_upload"
              // href="#"
              onClick={uploadCategoryHandler}
            />
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
