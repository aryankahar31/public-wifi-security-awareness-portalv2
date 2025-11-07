
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getFullDataSet } from './dataService';

export const generatePdfReport = () => {
    const data = getFullDataSet();
    if (data.length === 0) {
        alert("No data available to generate a report.");
        return;
    }

    const doc = new jsPDF();
    const total = data.length;

    doc.setFontSize(18);
    doc.text('Public Wi-Fi Usage Survey Report', 105, 20, { align: 'center' });
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 28, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Key Summary', 14, 40);
    
    const vpnUsers = data.filter(r => r.uses_vpn === 'Always').length;
    const highAwareness = data.filter(r => r.awareness_level === 'High').length;
    const threatEncounter = data.filter(r => r.encountered_threat === 'Yes').length;
    
    doc.setFontSize(11);
    doc.text(`- Total Responses: ${total}`, 16, 48);
    doc.text(`- Users who always use security measures: ${((vpnUsers / total) * 100).toFixed(1)}%`, 16, 54);
    doc.text(`- Users with high risk awareness: ${((highAwareness / total) * 100).toFixed(1)}%`, 16, 60);
    doc.text(`- Users who confirmed a threat encounter: ${((threatEncounter / total) * 100).toFixed(1)}%`, 16, 66);
    
    let yPos = 80;

    const columnsToAnalyze: (keyof typeof data[0])[] = [
        'What is your age group?', 'What is your occupation?', 'How often do you use public wifi?',
        'awareness_level', 'uses_vpn', 'trusts_public_wifi', 'encountered_threat'
    ];
    
    const friendlyNames: { [key: string]: string } = {
        'What is your age group?': 'Age Group', 'What is your occupation?': 'Occupation',
        'How often do you use public wifi?': 'Usage Frequency', 'awareness_level': 'Risk Awareness Level',
        'uses_vpn': 'Security Measures Usage', 'trusts_public_wifi': 'Feeling of Security',
        'encountered_threat': 'Threat Encounters'
    };

    for (const col of columnsToAnalyze) {
        const counts: { [key: string]: number } = {};
        data.forEach(row => {
            const value = row[col]?.toString() || 'N/A';
            if (value && value !== 'N/A') counts[value] = (counts[value] || 0) + 1;
        });

        const tableData = Object.entries(counts).map(([value, count]) => [
            value, count, `${((count / total) * 100).toFixed(1)}%`
        ]);

        (doc as any).autoTable({
            startY: yPos,
            head: [[friendlyNames[col] || col, 'Count', 'Percentage']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [34, 40, 49] },
        });
        yPos = (doc as any).lastAutoTable.finalY + 10;
         if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
    }

    doc.save('survey_analysis_report.pdf');
};

export const generateChecklistPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor('#61dca3');
    doc.text('Public Wi-Fi Security Checklist', 105, 25, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(0);
    const checklistItems = [
        "1. Verify the Network Name: Always double-check the official network name with an employee. Avoid connecting to misspelled or suspicious SSIDs.",
        "2. Use a VPN (Virtual Private Network): A VPN encrypts all your internet traffic, making it unreadable to anyone trying to snoop on the network.",
        "3. Look for 'HTTPS': Ensure websites you visit use HTTPS (the padlock icon in the address bar). This encrypts your connection to that specific site.",
        "4. Turn Off Auto-Connect: Disable your device's setting to automatically connect to known Wi-Fi networks to prevent joining malicious hotspots.",
        "5. Keep Software Updated: Regularly update your operating system, browser, and applications to patch security vulnerabilities.",
        "6. Enable Your Firewall: Make sure your device's built-in firewall is turned on to block unauthorized incoming connections.",
        "7. Disable File Sharing: Turn off file and printer sharing in your system settings to prevent others from accessing your files.",
        "8. Use Two-Factor Authentication (2FA): Enable 2FA on all important accounts (email, banking). Even if your password is stolen, hackers can't log in.",
        "9. Avoid Sensitive Transactions: If possible, avoid logging into your bank, making purchases, or accessing sensitive work files on public Wi-Fi.",
        "10. Log Out When Finished: When you're done using a website, actively log out instead of just closing the tab.",
        "11. 'Forget' the Network: After you're finished, tell your device to 'forget' the public network so it won't try to reconnect automatically later.",
        "12. Be Wary of 'Shoulder Surfers': Be aware of your physical surroundings and shield your screen when entering passwords or sensitive information."
    ];

    doc.text(checklistItems, 14, 40, { maxWidth: 180, lineHeightFactor: 1.5 });

    doc.save('public_wifi_security_checklist.pdf');
};
