// components/Layout.jsx
import { motion } from 'framer-motion';

const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

export default function Layout({ children }) {
  return (
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // optional if using page transitions
      transition={{ duration: 0.4 }}
      
    >
      {children}
    </motion.div>
  );
}
