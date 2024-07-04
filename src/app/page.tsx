import styles from './page.module.css';

const IndexPage = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles['text-container']}>
          <h1 className={styles.title}>Elevate your life</h1>
          <p className={styles.subtitle}>A service that will help you choose a diet and exercises tailored to your parameters</p>
          <a href="/sign-up" className={styles.button}>Start Now</a>
        </div>
        <div className={styles['image-container']}>
          <img src="/images/1.png" alt="Fitness Model" className={styles.fitnessModel} />
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
