import React, { useState, useEffect } from 'react';
import styles from '../styles/modules/TimerModal.module.scss';

const TimerModal = ({ duration, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60 * 60);

  useEffect(() => {
    // 设置计时器
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // 清理计时器
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  return (
    <div className={styles.timerModal}>
      <div className={styles.timerDisplay}>{formatTime()}</div>
      <button type="button" className={styles.closeButton} onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default TimerModal;
