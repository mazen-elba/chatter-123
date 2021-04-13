import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";

export default function DefaultPage() {
  const history = useHistory();
  const redirect = () => history.push("/");

  return (
    <div>
      <IconButton
        mr={2}
        isRound="true"
        bg="green.300"
        color="white"
        icon={<BiArrowBack />}
        onClick={redirect}
      />{" "}
      You're lost. Go home.
    </div>
  );
}
