"use client";
import Image from "next/image";
import WelcomeScreen from "./components/WelcomeScreen";
import { useState } from "react";

export default function Home() {
  const [isRepeatedUser, setIsRepeatedUser] = useState(false);

  if (!isRepeatedUser) {
    console.log("Welcome! This is your first time here.");
    return <WelcomeScreen/>;
  } else {
    console.log("Welcome back!");
  } return <></>

  ;
}
