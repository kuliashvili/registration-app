import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <p className={styles.copyright}>
          © 2025 MMA Georgia • Privacy Policy • Terms of Service
        </p>
      </div>
    </footer>
  );
}
