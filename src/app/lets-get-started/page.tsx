"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './lets-get-started.module.css';

const LetsGetStarted = () => {
  const [dob, setDob] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [idealWeight, setIdealWeight] = useState('');
  const [gender, setGender] = useState('');
  const [allergens, setAllergens] = useState('');
  const [goal, setGoal] = useState('');
  const [genders, setGenders] = useState([]);
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    const token: string | null = localStorage.getItem('token');
    console.log('Token:', token);

    if (token) {
      const fetchProfile = async () => {
        try {
          console.log('Fetching profile...');
          const response = await axios.get('http://185.129.51.174:8001/api/profile/retrieve/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const data = response.data;
          console.log('Profile data:', data);
          setDob(data.date_of_birth);
          setHeight(data.height);
          setWeight(data.weight);
          setIdealWeight(data.ideal_weight);
          setGender(data.gender);
          setGoal(data.target);
          setAllergens(data.allergy);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };

      const fetchGenders = async () => {
        try {
          console.log('Fetching genders...');
          const response = await axios.get('http://185.129.51.174:8001/api/profile/genders/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const data = response.data;
          console.log('Genders data:', data);
          setGenders(data);
        } catch (error) {
          console.error('Error fetching genders:', error);
        }
      };

      const fetchTargets = async () => {
        try {
          console.log('Fetching targets...');
          const response = await axios.get('http://185.129.51.174:8001/api/profile/targets/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const data = response.data;
          console.log('Targets data:', data);
          setTargets(data);
        } catch (error) {
          console.error('Error fetching targets:', error);
        }
      };

      fetchProfile();
      fetchGenders();
      fetchTargets();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token: string | null = localStorage.getItem('token');
    console.log('Submitting profile update...');

    const requestBody = {
      date_of_birth: dob,
      gender: gender,
      weight: weight,
      height: height,
      ideal_weight: idealWeight
    };

    if (token) {
      try {
        const response = await axios.put('http://185.129.51.174:8001/api/profile/update/', requestBody, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Profile updated:', response.data);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const handleGoalClick = async (selectedGoal: string) => {
    setGoal(selectedGoal);
    const token: string | null = localStorage.getItem('token');
    console.log('Updating goal...');

    if (token) {
      try {
        const response = await axios.put('http://185.129.51.174:8001/api/profile/update/', { target: selectedGoal }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Goal updated:', response.data);
      } catch (error) {
        console.error('Error updating goal:', error);
      }
    }
  };

  const handleAllergySubmit = async () => {
    const token: string | null = localStorage.getItem('token');
    console.log('Updating allergy...');

    if (token) {
      try {
        const response = await axios.put('http://185.129.51.174:8001/api/profile/update/', { allergy: allergens }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Allergy updated:', response.data);
      } catch (error) {
        console.error('Error updating allergy:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>LEVEL UP</div>
      <div className={styles.title}>Let's get started</div>
      
      <section className={styles.section}>
        <div className={styles.sectionNumber}>01</div>
        <div className={styles.sectionContent}>
          <h2>Please write your details</h2>
          <p>We need this information to create your ideal meal plan</p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="date"
              placeholder="Date Of Birth"
              className={styles.input}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <input
              type="number"
              placeholder="Height"
              className={styles.input}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <input
              type="number"
              placeholder="Weight"
              className={styles.input}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <input
              type="number"
              placeholder="Your Ideal Weight"
              className={styles.input}
              value={idealWeight}
              onChange={(e) => setIdealWeight(e.target.value)}
            />
            <select
              className={styles.select}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled>Select Gender</option>
              {genders.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <button type="submit" className={styles.button}>Save</button>
          </form>
        </div>
        <div className={styles.imageContainer}>
          <img src="/images/step1-image.jpg" alt="Step 1" />
        </div>
      </section>
      
      <section className={styles.section}>
        <div className={styles.sectionNumber}>02</div>
        <div className={styles.sectionContent}>
          <h2>What exactly do you want to do?</h2>
          <p>We need to know what the ideal body means to you</p>
          <div className={styles.buttonGroup}>
            {targets.map(([value, label]) => (
              <button
                key={value}
                className={`${styles.optionButton} ${goal === value ? styles.active : ''}`}
                onClick={() => handleGoalClick(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src="/images/step2-image.jpg" alt="Step 2" />
        </div>
      </section>
      
      <section className={styles.section}>
        <div className={styles.sectionNumber}>03</div>
        <div className={styles.sectionContent}>
          <h2>Which foods to avoid?</h2>
          <p>Please list any allergens you have</p>
          <textarea
            className={styles.textarea}
            value={allergens}
            onChange={(e) => setAllergens(e.target.value)}
          ></textarea>
          <button className={styles.button} onClick={handleAllergySubmit}>Save</button>
        </div>
        <div className={styles.imageContainer}>
          <img src="/images/step3-image.jpg" alt="Step 3" />
        </div>
      </section>
      
      <section className={styles.section}>
        <div className={styles.sectionNumber}>04</div>
        <div className={styles.sectionContent}>
          <h2>Everything starts with food</h2>
          <p>Create a meal plan with a specialized nutritionist</p>
          <Link href="/doctor" passHref legacyBehavior>
            <button className={styles.button}>Get a Meal Plan</button>
          </Link>
        </div>
        <div className={styles.imageContainer}>
          <img src="/images/step4-image.jpg" alt="Step 4" />
        </div>
      </section>
    </div>
  );
};

export default LetsGetStarted;
