'use client';

import { LoadingSequence } from '@/components/LoadingSequence';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const dynamic = 'force-static';
export const revalidate = false;

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#1a1a1a]">
      <LoadingSequence />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="text-center relative"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300">
            WOLVER
          </h1>
          <div className="space-y-4 text-xl md:text-2xl text-gray-400">
            <p>Smart Loans</p>
            <p>Seamless Experience</p>
            <p>Secure Platform</p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
          >
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-4 bg-orange-500 text-white rounded-full text-xl font-bold hover:bg-orange-600 transition-all duration-300"
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-white">
            Why Choose Wolver
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quick Approval",
                description: "Get your loan approved quickly with our streamlined application process and instant verification."
              },
              {
                title: "Flexible Terms",
                description: "Choose from a variety of repayment options that suit your financial situation."
              },
              {
                title: "Transparent Fees",
                description: "No hidden charges. We believe in complete transparency with all our fees and terms."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-lg bg-[#2b2b2b] hover:border-orange-500 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 text-orange-500">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-white">
            Simple 3-Step Process
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Register",
                description: "Create your account with email verification"
              },
              {
                step: "2",
                title: "Apply",
                description: "Fill in your loan application details"
              },
              {
                step: "3",
                title: "Receive",
                description: "Get approved and receive your loan"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative p-6 rounded-lg bg-[#2b2b2b]"
              >
                <div className="text-8xl font-bold text-orange-500/10 absolute -top-10 left-1/2 -translate-x-1/2">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-orange-500">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
            Ready to Get Started?
          </h2>
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-orange-500 text-white rounded-full text-xl font-bold hover:bg-orange-600 transition-all duration-300"
            >
              Apply Now
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
