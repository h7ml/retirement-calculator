import React from 'react';
import { Layout, Typography } from 'antd';
import RetirementCalculator from './RetirementCalculator';

const { Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <Content className="p-4 md:p-8">
        <Title className="text-center text-white mb-8">退休计算器</Title>
        <RetirementCalculator />
      </Content>
    </Layout>
  );
}

export default App;
