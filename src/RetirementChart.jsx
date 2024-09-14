import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { useStore } from './store';

const RetirementChart = () => {
  const { t } = useTranslation();
  const { state } = useStore();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={state.chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="birthYear" label={{ value: t('birthYear'), position: 'bottom' }} />
        <YAxis label={{ value: t('retirementAge'), angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="retirementAge" stroke="#8884d8" name={t('retirementAge')} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RetirementChart;