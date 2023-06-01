import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
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
} from "../elements";

export default function OrderTable({ thead, tbody, usersData }) {
  const [alertModal, setAlertModal] = React.useState(false);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

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
                    >
                      {/* {item.action.download} */}
                      download
                    </Anchor>
                    <Button
                      title="Delete"
                      className="material-icons delete"
                      onClick={() => setAlertModal(true)}
                    >
                      {/* {item.action.delete} */}
                      delete
                    </Button>
                  </Box>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Modal show={alertModal} onHide={() => setAlertModal(false)}>
        <Box className="mc-alert-modal">
          <Icon type="new_releases" />
          <Heading as="h3">are your sure!</Heading>
          <Text as="p">Want to delete this order?</Text>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => setAlertModal(false)}
            >
              nop, close
            </Button>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={() => setAlertModal(false)}
            >
              yes, delete
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>
    </Box>
  );
}
