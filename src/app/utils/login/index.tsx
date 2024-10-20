"use client";

import { useState, FormEvent } from "react";
import styles from "../../styles/login.module.css";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter();


  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    // const dni = formData.get("dni");
    if (password) {
      // const newPassword = String(CryptoJS.SHA256(`${password}`));
      const requestLogin = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) })
      console.log({ requestLogin });
      const responseLogin = await requestLogin.json()

      console.log({ responseLogin });

      const state = await responseLogin.user.state;
      localStorage.setItem("email", email);

      if (state === "PENDING") {
        router.push("/verify");
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div>
      {!isSelected && (
        <div>
          <form className={styles.email_form} onSubmit={onSubmit}>
            <div className={styles.email_form_row}>
              <label>Correo Electrónico: </label>
              <input type="email" name="email" />
            </div>
            <div className={styles.email_form_row}>
              <label>Contraseña: </label>
              <input type="password" name="password" />
            </div>
            <div className={styles.email_form_row}>
              <label>DNI: </label>
              <input type="text" name="dni" />
            </div>
            <button className={styles.email_form_button} type="submit">
              Iniciar Sesión
            </button>
          </form>
        </div>
      )}
      <div
        className={styles.checkbox}
        onClick={() => setIsSelected(!isSelected)}
      >
        <input
          className={styles.checkbox_checker}
          type="checkbox"
          checked={isSelected}
        />
        <label>Usar una Wallet</label>
      </div>
      <div className={styles.checkbox_wallet_connect}>
        {isSelected && <w3m-button />}
      </div>
    </div>
  );
}
