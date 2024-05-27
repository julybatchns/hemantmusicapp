import Link from "next/link";
import React, { useContext } from "react";
import Logo from "../Logo/Logo";
import SearchInput from "../Search_Input/Search_Input";
import styles from "./NvaBar.module.css";
import Profile from "@/app/profile/Profile";

function NavBar() {
  return (
    <div>
      <nav className={styles.navBarConatiner}>
        <ul>
          <Link href={"/"}>{<Logo />}</Link>
        </ul>
        <ul className={styles.linkBar}>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/social"}>Social</Link>
          </li>
          <li>
            <Link href={"/library"}>Library</Link>
          </li>
        </ul>
        <ul className={styles.search}>{/* <SearchInput /> */}</ul>
        <ul>
          <Profile />
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
