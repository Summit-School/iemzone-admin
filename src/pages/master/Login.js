import React, { useState } from "react";
import {
  Box,
  Form,
  Heading,
  Button,
  Anchor,
  Image,
  //   Text,
} from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/login.json";
import { IconAlert } from "../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [responseError, setResponseError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    setLoading(true);
    if (email && password) {
      const data = {
        email,
        password,
      };
      dispatch(login(data), setLoading(true))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            navigate("/ecommerce");
            setLoading(false);
          } else {
            setResponseError(true);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <Box className="mc-auth">
      <Image
        src={data?.pattern.src}
        alt={data?.pattern.alt}
        className="mc-auth-pattern"
      />
      <Box className="mc-auth-group">
        <Logo
          src={data?.logo.src}
          alt={data?.logo.alt}
          href={data?.logo.path}
          className="mc-auth-logo"
        />
        <Heading as="h4" className="mc-auth-title">
          {data?.title}
        </Heading>
        <Form className="mc-auth-form">
          {data?.input.map((item, index) => (
            <IconField
              emailFxn={setEmail}
              passwordFxn={setPassword}
              key={index}
              icon={item.icon}
              type={item.type}
              option={item.option}
              classes={item.fieldSize}
              placeholder={item.placeholder}
              passwordVisible={item.passwordVisible}
            />
          ))}
          <Button
            className={`mc-auth-btn ${data?.button.fieldSize}`}
            type={data?.button.type}
            onClick={handleLogin}
          >
            {loading ? "Loading..." : data?.button.text}
          </Button>
          <Anchor className="mc-auth-forgot" href={data?.forgot.path}>
            {data?.forgot.text}
          </Anchor>
          {error ? (
            <IconAlert
              title="Fields Error"
              text="All fields are required"
              classes="red mt-4"
              icon="report"
            />
          ) : (
            ""
          )}
          {responseError ? (
            <IconAlert
              title="Authentication Error"
              text="Authentication failed"
              classes="red mt-4"
              icon="report"
            />
          ) : (
            ""
          )}
          {/* <Box className="mc-auth-divide">
            <Text as="span">{data?.divide.text}</Text>
          </Box> */}
          {/* <Box className="mc-auth-connect">
            {data?.connect.map((item, index) => (
              <Anchor key={index} href={item.path} className={item.classes}>
                <i className={item.icon}></i>
                <span>{item.text}</span>
              </Anchor>
            ))}
          </Box> */}
        </Form>
        {/* <Box className="mc-auth-navigate">
          <Text as="span">{data?.navigate.title}</Text>
          <Anchor href={data?.navigate.path}>{data?.navigate.text}</Anchor>
        </Box> */}
      </Box>
    </Box>
  );
}
