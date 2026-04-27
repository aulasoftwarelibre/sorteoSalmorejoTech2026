import Image from "next/image";
import styles from "./footer.module.css";
import facebookImg from "../../assets/facebookLogo.webp";
import instaImg from "../../assets/instaLogo.webp";
import telegramImg from "../../assets/telegramLogo.webp";
import linkedinImg from "../../assets/linkedinLogo.webp";
import twitterImg from "../../assets/twitterLogo.webp";
import youtubeImg from "../../assets/youtubeLogo.webp";
import githubImg from "../../assets/githubLogo.webp";
import logoAula from "../../assets/logoAula.webp";

interface RRSS {
  id: number;
  image: any;
  alt: string;
  url: string;
}

const socials: RRSS[] = [
  {
    id: 1,
    image: facebookImg,
    alt: "facebook logo",
    url: "https://www.facebook.com/AulaSoftwareLibre/",
  },
  {
    id: 2,
    image: instaImg,
    alt: "instagram logo",
    url: "https://www.instagram.com/aulasoftwarelibre/?hl=es",
  },
  {
    id: 3,
    image: telegramImg,
    alt: "telegram logo",
    url: "https://t.me/AulaSoftwareLibreUCO",
  },
  {
    id: 4,
    image: linkedinImg,
    alt: "linkedin logo",
    url: "https://www.linkedin.com/company/aulasoftwarelibre/posts/?feedView=all",
  },
  {
    id: 5,
    image: twitterImg,
    alt: "twitter logo",
    url: "https://x.com/aulasl",
  },
  {
    id: 6,
    image: githubImg,
    alt: "github logo",
    url: "https://github.com/aulasoftwarelibre",
  },
  {
    id: 7,
    image: youtubeImg,
    alt: "youtube logo",
    url: "https://www.youtube.com/c/AulaSoftwareLibre",
  },
];

interface FooterProps {
  isVisible: boolean;
}

export default function Footer({ isVisible }: FooterProps) {
  return (
    <div className={`${styles.main} ${isVisible ? styles.visible : ""}`}>
      <div className={styles.footer}>
        <div className={styles.info}>
          <p className={styles.text}>Organiza:</p>
          <Image src={logoAula} alt="logoAula" width={236} height={236} />
          <div className={styles.rrssContainer}>
            {socials.map((social) => (
              <div key={social.id}>
                <a href={social.url}>
                  <Image
                    src={social.image}
                    alt={social.alt}
                    width={50}
                    height={50}
                    className={`${styles.image} ${styles.aslLink}`}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.textContainer}>
          <p className={styles.text}>
            ¡Encuéntranos!
            <br></br>
            <a
              href="mailto:aulasoftwarelibre@uco.es"
              className={styles.aslLink}
            >
              aulasoftwarelibre@uco.es
            </a>
            <br></br>
            Aulario Averroes
            <br />
            (Campus de Rabanales)
          </p>
        </div>
      </div>

      <div className={styles.notifyContainer}>
        <h2 className={styles.notifyText}>
          ¿Quieres que te notifiquemos sobre novedades del SalmorejoTech?
        </h2>
        <a
          href="https://mailchi.mp/4de2bca2a936/notificaciones-sobre-el-salmorejotech-2026"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.notifybutton}
        >
          NOTIFÍCAME
        </a>
      </div>

      <div className={styles.merch}>
        <p className={styles.merchText}>🄯 2025 Aula Software Libre</p>
      </div>
    </div>
  );
}
