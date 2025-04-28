import styles from "./page.module.css";
import { Editor } from "../components/DynamicEditor";

export default function Home() {
  return (
    <div className={styles.page}>
      <Editor />
    </div>
  );
}
