import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.main}>
        <div className="container">
          <div className={styles.heroSection}>
            <div className={styles.formSection}>
              <RegistrationForm />
            </div>

            <div className={styles.heroContent}>
              <h1>Join the Georgian MMA Community</h1>
              <p>
                Get exclusive access to training videos, event notifications,
                and fight analysis
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
