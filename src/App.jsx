import { Layout, Typography, Space } from "antd";
import { GithubOutlined, GlobalOutlined } from "@ant-design/icons";
import RetirementCalculator from "./RetirementCalculator";

const { Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

function App() {
  return (
    <Layout className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <Content className="p-4 md:p-8">
        <Title className="text-center text-white mb-8">退休计算器</Title>
        <RetirementCalculator />
      </Content>
      <Footer className="bg-transparent text-center text-white py-4">
        <Space direction="vertical" size="large">
          <Text className="text-white">
            退休计算器是一个帮助用户根据出生日期和就业类型计算退休年龄和相关信息的工具。
          </Text>
          <Space split={<span className="text-white mx-2">|</span>}>
            <Link
              href="https://retirement-calculator.h7ml.cn"
              target="_blank"
              className="text-white hover:text-blue-200"
            >
              <GlobalOutlined /> 项目地址
            </Link>
            <Link
              href="https://github.com/h7ml/retirement-calculator"
              target="_blank"
              className="text-white hover:text-blue-200"
            >
              <GithubOutlined /> GitHub
            </Link>
          </Space>
          <Text className="text-white">© 2024 h7ml. 保留所有权利。</Text>
        </Space>
      </Footer>
    </Layout>
  );
}

export default App;
