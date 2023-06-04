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
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../redux/reducers/categories";
import { toast } from "react-toastify";

export default function CategoriesTable({ thead, tbody }) {
  const [alertModal, setAlertModal] = useState(false);
  const [catData, setCatData] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const deleteCategoryHandler = () => {
    setLoading(true);
    dispatch(deleteCategory(catData._id))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success(res.payload.message);
          setLoading(false);
          setAlertModal(false);
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
                  <Image src={`${item.image}`} alt={item.alt} />
                  <Box className="mc-table-group">
                    <Heading as="h6">{item.name}</Heading>
                    <Text>{item.slug}</Text>
                  </Box>
                </Box>
              </Td>
              <Td>{item.createdAt}</Td>
              <Td>
                <Box className="mc-table-action">
                  <Button
                    title="Delete"
                    className="material-icons delete"
                    onClick={() => setAlertModal(true, setCatData(item))}
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
          <Text as="p">
            Want to delete this {catData && catData.name} category?
          </Text>
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
              onClick={deleteCategoryHandler}
            >
              {loading ? "Loading..." : "yes, delete"}
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>
    </Box>
  );
}
