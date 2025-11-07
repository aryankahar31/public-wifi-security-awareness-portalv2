import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  total?: number;
}

export const CustomChartTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, total }) => {
  if (active && payload && payload.length) {
    const categoryLabel = label || payload[0].name;
    const count = payload[0].value;
    const percentage = (total && total > 0) ? ((count / total) * 100).toFixed(1) : null;

    return (
      <div className="bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm p-3 border border-border-light dark:border-border-dark rounded-lg shadow-lg">
        <p className="label font-bold text-primary">{`${categoryLabel}: ${count} responses`}</p>
        {percentage && <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{`(${percentage}% of total)`}</p>}
      </div>
    );
  }
  return null;
};
