"use client"

import styles from "./body.module.css";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";

export default function body() {
  const [users, setUsers] = useState<string[]>([]);
  const router = useRouter();
  const openFile = (evento: ChangeEvent<HTMLInputElement>) => {
    const file = evento.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result;
    if (typeof content === "string") {
      const userNames = content.split('\n').map(nombre => nombre.trim()).filter(nombre => nombre !== "");
            setUsers(userNames);
            console.log("Vector cargado:", userNames);
            sessionStorage.setItem("participantesSorteo", JSON.stringify(userNames));
            router.push("/sorteo");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <label className={styles.miboton}>
        Cargar Participantes
        <input
          type="file"
          accept=".txt"
          style={{display: "none"}}
          onChange={openFile}
        />
      </label>
      {users.length > 0 && (
        <p>Se han cargado {users.length} participantes.</p>
      )}
    </div>
  );
}
