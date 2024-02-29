'use client'
import styles from "./page.module.css";
import Home from "@/components/Home";
import { useEffect, useState } from 'react';
import Login from "@/components/Login";
import { useSelector, useDispatch } from "react-redux";
import { profile } from "@/redux/feature/auth/authSlice";
import { Loader } from "../../assets";
import Image from "next/image";

export default function Page() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [openLogin, setOpenLogin] = useState(false);
  useEffect(() => {
    if (auth.tokenInvalid) {
      if (auth.user === null) {
        setOpenLogin(true)
      } else {
        setOpenLogin(false)
      }
    }
  }, [auth.verifyingToken])

  useEffect(() => {
    if (auth.user === null)
      dispatch(profile())
  }, [auth.isAuth])

  return (
    <main className={styles.main}>
      {auth.verifyingToken && <Image src={Loader} alt="...loading" style={{ height: '40px', marginTop: '100px' }} />}
      <Home name={auth.user?.name} />
      <Login open={openLogin} setOpen={setOpenLogin} />
    </main>
  );
}
