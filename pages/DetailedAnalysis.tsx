import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getFullDataSet } from '../services/dataService';
import type { ProcessedSurveyResponse } from '../types';
import AnimatedPage from '../components/AnimatedPage';
import { CustomChartTooltip } from '../components/CustomChartTooltip';
import useTheme from '../hooks/useTheme';
import { SlidersHorizontal, BarChart3, PieChart as PieIcon, LineChart as LineIcon, AreaChart as AreaIcon } from 'lucide-react';

type ChartType = 'bar' | 'pie' | 'line' | 'area';
const COLORS = ['#61dca3', '#61b3dc', '#b361dc', '#dca361', '#dc6161', '#a361dc', '#dc61b3'];

const DIMENSIONS: { label: string; key: keyof ProcessedSurveyResponse }[] = [
    { label: 'Occupation', key: 'What is your occupation?' },
    { label: 'Age Group', key: 'What is your age group?' },
    { label: 'Usage Frequency', key: 'How often do you use public wifi?' },
    { label: 'Connection Location', key: 'Where do you most often connect to public wifi?' },
    { label: 'Activities Performed', key: 'What activities do you usually perform on public wifi?' },
    { label: 'Risk Awareness', key: 'awareness_level' },
    { label: 'VPN Usage', key: 'uses_vpn' },
    { label: 'Threats Encountered', key: 'encountered_threat' },
    { label: 'Feeling of Security', key: 'trusts_public_wifi' },
    { label: 'Willingness to Pay', key: 'willing_to_pay' },
    { label: 'Reads Terms', key: 'reads_terms' },
    { label: 'Responsibility', key: 'responsibility' },
];

