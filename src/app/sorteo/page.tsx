"use client";

import { useEffect, useState, useRef } from "react";
import Footer from "@/app/components/footer/footer";
import styles from "./page.module.css";

export default function Home() {
  const [participantes, setParticipantes] = useState<string[]>([]);
  const [ruletaItems, setRuletaItems] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [ganador, setGanador] = useState<string | null>(null);
  
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const datos = sessionStorage.getItem("participantesSorteo");
    if (datos) {
      const vector = JSON.parse(datos);
      setParticipantes(vector);
      generarPista(vector);
    }
  }, []);

  const generarPista = (vectorBase: string[]) => {
    if (vectorBase.length === 0) return;
    const itemsTemporales: string[] = [];
    for (let i = 0; i < 70; i++) {
      const indexAleatorio = Math.floor(Math.random() * vectorBase.length);
      itemsTemporales.push(vectorBase[indexAleatorio]);
    }
    setRuletaItems(itemsTemporales);
    
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translateX(0px)`;
    }
  };
  
  const cerrarModal = () => {
    setGanador(null);
  };

  const tirarRuleta = () => {
    if (participantes.length === 0 || isSpinning || !trackRef.current || !wrapperRef.current) return;

    setIsSpinning(true);
    setGanador(null);

    const nuevaPista: string[] = [];
    for (let i = 0; i < 70; i++) {
      nuevaPista.push(participantes[Math.floor(Math.random() * participantes.length)]);
    }
    setRuletaItems(nuevaPista);

    const indexGanador = 55;
    const nombreGanador = nuevaPista[indexGanador];

    const anchoCaja = 180;
    const anchoContenedor = wrapperRef.current.offsetWidth;

    const offsetAleatorio = Math.floor(Math.random() * 100) - 50;
    const distancia = (indexGanador * anchoCaja) - (anchoContenedor / 2) + (anchoCaja / 2) + offsetAleatorio;

    setTimeout(() => {
      if (trackRef.current) {
        trackRef.current.style.transition = "transform 6s cubic-bezier(0.15, 0.85, 0.15, 1)";
        trackRef.current.style.transform = `translateX(-${distancia}px)`;
      }


      setTimeout(() => {
        setIsSpinning(false);
        setGanador(nombreGanador);
      }, 6000);
    }, 50);
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "35rem" }}>
      
      {participantes.length === 0 ? (
        <h2 style={{ color: "white", textAlign: "center" }}>No hay participantes. Vuelve y carga el archivo.</h2>
      ) : (
        <>
          <div className={styles.rouletteWrapper} ref={wrapperRef}>
            <div className={styles.pointer}></div>
            <div className={styles.track} ref={trackRef}>
              {ruletaItems.map((nombre, i) => (
                <div key={i} className={styles.card}>
                  {nombre}
                </div>
              ))}
            </div>
          </div>

          <button
            className={styles.miboton}
            onClick={tirarRuleta}
            disabled={isSpinning}
          >
            {isSpinning ? "Girando..." : "Tirar Ruleta"}
          </button>

          {ganador && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>

                <span className={styles.close} onClick={cerrarModal}>
                  &times;
                </span>
                
                <h3 className={styles.modalTitle}>¡EL GANADOR ES .... !</h3>
                <p className={styles.modalAuthor}>{ganador}</p>
              </div>
            </div>
          )}

        </>
      )}

      <Footer isVisible={true}/>
    </div>
  );
}