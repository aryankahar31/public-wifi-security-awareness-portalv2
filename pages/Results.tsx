import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getSummaryStatistics } from '../services/dataService';
import { generatePdfReport } from '../services/pdfService';
import { generateCsv } from '../services/csvService';
import AnimatedPage from '../components/AnimatedPage';
import { Users, Shield, Wifi, AlertTriangle, Wallet, Newspaper, Download, FileText, FileSpreadsheet } from 'lucide-react';

const Results: React.FC = () => {
    const findings = getSummaryStatistics();

    const stats = [
        { value: findings.total_responses, label: "Total Survey Responses", icon: <Users /> },
        { value: `${findings.vpn_users_percentage}%`, label: "Always Use Security Measures", icon: <Shield /> },
        { value: `${findings.high_awareness_percentage}%`, label: "Report High Risk Awareness", icon: <Newspaper /> },
        { value: `${findings.threat_encounter_percentage}%`, label: "Confirmed a Threat Encounter", icon: <AlertTriangle /> },
        { value: `${findings.daily_wifi_percentage}%`, label: "Use Public Wi-Fi Daily", icon: <Wifi /> },
        { value: `${findings.willing_to_pay_percentage}%`, label: "Willing to Pay for Secure Wi-Fi", icon: <Wallet /> },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const StatCard: React.FC<{ value: string | number; label: string; icon: React.ReactNode }> = ({ value, label, icon }) => (
        <motion.div 
            variants={itemVariants} 
            className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-6 text-center"
        >
            <div className="text-primary mx-auto w-fit mb-3">{icon}</div>
            <h3 className="text-4xl font-bold font-mono text-text-primary-light dark:text-text-primary-dark mb-2">{value}</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">{label}</p>
        </motion.div>
    );

    return (
        <AnimatedPage>
            <div className="max-w-4xl mx-auto text-center">

                {/* ✅ Glass box added here */}
                <div className="text-center max-w-3xl mx-auto mb-12 p-8 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-xl 
                    border border-border-light dark:border-border-dark rounded-2xl"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-text-primary-light dark:text-white">
                        Key Findings & Results
                    </h1>
                    <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
                        High-level, real-time results from all survey responses, providing a snapshot of user sentiment and security practices.
                    </p>
                </div>

                {findings.total_responses > 0 ? (
                    <>
                        <motion.div 
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {stats.map(stat => <StatCard key={stat.label} {...stat} />)}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-8"
                        >
                            <h2 className="text-3xl font-bold mb-4 text-text-primary-light dark:text-white">Download The Full Analysis</h2>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-xl mx-auto mb-6">
                                For a detailed breakdown, download the complete report. The data is generated dynamically from the latest dataset.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={generatePdfReport}
                                    className="flex items-center justify-center gap-2 relative px-6 py-3 border border-primary text-primary font-bold uppercase tracking-wider rounded-md overflow-hidden transition-all duration-300 hover:bg-primary hover:text-black hover:shadow-[0_0_30px_5px_#61dca3]"
                                >
                                    <FileText size={20} /> Download PDF Report
                                </button>
                                <button
                                    onClick={generateCsv}
                                    className="flex items-center justify-center gap-2 relative px-6 py-3 border border-secondary text-secondary font-bold uppercase tracking-wider rounded-md overflow-hidden transition-all duration-300 hover:bg-secondary hover:text-black hover:shadow-[0_0_30px_5px_#61b3dc]"
                                >
                                    <FileSpreadsheet size={20} /> Export as CSV
                                </button>
                            </div>
                        </motion.div>
                    </>
                ) : (
                    <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-12 text-center">
                        <h2 className="text-3xl font-bold mb-4 text-text-primary-light dark:text-white">Awaiting Data...</h2>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
                            There are currently no survey responses. Key findings will appear here once data has been collected.
                        </p>
                        <Link 
                            to="/survey" 
                            className="relative inline-block px-6 py-3 border border-primary text-primary font-bold uppercase tracking-wider rounded-md overflow-hidden transition-all duration-300 hover:bg-primary hover:text-black hover:shadow-[0_0_30px_5px_#61dca3]"
                        >
                            Be the First to Contribute
                        </Link>
                    </div>
                )}
            </div>
        </AnimatedPage>
    );
};

export default Results;
