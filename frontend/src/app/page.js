'use client'
import styles from "./page.module.css";
import Home from "@/components/Home";
import { useEffect, useState } from 'react';
import Login from "@/components/Login";

export default function Page() {
  const [openLogin, setOpenLogin] = useState(false);
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      setOpenLogin(true)
    } else {
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
