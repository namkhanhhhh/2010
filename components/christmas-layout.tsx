"use client"
import { motion } from "framer-motion"
import { Gift, TreePine, Snowflake, Star, Bell } from "lucide-react"

export function ChristmasLayout() {
  return (
    <div className="relative overflow-hidden min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[url('https://www.transparenttextures.com/patterns/snow.png')]">
      {/* Decorative Snowflakes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20"
            initial={{ y: -20, x: Math.random() * 100 + "%" }}
            animate={{
              y: "100vh",
              x: Math.random() * 100 + (Math.random() * 10 - 5) + "%",
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 20,
            }}
          >
            <Snowflake size={Math.random() * 24 + 12} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Header Section */}
        <header className="space-y-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex justify-center text-secondary">
            <Star className="w-16 h-16 fill-current animate-pulse" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary italic">Merry Christmas</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gửi trọn yêu thương và hơi ấm mùa Giáng sinh đến bạn.
          </p>
        </header>

        {/* Main Illustration Area */}
        <div className="relative h-64 md:h-96 flex items-end justify-center gap-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary hidden md:block"
          >
            <TreePine size={180} className="drop-shadow-xl" />
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-secondary p-8 rounded-full shadow-2xl relative z-10"
          >
            <img src="/santa-claus-cartoon.jpg" alt="Santa Claus" className="w-32 h-32 md:w-48 md:h-48" />
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-primary"
          >
            <TreePine size={240} className="drop-shadow-2xl" />
          </motion.div>
        </div>

        {/* Interactive Elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Gift, label: "Quà tặng", color: "bg-secondary" },
            { icon: Bell, label: "Nhạc Noel", color: "bg-primary" },
            { icon: Snowflake, label: "Kỷ niệm", color: "bg-accent" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${item.color} p-8 rounded-3xl text-white shadow-lg cursor-pointer flex flex-col items-center gap-4`}
            >
              <item.icon size={40} />
              <span className="font-bold text-lg">{item.label}</span>
            </motion.div>
          ))}
        </div>

        <footer className="pt-12 border-t border-border/50 text-muted-foreground">
          <p>© 2025 Giáng Sinh An Lành</p>
        </footer>
      </div>
    </div>
  )
}
