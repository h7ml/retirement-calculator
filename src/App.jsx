import React from 'react';
import { Layout, Typography, Space, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import RetirementCalculator from './RetirementCalculator';
import CalculationHistory from './CalculationHistory';
import RetirementChart from './RetirementChart';
import SocialInsuranceCalculator from './SocialInsuranceCalculator';
import { StoreProvider } from './store.jsx';
import './i18n';

const { Content, Footer } = Layout;
const { Title, Link } = Typography;
const { TabPane } = Tabs;

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en');
  };

  return (
    <StoreProvider>
      <Layout className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
        <Content className="p-4 md:p-8">
          <Title className="text-center text-white mb-8">{t('retirementCalculator')}</Title>
          <Tabs defaultActiveKey="1">
            <TabPane tab={t('calculator')} key="1">
              <RetirementCalculator />
            </TabPane>
            {/* <TabPane tab={t('history')} key="2">
              <CalculationHistory />
            </TabPane>
            <TabPane tab={t('chart')} key="3">
              <RetirementChart />
            </TabPane> */}
            <TabPane tab={t('socialInsurance')} key="4">
              <SocialInsuranceCalculator />
            </TabPane>
          </Tabs>
        </Content>
        <Footer className="bg-transparent text-center text-white py-4">
          <Space>
            <Link href="https://github.com/h7ml/retirement-calculator" target="_blank" className="text-white hover:text-blue-200">
              GitHub
            </Link>
            <button onClick={changeLanguage} className="text-white hover:text-blue-200">
              {t('switchLanguage')}
            </button>
          </Space>
        </Footer>
      </Layout>
    </StoreProvider>
  );
}

export default App;