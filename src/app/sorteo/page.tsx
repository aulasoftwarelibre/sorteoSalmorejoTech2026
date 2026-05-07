"use client";

import { useEffect, useState, useRef } from "react";
import Footer from "@/app/components/footer/footer";
import styles from "./page.module.css";

export default function Home() {
  const [participantes, setParticipantes] = useState<string[]>([]);
  const [ruletaItems, setRuletaItems] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [ganadores, setGanadores] = useState<string[]>([]);
  const [numGanadores, setNumGanadores] = useState(1);
  const [showMultiModal, setShowMultiModal] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);

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
    setGanadores([]);
    setShowMultiModal(false);
  };

  const tirarRuleta = () => {
    if (
      participantes.length === 0 ||
      isSpinning ||
      !trackRef.current ||
      !wrapperRef.current
    )
      return;

    if (numGanadores > participantes.length) {
      alert(
        `Solo hay ${participantes.length} participantes. Reduce el número de winners.`,
      );
      return;
    }

    setIsSpinning(true);
    setGanadores([]);

    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translateX(0px)`;
    }
    const nuevaPista: string[] = [];
    for (let i = 0; i < 70; i++) {
      nuevaPista.push(
        participantes[Math.floor(Math.random() * participantes.length)],
      );
    }
    setRuletaItems(nuevaPista);

    const indexGanador = 55;
    const nombreGanador = nuevaPista[indexGanador];

    const anchoCaja = 180;
    const anchoContenedor = wrapperRef.current.offsetWidth;

    const offsetAleatorio = Math.floor(Math.random() * 100) - 50;
    const distancia =
      indexGanador * anchoCaja -
      anchoContenedor / 2 +
      anchoCaja / 2 +
      offsetAleatorio;

    setTimeout(() => {
      if (trackRef.current) {
        trackRef.current.style.transition =
          "transform 6s cubic-bezier(0.15, 0.85, 0.15, 1)";
        trackRef.current.style.transform = `translateX(-${distancia}px)`;
      }

      setTimeout(() => {
        setIsSpinning(false);
        if (numGanadores === 1) {
          setGanadores([nombreGanador]);
        } else {
          setGanadores([nombreGanador]);
          setAnimationStage(1);
          setShowMultiModal(true);
        }
        const indexDelGanador = participantes.findIndex(
          (p) => p === nombreGanador,
        );

        if (indexDelGanador !== -1) {
          const participantesActualizados = [...participantes];
          participantesActualizados.splice(indexDelGanador, 1);
          setParticipantes(participantesActualizados);
          sessionStorage.setItem(
            "participantesSorteo",
            JSON.stringify(participantesActualizados),
          );
        }
      }, 6000);
    }, 50);
  };

  const tirarMultiples = () => {
    if (participantes.length === 0) return;

    let disponibles = [...participantes];
    const nuevosGanadores: string[] = [];

    for (let i = 0; i < numGanadores; i++) {
      const indexRandom = Math.floor(Math.random() * disponibles.length);
      nuevosGanadores.push(disponibles[indexRandom]);
      disponibles.splice(indexRandom, 1);
    }

    setGanadores(nuevosGanadores);
    setShowMultiModal(true);
    setAnimationStage(0);

    const participantesActualizados = disponibles;
    setParticipantes(participantesActualizados);
    sessionStorage.setItem(
      "participantesSorteo",
      JSON.stringify(participantesActualizados),
    );
  };

  const iniciarSorteo = () => {
    if (numGanadores === 1) {
      tirarRuleta();
    } else {
      tirarMultiples();
    }
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "35rem" }}>
      {participantes.length === 0 ? (
        <h2 style={{ color: "white", textAlign: "center" }}>
          No hay participantes. Vuelve y carga el archivo.
        </h2>
      ) : (
        <>
          <div className={styles.controlsContainer}>
            <div className={styles.selectorWrapper}>
              <label className={styles.selectorLabel}>
                Número de ganadores:
              </label>
              <select
                className={styles.selector}
                value={numGanadores}
                onChange={(e) => setNumGanadores(Number(e.target.value))}
                disabled={isSpinning}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n} disabled={n > participantes.length}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
            onClick={iniciarSorteo}
            disabled={isSpinning}
          >
            {isSpinning
              ? numGanadores === 1
                ? "Girando..."
                : "Sorteando..."
              : numGanadores === 1
                ? "Tirar Ruleta"
                : `Sortear ${numGanadores} Winners`}
          </button>

          {ganadores.length > 0 && !showMultiModal && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <span className={styles.close} onClick={cerrarModal}>
                  &times;
                </span>
                <h3 className={styles.modalTitle}>
                  {ganadores.length === 1
                    ? "¡EL GANADOR ES...!"
                    : "¡LOS GANADORES SON...!"}
                </h3>
                <p className={styles.modalAuthor}>{ganadores[0]}</p>
              </div>
            </div>
          )}

          {showMultiModal && (
            <div className={styles.multiModalOverlay}>
              <div
                className={`${styles.multiModal} ${animationStage >= 1 ? styles.multiModalAnimate : ""}`}
              >
                <span className={styles.close} onClick={cerrarModal}>
                  &times;
                </span>

                <div className={styles.confettiContainer}>
                  {[...Array(50)].map((_, i) => (
                    <div
                      key={i}
                      className={styles.confetti}
                      style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        backgroundColor: [
                          "#ff6b6b",
                          "#4ecdc4",
                          "#ffe66d",
                          "#95e1d3",
                          "#f38181",
                          "#aa96da",
                          "#fcbad3",
                        ][Math.floor(Math.random() * 7)],
                      }}
                    ></div>
                  ))}
                </div>

                <div className={styles.starsContainer}>
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className={styles.star}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 1.5}s`,
                        transform: `rotate(${Math.random() * 360}deg)`,
                      }}
                    >
                      ★
                    </div>
                  ))}
                </div>

                <h3 className={styles.multiModalTitle}>
                  {ganadores.length === 1
                    ? "🍅 ¡EL GANADOR ES...! 🍅"
                    : `🍅 ¡${ganadores.length} WINNERS! 🍅`}
                </h3>

                <div className={styles.winnersGrid}>
                  {ganadores.map((ganador, index) => (
                    <div
                      key={index}
                      className={styles.winnerCard}
                      style={{ animationDelay: `${index * 0.15 + 0.3}s` }}
                    >
                      <span className={styles.winnerNumber}>#{index + 1}</span>
                      <span className={styles.winnerName}>{ganador}</span>
                    </div>
                  ))}
                </div>

                <p className={styles.remainingText}>
                  {participantes.length} participantes restantes
                </p>
              </div>
            </div>
          )}
        </>
      )}

      <Footer isVisible={true} />
    </div>
  );
}
