'use client'

import { AnimatePresence, motion } from "framer-motion";
import { FieldError } from "react-hook-form"

interface ErrorProps {
    error?: FieldError;
}

export default function Error({ error }: ErrorProps) {

    return (
        <AnimatePresence>
            {
                error &&
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                >
                <p role="alert" className="mt-1 text-sm text-red-600">{error.message}</p>
                </motion.div>
            }
        </AnimatePresence>
    )
}