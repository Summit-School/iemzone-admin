import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { List, Item, Icon, Text, Box, Anchor } from "../../components/elements";
import {
  Breadcrumb,
  RoundAvatar,
  DivideTitle,
  DuelText,
} from "../../components";
import {
  CardLayout,
  CardHeader,
  FloatCard,
  ActivityCard,
} from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/shopProfile.json";
import { useDispatch, useSelector } from "react-redux";
import { getShop } from "../../redux/reducers/shops";
import { useParams } from "react-router-dom";

export default function ShopProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const shopDetails = useSelector((state) => state.shops.shop);
  const shop = shopDetails?.shop;

  useEffect(() => {
    dispatch(getShop(id));
  }, [id]);

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title="shop profile">
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
        </Col>
        <Col xl={5}>
          <CardLayout>
            <CardHeader title="shop information" dotsMenu={data?.dotsMenu} />
            <Box className="mc-shop-group">
              <Box className="mc-user-profile">
                <RoundAvatar
                  src={`${process.env.REACT_APP_ENDPOINT}/${shop?.profilePicture}`}
                  alt={data?.profile.alt}
                  size={data?.profile.size}
                />
                <DuelText
                  title={shop?.name}
                  descrip={`@${shop?.slug}`}
                  size={data?.profile.size}
                />
              </Box>
              <Box className="mb-4">
                <DivideTitle title="communication" className="mb-4" />
                <List className="mc-user-metalist">
                  <Item>
                    <Icon>{`key`}</Icon>
                    <Text as="span">{shop?.userId}</Text>
                  </Item>
                  <Item>
                    <Icon>{`phone_in_talk`}</Icon>
                    <Text as="span">{shop?.phone}</Text>
                  </Item>
                  <Item>
                    <Icon>{`feed`}</Icon>
                    <Text as="span">{shop?.email}</Text>
                  </Item>
                  <Item>
                    <Icon>{`house`}</Icon>
                    <Text as="span">{shop?.address}</Text>
                  </Item>
                </List>
              </Box>
              {/* <Box className="mb-4">
                <DivideTitle title={data?.bio.title} className="mb-3" />
                <Text className="mc-user-bio mb-4">{data?.bio.descrip}</Text>
              </Box> */}
              <Box>
                <DivideTitle title="elsewhere" className="mb-4" />
                <Box className="mc-user-social">
                  <Anchor
                    href={shop?.faceook}
                    text={"Facebook"}
                    iconClass={"icofont-facebook"}
                    className={"facebook"}
                  />
                  <Anchor
                    href={shop?.instagram}
                    text={"Instagram"}
                    iconClass={"icofont-instagram"}
                    className={"instagram"}
                  />
                  <Anchor
                    href={shop?.twitter}
                    text={"Twitter"}
                    iconClass={"icofont-twitter"}
                    className={"twitter"}
                  />
                  <Anchor
                    href={shop?.twitter}
                    text={"Youtube"}
                    iconClass={"icofont-youtube-play"}
                    className={"youtube"}
                  />
                </Box>
              </Box>
            </Box>
          </CardLayout>
        </Col>
        <Col xl={7}>
          <Row>
            <Col md={4} lg={4}>
              <FloatCard
                variant={"sm purple"}
                digit={10}
                title={"total income"}
                icon={"shopping_cart"}
              />
            </Col>
            <Col md={4} lg={4}>
              <FloatCard
                variant={"sm yellow"}
                digit={10}
                title={"total cashouts"}
                icon={"hotel_class"}
              />
            </Col>
            <Col md={4} lg={4}>
              <FloatCard
                variant={"sm green"}
                digit={10}
                title={"account balance"}
                icon={"shopping_bag"}
              />
            </Col>
            {/* <Col xl={12}>
              <ActivityCard
                style={{ height: "540px" }}
                title={data?.activity.title}
                dotsMenu={data?.activity.dotsMenu}
                items={data?.activity.items}
              />
            </Col> */}
          </Row>
        </Col>
      </Row>
    </PageLayout>
  );
}
