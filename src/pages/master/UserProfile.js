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
import data from "../../data/master/userProfile.json";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/reducers/users";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const stateUser = useSelector((state) => state.users.user);
  const user = stateUser?.user;

  useEffect(() => {
    dispatch(getUser(id));
  }, [id]);

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title="user profile">
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
            <CardHeader title="user information" dotsMenu={data?.dotsMenu} />
            <Box className="mc-user-group">
              <Box className="mc-user-profile">
                <RoundAvatar
                  src={`${process.env.REACT_APP_ENDPOINT}/${user?.avatar}`}
                  alt={data?.profile.alt}
                  size={data?.profile.size}
                />
                <DuelText
                  title={`${user?.name.firstName} ${user?.name.lastName}`}
                  descrip={data?.profile.username}
                  size={data?.profile.size}
                />
              </Box>
              <Box className="mb-4">
                <DivideTitle title="communication" className="mb-4" />
                <List className="mc-user-metalist">
                  <Item>
                    <Icon>{`phone_in_talk`}</Icon>
                    <Text as="span">{user?.phone}</Text>
                  </Item>
                  <Item>
                    <Icon>{`feed`}</Icon>
                    <Text as="span">{user?.email}</Text>
                  </Item>
                  <Item>
                    <Icon>{`verified`}</Icon>
                    <Text as="span">{user?.status}</Text>
                  </Item>
                </List>
              </Box>
              {/* <Box className="mb-4">
                <DivideTitle title={data?.bio.title} className="mb-3" />
                <Text className="mc-user-bio mb-4">{data?.bio.descrip}</Text>
              </Box> */}
              {/* <Box>
                <DivideTitle title="elsewhere" className="mb-4" />
                <Box className="mc-user-social">
                  {data?.social.map((item, index) => (
                    <Anchor
                      key={index}
                      href={item.path}
                      text={item.type}
                      iconClass={item.icon}
                      className={item.type}
                    />
                  ))}
                </Box>
              </Box> */}
            </Box>
          </CardLayout>
        </Col>
        <Col xl={7}>
          <Row>
            <Col md={4} lg={4}>
              <FloatCard
                variant={"sm purple"}
                digit={10}
                title={"total orders"}
                icon={"shopping_cart"}
              />
            </Col>
            <Col md={4} lg={4}>
              <FloatCard
                variant={"sm yellow"}
                digit={10}
                title={"total products bought"}
                icon={"hotel_class"}
              />
            </Col>
            <Col md={4} lg={4}>
              <FloatCard
                variant={"sm green"}
                digit={10}
                title={"total money spent"}
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
