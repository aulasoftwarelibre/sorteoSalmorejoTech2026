"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/app/components/footer/footer";
import styles from "./page.module.css"

export default function Home() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [historial, setHistorial] = useState<{ color: string, numero: number }[]>([]);
  return (
    <>
      <div className={styles.roulette}>
        <div className={styles.roulette_container}>
          <div className={styles.wrap}>
            <div className={styles.controller}></div>
          </div>
        </div>
      </div>
      <Footer isVisible={true}/>
    </>
    );
}


