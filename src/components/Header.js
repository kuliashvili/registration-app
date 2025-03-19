"use client";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import styles from "./Header.module.css";
import Image from "next/image";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      setDarkMode(savedMode === "true");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <div className={styles.logo}>
          {darkMode ? (
            <Image
              src="/logored.svg"
              alt="MMA Georgia Logo"
              width={90}
              height={30}
            />
          ) : (
            <Image
              src="/logo.svg"
              alt="MMA Georgia Logo"
              width={90}
              height={30}
            />
          )}
        </div>

        {/* Desktop navigation */}
        <div className={styles.desktopNav}>
          <button
            className={styles.themeToggle}
            onClick={toggleDarkMode}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <Sun className={styles.modeSwitch} width={24} height={24} />
            ) : (
              <Moon className={styles.modeSwitch} width={24} height={24} />
            )}
          </button>
          <div className={styles.divider}></div>
          <div className={styles.authButtons}>
            <button className="btn">Sign In</button>
            <button className="btn">Sign Up</button>
          </div>
        </div>

        <button
          className={styles.burgerButton}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <Menu size={30} />
        </button>

        {/* Mobile menu */}
        <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
          <div className={styles.mobileMenuContent}>
            <button
              className={styles.closeMenuButton}
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <X size={30} />
            </button>
            <button
              className={`${styles.themeToggle} ${styles.mobileThemeToggle}`}
              onClick={toggleDarkMode}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <div className={styles.mobileAuthButtons}>
              <button className="btn">Sign In</button>
              <button className="btn">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
