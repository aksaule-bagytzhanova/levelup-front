"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './doctors.module.css';

const DoctorsPage = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>('nutritionist');
  const [advice, setAdvice] = useState<string>('');

  useEffect(() => {
    const fetchLatestAdvice = async () => {
      if (selectedButton) {
        try {
          const token: string | null = localStorage.getItem('token');
          const response = await axios.get(
            `http://185.129.51.174:8001/api/suggestions/?type=${selectedButton}`,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          );

          const latestAdvice = response.data[0]?.text || 'No advice found.';
          setAdvice(latestAdvice);
        } catch (error) {
          console.error('Error fetching latest advice:', error);
        }
      }
    };

    fetchLatestAdvice();
  }, [selectedButton]);

  const handleButtonClick = async (button: string) => {
    setSelectedButton(button);

    try {
      const token: string | null = localStorage.getItem('token');
      const response = await axios.post(
        'http://185.129.51.174:8001/api/suggestions/',
        { type: button },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const { text } = response.data;
      setAdvice(text);
    } catch (error) {
      console.error('Error creating new advice:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>LEVEL UP</div>
      <div className={styles.title}>Get advice from specialists</div>
      
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${selectedButton === 'nutritionist' ? styles.active : ''}`}
          onClick={() => handleButtonClick('nutritionist')}
        >
          Get advice from Nutritionist Doctor
        </button>
        <button
          className={`${styles.button} ${selectedButton === 'dietitian' ? styles.active : ''}`}
          onClick={() => handleButtonClick('dietitian')}
        >
          Get advice from Dietitian Doctor
        </button>
        <button
          className={`${styles.button} ${selectedButton === 'fitness' ? styles.active : ''}`}
          onClick={() => handleButtonClick('fitness')}
        >
          Get advice from Fitness Instructor
        </button>
      </div>

      <div className={styles.textAreaContainer}>
        <textarea className={styles.textarea} value={advice} readOnly placeholder="Your questions..."></textarea>
      </div>
    </div>
  );
};

export default DoctorsPage;
