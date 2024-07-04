import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="/" passHref legacyBehavior>
        <a className={styles.logo}>LEVEL UP</a>
      </Link>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/lets-get-started" passHref legacyBehavior>
              <a>Let's get started</a>
            </Link>
          </li>
          <li>
            <Link href="/app/faq" passHref legacyBehavior>
              <a>FAQ</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.legal}>
        <p>© 2024 Function Health. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
