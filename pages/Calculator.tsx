import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { SlidersHorizontal, Shield, Wifi, Lock, Users, Coffee } from 'lucide-react';

type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

interface RiskResult {
    level: RiskLevel;
    score: number;
    message: string;
    tips: string[];
}

const riskConfig = {
    Low: { color: 'text-green-500', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/50' },
    Medium: { color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/50' },
    High: { color: 'text-orange-500', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/50' },
    Critical: { color: 'text-red-500', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/50' },
};

const Calculator: React.FC = () => {
    const [location, setLocation] = useState('cafe');
    const [encryption, setEncryption] = useState('wpa2');
    const [task, setTask] = useState('browsing');
    const [result, setResult] = useState<RiskResult | null>(null);

    const calculateRisk = () => {
        let score = 0;
        
        // Location risk
        if (location === 'airport') score += 30;
        else if (location === 'hotel') score += 20;
        else if (location === 'cafe') score += 15;
        else if (location === 'library') score += 10;
        
        // Encryption risk
        if (encryption === 'open') score += 50;
        else if (encryption === 'wep') score += 40;
        else if (encryption === 'captive') score += 15;
        
        // Task risk
        if (task === 'banking') score += 40;
        else if (task === 'work') score += 25;
        else if (task === 'shopping') score += 20;

        let level: RiskLevel = 'Low';
        let message = "Relatively safe, but always practice good security hygiene.";
        let tips = [
            "Ensure you are connected to the correct network.",
            "Always prefer sites with HTTPS encryption.",
            "Keep your device software updated."
        ];

        if (score > 80) {
            level = 'Critical';
            message = "This activity is extremely risky. It is highly recommended to use a more secure network.";
            tips = ["AVOID this connection for this task.", "Use a VPN if you absolutely must connect.", "Use your mobile data hotspot instead."];
        } else if (score > 50) {
            level = 'High';
            message = "High risk detected. Proceed with extreme caution and use protective measures.";
            tips = ["A VPN is strongly recommended for this connection.", "Do not enter any passwords or financial information.", "Log out of all services when finished."];
        } else if (score > 20) {
            level = 'Medium';
            message = "Moderate risk. Be mindful of the data you are transmitting.";
            tips = ["A VPN is a good idea for added security.", "Avoid logging into sensitive accounts like primary email or social media.", "Turn off file sharing."];
        }
        
        setResult({ level, score, message, tips });
    };

    const inputClasses = "w-full bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-md p-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all";

    return (
        <AnimatedPage>
            <div className="max-w-4xl mx-auto">
                
                {/* ✅ Glass Box Applied Here */}
                <div className="text-center max-w-3xl mx-auto mb-12 p-8 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-xl border border-border-light dark:border-border-dark rounded-2xl">
                    <h1 className="text-4xl md:text-6xl font-bold text-text-primary-light dark:text-white">
                        Wi-Fi Risk Calculator
                    </h1>
                    <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mt-4">
                        Answer a few questions to estimate the security risk of a public Wi-Fi network and get personalized safety tips.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-8 space-y-6">
                        <h2 className="text-2xl font-bold text-center text-secondary">Assess Your Connection</h2>
                        <div>
                            <label className="flex items-center gap-2 mb-2 font-medium">
                                <Coffee size={20} /> Where are you connecting?
                            </label>
                            <select value={location} onChange={e => setLocation(e.target.value)} className={inputClasses}>
                                <option value="cafe">Cafe / Restaurant</option>
                                <option value="airport">Airport / Train Station</option>
                                <option value="hotel">Hotel</option>
                                <option value="library">Library / Public Space</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 mb-2 font-medium">
                               <Lock size={20} /> How is the network secured?
                            </label>
                            <select value={encryption} onChange={e => setEncryption(e.target.value)} className={inputClasses}>
                                <option value="wpa2">Password Protected (WPA2/3)</option>
                                <option value="captive">Login Page (Captive Portal)</option>
                                <option value="open">Open Network (No Password)</option>
                                <option value="wep">Old Password (WEP)</option>
                            </select>
                        </div>
                         <div>
                            <label className="flex items-center gap-2 mb-2 font-medium">
                               <Users size={20} /> What will you be doing?
                            </label>
                            <select value={task} onChange={e => setTask(e.target.value)} className={inputClasses}>
                                <option value="browsing">General Browsing / Social Media</option>
                                <option value="shopping">Online Shopping</option>
                                <option value="work">Email / Work</option>
                                <option value="banking">Online Banking / Finances</option>
                            </select>
                        </div>
                        <button
                            onClick={calculateRisk}
                            className="w-full flex items-center justify-center gap-2 text-center relative px-6 py-4 border border-primary text-primary font-bold uppercase tracking-wider rounded-md overflow-hidden transition-all duration-300 hover:bg-primary hover:text-black hover:shadow-[0_0_30px_5px_#61dca3]"
                        >
                            <SlidersHorizontal size={20}/> Calculate Risk
                        </button>
                    </div>

                    <div className="h-full">
                        <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className={`bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-8 ${riskConfig[result.level].bgColor} border-l-4 ${riskConfig[result.level].borderColor}`}
                            >
                                <h3 className={`text-2xl font-bold ${riskConfig[result.level].color}`}>Risk Level: {result.level}</h3>
                                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2 mb-4">{result.message}</p>
                                <h4 className="font-bold mb-2 flex items-center gap-2 text-text-primary-light dark:text-text-primary-dark"><Shield size={20}/> Recommended Actions:</h4>
                                <ul className="list-disc pl-5 space-y-1 text-text-secondary-light dark:text-text-secondary-dark">
                                    {result.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                                </ul>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default Calculator;
