
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { BookOpen, FlaskConical, Users, Milestone, Award } from 'lucide-react';


const team = {
  researchers: [
    { name: "Aryan Kahar", role: "Team Lead & Research Analyst" },
    { name: "Shreyas S. Kharat", role: "Data Analyst" },
    { name: "Purushottam R. Jha", role: "Field Research & Documentation" },
    { name: "Emad Aslam Khan", role: "Technical Research & Survey Design" },
  ],
  guide: { name: "Ms. Tuba Shaikh", role: "Internal Guide & Faculty Mentor" }
};

const timeline = [
  { quarter: "Q3 2025", event: "Project Launch & Initial Data Collection" },
  { quarter: "Q4 2025", event: "Preliminary Analysis & Mid-Point Reporting" },
  { quarter: "Q1 2026", event: "Final Data Collection & Peer Review" },
  { quarter: "Q2 2026", event: "Publication of Final Report & Findings" },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 }},
};

const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const Section: React.FC<{title: string; icon: React.ReactNode; children: React.ReactNode}> = ({ title, icon, children }) => (
    <motion.section 
        className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-8 mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
    >
        <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
            {icon} {title}
        </h2>
        {children}
    </motion.section>
);

const About: React.FC = () => {
    return (
        <AnimatedPage>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 text-text-primary-light dark:text-white">About The Research</h1>

                <Section title="Project Mandate & Purpose" icon={<Award size={32} />}>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
                        This research initiative, conducted under ZSCT’s Thakur Shyamnarayan Degree College for the academic year 2025–26, aims to create a comprehensive, data-driven map of the public Wi-Fi landscape. We seek to understand usage patterns and the critical gap between perceived security and actual risk. Our findings will be used to develop public awareness campaigns, inform policy, and empower users to protect their digital identities.
                    </p>
                </Section>
                
                <Section title="Methodology & Data Collection" icon={<FlaskConical size={32} />}>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
                        Our primary data is collected through the anonymous public survey hosted on this portal. The survey employs a quantitative approach using multiple-choice and Likert scale questions to measure user habits, awareness, and perceptions. All submitted data is anonymized and aggregated for analysis. The secondary data is compiled from existing academic papers, cybersecurity reports, and technical documentation, as cited in our literature review.
                    </p>
                </Section>
                
                <Section title="Literature Review" icon={<BookOpen size={32} />}>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
                        This research builds upon existing work in the fields of network security, human-computer interaction, and cybersecurity awareness. Key areas of review include analyses of common Wi-Fi attack vectors (e.g., Man-in-the-Middle, Evil Twins), studies on user risk perception versus reality, and the effectiveness of security interventions like VPNs. Our goal is to contribute India-specific data to this global body of knowledge. A full bibliography is available in the final downloadable report.
                    </p>
                </Section>

                <Section title="Meet the Research Team" icon={<Users size={32} />}>
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        {team.researchers.map(member => (
                            <motion.div key={member.name} className="bg-input-light dark:bg-input-dark p-4 rounded-lg border border-border-light dark:border-border-dark" variants={itemVariant}>
                                <h4 className="text-xl font-semibold text-text-primary-light dark:text-white">{member.name}</h4>
                                <p className="text-text-secondary-light dark:text-text-secondary-dark">{member.role}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </Section>

                <Section title="Project Guide" icon={<Award size={32} />}>
                    <div className="bg-input-light dark:bg-input-dark p-4 rounded-lg border border-border-light dark:border-border-dark inline-block">
                        <h4 className="text-xl font-semibold text-text-primary-light dark:text-white">{team.guide.name}</h4>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark">{team.guide.role}</p>
                    </div>
                </Section>
                
                <Section title="Project Timeline" icon={<Milestone size={32} />}>
                    <div className="relative">
                        <div className="absolute left-4 top-0 h-full w-0.5 bg-border-light dark:bg-border-dark"></div>
                        <motion.ul 
                            className="space-y-8"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            {timeline.map(item => (
                                <motion.li key={item.quarter} className="relative pl-12" variants={itemVariant}>
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background-light dark:border-background-dark"></div>
                                    <h4 className="font-bold text-secondary text-lg">{item.quarter}</h4>
                                    <p className="text-text-secondary-light dark:text-text-secondary-dark">{item.event}</p>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                </Section>
            </div>
        </AnimatedPage>
    );
};

export default About;
