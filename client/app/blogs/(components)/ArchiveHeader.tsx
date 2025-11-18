import { motion } from "framer-motion";
import Link from "next/link";

export default function ArchiveHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <Link href={"/blogs"}>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          The Archive
        </h1>
      </Link>
      <p className="text-gray-400 text-sm uppercase tracking-widest">
        Minimalist Reflections
      </p>
    </motion.div>
  );
}
