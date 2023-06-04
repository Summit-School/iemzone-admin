import React from "react";
import { Row, Col } from "react-bootstrap";
import {
  Box,
  Anchor,
  Button,
  Image,
  Input,
  Label,
  Icon,
  Text,
} from "../../components/elements";
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/categoryUpload.json";
//
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/reducers/categories";
import userId from "../../userId";

export default function CategoryUpload() {
  const [files, setFiles] = React.useState([]);
  const [categoryName, setCategoryName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const id = userId();

  const uploadCategoryHandler = () => {
    if (files === "" || categoryName === "") {
      return toast.error("All fields are required");
    } else {
      const catSlug = categoryName.replace(/\W+/g, "-").toLowerCase();
      const form = new FormData();
      form.append("name", categoryName);
      form.append("slug", catSlug);
      form.append("userId", id);
      form.append("image", files[0]);
      // for (let i = 0; i < files[0].length; i++) {
      //   form.append("image", files[i]);
      // }
      dispatch(createCategory(form), setLoading(true))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            toast.success(res.payload.message);
            setLoading(false);
          }
          if (res.meta.requestStatus === "rejected") {
            setLoading(false);
            toast.error(res.payload);
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  };

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
        <Col xl={12}>
          <CardLayout>
            <CardHeader title="basic information" dotsMenu={data?.dotsMenu} />
            <Row>
              <Col xl={12}>
                <LabelField
                  catFxn={setCategoryName}
                  type="text"
                  label="title"
                  fieldSize="w-100 h-md"
                />
              </Col>
              {/* <Col xl={12}>
                <LabelTextarea
                  label="description"
                  fieldSize="w-100 h-text-md"
                />
              </Col> */}
              {/* <Col xl={6}>
                <LabelField
                  label="category"
                  option={["mans", "womans", "accessory"]}
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  label="brand"
                  option={["richman", "lubana", "ecstasy"]}
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  type="text"
                  label="regular price"
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  type="text"
                  label="discount price"
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  type="text"
                  label="shipping fee"
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  type="text"
                  label="tax rate"
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelTextarea label="tags" fieldSize="w-100 h-text-md" />
              </Col> */}
            </Row>
          </CardLayout>
        </Col>
        {/* <Col xl={5}>
          <CardLayout className="mb-4">
            <CardHeader title="organization" dotsMenu={data?.dotsMenu} />
            <Row>
              <Col xl={12}>
                <Box className="mc-product-upload-organize mb-4">
                  <LabelField
                    type="text"
                    label="add category"
                    fieldSize="w-100 h-sm"
                  />
                  <Button className="mc-btn primary">add</Button>
                </Box>
                <Box className="mc-product-upload-organize mb-4">
                  <LabelField
                    type="text"
                    label="add brand"
                    fieldSize="w-100 h-sm"
                  />
                  <Button className="mc-btn primary">add</Button>
                </Box>
                <Box className="mc-product-upload-organize mb-4">
                  <LabelField
                    type="text"
                    label="add color"
                    fieldSize="w-100 h-sm"
                  />
                  <Button className="mc-btn primary">add</Button>
                </Box>
                <Box className="mc-product-upload-organize">
                  <LabelField
                    type="text"
                    label="add size"
                    fieldSize="w-100 h-sm"
                  />
                  <Button className="mc-btn primary">add</Button>
                </Box>
              </Col>
            </Row>
          </CardLayout>
          <CardLayout>
            <CardHeader title="specification" dotsMenu={data?.dotsMenu} />
            <Row>
              <Col xl={6}>
                <LabelField
                  label="size"
                  option={["sm", "md", "lg", "xl", "xxl"]}
                  fieldSize="w-100 h-multiple"
                  multiple
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  label="color"
                  option={["red", "green", "blue", "pink", "black"]}
                  fieldSize="w-100 h-multiple"
                  multiple
                />
              </Col>
              <Col xl={6}>
                <LabelField type="text" label="stock" fieldSize="w-100 h-md" />
              </Col>
              <Col xl={6}>
                <LabelField type="text" label="weight" fieldSize="w-100 h-md" />
              </Col>
            </Row>
          </CardLayout>
        </Col> */}
        <Col xl={12}>
          <CardLayout>
            <CardHeader
              title="media &amp; published"
              dotsMenu={data?.dotsMenu}
            />
            <Box className="mc-product-upload-media">
              {/* <Box className="mc-product-upload-image">
                <Image src="images/product/single/01.webp" alt="product" />
              </Box>
              <Box className="mc-product-upload-image">
                <Image src="images/product/single/02.webp" alt="product" />
              </Box>
              <Box className="mc-product-upload-image">
                <Image src="images/product/single/03.webp" alt="product" />
              </Box>
              <Box className="mc-product-upload-image">
                <Image src="images/product/single/04.webp" alt="product" />
              </Box> */}
              <Box className="mc-product-upload-file">
                <Input
                  type="file"
                  id="product"
                  onChange={(e) => setFiles(e.target.files)}
                />
                <Label htmlFor="product">
                  <Icon type="collections" />
                  <Text>{files[0]?.name}</Text>
                </Label>
              </Box>
            </Box>
            <Anchor
              className="mc-btn w-100 primary mt-5"
              text={loading ? "Loading..." : "publish"}
              icon="cloud_upload"
              // href="#"
              onClick={uploadCategoryHandler}
            />
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
