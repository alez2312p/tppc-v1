"use client";

import { FormEvent } from "react";
import styles from "../styles/verify.module.css";
import { useRouter } from "next/navigation";

export default function Verify() {
  const router = useRouter();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newPassword = formData.get("newPassword");
    const repeatPassword = formData.get("repeatPassword");
    if (newPassword !== "" && repeatPassword !== "") {
      if (newPassword === repeatPassword) {
        const email = localStorage.getItem("email");

        const requestChangePassword = await fetch("/api/changePassword", {
          method: "PATCH", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword, repeatPassword })
        });

        const responseChangePassword = await requestChangePassword.json()
        localStorage.removeItem("email");
        console.log({ responseChangePassword });
        router.push("/dashboard");
      } else {
        alert("Las contraseñas no coinciden");
      }
    };
  }

  return (
    <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
      <div className={styles.main_verify}>
        <form onSubmit={onSubmit}>
          <div className={styles.email_form_row}>
            <label>New Password: </label>
            <input type="password" name="newPassword" />
          </div>
          <div className={styles.email_form_row}>
            <label>Repeat Password: </label>
            <input type="password" name="repeatPassword" />
          </div>
          <button className={styles.email_form_button} type="submit">
            Guardar
          </button>
        </form>
      </div>
    </main>
  );
}

