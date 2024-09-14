import React, { useState, useMemo } from 'react';
import { Form, InputNumber, Button, Card, Typography, ConfigProvider, Divider, Switch, List, message } from 'antd';
import { useTranslation } from 'react-i18next';
import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";
import { useStore, addCalculation, clearHistory } from './store';

const { Title, Text } = Typography;

const SocialInsuranceCalculator = () => {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const { state, dispatch } = useStore();
  const [currentResult, setCurrentResult] = useState(null);
  const [locale, setLocale] = useState(i18n.language === 'en' ? enUS : zhCN);

  const history = useMemo(() => state.history || [], [state.history]);
  const recentHistory = useMemo(() => history.slice(-5), [history]);

  const onFinish = (values) => {
    console.log('Form submitted with values:', values);
    try {
      const { salary } = values;
      if (typeof salary !== 'number' || salary < 0) {
        throw new Error('Invalid salary');
      }
      const pensionRate = 0.08;
      const medicalRate = 0.02;
      const unemploymentRate = 0.005;
      const totalContribution = salary * (pensionRate + medicalRate + unemploymentRate);
      const result = {
        salary,
        pension: salary * pensionRate,
        medical: salary * medicalRate,
        unemployment: salary * unemploymentRate,
        total: totalContribution,
        date: new Date().toISOString()
      };
      console.log('Calculation result:', result);
      setCurrentResult(result);
      dispatch(addCalculation(result));
    } catch (error) {
      console.error('Calculation error:', error);
      message.error(t('calculationError'));
    }
  };

  const changeLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
    setLocale(newLang === 'en' ? enUS : zhCN);
  };

  const renderHistoryItem = (item, index) => {
    if (!item || typeof item.salary === 'undefined' || typeof item.total === 'undefined') {
      return <List.Item>{t('invalidHistoryItem')}</List.Item>;
    }
    return (
      <List.Item>
        <Text>{`${t('salary')}: ¥${item.salary.toFixed(2)}, ${t('total')}: ¥${item.total.toFixed(2)}`}</Text>
      </List.Item>
    );
  };

  return (
    <ConfigProvider locale={locale}>
      <Card className="w-full max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="m-0">
            {t('socialInsuranceCalculator')}
          </Title>
          <Switch
            checkedChildren="EN"
            unCheckedChildren="中"
            checked={i18n.language === 'en'}
            onChange={changeLanguage}
          />
        </div>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="salary"
            label={t('monthlySalary')}
            rules={[
              { required: true, message: t('pleaseEnterSalary') },
              { type: 'number', min: 0, message: t('salaryMustBePositive') }
            ]}
          >
            <InputNumber
              className="w-full"
              precision={2}
              formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              {t('calculate')}
            </Button>
          </Form.Item>
        </Form>

        {currentResult && (
          <>
            <Divider />
            <Title level={3} className="mb-4">
              {t('calculationResult')}
            </Title>
            <Text strong className="block mb-2">
              {t('pensionInsurance')}: ¥{currentResult.pension.toFixed(2)}
            </Text>
            <Text strong className="block mb-2">
              {t('medicalInsurance')}: ¥{currentResult.medical.toFixed(2)}
            </Text>
            <Text strong className="block mb-2">
              {t('unemploymentInsurance')}: ¥{currentResult.unemployment.toFixed(2)}
            </Text>
            <Text strong className="block">
              {t('totalContribution')}: ¥{currentResult.total.toFixed(2)}
            </Text>
          </>
        )}

        {recentHistory.length > 0 && (
          <>
            <Divider />
            <div className="flex justify-between items-center mb-4">
              <Title level={4} className="m-0">{t('calculationHistory')}</Title>
              <Button size="small" onClick={() => dispatch(clearHistory())}>{t('clearHistory')}</Button>
            </div>
            <List
              size="small"
              dataSource={recentHistory}
              renderItem={renderHistoryItem}
            />
          </>
        )}
      </Card>
    </ConfigProvider>
  );
};

export default SocialInsuranceCalculator;