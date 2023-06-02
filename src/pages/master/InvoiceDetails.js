import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Box,
  Text,
  List,
  Item,
  Image,
  Anchor,
  Heading,
} from "../../components/elements";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../components/elements/Table";
import CardLayout from "../../components/cards/CardLayout";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/invoiceDetails.json";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../redux/reducers/orders";
import { useParams } from "react-router-dom";

export default function InvoiceDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orders.order);
  const order = orderDetails?.order;
  let totalPrice = 0;
  order &&
    order.items.map((item) => {
      totalPrice = totalPrice + item.price;
      return totalPrice;
    });

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [id]);

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
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
        </Col>
        <Col xl={12}>
          <CardLayout className="p-md-5">
            <Box className="mc-invoice-head">
              <Image src={data?.logo.src} alt={data?.logo.alt} />
              <Heading as="h2">invoice #{order?._id}</Heading>
            </Box>
            <Box className="mc-invoice-group">
              <Box className="mc-invoice-recieved">
                <Heading as="h6">{data?.recieved.title}</Heading>
                {<Text>Name: {order?.shippingData.shipping_name}</Text>}
                {<Text>Email: {order?.shippingData.shipping_email}</Text>}
                {<Text>Phone: {order?.shippingData.shipping_contact}</Text>}
                {<Text>Company: {order?.shippingData.shipping_company}</Text>}
                {<Text>City: {order?.shippingData.shipping_city.label}</Text>}
                {<Text>Address1: {order?.shippingData.shipping_address1}</Text>}
                {<Text>Address2: {order?.shippingData.shipping_address2}</Text>}
                {<Text>Zip Code: {order?.shippingData.shipping_zip}</Text>}
              </Box>
              <Box className="mc-invoice-shipment">
                <Heading as="h6">{data?.shipment.title}</Heading>
                {<Text>{order?.shippingData.shipping_name} :Name</Text>}
                {<Text> {order?.shippingData.shipping_email} :Email</Text>}
                {<Text>{order?.shippingData.shipping_contact} :Phone</Text>}
                {<Text>{order?.shippingData.shipping_company} :Company</Text>}
                {<Text>{order?.shippingData.shipping_city.label} :City</Text>}
                {<Text>{order?.shippingData.shipping_address1} :Address1</Text>}
                {<Text>{order?.shippingData.shipping_address2} :Address2</Text>}
                {<Text>{order?.shippingData.shipping_zip} :Zip Code</Text>}
              </Box>
            </Box>
            <Box className="mc-table-responsive">
              <Table className="mc-table">
                <Thead className="mc-table-head">
                  <Tr>
                    {data?.table.thead.map((item, index) => (
                      <Th key={index}>{item}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody className="mc-table-body">
                  {order &&
                    order?.items.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.id}</Td>
                        <Td>
                          <Box className="mc-table-product sm">
                            <Image
                              src={`${process.env.REACT_APP_ENDPOINT}/${item.imgUrl}`}
                              alt={item.alt}
                            />
                            <Text>{item.name}</Text>
                          </Box>
                        </Td>
                        <Td>{item.price}</Td>
                        <Td>{item.discount || 0}</Td>
                        <Td>{item.qty}</Td>
                        <Td>{item.price}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Box>
            <Box className="mc-invoice-list-group">
              <List className="mc-invoice-list">
                <Item>
                  <Text as="span" className="title">
                    Subtotal
                  </Text>
                  <Text as="span" className="clone">
                    :
                  </Text>
                  <Text as="span" className={`digit`}>
                    ${totalPrice}
                  </Text>
                  <Text as="span" className={`status purple`}>
                    cod
                  </Text>
                </Item>
                <Item>
                  <Text as="span" className="title">
                    discount
                  </Text>
                  <Text as="span" className="clone">
                    :
                  </Text>
                  <Text as="span" className={`digit`}>
                    ${order && order.discount}
                  </Text>
                </Item>
                <Item>
                  <Text as="span" className="title">
                    shipping
                  </Text>
                  <Text as="span" className="clone">
                    :
                  </Text>
                  <Text as="span" className={`digit`}>
                    ${order && order.shippingCost}
                  </Text>
                </Item>
                <Item>
                  <Text as="span" className="title">
                    total
                  </Text>
                  <Text as="span" className="clone">
                    :
                  </Text>
                  <Text as="span" className={`digit`}>
                    ${totalPrice + order?.shippingCost}
                  </Text>
                </Item>
              </List>
            </Box>
            <Text className="mc-invoice-note">
              Thank you for shopping at iemzone. We offer a 7-day return policy
              on all products. If you have any complain about this order, please
              call or email us. (VAT has been calculated as per GO
              02/Mushak/2019). This is a sytem generated invoice and no
              signature or seal is required.
            </Text>
            <Box className="mc-invoice-btns">
              {data?.button.map((item, index) => (
                <Anchor
                  key={index}
                  href={item.path}
                  icon={item.icon}
                  text={item.text}
                  className={item.classes}
                />
              ))}
            </Box>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
