import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const AdvancedGreeting = () => {
  const [name, setName] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [isSpecialName, setIsSpecialName] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  // Generate emojis based on name type
  const generateEmojis = (count) => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: isSpecialName 
        ? ['💐', '🌠', '💫', '🌸', '🎇', '🌌', '✨'][i % 7]
        : ['🌟', '💖', '🌙', '✨', '🎆'][i % 5],
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
      }
    }));

  useEffect(() => {
    const valid = name.length > 4;
    setIsValidName(valid);
    setIsSpecialName(name.toLowerCase() === 'rania');
  }, [name]);

  const handleSubmit = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
      setIsSubmitted(true);
    }, isSpecialName ? 4000 : 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Conditional Header */}
      <AnimatePresence>
        {isValidName && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`text-4xl font-bold mb-8 ${
              isSpecialName 
                ? 'bg-gradient-to-r from-pink-400 to-purple-500'
                : 'bg-gradient-to-r from-cyan-400 to-blue-500'
            } bg-clip-text text-transparent`}
          >
            {isSpecialName ? 'HY Rania' : `Hello ${name}`}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Field */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-8 py-4 text-2xl rounded-full bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-500 backdrop-blur-lg"
        placeholder="Enter your name"
      />

      {/* Submit Button */}
      <AnimatePresence>
        {isValidName && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={handleSubmit}
            className={`mt-8 px-12 py-4 text-xl font-bold rounded-full ${
              isSpecialName
                ? 'bg-gradient-to-r from-pink-500 to-purple-600'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600'
            } hover:scale-105 transition-transform relative overflow-hidden`}
          >
            <motion.span
              animate={{ rotate: isRotating ? 360 : 0 }}
              transition={{ 
                duration: isSpecialName ? 0.8 : 1.2,
                repeat: isRotating ? Infinity : 0 
              }}
              className="block"
            >
              {isRotating ? '🎇' : 'Submit'}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Animation */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
            <Confetti
              numberOfPieces={isSpecialName ? 800 : 400}
              recycle={false}
              gravity={isSpecialName ? 0.1 : 0.3}
              wind={isSpecialName ? 0.1 : 0.05}
              colors={isSpecialName 
                ? ['#FF69B4', '#FF1493', '#FF00FF', '#9400D3']
                : ['#00FFFF', '#00BFFF', '#1E90FF', '#4169E1']}
            />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: 'spring', 
                stiffness: isSpecialName ? 120 : 100,
                damping: isSpecialName ? 8 : 10
              }}
              className="text-center z-50"
            >
              <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Ramzan Mubarak!
              </h1>
              
              {/* Special Down-to-Up Fireworks for Rania */}
              {isSpecialName && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {generateEmojis(30).map(({ id, emoji, style }) => (
                    <motion.div
                      key={id}
                      className="absolute text-4xl"
                      style={style}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: -100, opacity: [1, 0] }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Standard Animation */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {generateEmojis(isSpecialName ? 100 : 50).map(({ id, emoji, style }) => (
                  <motion.div
                    key={id}
                    className="absolute text-4xl animate-float"
                    style={style}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Default Greeting */}
      {!isSubmitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl text-white/80 mt-12 text-center"
        >
          <p>Ramzan Mubarak To You With Best Wishes!</p>
          <div className="flex justify-center space-x-4 mt-4">
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              💖
            </motion.span>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            >
              🌙
            </motion.span>
            <motion.span
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🌟
            </motion.span>
          </div>
        </motion.div>
      )}
      <h1 className="text-amber-50 relative top-40"> Made by t2hasnain</h1>
      <h1 className="text-amber-50 relative top-40 left-2"> share with your friends❤️ updated soon </h1>
      <h1 className="text-amber-50 relative top-40 left-2"> </h1>

    </div>
  );
};

export default AdvancedGreeting;