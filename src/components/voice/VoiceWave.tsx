import { motion } from "framer-motion";

const bars = [1, 2, 3, 4, 5];

export default function VoiceWave() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: "6px",
        height: "60px",
      }}
    >
      {bars.map((bar) => (
        <motion.div
          key={bar}
          animate={{
            height: [15, 55, 20, 45, 15],
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
            delay: bar * 0.1,
          }}
          style={{
            width: "8px",
            borderRadius: "10px",
            background: "#22c55e",
          }}
        />
      ))}
    </div>
  );
}