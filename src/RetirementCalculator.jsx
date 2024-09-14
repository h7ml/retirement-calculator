import React, { useState } from 'react';
import { Form, DatePicker, Select, Button, Card, Typography, Divider, ConfigProvider, Switch } from 'antd';
import { RetirementCalculator } from './utils';
import { useStore, addCalculation } from './store';
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";
import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";
import { useTranslation } from 'react-i18next';
import './i18n';

const { Title, Text } = Typography;
const { Option } = Select;

function Index() {
  const [form] = Form.useForm();
  const [result, setResult] = useState(null);
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState(i18n.language === 'en' ? enUS : zhCN);
  const { dispatch } = useStore();

  const onFinish = (values) => {
    const birthDate = values.birthDate.format('YYYY-MM-DD');
    const calculator = new RetirementCalculator(
      values.birthDate.year(),
      values.birthDate.month() + 1,
      values.type
    );
    const info = calculator.calculate();
    setResult(info);
    dispatch(addCalculation({ ...info, birthDate, type: values.type }));
  };

  const changeLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
    setLocale(newLang === 'en' ? enUS : zhCN);
    dayjs.locale(newLang === 'en' ? 'en' : 'zh-cn');
  };

  return (
    <ConfigProvider locale={locale}>
      <Card className="w-full max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="m-0">
            {t("retirementCalculator")}
          </Title>
          <Switch
            checkedChildren="EN"
            unCheckedChildren="中"
            checked={i18n.language === 'en'}
            onChange={changeLanguage}
          />
        </div>
        <Form
          form={form}
          name="retirement_calculator"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="birthDate"
            label={t("birthDate")}
            rules={[{ required: true, message: t("pleaseSelectBirthDate") }]}
          >
            <DatePicker
              className="w-full"
              format="YYYY年MM月DD日"
              placeholder={t("selectDate")}
              disabledDate={(current) => current && current > dayjs().endOf("day")}
            />
          </Form.Item>

          <Form.Item
            name="type"
            label={t("employmentType")}
            rules={[{ required: true, message: t("pleaseSelectType") }]}
          >
            <Select placeholder={t("selectRetirementType")}>
              <Option value="male">{t("male")}</Option>
              <Option value="female50">{t("female50")}</Option>
              <Option value="female55">{t("female55")}</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              {t("calculateButton")}
            </Button>
          </Form.Item>
        </Form>

        {result && (
          <>
            <Divider />
            <Title level={3} className="mb-4">
              {t("calculationResult")}
            </Title>
            <Text strong className="block mb-2">
              {t("retirementAge")}: {result.retirementAge}
            </Text>
            <Text strong className="block mb-2">
              {t("retirementTime")}: {result.retirementTime}
            </Text>
            <Text strong className="block">
              {t("delayMonths")}: {result.delayMonths}
            </Text>
          </>
        )}
      </Card>
    </ConfigProvider>
  );
}

export default Index;