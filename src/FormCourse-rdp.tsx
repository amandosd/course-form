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
        <Card style={{ margin: "20px 0"}}>
            <Typography.Paragraph>{t("course.description")}</Typography.Paragraph>
        </Card>
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
            rules={[{ required: true, message: t("course.requiredFieldMsg") }]}
          >
            <Input addonBefore="KZ" />
          </Form.Item>
          <Form.Item name="NameRu" rules={[{ required: true, message: t("course.requiredFieldMsg") }]}>
            <Input addonBefore="RU" />
          </Form.Item>
          <Form.Item name="nameEn" rules={[{ required: true, message: t("course.requiredFieldMsg") }]}>
            <Input addonBefore="EN" />
          </Form.Item>
          <Form.Item
            name="trainingProviderId"
            label={t("course.trainingProvider")}
            rules={[{ required: true, message: t("course.trainingProviderRequired") }]}
          >
            <Select allowClear>
              {trainingProviders.data?.map((item: TrainingProvider) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="sectionId"
            label={t("course.section")}
            rules={[{ required: true, message: t("course.sectionRequired") }]}
          >
            <Select allowClear>
              {sections?.data?.map((item: Section) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="deliveryTypeId"
            label={t("course.deliveryType")}
            rules={[{ required: true,  message: t("course.deliveryRequired") }]}
          >
            <Select allowClear>
              {deliveryTypes.data?.map((item: DeliveryType) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="category" label={t("course.category")}>
            <Input />
          </Form.Item>
          <Form.Item
            name="deliveryLanguages"
            label={t("course.language")}
            rules={[{ required: true, message: t("course.requiredFieldMsg") }]}
          >
            <Checkbox.Group>
              <Checkbox value="KZ">Казахский</Checkbox>
              <Checkbox value="RU">Русский</Checkbox>
              <Checkbox value="EN">Английский</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item name="prerequisites" label={t("course.prerequisites")}>
            <Select
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
          <Label required>{t("course.duration")}</Label>
          <Space>
            <Form.Item name="timeH" rules={[{ required: true, message: t("course.requiredFieldMsg") }]}>
              <Input addonAfter={t("course.hour")} />
            </Form.Item>
            <Form.Item name="timeM" rules={[{ required: true, message: t("course.requiredFieldMsg") }]}>
              <Input addonAfter={t("course.minute")} />
            </Form.Item>
          </Space>
          <Label required>{t("course.objective")}</Label>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="KZ" key="KZ">
              <Form.Item name="aimKz" rules={[{ required: true, message: t("course.requiredFieldMsg") }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="RU" key="RU">
              <Form.Item name="aimRu" rules={[{ required: true, message: t("course.requiredFieldMsg") }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="EN" key="EN">
              <Form.Item name="aimEn" rules={[{ required: true, message: t("course.requiredFieldMsg") }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
          <Label required>{t("course.targetAudience")}</Label>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="KZ" key="KZ">
              <Form.Item name="targetAuditoryKz" rules={[{ required: true, message: t("course.requiredFieldMsg") }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="RU" key="RU">
              <Form.Item name="targetAuditoryRu" rules={[{ required: true, message: t("course.requiredFieldMsg") }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="EN" key="EN">
              <Form.Item name="targetAuditoryEn" rules={[{ required: true, message: t("course.requiredFieldMsg") }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
          <Label>{t("course.courseDescription")}</Label>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="KZ" key="KZ">
              <Form.Item name="descriptionKZ" rules={[{ required: true, message: t("course.requiredFieldMsg") }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="RU" key="RU">
              <Form.Item name="descriptionRU" rules={[{ required: true, message: t("course.requiredFieldMsg") }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="EN" key="EN">
              <Form.Item name="descriptionEN" rules={[{ required: true, message: t("course.requiredFieldMsg") }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
          <Label>{t("course.content")}</Label>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="KZ" key="KZ">
              <Form.Item name="structureKz">
                {/* @ts-ignore */}
                <TinyEditor />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="RU" key="RU">
              <Form.Item name="structureRu">
                  {/* @ts-ignore */}
                  <TinyEditor />
                </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="EN" key="EN">
              <Form.Item name="structureEn">
                {/* @ts-ignore */}
                <TinyEditor />
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
          
        </Card>
        <Card title={`"2. ${t('certification')}"`} style={{ borderRadius: 0 }}>
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
                name="expirationPeriod"
                label={`${t("course.validityPeriod")} (${t("course.months")})`}
                rules={[{ required: getFieldValue("certification"), message: t("course.requiredFieldMsg") }]}
              >
                <Input />
              </Form.Item>
            )}
          </Form.Item>
        </Card>
        <Card title={`3. ${t("course.additionalInformation")}`} style={{ borderRadius: 0 }}>
          <Form.Item name="owner" label={t("course.owner")}>
            <Input />
          </Form.Item>
          <Form.Item
            name="enrollmentPeriod"
            label={`${t("course.enrollmentPeriod")} (${t("course.days")})`}
          >
            <Input />
          </Form.Item>
          <Label>{t("course.numberOfStudents")}</Label>
          <Space>
            <Form.Item name="studentsMin">
              <Input addonBefore="min" />
            </Form.Item>
            <Form.Item name="studentsMax">
              <Input addonBefore="max" />
            </Form.Item>
          </Space>
          <Label>{t("course.preliminaryLogistics")}</Label>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="KZ" key="KZ">
              <Form.Item name="requirementsKz" rules={[{ required: true, message: t("course.requiredFieldMsg") }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="RU" key="RU">
              <Form.Item name="requirementsRu" rules={[{ required: true, message: t("course.requiredFieldMsg") }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="EN" key="EN">
              <Form.Item name="requirementsEn" rules={[{ required: true, message: t("course.requiredFieldMsg") }]}>
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
          <Label>{t("course.typeOfAssessment")}</Label>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="KZ" key="KZ">
              <Form.Item
                name="assesmentCriteriaKz"
                rules={[{ required: true, message: t("course.requiredFieldMsg") }]}
              >
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="RU" key="RU">
              <Form.Item
                name="assesmentCriteriaRu"
                rules={[{ required: true, message: t("course.requiredFieldMsg") }]}
              >
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="EN" key="EN">
              <Form.Item
                name="assesmentCriteriaEn"
                rules={[{ required: true, message: t("course.requiredFieldMsg") }]}
              >
                <Input.TextArea rows={5} />
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
        </Card>
        <Card style={{ borderRadius: 0 }}>
          <Space style={{ width: "100%", justifyContent: "right" }}>
            <Button type="primary" htmlType="submit">
              {t("course.save")}
            </Button>
            <Button htmlType="button" onClick={onReset}>
              {t("course.cancel")}
            </Button>
          </Space>
        </Card>
      </Form>
    </div>
  );
};
