import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, Shield, ShieldOff, Lock, Server, User } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

/* ---------------------------------------
   Section Wrapper Component
---------------------------------------- */
const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-secondary mb-6 flex items-center gap-3 whitespace-nowrap">
            {icon} {title}
        </h2>
        {children}
    </div>
);

/* ---------------------------------------
   VPN Simulation Component
---------------------------------------- */
const VPNSimulation = () => {
    return (
        <div className="grid md:grid-cols-2 gap-8">
            {/* Without VPN */}
            <div className="border border-red-500/50 bg-red-500/10 rounded-lg p-4">
                <h3 className="text-xl font-bold text-red-400 flex items-center gap-2"><ShieldOff /> Without VPN (Unsecured)</h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
                    Your data is visible to attackers.
                </p>
                <div className="flex items-center justify-between text-xs font-mono">
                    <User /> <span className="text-red-400">user: admin</span> <Server />
                </div>
                <div className="flex items-center justify-between text-xs font-mono mt-2">
                    <User /> <span className="text-red-400">pass: 12345</span> <Server />
                </div>
            </div>

            {/* With VPN */}
            <div className="border border-green-500/50 bg-green-500/10 rounded-lg p-4">
                <h3 className="text-xl font-bold text-green-400 flex items-center gap-2"><Shield /> With VPN (Secured)</h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
                    Your data becomes unreadable.
                </p>
                <div className="flex items-center justify-between text-xs font-mono break-all">
                    <User /> <span className="text-green-400">x7g...k9P</span> <Server />
                </div>
                <div className="flex items-center justify-between text-xs font-mono mt-2 break-all">
                    <User /> <span className="text-green-400">a1B...z8Q</span> <Server />
                </div>
            </div>
        </div>
    );
};

/* ---------------------------------------
   Evil Twin Wi-Fi Simulation
---------------------------------------- */
const EvilTwinSimulation = () => {
    const [message, setMessage] = useState('');

    const networks = [
        { name: 'Cafe_Free_WiFi', secure: true },
        { name: 'Starbucks Guest', secure: true },
        { name: 'Cáfe_Free_WiFi', secure: false },
        { name: 'Airport_WiFi_xfinity', secure: true },
    ];

    const handleSelect = (net: typeof networks[0]) => {
        setMessage(
            net.secure
                ? '✅ Safe network. Still stay cautious.'
                : '🚨 DANGER! This is a fake hotspot designed to steal your data.'
        );
    };

    return (
        <div>
            <p className="mb-4 text-text-secondary-light dark:text-text-secondary-dark">
                Hackers create **fake Wi-Fi networks** to trick you. Click a network:
            </p>
            <div className="space-y-2">
                {networks.map(net => (
                    <button
                        key={net.name}
                        onClick={() => handleSelect(net)}
                        className="w-full flex justify-between items-center p-3 rounded-lg bg-input-light dark:bg-input-dark hover:bg-border-light dark:hover:bg-border-dark transition-colors"
                    >
                        <span className="flex items-center gap-2 font-mono">
                            <Wifi size={16} /> {net.name}
                        </span>
                        <Lock size={16} />
                    </button>
                ))}
            </div>

            {message && (
                <p className={`mt-4 p-3 rounded-lg text-sm ${
                        message.includes('DANGER')
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-green-500/20 text-green-300'
                    }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

/* ---------------------------------------
   Packet Sniffer Simulation
---------------------------------------- */
const PacketSnifferSimulation = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const logLines = [
        "Listening on 'Unsecured_Cafe_WiFi'...",
        "[HTTP] Captured: user=john, pass=password123",
        "[DNS] Query: facebook.com",
        "[IMG] Captured file: selfie.jpg",
        "[HTTPS] Encrypted stream detected... unreadable.",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setLogs(prev =>
                prev.length < logLines.length ? [...prev, logLines[prev.length]] : prev
            );
        }, 1300);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <p className="mb-4 text-text-secondary-light dark:text-text-secondary-dark">
                Shows what a **hacker sees** on open Wi-Fi:
            </p>
            <div className="font-mono text-xs bg-black text-green-400 p-4 rounded-lg h-48 overflow-y-auto">
                {logs.map((log, i) => (
                    <p key={i} className={log.includes('Captured') ? 'text-red-400' : ''}>
                        [{new Date().toLocaleTimeString()}] {log}
                    </p>
                ))}
            </div>
        </div>
    );
};

/* ---------------------------------------
   Tools Main Page
---------------------------------------- */
const Tools: React.FC = () => {
    return (
        <AnimatedPage>
            <div className="max-w-4xl mx-auto">

                {/* ✅ Glass intro wrapper with reduced heading size */}
                <div className="text-center max-w-3xl mx-auto mb-12 p-8 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-xl border border-border-light dark:border-border-dark rounded-2xl">
                    <h1 className="text-3xl md:text-5xl font-bold text-text-primary-light dark:text-white whitespace-nowrap tracking-tight">
                        Interactive Security Demos
                    </h1>
                    <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mt-4">
                        Visualize Wi-Fi attacks to understand the **real risks** of public networks.
                    </p>
                </div>

                <Section title="VPN Simulation" icon={<Shield />}>
                    <VPNSimulation />
                </Section>

                <Section title="Evil Twin Detector" icon={<WifiOff />}>
                    <EvilTwinSimulation />
                </Section>

                <Section title="Packet Sniffer Simulation" icon={<Server />}>
                    <PacketSnifferSimulation />
                </Section>
            </div>
        </AnimatedPage>
    );
};

export default Tools;
