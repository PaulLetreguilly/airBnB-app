import React from "react";
import { Image } from "react-native";

export default function LogoTitle() {
  return (
    <Image
      style={{ width: 32, height: 35 }}
      source={require("../assets/logo-test.png")}
    />
  );
}
