import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Video, Download, ChevronDown, Smartphone, Laptop, Apple, Computer } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';
import { generateChecklistPdf } from '../services/pdfService';

const resources = {
  articles: [
    { title: "Are you safe on public Wi-Fi?", desc: "Essential insights into immediate risks and protective measures.", url: "https://indianexpress.com/article/technology/tech-news-technology/are-you-safe-on-public-wi-fi-what-you-need-to-know-now-9681879/" },
    { title: "Privacy and Security Implications", desc: "A case study exploring privacy challenges in public Wi-Fi usage.", url: "https://cis-india.org/internet-governance/blog/privacy-and-security-implications-of-public-wi-fi-a-case-study" },
    { title: "Evil Twin (Wireless Networks) – Wikipedia", desc: "An overview of the 'Evil Twin' attack, a common threat on public networks.", url: "https://en.wikipedia.org/wiki/Evil_twin_(wireless_networks)" },
    { title: "Survey on Wireless Network Security", desc: "Comprehensive survey covering wireless security protocols and threats.", url: "https://www.researchgate.net/publication/353226520_Survey_on_Wireless_Network_Security" },
  ],
  videos: [
    { id: "BC8uurRAcUQ", title: "Why Public Wi-Fi is Dangerous" },
    { id: "1OVTmrXGHyU", title: "Hacker Demonstrates Wi-Fi Risks" },
    { id: "XcghUy-8VRA", title: "Kaspersky on Wi-Fi Dangers" },
    { id: "05mL4dF1iMM", title: "Cybersecurity Training" },
    { id: "bdVkkRmJEeM", title: "Quick Wi-Fi Risk Overview" },
    { id: "4YbXXW3DLQM", title: "Wi-Fi Protection Tips" },
  ]
};

const deviceTips = [
  { os: 'iOS', icon: <Apple />, tips: ["Settings > Wi-Fi > Turn off 'Auto-Join Hotspot'.", "Use a reputable VPN app from the App Store.", "Keep iOS updated via Settings > General > Software Update."] },
  { os: 'Android', icon: <Smartphone />, tips: ["Settings > Network & Internet > Wi-Fi > Wi-Fi Preferences > Turn off 'Connect to open networks'.", "Use a trusted VPN service like Google One VPN or others.", "Check for updates in Settings > System > System update."] },
  { os: 'Windows', icon: <Computer />, tips: ["Click the Wi-Fi icon > Wi-Fi settings. Uncheck 'Connect automatically' for public networks.", "Ensure Network Profile is set to 'Public', not 'Private'.", "Keep Windows updated via Settings > Update & Security."] },
  { os: 'macOS', icon: <Laptop />, tips: ["System Settings > Wi-Fi. Uncheck 'Auto-join' for public networks.", "Ensure your Firewall is on in System Settings > Network > Firewall.", "Regularly check for updates in System Settings > General > Software Update."] },
];

const AccordionItem: React.FC<{ item: typeof deviceTips[0] }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border-light dark:border-border-dark">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-4 text-left">
        <span className="flex items-center gap-3 text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">{item.icon} {item.os}</span>
        <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <ul className="pl-8 pr-4 pb-4 list-disc space-y-2 text-text-secondary-light dark:text-text-secondary-dark">
              {item.tips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Resources: React.FC = () => {
  return (
    <AnimatedPage>
      <div className="max-w-6xl mx-auto">

        {/* ✅ Glass blur intro box */}
        <div className="text-center max-w-3xl mx-auto mb-12 p-8 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-xl border border-border-light dark:border-border-dark rounded-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary-light dark:text-white">
            Resources Hub
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mt-4">
            Empower yourself with knowledge. Use these curated articles, videos, and guides to stay safe on public networks.
          </p>
        </div>

        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-8 mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-text-primary-light dark:text-white">Your Security Checklist</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-xl mx-auto mb-6">
            Download our one-page PDF guide with essential, actionable steps to secure your connection on any public Wi-Fi network.
          </p>
          <button onClick={generateChecklistPdf} className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary font-bold uppercase tracking-wider rounded-md transition-all hover:bg-primary hover:text-black hover:shadow-[0_0_30px_5px_#61dca3]">
            <Download size={20} /> Download Checklist PDF
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Articles */}
          <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-6">
            <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3"><FileText /> Featured Articles</h3>
            <div className="space-y-4">
              {resources.articles.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg bg-input-light dark:bg-input-dark hover:bg-border-light/50 dark:hover:bg-border-dark/50 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h4 className="font-semibold text-primary">{item.title}</h4>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{item.desc}</p>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-6">
            <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3"><Video /> Educational Videos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {resources.videos.map((video, index) => (
                <motion.a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={video.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <p className="text-xs text-center mt-2 text-text-secondary-light dark:text-text-secondary-dark group-hover:text-primary transition-colors">{video.title}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-text-primary-light dark:text-white">Device-Specific Security Tips</h2>
          <div className="max-w-2xl mx-auto">
            {deviceTips.map((item) => <AccordionItem key={item.os} item={item} />)}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Resources;
