import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Anchor,
  Box,
  Item,
  Text,
  Icon,
  List,
  Image,
  Heading,
  Button,
} from "../../components/elements";
import { CustomerReview, RatingAnalytics } from "../../components/review";
import { Breadcrumb, DivideTitle } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import LabelTextarea from "../../components/fields/LabelTextarea";
import CardLayout from "../../components/cards/CardLayout";
import data from "../../data/master/productView.json";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/reducers/products";
import { useParams } from "react-router-dom";

export default function ProductView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.products.product);
  const product = productDetails?.product;

  useEffect(() => {
    dispatch(getProduct(id));
  }, [id]);

  return (
    <PageLayout>
      <CardLayout className="mb-4">
        <Breadcrumb title={data?.pageTitle}>
          {data?.breadcrumb.map((item, index) => (
            <Item key={index} className="mc-breadcrumb-item">
              {item.path ? (
                <Anchor className="mc-breadcrumb-link" href={item.path}>
                  {item.text}
                </Anchor>
              ) : (
                item.text
              )}
            </Item>
          ))}
        </Breadcrumb>
      </CardLayout>
      <CardLayout className="p-lg-5">
        <Row>
          <Col xl={5}>
            <DivideTitle title="product gallery" className="mb-4" />
            <Box className="mc-product-view-gallery">
              {product?.images.map((item, index) => (
                <Image
                  key={index}
                  src={`${process.env.REACT_APP_ENDPOINT}/${item}`}
                  alt={item.alt}
                />
              ))}
            </Box>
          </Col>
          <Col xl={7}>
            <DivideTitle title="product details" className="mb-4" />
            <Box className="mc-product-view-info-group">
              <Heading as="h2" className="mc-product-view-info-title">
                {product?.title}
              </Heading>
              <Box className="mc-product-view-meta">
                <Icon type={"store"} />
                <Heading as="h5">{"brand"}</Heading>
                <Text as="span">:</Text>
                <Text as="p">{product?.brand}</Text>
              </Box>
              <Box className="mc-product-view-meta">
                <Icon type={"pix"} />
                <Heading as="h5">{"category"}</Heading>
                <Text as="span">:</Text>
                <Text as="p">{product?.categories}</Text>
              </Box>
              <Box className="mc-product-view-meta">
                <Icon type={"palette"} />
                <Heading as="h5">{"colors"}</Heading>
                <Text as="span">:</Text>
                <Text as="p">{product?.colors}</Text>
              </Box>
              <Box className="mc-product-view-meta">
                <Icon type={"summarize"} />
                <Heading as="h5">{"size"}</Heading>
                <Text as="span">:</Text>
                <Text as="p">{product?.size}</Text>
              </Box>
              <Box className="mc-product-view-meta">
                <Icon type={"sell"} />
                <Heading as="h5">{"regular price"}</Heading>
                <Text as="span">:</Text>
                <Text as="p">{product?.regularPrice}</Text>
              </Box>
              <Box className="mc-product-view-meta">
                <Icon type={"sell"} />
                <Heading as="h5">{"sales price"}</Heading>
                <Text as="span">:</Text>
                <Text as="p">{product?.salesPrice}</Text>
              </Box>
              <Box className="mc-product-view-meta">
                <Icon type={"shopping_cart"} />
                <Heading as="h5">{"stock"}</Heading>
                <Text as="span">:</Text>
                <Text as="p">{product?.stock}</Text>
              </Box>
              <Box className="mc-product-view-meta">
                <Icon type={"hotel_class"} />
                <Heading as="h5">{"rating"}</Heading>
                <Text as="span">:</Text>
                <Text as="p">{product?.rating}</Text>
              </Box>
              <Box className="mc-product-view-meta">
                <Icon type={"tag"} />
                <Heading as="h5">{"orders"}</Heading>
                <Text as="span">:</Text>
                <Text as="p">{product?.orders}</Text>
              </Box>
              <Box className="mc-product-view-meta">
                <Icon type={"verified"} />
                <Heading as="h5">{"sales"}</Heading>
                <Text as="span">:</Text>
                <Text as="p">{product?.sales}</Text>
              </Box>
            </Box>
          </Col>
          <Col xl={12}>
            <DivideTitle title="product description" className="mt-5 mb-4" />
            <Box className="mc-product-view-descrip">
              <Text>{product?.description}</Text>
            </Box>
          </Col>
          <Col xl={12}>
            <DivideTitle title="rating analytics" className="mt-5 mb-4" />
            <RatingAnalytics
              graphLine={data?.rating.item}
              graphScore={data?.rating.score}
              graphStar={data?.rating.icon}
              grapTitle={data?.rating.total}
              graphText={data?.rating.text}
            />
          </Col>
          <Col xl={12}>
            <DivideTitle title="customer reviews" className="mt-5 mb-4" />
            <CustomerReview data={data?.review} />
          </Col>
          {/* <Col xl={12}>
            <DivideTitle title="review reply form" className="mt-3 mb-4" />
            <LabelTextarea
              placeholder="Write here..."
              fieldSize="w-100 h-text-xl"
            />
            <Button className="mc-btn mc-review-form-btn primary">
              drop your replies
            </Button>
          </Col> */}
        </Row>
      </CardLayout>
    </PageLayout>
  );
}
