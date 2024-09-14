import React from 'react';
import { List, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useStore } from './store';

const { Text } = Typography;

const CalculationHistory = () => {
  const { t } = useTranslation();
  const { state } = useStore();

  return (
    <List
      header={<div>{t('calculationHistory')}</div>}
      bordered
      dataSource={state.history}
      renderItem={(item, index) => (
        <List.Item>
          <Text mark>[{index + 1}]</Text> {t('birthDate')}: {item.birthDate}, 
          {t('type')}: {t(item.type)}, {t('retirementAge')}: {item.retirementAge}, 
          {t('retirementTime')}: {item.retirementTime}, {t('delayMonths')}: {item.delayMonths}
        </List.Item>
      )}
    />
  );
};

export default CalculationHistory;