
import { RAW_DATA } from './surveyData';
import type { RawSurveyResponse, SurveyResponse, ProcessedSurveyResponse, AnalysisData, ChartData } from '../types';

/**
 * Maps and cleans the raw survey data into a standardized `SurveyResponse` format.
 * This function handles inconsistencies in keys, values, and formatting from the source data.
 */
const mapAndCleanData = (rawData: RawSurveyResponse[]): SurveyResponse[] => {
  return rawData.map(raw => {
    // Normalize age groups to match internal categories
    let ageGroup = raw["What is your age group?"]?.replace(/\s/g, '') || "18-24";
    if (ageGroup === '18-25') ageGroup = '18-24';
    if (ageGroup === '26-35') ageGroup = '25-34';
    if (ageGroup === '35-50') ageGroup = '35-44'; 

    // Normalize occupation
    let occupation = raw["What is your occupation?"] || "Other";
    if (occupation.includes("Working / Professional")) occupation = "Professional/Office Worker";
    if (occupation.includes("Business / Entrepreneur")) occupation = "Business Owner";

    // Normalize awareness
    let awareness = "Somewhat (Medium Awareness)";
    const rawAwareness = raw["Are you aware that using public wifi can pose security risk (eg. data theft, hacking, etc)?"]?.toLowerCase();
    if (rawAwareness === 'yes') {
      awareness = "Yes (High Awareness)";
    } else if (rawAwareness === 'no') {
      awareness = "No (Low Awareness)";
    }

    // Normalize security measures usage
    let securityMeasures = "Sometimes";
    const rawMeasures = raw["Do you use any security measures while using public wifi?"] || "";
    if (rawMeasures.includes("VPN") || rawMeasures.toLowerCase().includes("yes, always")) {
      securityMeasures = "Yes, always";
    } else if (rawMeasures.toLowerCase().includes("no specific") || rawMeasures === "" || rawMeasures.toLowerCase() === 'no') {
      securityMeasures = "No, never";
    }

    // Normalize feeling of security
    let feeling = raw["How secure do you feel while using public wifi?"] || "Somewhat secure";
    if (feeling.includes("Not secure at all")) feeling = "Not secure";

    // Normalize T&C reading habits
    let terms = raw["Do you read the terms and conditions before connecting to public Wi-Fi?"] || "Never";
    if (terms.toLowerCase() === 'sometime') terms = "Sometimes";
    
    // Fallback for empty values to prevent 'undefined' issues
    const safeValue = (val: string | undefined, fallback: string) => val && val.trim() !== '' ? val.trim() : fallback;

    return {
      "What is your age group?": ageGroup,
      "What is your occupation?": occupation,
      "How often do you use public wifi?": safeValue(raw["How often do you use public wifi?"], "Rarely"),
      "Where do you most often connect to public wifi?": safeValue(raw["Where do you most often connect to public wifi?"]?.replace(/\s\/\s/g, '/'), "Other"),
      "What activities do you usually perform on public wifi?": safeValue(raw["What activities do you usually perform on public wifi?"]?.replace(/\s\/\s/g, '/'), "Other"),
      "Are you aware that public wifi can pose security risks?": awareness,
      "Do you use security measures (e.g., vpn) on public wifi?": securityMeasures,
      "Have you ever faced security issues on public wifi?": safeValue(raw["Have you ever faced any security issues while using public wifi (eg. hacking, data lost, suspicious activity)?"], "Unsure"),
      "How secure do you feel on public wifi?": feeling,
      "Would you pay a small fee for safer public wifi?": safeValue(raw["Would you be willing to pay a small fee for safer and more secure public Wi-Fi?"], "No"),
      "Do you read terms and conditions before connecting?": terms,
      "Who should be responsible for public wifi security?": safeValue(raw["In your opinion who should be responsible for ensuring public Wi-Fi security?"], "Shared Responsibility"),
    };
  });
};

const rawSurveyData = mapAndCleanData(RAW_DATA);

