import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { Send, Building, Mail } from 'lucide-react';

const Contact: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };
    
    const inputClasses = "w-full bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-md p-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all";

    return (
        <AnimatedPage>
            <div className="max-w-4xl mx-auto">

                {/* ✅ Glass Intro Section with one-line heading */}
                <div className="text-center max-w-3xl mx-auto mb-12 p-8 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-xl border border-border-light dark:border-border-dark rounded-2xl">
                    <h1 className="text-4xl md:text-6xl font-bold text-text-primary-light dark:text-white whitespace-nowrap tracking-tight">
                        Contact & Collaboration
                    </h1>
                    <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mt-4">
                        We welcome feedback, questions, and opportunities for collaboration. Fill out the form below.
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-8"
                        >
                            <h2 className="text-3xl font-bold text-primary mb-4">Thank You!</h2>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
                                Your message has been received. Our team will get back to you if a response is needed.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="grid md:grid-cols-5 gap-8">
                                {/* ✅ Contact Form */}
                                <div className="md:col-span-3 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block mb-2 font-medium">Your Name</label>
                                            <input type="text" id="name" name="name" required placeholder="e.g., Jane Doe" className={inputClasses} />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block mb-2 font-medium">Your Email</label>
                                            <input type="email" id="email" name="email" required placeholder="e.g., jane.doe@example.com" className={inputClasses} />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                                            <textarea id="message" name="message" required rows={5} placeholder="Your message here..." className={inputClasses}></textarea>
                                        </div>
                                        <button type="submit" className="w-full flex items-center justify-center gap-2 text-center relative px-6 py-4 border border-primary text-primary font-bold uppercase tracking-wider rounded-md overflow-hidden transition-all duration-300 hover:bg-primary hover:text-black hover:shadow-[0_0_30px_5px_#61dca3]">
                                            <Send size={20} /> Send Message
                                        </button>
                                    </form>
                                </div>

                                {/* ✅ Contact Info Cards */}
                                <div className="md:col-span-2 space-y-6">
                                    <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-6">
                                        <h4 className="font-bold text-secondary text-lg mb-2 flex items-center gap-2"><Building size={20}/> Research Headquarters</h4>
                                        <p className="text-text-secondary-light dark:text-text-secondary-dark">
                                            ZSCT’s Thakur Shyamnarayan Degree College<br/>
                                            Kandivali (E), Mumbai-400101, India
                                        </p>
                                    </div>

                                    <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-6">
                                        <h4 className="font-bold text-secondary text-lg mb-2 flex items-center gap-2"><Mail size={20}/> Project Email</h4>
                                        <a href="mailto:aryankahar31@gmail.com" className="text-primary hover:underline break-all">
                                            aryankahar31@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </AnimatedPage>
    );
};

export default Contact;
