import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, CheckSquare, Database, SlidersHorizontal, FileText, Bot } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

const ShinyButton: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
    <Link to={to} className="relative inline-flex items-center justify-center px-6 py-3 border border-primary text-primary font-bold uppercase tracking-wider rounded-md overflow-hidden transition-all duration-300 hover:bg-primary hover:text-text-primary-dark hover:shadow-[0_0_30px_5px_#61dca3]">
        <span className="relative z-10">{children}</span>
    </Link>
);

const FeatureCard: React.FC<{ to: string, icon: React.ReactNode, title: string, desc: string }> = ({ to, icon, title, desc }) => (
    <Link to={to} className="group block bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-6 transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">{title}</h3>
            <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {icon}
            </div>
        </div>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">{desc}</p>
        <div className="mt-4 font-semibold text-primary flex items-center gap-2">
            Explore
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
    </Link>
);

const Home: React.FC = () => {
    return (
        <AnimatedPage>
            <section className="min-h-[70vh] flex items-center justify-center text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl p-8 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-xl border border-border-light dark:border-border-dark rounded-2xl"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-text-primary-light dark:text-white mb-4">
                        Public Wi-Fi: Usage & Risks
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary-light dark:text-text-secondary-dark mb-8">
                        A research project dedicated to understanding user behavior and digital vulnerabilities on public internet networks.
                    </p>
                    <ShinyButton to="/survey">Take The Anonymous Survey</ShinyButton>
                </motion.div>
            </section>

<section className="my-16">
    <div className="text-center max-w-2xl mx-auto mb-12 p-8 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-xl border border-border-light dark:border-border-dark rounded-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary-light dark:text-white">
            Project Dashboard
        </h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mt-4">
            Dive into our research, contribute your anonymous data, or test your security knowledge with our interactive tools.
        </p>
    </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard to="/survey" icon={<FileText />} title="Take the Survey" desc="Contribute to our research by answering a short, anonymous survey about your Wi-Fi habits." />
                    <FeatureCard to="/analysis" icon={<BarChart2 />} title="Live Analysis" desc="View real-time charts and graphs generated from the collective survey responses." />
                    <FeatureCard to="/detailed-analysis" icon={<Database />} title="Detailed Analysis" desc="Explore the raw data with custom filters and interactive chart visualizations." />
                    <FeatureCard to="/test" icon={<CheckSquare />} title="Security Test" desc="Take our interactive quiz to test your knowledge of public Wi-Fi security risks." />
                    <FeatureCard to="/resources" icon={<FileText />} title="Resources Hub" desc="Access articles, videos, and a downloadable checklist to enhance your security." />
                    <FeatureCard to="/calculator" icon={<SlidersHorizontal />} title="Risk Calculator" desc="An interactive tool to assess the potential risk of a public Wi-Fi network." />
                    <FeatureCard to="/tools" icon={<Bot />} title="Security Demos" desc="Engage with simulations that visualize common Wi-Fi threats like VPNs and Evil Twins." />
                </div>
            </section>
        </AnimatedPage>
    );
};

export default Home;