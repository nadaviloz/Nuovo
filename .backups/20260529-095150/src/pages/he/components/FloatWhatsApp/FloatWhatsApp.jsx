import styles from './FloatWhatsApp.module.css'

// TODO: replace with the chef's real WhatsApp number (international format, no +/spaces)
const WHATSAPP_NUMBER = '972500000000'
const PREFILL = 'היי! אשמח לבדוק זמינות לאירוע 🙂'

export default function FloatWhatsApp() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILL)}`
  return (
    <a
      className={styles.fab}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="כתבו לנו בוואטסאפ"
    >
      <span className={styles.icon}>
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15.07L2 22l5.05-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.04-.9.2-3.06-.64-2.58-1.02-4.2-3.66-4.32-3.83-.13-.16-1.04-1.38-1.04-2.64s.66-1.87.9-2.13c.23-.25.5-.32.67-.32l.48.01c.16 0 .37-.06.58.44.22.53.74 1.83.8 1.96.07.13.11.29.02.46-.08.16-.13.27-.25.42-.13.15-.27.33-.38.44-.13.13-.26.27-.11.52.15.26.66 1.09 1.42 1.77.98.87 1.8 1.14 2.05 1.27.26.13.4.11.55-.07.16-.18.64-.74.8-1 .17-.26.33-.21.56-.13.22.08 1.42.67 1.66.79.24.13.4.19.46.29.06.1.06.6-.16 1.22Z"/>
        </svg>
      </span>
      <span className={styles.label}>כתבו לנו בוואטסאפ</span>
    </a>
  )
}
