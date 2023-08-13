import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

import {
  Button,
  Form,
  Input,
  Select,
  Typography,
  Card,
  Checkbox,
  Space,
  Tabs
} from "antd";
import type { SelectProps } from "antd";

import TinyEditor from "../../ui/Editor";
import { TrainingProvider, Section, DeliveryType } from "@models/course";

import { courseApi } from "@api/course";

const { Option } = Select;

const layout = "vertical";

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const options: SelectProps["options"] = [];

for (let i = 0; i < 100000; i++) {
  const value = `${i.toString(36)}${i}`;
  options.push({
    label: value,
    value,
    disabled: i === 10
  });
}

const Label = ({
  required,
  children
}: {
  required?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Typography.Paragraph>
      {required && <span style={{ color: "#ff4d4f" }}>*</span>} {children}
    </Typography.Paragraph>
  );
};

export const FormCourse: FC = () => {
  const [t] = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      Code: "Hello world!",
      NameKz: "male",
      NameRu: "male",
      NameEe: "male",
      TrainingProviderId: "male",
      SectionId: "female",
      form: "female",
      category: "category",
      preconditions: ["44", "33", "55"],
      timeH: 2,
      timeM: 10,
      goalKZ: "male",
      goalRU: "male",
      goalEN: "male",
      audienceKZ: "male",
      audienceRU: "male",
      audienceEN: "male",
      descriptionKZ: "male",
      descriptionRU: "male",
      descriptionEN: "male"
    });
  };

  const trainingProviders = useQuery("getTrainingProviders", () =>
    courseApi.getTrainingProviders().then((res) => res.data)
  );

  const sections = useQuery("getSections", () =>
    courseApi.getSections().then((res) => res.data)
  );

  const deliveryTypes = useQuery("getDeliveryTypes", () =>
    courseApi.getDeliveryTypes().then((res) => res.data)
  );

  // const handlePostCourseCts = async () => {
  //   const response =  await courseApi.postCourseCts();
  //   console.log(response);
  // };

  return (
    <div style={{ padding: "15px" }}>
      <Typography.Title>{t("course.createCourse")}</Typography.Title>
      <Form
        layout={layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Typography.Text type="warning"></Typography.Text>
        <Card
          title={`1. ${t("course.generalInformation")}`}
          style={{ borderRadius: 0 }}
        >
          <Form.Item
            name="code"
            label={t("course.courseCode")}
            rules={[{ required: true, message: t("course.codeRequired") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nameKz"
            label={t("course.courseTitle")}
            rules={[{ required: true }]}
          >
            <Input addonBefore="KZ" />
          </Form.Item>
          <Form.Item name="NameRu" rules={[{ required: true }]}>
            <Input addonBefore="RU" />
          </Form.Item>
          <Form.Item name="NameEn" rules={[{ required: true }]}>
            <Input addonBefore="EN" />
          </Form.Item>
          <Form.Item
            name="TrainingProviderId"
            label="Поставщик"
            rules={[{ required: true }]}
          >
            <Select placeholder="Выберите поставщика" allowClear>
              {trainingProviders.data?.map((item: TrainingProvider) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="SectionId"
            label="Раздел"
            rules={[{ required: true }]}
          >
            <Select placeholder="Выберите раздел" allowClear>
              {sections?.data?.map((item: Section) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="form"
            label="Форма обучения"
            rules={[{ required: true }]}
          >
            <Select placeholder="Выберите форма обучения" allowClear>
              {deliveryTypes.data?.map((item: DeliveryType) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="category" label="Категория">
            <Input />
          </Form.Item>
          <Form.Item
            name="language"
            label="Язык обучения"
            rules={[{ required: true }]}
          >
            <Checkbox.Group>
              <Checkbox value="KZ">Казахский</Checkbox>
              <Checkbox value="RU">Русский</Checkbox>
              <Checkbox value="EN">Английский</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item name="preconditions" label="Предусловия">
            <Select
              placeholder="Выберите форма обучения"
              allowClear
              mode="multiple"
            >
              {options.map((index) => (
                <Option key={index.value} value={index.value}>
                  {index.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Label required>Длительность</Label>
          <Space>
            <Form.Item name="timeH" rules={[{ required: true }]}>
              <Input addonAfter="ч." />
            </Form.Item>
            <Form.Item name="timeM" rules={[{ required: true }]}>
              <Input addonAfter="м." />
            </Form.Item>
          </Space>
          <Form.Item name="preconditions" label="Предусловия">
            <Select
              placeholder="Выберите форма обучения"
              allowClear
              mode="multiple"
            >
              {options.map((index) => (
                <Option key={index.value} value={index.value}>
                  {index.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Label required>Цель</Label>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="KZ" key="KZ">
              <Form.Item name="goalKZ" rules={[{ required: true }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="RU" key="RU">
              <Form.Item name="goalRU" rules={[{ required: true }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="EN" key="EN">
              <Form.Item name="goalEN" rules={[{ required: true }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
          <Label required>Целевая аудитория</Label>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="KZ" key="KZ">
              <Form.Item name="audienceKZ" rules={[{ required: true }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="RU" key="RU">
              <Form.Item name="audienceRU" rules={[{ required: true }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="EN" key="EN">
              <Form.Item name="audienceEN" rules={[{ required: true }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
          <Label>Описание курса</Label>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="KZ" key="KZ">
              <Form.Item name="descriptionKZ" rules={[{ required: true }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="RU" key="RU">
              <Form.Item name="descriptionRU" rules={[{ required: true }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="EN" key="EN">
              <Form.Item name="descriptionEN" rules={[{ required: true }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
          <Form.Item name="program" label="Программа">
            {/* @ts-ignore */}
            <TinyEditor />
          </Form.Item>
        </Card>
        <Card title="2. Сертификация" style={{ borderRadius: 0 }}>
          <Form.Item name="certification" valuePropName="checked">
            <Checkbox>Сертификация</Checkbox>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.certification !== currentValues.certification
            }
          >
            {({ getFieldValue }) => (
              <Form.Item
                name="certificationPeriod"
                label="Срок действия сертификата (месяцев)"
                rules={[{ required: getFieldValue("certification") }]}
              >
                <Input />
              </Form.Item>
            )}
          </Form.Item>
        </Card>
        <Card title="3. Дополнительная информация" style={{ borderRadius: 0 }}>
          <Form.Item name="owner" label="Владелец">
            <Input />
          </Form.Item>
          <Form.Item
            name="enrollmentPeriod"
            label="Окончание регистрации (дней)"
          >
            <Input />
          </Form.Item>
          <Label>Число студентов</Label>
          <Space>
            <Form.Item name="numberOfStudentsMax">
              <Input addonBefore="min" />
            </Form.Item>
            <Form.Item name="numberOfStudentsMin">
              <Input addonBefore="max" />
            </Form.Item>
          </Space>
          <Label>Материальное обеспечение</Label>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="KZ" key="KZ">
              <Form.Item name="RequirementsKZ" rules={[{ required: true }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="RU" key="RU">
              <Form.Item name="RequirementsRU" rules={[{ required: true }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="EN" key="EN">
              <Form.Item name="RequirementsEN" rules={[{ required: true }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
          <Label>Методика оценки</Label>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="KZ" key="KZ">
              <Form.Item
                name="AssesmentCriteriaKZ"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="RU" key="RU">
              <Form.Item
                name="AssesmentCriteriaRU"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="EN" key="EN">
              <Form.Item
                name="AssesmentCriteriaEN"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
        </Card>
        <Card style={{ borderRadius: 0 }}>
          <Space style={{ width: "100%", justifyContent: "right" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Cancel
            </Button>
          </Space>
        </Card>
        <Form.Item {...tailLayout}>
          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
