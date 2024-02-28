'use client'
import styles from "./page.module.css";
import Home from "@/components/Home";
import { useEffect, useState } from 'react';
import Login from "@/components/Login";

export default function Page() {
  const [openLogin, setOpenLogin] = useState(false);
  useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    if (token === null) {
      setOpenLogin(true)
    } else {
      console.log(token);
      setOpenLogin(false)
    }
  }, [])

  return (
    <main className={styles.main}>
      <Home />
      <Login open={openLogin} setOpen={setOpenLogin} />
    </main>
  );
}
