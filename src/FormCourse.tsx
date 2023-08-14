import React, { FC } from 'react';
import { Button, Form, Input, Select, Typography, Card, Checkbox, Space, Tabs } from 'antd';
import type { SelectProps } from 'antd';

import TinyEditor from './Editor';
import { CourseSelect } from './CourseSelect'

const { Option } = Select;

const layout = "vertical";

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const options: SelectProps['options'] = [];

for (let i = 0; i < 100000; i++) {
  const value = `${i.toString(36)}${i}`;
  options.push({
    label: value,
    value,
    disabled: i === 10,
  });
}

const Label = ({required, children}: {required?: boolean, children: React.ReactNode}) => {
    return <Typography.Paragraph>{required && <span style={{color: '#ff4d4f'}}>*</span>} {children}</Typography.Paragraph>
}

export const FormCourse: FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ 
        Code: 'Hello world!', 
        NameKz: 'male',
        NameRu: 'male',
        NameEe: 'male',
        TrainingProviderId: 'male',
        SectionId: 'female',
        form: 'female',
        category: 'category',
        language: ["KZ"],
        preconditions: ['44','33','55'],
        timeH: 2,
        timeM: 10,
        goalKZ: 'male',
        goalRU: 'male',
        goalEN: 'male',
        audienceKZ: 'male',
        audienceRU: 'male',
        audienceEN: 'male',
        descriptionKZ: 'male',
        descriptionRU: 'male',
        descriptionEN: 'male',
        
    });
  };

  const renderTextArea = (name: string, required?: boolean) => {
    return (
        <Form.Item name={name} rules={[{ required }]}>
            <Input.TextArea rows={5}/>
        </Form.Item>
    )
  }

  return (
    <div style={{padding: '15px'}}>
        <Typography.Title>Создание курса</Typography.Title>
        <Form
            layout={layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            >
            <Card style={{ margin: "20px 0"}}>
                <Typography.Paragraph>On this page you can tune requisites of the course and save them. For more details, please read the Training Process Management Manual.</Typography.Paragraph>
            </Card>
            <Card title="1. Общая информация" style={{borderRadius: 0}}>
                <Form.Item name="Code" label="Course" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="NameKz" label="Наименование курса" rules={[{ required: true }]}>
                    <Input addonBefore="KZ" />
                </Form.Item>
                <Form.Item name="NameRu" rules={[{ required: true }]}>
                    <Input addonBefore="RU" />
                </Form.Item>
                <Form.Item name="nameEn" rules={[{ required: true }]}>
                    <Input addonBefore="EN" />
                </Form.Item>
                <Form.Item name="TrainingProviderId" label="Поставщик" rules={[{ required: true }]}>
                    <Select
                        placeholder="Выберите поставщика"
                        allowClear
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="SectionId" label="Раздел" rules={[{ required: true }]}>
                    <Select
                        placeholder="Выберите раздел"
                        allowClear
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="form" label="Форма обучения" rules={[{ required: true }]}>
                    <Select
                        placeholder="Выберите форма обучения"
                        allowClear
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="category" label="Категория">
                    <Input />
                </Form.Item>
                <Form.Item name="language" label="Язык обучения" rules={[{ required: true }]}>
                    <Checkbox.Group>
                        <Checkbox value="KZ">Казахский</Checkbox>
                        <Checkbox value="RU">Русский</Checkbox>
                        <Checkbox value="EN">Английский</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item name="preconditions" label="Предусловия">
                    <CourseSelect initialValue={[4,5]} />
                </Form.Item>
                <Label required>Длительность</Label>
                <Space.Compact>
                    <Form.Item name="timeH" rules={[{ required: true }]}>
                        <Input addonAfter="ч." />
                    </Form.Item>
                    <Form.Item name="timeM" rules={[{ required: true }]}>
                        <Input addonAfter="м." />
                    </Form.Item>
                </Space.Compact>
                <Label required>Цель</Label>
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    size="small"
                    items={['KZ', 'RU', 'EN'].map((_, i) => {
                        const id = String(i);
                        return {
                            label: _,
                            key: id,
                            disabled: i === 28,
                            children: renderTextArea(`goal${_}`, true),
                        };
                        })}
                />
                <Label required>Целевая аудитория</Label>
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    size="small"
                    items={['KZ', 'RU', 'EN'].map((_, i) => {
                        const id = String(i);
                        return {
                            label: _,
                            key: id,
                            disabled: i === 28,
                            children: renderTextArea(`audience${_}`, true),
                        };
                        })}
                />
                <Label>Описание курса</Label>
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    size="small"
                    items={['KZ', 'RU', 'EN'].map((_, i) => {
                        const id = String(i);
                        return {
                            label: _,
                            key: id,
                            disabled: i === 28,
                            children: renderTextArea(`description${_}`),
                        };
                        })}
                />
                <Form.Item name="program" label="Программа">
                    {/* @ts-ignore */}
                    <TinyEditor />
                </Form.Item>
            </Card>
            <Card title="2. Сертификация" style={{borderRadius: 0}}>
                <Form.Item name="certification" valuePropName="checked">
                    <Checkbox>Сертификация</Checkbox>
                </Form.Item>
                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.certification !== currentValues.certification}
                >
                    {({ getFieldValue }) => (
                        <Form.Item name="certificationPeriod" label="Срок действия сертификата (месяцев)" rules={[{ required:  getFieldValue('certification') }]}>
                            <Input />
                        </Form.Item>
                    )
                    }
                </Form.Item>
                 
            </Card>
            <Card title="3. Дополнительная информация" style={{borderRadius: 0}}>
                <Form.Item name="owner" label="Владелец">
                    <Input />
                </Form.Item>
                <Form.Item name="enrollmentPeriod" label="Окончание регистрации (дней)">
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
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    size="small"
                    items={['Kz', 'Ru', 'En'].map((_, i) => {
                        const id = String(i);
                        return {
                            label: _,
                            key: id,
                            disabled: i === 28,
                            children: renderTextArea(`Requirements${_}`),
                        };
                        })}
                />
                <Label>Методика оценки</Label>
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    size="small"
                    items={['Kz', 'Ru', 'En'].map((_, i) => {
                        const id = String(i);
                        return {
                            label: _,
                            key: id,
                            disabled: i === 28,
                            children: renderTextArea(`AssesmentCriteria${_}`),
                        };
                        })}
                />
            </Card>
            <Card style={{borderRadius: 0}}>
                <Space style={{width: '100%', justifyContent: 'right'}}>
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
}