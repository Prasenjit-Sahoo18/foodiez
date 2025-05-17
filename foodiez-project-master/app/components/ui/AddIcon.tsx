import { motion } from "framer-motion"

export default function AddIcon({ onClick }: { onClick?: () => void }) {
    return <motion.img whileTap={{scale: 0.8}} onClick={onClick} src="/plus.svg" alt="" className="h-9  " />
}