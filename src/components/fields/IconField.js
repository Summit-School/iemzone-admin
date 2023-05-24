import React from "react";
import { Box, Input, Select, Option, Icon, Button } from "../elements";

export default function IconField({
  classes,
  icon,
  option,
  activeOption,
  type,
  placeholder,
  passwordVisible,
  emailFxn,
  passwordFxn,
  ...rest
}) {
  const [visible, setVisible] = React.useState(false);
  const handleInput = (text) => {
    if (type === "email") emailFxn(text);
    if (type === "password") passwordFxn(text);
  };

  return (
    <Box className={`mc-icon-field ${classes || "w-md h-sm white"}`}>
      <Icon type={icon || "account_circle"} />
      {type ? (
        <>
          <Input
            type={visible ? "text" : type || "text"}
            placeholder={type ? placeholder || "Type here..." : ""}
            {...rest}
            onChange={(e) => handleInput(e.target.value)}
          />
          {passwordVisible && (
            <Button
              type="button"
              className="material-icons"
              onClick={() => setVisible(!visible)}
            >
              {visible ? "visibility_off" : "visibility"}
            </Button>
          )}
        </>
      ) : (
        <Select {...rest}>
          <Option>{activeOption || "Select Option"}</Option>
          {option.map((item, index) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      )}
    </Box>
  );
}
