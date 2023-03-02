import { app } from "../firebase";
import { useRouter } from "next/router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookFill } from "react-icons/ri";
import Head from "next/head";

function Signup() {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const router = useRouter();
  const signInGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        router.push("/");
        sessionStorage.setItem("Token", response.user.accessToken);
        console.log(response.user);
      })
      .catch((err) => console.log(err));
  };
  // useEffect(() => {
  //   let token = sessionStorage.getItem("Token");
  //   if (token) {
  //     router.push("/");
  //   }
  //   console.log("token is my friend");
  //   console.log(token);
  // }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailInputHandler = (e) => {
    const content = e.target.value;
    setEmail(content);
  };
  const passwordInputHandler = (e) => {
    const content = e.target.value;
    setPassword(content);
  };
  const confirmPasswordInputHandler = (e) => {
    const content = e.target.value;
    setConfirmPassword(content);
  };
  const emailIsValid = email.includes("@");
  const passwordIsValid = password.length >= 6;
  const passwordIsEqual = password === confirmPassword;

  const signupHandler = async (e) => {
    e.preventDefault();
    if (emailIsValid && passwordIsValid && passwordIsEqual) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          console.log(response.user);
          sessionStorage.setItem("Token", response.user.accessToken);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="my-10 grid grid-cols-1 place-content-center overflow-y-scroll xs:h-screen xs:palce-items-center xs:my-0  scrollbar-hide  text-gray-700">
    <Head>
     <title>Signup</title>
     <meta name="description" content="Generated by create next app" />
     <link rel="icon" href="/favicon.ico" />
       
   </Head>

      <h2 className="sm:mt-24 text-2xl text-center font-bold mb-2  ">Sign Up</h2>

      <form onSubmit={signupHandler}>
      <input
              type='text'
              className='border-[1px] lg:border-[1px] rounded-lg md:rounded-full  border-gray-500] outline-none px-4 py-[16px] w-[90%]  m-auto flex my-5 lg:my-5'
              placeholder='Username '
              required
              // onChange={emailInputHandler}
            />
      <input
              type='email'
              className='border-[1px] lg:border-[1px] rounded-lg md:rounded-full  border-gray-500] outline-none px-4 py-[16px] w-[90%]  m-auto flex my-5 lg:my-5'
              placeholder='Enter email '
              required
               onChange={emailInputHandler}

            />
      <input
              type='password'
              className='border-[1px] lg:border-[1px] rounded-lg md:rounded-full  border-gray-500] outline-none px-4 py-[16px] w-[90%]  m-auto flex my-5 lg:my-5'
              placeholder='Password'
              required
              onChange={passwordInputHandler}
            />
      <input
              type='password'
              className='border-[1px] lg:border-[1px] rounded-lg md:rounded-full  border-gray-500] outline-none px-4 py-[16px] w-[90%]  m-auto flex my-5 lg:my-5'
              placeholder='Confrim Password'
              required
              onChange={confirmPasswordInputHandler}
            />
        </form>

        <Link href="/forgot-password">
         <p  className="text-[#2F89FC] capitalize text-center font-poppins">forgot password?</p>
        </Link>

        <button className="capitalize w-[90%] h-[48px] rounded-md text-white bg-[#0E64D2] block mt-4 m-auto">Signup</button>

        <p className="font-poppins text-center mt-4">Dont have an account?
        <Link href="/login" className="font-poppins text-[#2F89FC] ml-4">Login</Link>
        </p>

        <div className="flex items-center justify-between px-4 mt-4">
          <span className="w-[44%] h-[1px] bg-gray-700"></span>
          <p className="font-poppins  text-lg">or</p>
          <span className="w-[44%] h-[1px] bg-gray-700"></span>
        </div>

        <button className=" w-[90%] h-[48px] rounded-md text-white bg-[#1877F2]  mt-4 m-auto flex items-center justify-between px-2 ">
        <RiFacebookFill className="w-7 h-7 "/>
          Signup with Facebook
          <div></div>
          </button>

        <button className=" w-[90%] h-[48px] rounded-md text-gray-500 border-[1px] bg-white mt-4 m-auto flex items-center justify-between px-2 "   onClick={signInGoogle}>
        <FcGoogle className="w-7 h-7 "/>
        Signup with Google
          <div></div>
          </button>

      </div>
  );
}

export default Signup;
