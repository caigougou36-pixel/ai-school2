import React from 'react';
import { motion } from 'motion/react';

const MicDropPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-black px-6 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
          “不要成为被 AI 写的工具。”
        </h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, delay: 4 }}
          className="h-1 bg-white/20 mt-12 mx-auto"
        />
      </motion.div>

      {/* Subtle Grainy Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

export default MicDropPage;
