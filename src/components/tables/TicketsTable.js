import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import {
  Button,
  Image,
  Input,
  Text,
  Box,
  Icon,
  Anchor,
  Option,
  Heading,
} from "../elements";
// import userInfo from "../../data/master/userList.json";
import { useDispatch } from "react-redux";
import { verifyShop } from "../../redux/reducers/shops";
import { toast } from "react-toastify";

export default function ShopsTable({ thead, tbody }) {
  const [data, setData] = useState([]);
  const [userData, setUserData] = React.useState("");
  const [editModal, setEditModal] = React.useState(false);
  const [blockModal, setBlockModal] = React.useState(false);
  const [verStatus, setVerStatus] = React.useState(false);
  const [shopData, setShopData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setData(tbody);
  }, [tbody]);

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

  const verifyStore = () => {
    setLoading(true);
    const data = {
      id: shopData._id,
      verified: verStatus,
    };
    dispatch(verifyShop(data))
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
            return (
              <Tr key={index}>
                <Td title="id">
                  <Box className="mc-table-check">
                    <Input
                      type="checkbox"
                      name={item.name}
                      checked={item?.isChecked || false}
                      onChange={handleCheckbox}
                    />
                    <Text>#{index + 1}</Text>
                  </Box>
                </Td>
                <Td title={item.name}>
                  <Box className="mc-table-profile">
                    <Image src={`${item.user.avatar}`} alt={item.alt} />
                    <Text>
                      {item.user.name.firstName} {item.user.name.lastName}
                    </Text>
                  </Box>
                </Td>
                {/* <Td title={item?.role}>
                <Box className="mc-table-icon role">
                  {item.role.text === "vendor" && (
                    <Icon className="material-icons yellow">
                      {item.role.icon}
                    </Icon>
                  )}
                  {item.role.text === "member" && (
                    <Icon className="material-icons green">
                      {item.role.icon}
                    </Icon>
                  )}
                  {item.role.text === "admin" && (
                    <Icon className="material-icons purple">
                      {item.role.icon}
                    </Icon>
                  )}
                  {item.role.text === "founder" && (
                    <Icon className="material-icons blue">
                      {item.role.icon}
                    </Icon>
                  )}
                  <Text as="span">{item.role.text}</Text>
                </Box>
              </Td> */}
                <Td title={item.subject}>{item.subject}</Td>
                <Td title={item.priority}>{item.priority}</Td>
                <Td title={item.status}>
                  {item.status === "open" && (
                    <Text className="mc-table-badge green">{"Open"}</Text>
                  )}
                  {item.verified === "closed" && (
                    <Text className="mc-table-badge red">{"Closed"}</Text>
                  )}
                </Td>
                <Td title={item.created}>{item.createdAt}</Td>
                <Td>
                  <Box className="mc-table-action">
                    <Anchor
                      href={`/support-ticket-detail/${item._id}`}
                      title="View"
                      className="material-icons view"
                    >
                      {/* {item.action.view} */}
                      visibility
                    </Anchor>
                    <Button
                      title="Edit"
                      className="material-icons edit"
                      onClick={() => setEditModal(true, setShopData(item))}
                    >
                      {/* {item.action.edit} */}
                      edit
                    </Button>
                    <Button
                      title="Block"
                      className="material-icons block"
                      onClick={() => setBlockModal(true, setShopData(item))}
                    >
                      {/* {item.action.block} */}
                      block
                    </Button>
                  </Box>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Modal
        show={editModal}
        onHide={() => setEditModal(false, setUserData(""))}
      >
        <Box className="mc-user-modal">
          <Image src={userData.src} alt={userData?.alt} />
          <Heading as="h4">{userData?.name}</Heading>
          <Text as="p">{userData?.email}</Text>
          {/* <Form.Group className="form-group inline mb-4">
            <Form.Label>role</Form.Label>
            <Form.Select>
              <Option>{userData?.role ? userData?.role.text : ""}</Option>
              {userInfo.role.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Form.Select>
          </Form.Group> */}
          <Form.Group className="form-group inline">
            <Form.Label>status</Form.Label>
            <Form.Select onChange={(e) => setVerStatus(e.target.value)}>
              <Option>Select status</Option>
              <Option value={true}>Verify</Option>
              <Option value={false}>Unverify</Option>
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
              onClick={verifyStore}
            >
              {loading ? "loading..." : "save Changes"}
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>
      <Modal show={blockModal} onHide={() => setBlockModal(false)}>
        <Box className="mc-alert-modal">
          <Icon type="new_releases" />
          <Heading as="h3">are your sure!</Heading>
          <Text as="p">Want to Unverify this shop's account?</Text>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => setBlockModal(false)}
            >
              nop, close
            </Button>
            <Button
              type="button"
              className="btn btn-danger"
              // onClick={UnverifyStoreHandler}
            >
              {loading ? "loading..." : " yes, Unverify"}
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>
    </Box>
  );
}
