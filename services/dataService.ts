import { RAW_DATA } from "./surveyData";
import type {
  RawSurveyResponse,
  SurveyResponse,
  ProcessedSurveyResponse,
  AnalysisData,
  ChartData
} from "../types";

/**
 * Maps and cleans the raw survey data into a standardized `SurveyResponse` format.
 */
const mapAndCleanData = (rawData: RawSurveyResponse[]): SurveyResponse[] => {
  return rawData.map(raw => {
    let ageGroup = raw["What is your age group?"]?.replace(/\s/g, "") || "18-24";
    if (ageGroup === "18-25") ageGroup = "18-24";
    if (ageGroup === "26-35") ageGroup = "25-34";
    if (ageGroup === "35-50") ageGroup = "35-44";

    let occupation = raw["What is your occupation?"] || "Other";
    if (occupation.includes("Working / Professional"))
      occupation = "Professional/Office Worker";
    if (occupation.includes("Business / Entrepreneur"))
      occupation = "Business Owner";

    let awareness = "Somewhat (Medium Awareness)";
    const rawAwareness = raw[
      "Are you aware that using public wifi can pose security risk (eg. data theft, hacking, etc)?"
    ]?.toLowerCase();
    if (rawAwareness === "yes") awareness = "Yes (High Awareness)";
    if (rawAwareness === "no") awareness = "No (Low Awareness)";

    let securityMeasures = "Sometimes";
    const rawMeasures = raw["Do you use any security measures while using public wifi?"] || "";
    if (rawMeasures.includes("VPN") || rawMeasures.toLowerCase().includes("yes, always"))
      securityMeasures = "Yes, always";
    else if (
      rawMeasures.toLowerCase().includes("no specific") ||
      rawMeasures.toLowerCase() === "no" ||
      rawMeasures === ""
    )
      securityMeasures = "No, never";

    let feeling = raw["How secure do you feel while using public wifi?"] || "Somewhat secure";
    if (feeling.includes("Not secure at all")) feeling = "Not secure";

    let terms = raw["Do you read the terms and conditions before connecting to public Wi-Fi?"] || "Never";
    if (terms.toLowerCase() === "sometime") terms = "Sometimes";

    const safeValue = (val: string | undefined, fallback: string) =>
      val && val.trim() !== "" ? val.trim() : fallback;

    return {
      "What is your age group?": ageGroup,
      "What is your occupation?": occupation,
      "How often do you use public wifi?": safeValue(raw["How often do you use public wifi?"], "Rarely"),
      "Where do you most often connect to public wifi?": safeValue(
        raw["Where do you most often connect to public wifi?"]?.replace(/\s\/\s/g, "/"),
        "Other"
      ),
      "What activities do you usually perform on public wifi?": safeValue(
        raw["What activities do you usually perform on public wifi?"]?.replace(/\s\/\s/g, "/"),
        "Other"
      ),
      "Are you aware that public wifi can pose security risks?": awareness,
      "Do you use security measures (e.g., vpn) on public wifi?": securityMeasures,
      "Have you ever faced security issues on public wifi?": safeValue(
        raw["Have you ever faced any security issues while using public wifi (eg. hacking, data lost, suspicious activity)?"],
        "Unsure"
      ),
      "How secure do you feel on public wifi?": feeling,
      "Would you pay a small fee for safer public wifi?": safeValue(
        raw["Would you be willing to pay a small fee for safer and more secure public Wi-Fi?"],
        "No"
      ),
      "Do you read terms and conditions before connecting?": terms,
      "Who should be responsible for public wifi security?": safeValue(
        raw["In your opinion who should be responsible for ensuring public Wi-Fi security?"],
        "Shared Responsibility"
      ),
    };
  });
};

/**
 * ✅ NEW: Merge RAW_DATA + LocalStorage responses dynamically
 */
export function getAllResponses(): SurveyResponse[] {
  const localData = JSON.parse(localStorage.getItem("surveyResponses") || "[]");
  return mapAndCleanData([...RAW_DATA, ...localData]);
}

/**
 * Process merged dataset (not fixed at build time anymore)
 */
export function getFullDataSet(): ProcessedSurveyResponse[] {
  return processData(getAllResponses());
}

const processData = (data: SurveyResponse[]): ProcessedSurveyResponse[] => {
  return data.map(response => ({
    "What is your age group?": response["What is your age group?"],
    "What is your occupation?": response["What is your occupation?"],
    "How often do you use public wifi?": response["How often do you use public wifi?"],
    "Where do you most often connect to public wifi?": response["Where do you most often connect to public wifi?"],
    "What activities do you usually perform on public wifi?": response["What activities do you usually perform on public wifi?"],
    awareness_level: response["Are you aware that public wifi can pose security risks?"].includes("High")
      ? "High"
      : response["Are you aware that public wifi can pose security risks?"].includes("Medium")
      ? "Medium"
      : "Low",
    uses_vpn: response["Do you use security measures (e.g., vpn) on public wifi?"].toLowerCase().includes("always")
      ? "Always"
      : response["Do you use security measures (e.g., vpn) on public wifi?"].toLowerCase().includes("sometimes")
      ? "Sometimes"
      : "Never",
    encountered_threat: response["Have you ever faced security issues on public wifi?"] as "Yes" | "No" | "Unsure",
    trusts_public_wifi: response["How secure do you feel on public wifi?"] as "Very secure" | "Somewhat secure" | "Not secure",
    willing_to_pay: response["Would you pay a small fee for safer public wifi?"] as "Yes" | "Maybe" | "No",
    reads_terms: response["Do you read terms and conditions before connecting?"] as "Always" | "Sometimes" | "Never",
    responsibility: response["Who should be responsible for public wifi security?"],
  }));
};

export const getSummaryStatistics = () => {
  const fullData = getFullDataSet();
  const total = fullData.length;

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

  const vpnUsers = fullData.filter(r => r.uses_vpn === "Always").length;
  const highAwareness = fullData.filter(r => r.awareness_level === "High").length;
  const threatEncounter = fullData.filter(r => r.encountered_threat === "Yes").length;
  const dailyUsers = fullData.filter(r => r["How often do you use public wifi?"] === "Daily").length;
  const willingToPay = fullData.filter(r => r.willing_to_pay === "Yes").length;

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
  const counts: Record<string, number> = {};
  data.forEach(item => {
    const value = item[key];
    if (value) counts[value] = (counts[value] || 0) + 1;
  });

  return { labels: Object.keys(counts), data: Object.values(counts) };
};

export const getAnalysisData = (): AnalysisData => {
  const fullData = getFullDataSet();

  return {
    awareness: getCounts(fullData, "awareness_level"),
    vpn_usage: getCounts(fullData, "uses_vpn"),
    trust_levels: getCounts(fullData, "trusts_public_wifi"),
    age_groups: getCounts(fullData, "What is your age group?"),
    wifi_frequency: getCounts(fullData, "How often do you use public wifi?"),
    threat_encounters: getCounts(fullData, "encountered_threat"),
    occupations: getCounts(fullData, "What is your occupation?"),
  };
};
