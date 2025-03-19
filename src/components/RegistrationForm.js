"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { toast } from "react-hot-toast";
import styles from "./RegistrationForm.module.css";

// Country data
const countryCodes = [
  { code: "+995", country: "GE", name: "Georgia" },
  { code: "+1", country: "US", name: "United States" },
  { code: "+44", country: "GB", name: "United Kingdom" },
  { code: "+7", country: "RU", name: "Russia" },
  { code: "+90", country: "TR", name: "Turkey" },
  { code: "+380", country: "UA", name: "Ukraine" },
  { code: "+49", country: "DE", name: "Germany" },
  { code: "+33", country: "FR", name: "France" },
  { code: "+39", country: "IT", name: "Italy" },
  { code: "+34", country: "ES", name: "Spain" },
];

export default function RegistrationForm() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+995",
    phoneNumber: "",
    password: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }

    // to calculate password strength when password changes
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const handleCountrySelect = (code) => {
    setFormData({
      ...formData,
      countryCode: code,
    });
    setShowCountryDropdown(false);

    if (errors.phone) {
      setErrors({
        ...errors,
        phone: null,
      });
    }
  };

  // password strength calculator
  const calculatePasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Medium";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phoneNumber) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phone = "Phone number should contain only digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must include at least one uppercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must include at least one number";
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      newErrors.password =
        "Password must include at least one special character";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const completePhoneNumber = `${formData.countryCode} ${formData.phoneNumber}`;

      // data for storage
      const dataToStore = {
        ...formData,
        phone: completePhoneNumber,
      };

      // Save to localStorage
      localStorage.setItem("registeredUser", JSON.stringify(dataToStore));

      toast.success("Registration successful!");

      // reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "+995",
        phoneNumber: "",
        password: "",
        agreeToTerms: false,
      });

      console.log("Form submitted successfully:", dataToStore);
    } else {
      console.log("Form validation failed");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showCountryDropdown &&
        !event.target.closest(`.${styles.countrySelector}`)
      ) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCountryDropdown]);

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Register Your Account</h3>
        <p>Enter your personal data to create your account</p>

        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter your first name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? styles.inputError : ""}
          />
          {errors.firstName && (
            <span className={styles.errorText}>{errors.firstName}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter your last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? styles.inputError : ""}
          />
          {errors.lastName && (
            <span className={styles.errorText}>{errors.lastName}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="example@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? styles.inputError : ""}
          />
          {errors.email && (
            <span className={styles.errorText}>{errors.email}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <div className={styles.phoneInputWrapper}>
            <div
              className={`${styles.countrySelector} ${
                errors.phone ? styles.inputError : ""
              }`}
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
            >
              <span>{formData.countryCode}</span>
              <ChevronDown size={16} />

              {showCountryDropdown && (
                <div className={styles.countryDropdown}>
                  {countryCodes.map((country) => (
                    <div
                      key={country.code}
                      className={styles.countryOption}
                      onClick={() => handleCountrySelect(country.code)}
                    >
                      <span className={styles.flag}>{country.country}</span>
                      <span>{country.name}</span>
                      <span className={styles.countryCode}>{country.code}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="555123456"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phone ? styles.inputError : ""}
            />
          </div>
          {errors.phone && (
            <span className={styles.errorText}>{errors.phone}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Create a password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? styles.inputError : ""}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          {formData.password && (
            <div className={styles.passwordStrength}>
              <div className={styles.strengthBar}>
                <div
                  className={`${styles.strengthFill} ${
                    styles["strength" + passwordStrength]
                  }`}
                  style={{ width: `${(passwordStrength / 4) * 100}%` }}
                ></div>
              </div>
              <span>{getPasswordStrengthText()}</span>
            </div>
          )}

          {errors.password && (
            <span className={styles.errorText}>{errors.password}</span>
          )}
        </div>

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          <label htmlFor="agreeToTerms">
            I agree to the{" "}
            <a href="#" className={styles.termsConditions}>
              Terms and Conditions
            </a>
          </label>
          {errors.agreeToTerms && (
            <span className={styles.errorText}>{errors.agreeToTerms}</span>
          )}
        </div>

        <button type="submit" className="btn">
          Sign Up
        </button>

        <p className={styles.signinLink}>
          Already have an account? <a href="#">Sign In</a>
        </p>
      </form>
    </div>
  );
}
