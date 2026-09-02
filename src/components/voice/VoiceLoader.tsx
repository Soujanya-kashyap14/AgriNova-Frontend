import { motion } from "framer-motion";

export default function VoiceLoader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        marginTop: "20px",
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            delay: i * 0.2,
          }}
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#16a34a",
          }}
        />
      ))}
    </div>
  );
}