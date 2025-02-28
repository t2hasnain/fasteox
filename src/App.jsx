import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LaunchTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [progress, setProgress] = useState(0);

  // Target date: November 15, 2025
  const targetDate = new Date('2025-11-15T00:00:00').getTime();
  const startDate = new Date('2023-01-01T00:00:00').getTime(); // Customize start date

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      // Time calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Progress calculation
      const totalDuration = targetDate - startDate;
      const elapsed = now - startDate;
      const percentage = Math.min((elapsed / totalDuration) * 100, 100);

      setTimeLeft({ days, hours, minutes, seconds });
      setProgress(percentage);
    };

    const timer = setInterval(calculateTime, 1000);
    calculateTime(); // Initial calculation

    return () => clearInterval(timer);
  }, []);

  const TimeBlock = ({ value, label }) => (
    <motion.div 
      className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-lg rounded-xl shadow-xl"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-gray-400 mt-2 uppercase text-sm tracking-widest">
        {label}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-white mb-4">Coming Soon</h1>
        <p className="text-xl text-gray-300">Launching November 15, 2025</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <TimeBlock value={timeLeft.days} label="Days" />
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <TimeBlock value={timeLeft.minutes} label="Minutes" />
        <TimeBlock value={timeLeft.seconds} label="Seconds" />
      </div>

      <motion.div 
        className="w-full max-w-2xl bg-white/10 rounded-full h-4 mb-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </motion.div>

      <motion.div
        className="text-gray-400 text-lg"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Stay tuned for something amazing!
      </motion.div>
    </div>
  );
};

export default LaunchTimer;