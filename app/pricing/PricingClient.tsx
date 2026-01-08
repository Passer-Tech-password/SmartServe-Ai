// app/pricing/PricingClient.tsx
"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "$9/mo",
    features: ["Basic AI Chat", "Email Support", "Up to 500 tickets"],
  },
  {
    name: "Pro",
    price: "$29/mo",
    features: [
      "Advanced AI",
      "Smart Routing",
      "5,000 tickets",
      "Analytics Dashboard",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Full automation suite",
      "Unlimited tickets",
      "Dedicated support",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function PricingClient() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-20 px-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    >
      <motion.h1
        variants={cardVariants}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-14"
      >
        Pricing Plans
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {plans.map(plan => (
          <motion.div
            key={plan.name}
            variants={cardVariants}
            transition={{ duration: 0.6 }}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-10 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
              {plan.name}
            </h2>

            <p className="text-3xl font-bold mb-6">{plan.price}</p>

            <ul className="space-y-3">
              {plan.features.map(feature => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  • {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
