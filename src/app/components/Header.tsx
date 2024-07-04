"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Преобразование токена в булево значение
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/'; // Перенаправление на главную страницу или любую другую
  };

  return (
    <header className={styles.header}>
      {!isAuthenticated ? (
      <Link href="/" passHref legacyBehavior>
        <a className={styles.logo}>LEVEL UP</a>
      </Link>
      ) : (
      <Link href="/doctor" passHref legacyBehavior>
        <a className={styles.logo}>LEVEL UP</a>
      </Link>
      )}
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/faq" passHref legacyBehavior>
              <a>FAQ</a>
            </Link>
          </li>
          {/* <li className={styles.langSwitch}>
            <a href="#">EN</a>
            <a href="#">KZ</a>
          </li> */}
          
          {!isAuthenticated ? (
            <>
              <li>
                <Link href="/login" passHref legacyBehavior>
                  <a className={styles.login}>Log in</a>
                </Link>
              </li>
              <li>
                <Link href="/sign-up" passHref legacyBehavior>
                  <a className={styles.signup}>Sign up</a>
                </Link>
              </li>
            </>
          ) : (
            <>
            <li>
              <Link href="/lets-get-started" passHref legacyBehavior>
                <a>My parameters</a>
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className={styles.logout}>Log out</button>
            </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
