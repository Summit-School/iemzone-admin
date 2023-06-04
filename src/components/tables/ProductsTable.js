import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import {
  Anchor,
  Heading,
  Box,
  Text,
  Input,
  Image,
  Icon,
  Button,
} from "../elements";

export default function ProductsTable({ thead, tbody }) {
  const [alertModal, setAlertModal] = useState(false);
  const [data, setData] = useState([]);

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

  return (
    <Box className="mc-table-responsive">
      <Table className="mc-table product">
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
          {data?.map((item, index) => (
            <Tr key={index}>
              <Td title={index + 1}>
                <Box className="mc-table-check">
                  <Input
                    type="checkbox"
                    name={item.title}
                    checked={item?.isChecked || false}
                    onChange={handleCheckbox}
                  />
                  <Text>#{index + 1}</Text>
                </Box>
              </Td>
              <Td>
                <Box className="mc-table-product md">
                  <Image src={`${item.thumbnail}`} alt={item.alt} />
                  <Box className="mc-table-group">
                    <Heading as="h6">{item.title}</Heading>
                    <Text>{item.description}</Text>
                  </Box>
                </Box>
              </Td>
              <Td>{item.categories}</Td>
              <Td>{item.brand}</Td>
              <Td>
                <Box className="mc-table-price">
                  <del>{item.regularPrice}</del>
                  <Text>{item.salesPrice}</Text>
                </Box>
              </Td>
              <Td>{item.stock}</Td>
              <Td>
                <Box className="mc-table-rating">
                  <Icon>{"star"}</Icon>
                  <Heading>{item?.rating / 100}</Heading>
                  <Text>({item?.rating})</Text>
                </Box>
              </Td>
              <Td>{item.orders}</Td>
              <Td>{item.sales}</Td>
              <Td>
                <Box className="mc-table-action">
                  <Anchor
                    href={`/product-view/${item._id}`}
                    title="View"
                    className="material-icons view"
                  >
                    {/* {item.action.view} */}
                    visibility
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
          ))}
        </Tbody>
      </Table>

      <Modal show={alertModal} onHide={() => setAlertModal(false)}>
        <Box className="mc-alert-modal">
          <Icon type="new_releases" />
          <Heading as="h3">are your sure!</Heading>
          <Text as="p">Want to delete this product?</Text>
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
