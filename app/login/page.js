"use client";
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Provider/UserProvider';
import { useRouter } from 'next/navigation';
import styles from "../signup/signup.module.css";
import useUser from '../customHook/useUser';

function login() {

  const contextData = useContext(UserContext);
  const { nameHandler, tokenHandler } = contextData;
  const router = useRouter();
  const { getToken } = useUser();
  
  const [error, setError] = useState("");

  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  // const [token] = useState(sessionStorage.getItem("token"))
  // const [login] = useState(token);



  function submitForm(){
    
    async function callAPI(){
      const url = "https://academics.newtonschool.co/api/v1/user/login";
      const myHeaders = new Headers();
      myHeaders.append("projectID", "69wrdjpfsdpk");
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: loginState.email,
        password: loginState.password,
        appType: "music",
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch(url, requestOptions);
      const data = await response.json();
      const token = data?.token;
      const name = data?.data?.user.name

      tokenHandler(token);
      nameHandler(name);

      console.log(data?.message, "login data");

    }

    
    callAPI();
    
    router.push("/");
  }
  

  function formHandler(e, key){
    const val = e.target.value;
    setLoginState((old) => {
      return{
        ...old,
        [key]: val,
      }
    })
  };


  function submitLoginHandler(e){
    e.preventDefault();

    if(loginState.email === "" && loginState.password === ""){
      setError("The email and password is required !");
    }else if(loginState.email === ""){
      setError("The email is required !");
    }else if(loginState.password === ""){
      setError("The password is required !");
    }else{
      submitForm();

      setTimeout(() => {
        location.reload();
      }, 2000);
    }

  }


  return (
    <div className={styles.signupContainer}>
      <h1 className={styles.formName}>Login</h1>
      <h3 style={{color: "red"}}>{error}</h3>
      
      <form onSubmit={submitLoginHandler} className={styles.signupForm}>
        <div className={styles.containerDiv}>
          <label htmlFor="exampleInputEmail1" className={styles.labelSize}>Email</label>
          <br/>
          <input onChange={(e) => {
              formHandler(e, "email");
              setError("")
          }}  type="email" className={styles.inputSize} id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className={styles.containerDiv}>
          <label htmlFor="exampleInputPassword1" className={styles.labelSize}>Password</label>
          <br/>
          <input onChange={(e) => {
              formHandler(e, "password");
              setError("");
          }} type="password" className={styles.inputSize} id="exampleInputPassword1" />
        </div>
        <button type="submit" className={styles.buttonSubmit}>Login</button>
      </form>

      <div className={styles.alreadyExit}>
        <p>Dont`t have an account?</p>
        <input type='submit' value={"SignUp here!"} onClick={() => {
          router.push("/signup");
        }} />
      </div>
    </div>
  )
}

export default login;