const processData = (data: SurveyResponse[]): ProcessedSurveyResponse[] => {
  return data.map(response => ({
    "What is your age group?": response["What is your age group?"],
    "What is your occupation?": response["What is your occupation?"],
    "How often do you use public wifi?": response["How often do you use public wifi?"],
    "Where do you most often connect to public wifi?": response["Where do you most often connect to public wifi?"],
    "What activities do you usually perform on public wifi?": response["What activities do you usually perform on public wifi?"],
    "awareness_level": response["Are you aware that public wifi can pose security risks?"].includes('High') ? 'High' : response["Are you aware that public wifi can pose security risks?"].includes('Medium') ? 'Medium' : 'Low',
    "uses_vpn": response["Do you use security measures (e.g., vpn) on public wifi?"].toLowerCase().includes('always') ? 'Always' : response["Do you use security measures (e.g., vpn) on public wifi?"].toLowerCase().includes('sometimes') ? 'Sometimes' : 'Never',
    "encountered_threat": response["Have you ever faced security issues on public wifi?"] as "Yes" | "No" | "Unsure",
    "trusts_public_wifi": response["How secure do you feel on public wifi?"] as "Very secure" | "Somewhat secure" | "Not secure",
    "willing_to_pay": response["Would you pay a small fee for safer public wifi?"] as "Yes" | "Maybe" | "No",
    "reads_terms": response["Do you read terms and conditions before connecting?"] as "Always" | "Sometimes" | "Never",
    "responsibility": response["Who should be responsible for public wifi security?"],
  }));
};

const fullDataSet = processData(rawSurveyData);

export const getFullDataSet = (): ProcessedSurveyResponse[] => {
  return fullDataSet;
};

export const getSummaryStatistics = () => {
  const total = fullDataSet.length;
  if (total === 0) {
    return {
      total_responses: 0,
      vpn_users_percentage: 0,
      high_awareness_percentage: 0,
      threat_encounter_percentage: 0,
      daily_wifi_percentage: 0,
      willing_to_pay_percentage: 0,
    };
  }
  
  const vpnUsers = fullDataSet.filter(r => r.uses_vpn === 'Always').length;
  const highAwareness = fullDataSet.filter(r => r.awareness_level === 'High').length;
  const threatEncounter = fullDataSet.filter(r => r.encountered_threat === 'Yes').length;
  const dailyUsers = fullDataSet.filter(r => r['How often do you use public wifi?'] === 'Daily').length;
  const willingToPay = fullDataSet.filter(r => r.willing_to_pay === 'Yes').length;

  return {
    total_responses: total,
    vpn_users_percentage: ((vpnUsers / total) * 100).toFixed(0),
    high_awareness_percentage: ((highAwareness / total) * 100).toFixed(0),
    threat_encounter_percentage: ((threatEncounter / total) * 100).toFixed(0),
    daily_wifi_percentage: ((dailyUsers / total) * 100).toFixed(0),
    willing_to_pay_percentage: ((willingToPay / total) * 100).toFixed(0),
  };
};

const getCounts = (data: ProcessedSurveyResponse[], key: keyof ProcessedSurveyResponse): ChartData => {
  const counts: { [key: string]: number } = {};
  data.forEach(item => {
    const value = item[key];
    if (value) { // Ensure value is not null or undefined
      counts[value] = (counts[value] || 0) + 1;
    }
  });

  const labels = Object.keys(counts);
  const chartData = Object.values(counts);
  
  return { labels, data: chartData };
};

export const getAnalysisData = (): AnalysisData => {
  return {
    awareness: getCounts(fullDataSet, 'awareness_level'),
    vpn_usage: getCounts(fullDataSet, 'uses_vpn'),
    trust_levels: getCounts(fullDataSet, 'trusts_public_wifi'),
    age_groups: getCounts(fullDataSet, 'What is your age group?'),
    wifi_frequency: getCounts(fullDataSet, 'How often do you use public wifi?'),
    threat_encounters: getCounts(fullDataSet, 'encountered_threat'),
    occupations: getCounts(fullDataSet, 'What is your occupation?'),
  };
};
