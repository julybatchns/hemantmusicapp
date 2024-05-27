"use client";
import { useRouter } from 'next/navigation';
import styles from "./signup.module.css";
import { useState } from 'react';

function signup() {
  const router = useRouter();

  const [error, setError] = useState("");
  const  [signupState, setSignupState] = useState({
    name: "",
    email: "",
    password: "",
  });

  console.log(signupState, "signupState");

  async function signUpForm() {
    
    try{
      const url = "https://academics.newtonschool.co/api/v1/user/signup";
      const myHeaders = new Headers();
      myHeaders.append("projectID", "69wrdjpfsdpk");
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "name": signupState.name,
        "email": signupState.email,
        "password": signupState.password,
        "appType": "music"
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch(url, requestOptions);
      const data = response.json();
      // const message = data?.Promise?.;
      console.log(data, "sign Up Form");

    }catch (error) {
      setError(error);
      console.log(error, "error");
    }
      
  }


  function signUpFormHandler(e, key) {
    const val = e.target.value;
    setSignupState((old) => {
      return{
        ...old,
        [key]: val,
      }
    })
  };


  function submitSingUpHandler(e){
    e.preventDefault();
    signUpForm();

    if(signupState.name === "" && signupState.email === "" && signupState.password === ""){
      setError("The name, email and password is required !");
    }else if(signupState.name === ""){
      setError("The name is required !");
    }else if(signupState.email === ""){
      setError("The email is required !");
    }else if(signupState.password === ""){
      setError("The password is required !");
    }else{
      signUpForm();
    }
    console.log(signupState, "sign Up State");
  }

  return (
    <div className={styles.signupContainer}>
      <h1 className={styles.formName}>Sign Up</h1>
      <h3 className={styles.error}>{error}</h3>

      <form className={styles.signupForm} onSubmit={submitSingUpHandler}>
      <div className={styles.containerDiv} >
          <label htmlFor="exampleInputName" className={styles.labelSize}>Name</label>
          <br/>
          <input onChange={(e) => {
            signUpFormHandler(e, "name");
          }} type="text" id="exampleInputName" className={styles.inputSize} />
        </div>
        <div className={styles.containerDiv} >
          <label htmlFor="exampleInputEmail1" className={styles.labelSize}>Email</label>
          <br/>
          <input onChange={(e) => {
            signUpFormHandler(e, "email");
          }} type="email" id="exampleInputEmail1" aria-describedby="emailHelp" className={styles.inputSize} />
        </div>
        <div className={styles.containerDiv}>
          <label htmlFor="exampleInputPassword1" className={styles.labelSize}>Password</label>
          <br/>
          <input onChange={(e) => {
            signUpFormHandler(e, "password");
          }} type="password" id="exampleInputPassword1" className={styles.inputSize} />
        </div>
        <button type="submit" className={styles.buttonSubmit} >Sign Up</button>
      </form>

      <div className={styles.alreadyExit}>
        <p>Already have an account?</p>
        <input type='submit' value={"Signin here!"} onClick={() => {
          router.push("/login");
        }} />
      </div>
      
    </div>
  )
}

export default signup;
