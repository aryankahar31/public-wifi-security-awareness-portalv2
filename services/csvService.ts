
import { getFullDataSet } from './dataService';
import type { ProcessedSurveyResponse } from '../types';

export const generateCsv = () => {
    const data = getFullDataSet();
    if (data.length === 0) {
        alert("No data to export.");
        return;
    }

    const headers = Object.keys(data[0]) as (keyof ProcessedSurveyResponse)[];
    
    const replacer = (_key: string, value: any) => value === null ? '' : value;

    const csv = [
        headers.join(','), // header row
        ...data.map(row => headers.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "survey_data_export.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
