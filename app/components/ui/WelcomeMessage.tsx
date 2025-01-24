import { motion } from "framer-motion";

interface WelcomeMessageProps {
  name: string;
}

export const WelcomeMessage = ({ name }: WelcomeMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-10"
    >
      <motion.h1
        drag
        dragConstraints={{
          top: -50,
          left: -100,
          right: 100,
          bottom: 50,
        }}
        dragElastic={0.7}
        dragSnapToOrigin
        dragTransition={{
          bounceStiffness: 600,
          bounceDamping: 20,
        }}
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
        whileHover={{ scale: 1.02, cursor: "grab" }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          duration: 0.6,
        }}
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent mb-6 inline-block"
      >
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          👋 Hello,
        </motion.span>{" "}
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600 dark:from-violet-400 dark:to-pink-400"
        >
          {name}!
        </motion.span>
      </motion.h1>

      <motion.div
        className="absolute -inset-4 bg-violet-500/10 dark:bg-violet-400/10 rounded-xl -z-10 blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
    </motion.div>
  );
};
