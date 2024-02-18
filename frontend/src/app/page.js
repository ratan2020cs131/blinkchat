import styles from "./page.module.css";
import Home from "@/components/Home";

export default function Page () {
  return (
    <main className={styles.main}>
      <Home />
    </main>
  );
}