const DetailedAnalysis: React.FC = () => {
    const { theme } = useTheme();
    const tickColor = theme === 'dark' ? '#aab2bb' : '#475569';
    const fullDataSet = useMemo(() => getFullDataSet(), []);

    const [primaryDimension, setPrimaryDimension] = useState<keyof ProcessedSurveyResponse>(DIMENSIONS[0].key);
    const [chartType, setChartType] = useState<ChartType>('bar');
    const [filterDimension, setFilterDimension] = useState<string>('none');
    const [filterValue, setFilterValue] = useState<string>('none');

    const filterOptions = useMemo(() => {
        if (filterDimension === 'none') return [];
        const uniqueValues = new Set(fullDataSet.map(item => item[filterDimension as keyof ProcessedSurveyResponse]));
        return Array.from(uniqueValues);
    }, [filterDimension, fullDataSet]);

    const chartData = useMemo(() => {
        let filteredData = fullDataSet;
        if (filterDimension !== 'none' && filterValue !== 'none') {
            filteredData = fullDataSet.filter(item => item[filterDimension as keyof ProcessedSurveyResponse] === filterValue);
        }

        const counts: { [key: string]: number } = {};
        filteredData.forEach(item => {
            const value = item[primaryDimension] as string;
            counts[value] = (counts[value] || 0) + 1;
        });

        return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
    }, [primaryDimension, filterDimension, filterValue, fullDataSet]);
    
    const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

    const renderChart = () => {
        if (chartData.length === 0) {
            return <div className="flex items-center justify-center h-full text-text-secondary-light dark:text-text-secondary-dark">No data matches your criteria.</div>;
        }

        switch (chartType) {
            case 'pie':
                return (
                    <PieChart>
                        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={{ fill: tickColor, fontSize: 12 }}>
                            {chartData.map((_entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomChartTooltip total={total} />} />
                        <Legend wrapperStyle={{ color: tickColor, fontSize: 12 }} />
                    </PieChart>
                );

            case 'line':
                return (
                    <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#30363d' : '#cbd5e1'} />
                        <XAxis dataKey="name" stroke={tickColor} angle={-45} textAnchor="end" interval={0} height={80} tick={{ fontSize: 10 }} />
                        <YAxis stroke={tickColor} />
                        <Tooltip content={<CustomChartTooltip total={total} />} />
                        <Legend wrapperStyle={{ color: tickColor }} />
                        <Line type="monotone" dataKey="value" stroke="#61dca3" strokeWidth={2} />
                    </LineChart>
                );

            case 'area':
                return (
                    <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#30363d' : '#cbd5e1'} />
                        <XAxis dataKey="name" stroke={tickColor} angle={-45} textAnchor="end" interval={0} height={80} tick={{ fontSize: 10 }} />
                        <YAxis stroke={tickColor} />
                        <Tooltip content={<CustomChartTooltip total={total} />} />
                        <Legend wrapperStyle={{ color: tickColor }} />
                        <Area type="monotone" dataKey="value" stroke="#61dca3" fill="#61dca3" fillOpacity={0.3} />
                    </AreaChart>
                );

            case 'bar':
            default:
                return (
                    <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                        <XAxis type="number" stroke={tickColor} />
                        <YAxis type="category" dataKey="name" width={120} stroke={tickColor} interval={0} tick={{ fontSize: 12 }} />
                        <Tooltip content={<CustomChartTooltip total={total} />} cursor={{ fill: 'rgba(97, 179, 220, 0.1)' }} />
                        <Bar dataKey="value">
                            {chartData.map((_entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                );
        }
    };

    const inputClasses = "w-full bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none transition-all text-sm";
    const buttonClasses = (active: boolean) =>
        `p-2 rounded-md transition-colors ${active ? 'bg-primary text-black' : 'bg-input-light dark:bg-input-dark hover:bg-border-light dark:hover:bg-border-dark'}`;


    return (
        <AnimatedPage>
            <div className="max-w-7xl mx-auto">

                {/* ✅ Glass Box Applied Here */}
                <div className="text-center max-w-3xl mx-auto mb-12 p-8 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-xl border border-border-light dark:border-border-dark rounded-2xl">
                    <h1 className="text-4xl md:text-6xl font-bold text-text-primary-light dark:text-white">
                        Detailed Analysis Tool
                    </h1>
                    <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mt-4">
                        Interactively explore the survey data. Select a metric to analyze, apply filters, and switch chart types to uncover new insights.
                    </p>
                </div>

                <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="block text-sm font-medium mb-1">Primary Dimension</label>
                            <select value={primaryDimension} onChange={e => setPrimaryDimension(e.target.value as keyof ProcessedSurveyResponse)} className={inputClasses}>
                                {DIMENSIONS.map(d => (
                                    <option key={d.key} value={d.key}>
                                        {d.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Filter By</label>
                            <select value={filterDimension} onChange={e => { setFilterDimension(e.target.value); setFilterValue('none'); }} className={inputClasses}>
                                <option value="none">No Filter</option>
                                {DIMENSIONS.map(d => (
                                    <option key={d.key} value={d.key}>
                                        {d.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Filter Value</label>
                            <select value={filterValue} onChange={e => setFilterValue(e.target.value)} className={inputClasses} disabled={filterDimension === 'none'}>
                                <option value="none">All</option>
                                {filterOptions.map(opt => (
                                    <option key={opt as string} value={opt as string}>
                                        {opt as string}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Chart Type</label>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setChartType('bar')} className={buttonClasses(chartType === 'bar')}>
                                    <BarChart3 size={20} />
                                </button>
                                <button onClick={() => setChartType('pie')} className={buttonClasses(chartType === 'pie')}>
                                    <PieIcon size={20} />
                                </button>
                                <button onClick={() => setChartType('line')} className={buttonClasses(chartType === 'line')}>
                                    <LineIcon size={20} />
                                </button>
                                <button onClick={() => setChartType('area')} className={buttonClasses(chartType === 'area')}>
                                    <AreaIcon size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-4 h-[600px] flex flex-col">
                    <ResponsiveContainer width="100%" height="100%">
                        {renderChart()}
                    </ResponsiveContainer>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default DetailedAnalysis;
