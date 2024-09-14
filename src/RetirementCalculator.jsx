import React, { useState } from 'react';
import { Form, DatePicker, Select, Button, Card, Typography, Divider } from 'antd';
import { calculateRetirement } from './utils';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;

function RetirementCalculator() {
  const [form] = Form.useForm();
  const [result, setResult] = useState(null);

  const onFinish = (values) => {
    const birthDate = values.birthDate.toDate();
    const info = calculateRetirement(birthDate.getFullYear(), birthDate.getMonth() + 1, values.type);
    setResult(info);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <Title level={2} className="text-center mb-6">退休计算器</Title>
      <Form
        form={form}
        name="retirement_calculator"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="birthDate"
          label="出生日期"
          rules={[{ required: true, message: '请选择出生日期！' }]}
        >
          <DatePicker 
            picker="month" 
            className="w-full"
            placeholder="选择出生年月"
            disabledDate={(current) => current && current > moment().endOf('day')}
          />
        </Form.Item>

        <Form.Item
          name="type"
          label="类型"
          rules={[{ required: true, message: '请选择类型！' }]}
        >
          <Select placeholder="选择退休类型">
            <Option value="male">男性</Option>
            <Option value="female50">女性（50岁退休）</Option>
            <Option value="female55">女性（55岁退休）</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            计算
          </Button>
        </Form.Item>
      </Form>

      {result && (
        <>
          <Divider />
          <Title level={3} className="mb-4">计算结果</Title>
          <Text strong className="block mb-2">退休年龄: {result.retirementAge}</Text>
          <Text strong className="block mb-2">退休时间: {result.retirementTime}</Text>
          <Text strong className="block">延迟退休: {result.delayMonths}</Text>
        </>
      )}
    </Card>
  );
}

export default RetirementCalculator;