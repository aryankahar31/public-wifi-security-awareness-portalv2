
export interface RawSurveyResponse {
  "Timestamp": string;
  "Email Address": string;
  "Name": string;
  "What is your age group?": string;
  "What is your occupation?": string;
  "How often do you use public wifi?": string;
  "Where do you most often connect to public wifi?": string;
  "How important is public wifi to you in your daily routine?": string;
  "What activities do you usually perform on public wifi?": string;
  "Are you aware that using public wifi can pose security risk (eg. data theft, hacking, etc)?": string;
  "Do you use any security measures while using public wifi?": string;
  "Have you ever faced any security issues while using public wifi (eg. hacking, data lost, suspicious activity)?": string;
  "How secure do you feel while using public wifi?": string;
  "If public wifi was not available what alternatives would you prefer?": string;
  "Would you be willing to pay a small fee for safer and more secure public Wi-Fi?": string;
  "What factors influence your decision to connect to a public Wi-Fi network?": string;
  "Do you read the terms and conditions before connecting to public Wi-Fi?": string;
  // Fix: Corrected typo in property key from "Wi--Fi" to "Wi-Fi" to match the data source.
  "In your opinion who should be responsible for ensuring public Wi-Fi security?": string;
  "Score": string;
}

export interface SurveyResponse {
  "What is your age group?": string;
  "What is your occupation?": string;
  "How often do you use public wifi?": string;
  "Where do you most often connect to public wifi?": string;
  "What activities do you usually perform on public wifi?": string;
  "Are you aware that public wifi can pose security risks?": string;
  "Do you use security measures (e.g., vpn) on public wifi?": string;
  "Have you ever faced security issues on public wifi?": string;
  "How secure do you feel on public wifi?": string;
  "Would you pay a small fee for safer public wifi?": string;
  "Do you read terms and conditions before connecting?": string;
  "Who should be responsible for public wifi security?": string;
}

export interface ProcessedSurveyResponse {
  "What is your age group?": string;
  "What is your occupation?": string;
  "How often do you use public wifi?": string;
  "Where do you most often connect to public wifi?": string;
  "What activities do you usually perform on public wifi?": string;
  "awareness_level": "High" | "Medium" | "Low";
  "uses_vpn": "Always" | "Sometimes" | "Never";
  "encountered_threat": "Yes" | "No" | "Unsure";
  "trusts_public_wifi": "Very secure" | "Somewhat secure" | "Not secure";
  "willing_to_pay": "Yes" | "Maybe" | "No";
  "reads_terms": "Always" | "Sometimes" | "Never";
  "responsibility": string;
}

export interface ChartData {
  labels: string[];
  data: number[];
}

export interface AnalysisData {
  awareness: ChartData;
  vpn_usage: ChartData;
  trust_levels: ChartData;
  age_groups: ChartData;
  wifi_frequency: ChartData;
  threat_encounters: ChartData;
  occupations: ChartData;
}