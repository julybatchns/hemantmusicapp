import React from 'react'
import logo from "../../assets/icon/logo_icon.png";
import Image from 'next/image';
import styles from "./Logo.module.css";

function Logo() {
  return (
    <div>
        <Image width={267} height={50} src={logo} alt={"Logo_Image"} priority={true} />
    </div>
  )
}

export default Logo
