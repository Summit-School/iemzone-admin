import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import {
  Image,
  Input,
  Text,
  Box,
  Icon,
  Button,
  Heading,
  Anchor,
  Option,
} from "../elements";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../redux/reducers/orders";
import { toast } from "react-toastify";

export default function OrderTable({ thead, tbody, usersData }) {
  const [editModal, setEditModal] = React.useState(false);
  const [orderData, setOrderData] = React.useState(null);
  const [userData, setUserData] = React.useState(null);
  const [orderStatus, setOrderStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setData(tbody);
    setUsers(usersData);
  }, [tbody, usersData]);

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;

    if (name === "allCheck") {
      const checkData = data?.map((item) => {
        return { ...item, isChecked: checked };
      });
      setData(checkData);
    } else {
      const checkData = data?.map((item) =>
        item.name === name ? { ...item, isChecked: checked } : item
      );
      setData(checkData);
    }
  };

  const updateOrderStatusHandler = () => {
    setLoading(true);
    const data = {
      id: orderData._id,
      status: orderStatus,
    };
    dispatch(updateOrderStatus(data))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("success");
          setLoading(false);
          setEditModal(false);
        } else {
          toast.error("An error occurred");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <Box className="mc-table-responsive">
      <Table className="mc-table">
        <Thead className="mc-table-head primary">
          <Tr>
            <Th>
              <Box className="mc-table-check">
                <Input
                  type="checkbox"
                  name="allCheck"
                  checked={
                    data?.filter((item) => item.isChecked !== true).length < 1
                  }
                  onChange={handleCheckbox}
                />
                <Text>uid</Text>
              </Box>
            </Th>
            {thead.map((item, index) => (
              <Th key={index}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody className="mc-table-body even">
          {data?.map((item, index) => {
            const user = users?.filter((user) => user._id === item.userId);
            return (
              <Tr key={index}>
                <Td>
                  <Box className="mc-table-check">
                    <Input
                      type="checkbox"
                      name={item.name}
                      checked={item?.isChecked || false}
                      onChange={handleCheckbox}
                    />
                    <Text>{item._id}</Text>
                  </Box>
                </Td>
                <Td>
                  <Box className="mc-table-profile">
                    <Image
                      src={
                        user &&
                        `${process.env.REACT_APP_ENDPOINT}/${user[0]?.avatar}`
                      }
                      alt={"Profile"}
                    />
                    <Text>{user && user[0]?.name?.firstName}</Text>
                  </Box>
                </Td>
                <Td>{item.items.length} items</Td>
                <Td>{item.totalPrice}</Td>
                <Td>{item.paymentMethod}</Td>

                {/* <Td>
                  <Text className={`mc-table-badge ${item.status.variant}`}>
                    {item.status}
                  </Text>
                </Td> */}

                <Td>
                  {item.status === "Pending" && (
                    <Text className="mc-table-badge blue">{item.status}</Text>
                  )}
                  {item.status === "Processing" && (
                    <Text className="mc-table-badge yellow">{item.status}</Text>
                  )}
                  {item.status === "Cancelled" && (
                    <Text className="mc-table-badge red">{item.status}</Text>
                  )}
                  {item.status === "Delivered" && (
                    <Text className="mc-table-badge green">{item.status}</Text>
                  )}
                </Td>

                <Td>{item.createdAt}</Td>
                <Td>
                  <Box className="mc-table-action">
                    <Anchor
                      title="View"
                      href={`/invoice-details/${item._id}`}
                      className="material-icons view"
                    >
                      {/* {item.action.view} */}
                      visibility
                    </Anchor>
                    <Anchor
                      title="Download"
                      href="#"
                      className="material-icons download"
                      download
                      onClick={() =>
                        setEditModal(
                          true,
                          setOrderData(item),
                          setUserData(user)
                        )
                      }
                    >
                      {/* {item.action.download} */}
                      edit
                    </Anchor>
                  </Box>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Modal
        show={editModal}
        onHide={() => setEditModal(false, setOrderData(""))}
      >
        <Box className="mc-user-modal">
          <Image
            src={
              userData &&
              `${process.env.REACT_APP_ENDPOINT}/${userData[0].avatar}`
            }
            alt={userData?.alt}
          />
          <Heading as="h4">{userData && userData[0]?.name.firstName}</Heading>
          <Text as="p">{userData && userData[0]?.email}</Text>
          <Form.Group className="form-group inline">
            <Form.Label>status</Form.Label>
            <Form.Select onChange={(e) => setOrderStatus(e.target.value)}>
              <Option>{orderData?.status}</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Processing">Processing</Option>
              <Option value="Delivered">Delivered</Option>
              <Option value="Cancelled">Cancelled</Option>
            </Form.Select>
          </Form.Group>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditModal(false)}
            >
              close popup
            </Button>
            <Button
              type="button"
              className="btn btn-success"
              onClick={updateOrderStatusHandler}
            >
              {loading ? "loading..." : "save Changes"}
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>
    </Box>
  );
}
