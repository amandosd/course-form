import React, { useState, useRef } from 'react'

import { Table, Button, Modal, Form, Input, DatePicker, TimePicker } from 'antd';
import type { Moment } from 'moment'
import type { ColumnsType } from 'antd/es/table';
import type { DatePickerProps, FormInstance } from 'antd';

import { IMeeting, IMeetingForm } from './meeting.types';

const format = 'HH:mm';
  
export const MeetingForm = ({dataSource, onAddMeeting, onDeleteMeeting}: IMeetingForm) => {
    const refSubmitButton = useRef<HTMLElement>(null);
    const refForm = useRef<FormInstance>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const columns: ColumnsType<IMeeting> = [
        {
          title: 'Begin date',
          dataIndex: 'BeginDate',
          key: 'BeginDate',
          render: (date: Date) => new Date(date).toLocaleDateString('en-GB')
        },
        {
            title: 'Time',
            dataIndex: 'Time',
            key: 'Time',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => <div onClick={() => onDeleteMeeting(record.key)}>Delete</div>,
        },
      ];

    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleOk = () => {
        if (refSubmitButton.current) {
            refSubmitButton.current.click();
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    const handleCancel = () => {
        onReset();
        setIsModalOpen(false);
    };

    const onFinish = (values: IMeeting) => {
        values.key = dataSource.length + 1;
        handleCombinedValue(refForm?.current?.getFieldValue('Time'), refForm?.current?.getFieldValue('BeginDate'))
        onAddMeeting(values)
        onReset();
        setIsModalOpen(false);
    };

    const onChangeDatePicker: DatePickerProps['onChange'] = (date, dateString) => {
        refForm?.current?.setFieldsValue({ BeginDate: date })
    };

    const onChangeTimePicker = (time: Moment, timeString: string) => {
        refForm?.current?.setFieldsValue({ Time: time })
    };

    const handleCombinedValue = (time: Moment, date: Moment) => {
        if (time && date) {
          const combinedDate = date.clone();
          combinedDate.set({
            hour: time.hour(),
            minute: time.minute(),
            second: 0,
            millisecond: 0,
          });
          console.log(combinedDate.toDate());
        }
      };
    

   return (
    <>
        <Button onClick={showModal}>Add Meeting</Button>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                ref={refForm}
                labelCol={{ span: 8} }
                wrapperCol={{ span: 14 } }
                layout='vertical'
                form={form}
                onFinish={onFinish}
            >
                <Form.Item name="BeginDate" label="Begin Date" rules={[{ required: true, message: 'Please input BeginDate' }]}>
                    <DatePicker onChange={onChangeDatePicker} />
                </Form.Item>
                <Form.Item name="Time" label="Time (HH:mm)">
                    <TimePicker format={format} onChange={onChangeTimePicker} />
                </Form.Item>
                <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input type='number'  />
                </Form.Item>
                <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item>
                <Button ref={refSubmitButton} htmlType="submit" style={{ display: 'none'}} />
            </Form>
        </Modal>
        
        <Table dataSource={dataSource} columns={columns} />
    </>
   )
}