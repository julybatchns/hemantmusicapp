"use client";
import React, { useContext, useEffect, useState } from 'react'
import useUser from '../customHook/useUser'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import profile_icon from "../assets/icon/profile.svg";
import styles from "./profile.module.css";
import { UserContext } from '../Provider/UserProvider';

function Profile() {
 
  const { getToken, logout } = useContext(UserContext);
  console.log(logout, "logout");
  console.log(getToken, "getToken");
  const router = useRouter();

  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  useEffect(() => {
    setName(sessionStorage.getItem("name"));
    setToken(sessionStorage.getItem("token"));
  }, [])
  const [show, setShow] = useState(false);



  return (
    <div>
      <div onClick={() => {
        setShow(true);
      }} className={styles.profile}>
        <Image height={40} width={40} src={profile_icon} alt='profile_icon' priority={true} />
        {token && <div>{name}</div>}
      </div>

      {show && (<div className={styles.loginAndLogout}>

          {!token ? (<button className={styles.buttonProfile} onClick={() => {
              router.push("/login");
              setShow(false);
            }}>Login</button>
          ) : (
            <button className={styles.buttonProfile} onClick={() => {
              logout();
              router.push("/");
              setShow(false);
            }}>Logout</button>)}
        </div>)
      }
    </div>
  )
}

export default Profile;
