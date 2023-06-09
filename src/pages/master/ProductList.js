import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import ProductsTable from "../../components/tables/ProductsTable";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productList.json";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/reducers/products";

export default function ProductList() {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products.products);
  const products = productsList?.products;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

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
        {data?.float.map((item, index) => (
          <Col key={index} sm={6} lg={4}>
            <FloatCard
              variant={item.variant}
              digit={item.digit}
              title={item.title}
              icon={item.icon}
            />
          </Col>
        ))}
        <Col xl={12}>
          <CardLayout>
            <Row>
              {data?.product.filter.map((item, index) => (
                <Col xs={12} sm={6} md={4} lg={3} key={index}>
                  <LabelField
                    type={item.type}
                    label={item.label}
                    option={item.option}
                    placeholder={item.placeholder}
                    labelDir="label-col"
                    fieldSize="w-100 h-md"
                  />
                </Col>
              ))}
              <Col xl={12}>
                <ProductsTable thead={data?.product.thead} tbody={products} />
                <Pagination />
              </Col>
            </Row>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
