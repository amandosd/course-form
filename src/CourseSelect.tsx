import React, { useEffect, useState } from 'react';

import { Select, Table, Modal } from 'antd';

import type { ColumnsType } from 'antd/es/table';



interface FormValues {
    nameKz: string;
    nameRu: string;
    nameEn: string;
    code: string;
    trainingProviderId: number;
    sectionId: number;
    deliveryTypeId: number;
    category?: string;
    deliveryLanguages: string[];
    prerequisites?: number[] | [];
    timeH: string;
    timeM: string;
    aimKz: string;
    aimRu: string;
    aimEn: string;
    targetAuditoryKz: string;
    targetAuditoryRu: string;
    targetAuditoryEn: string;
    descriptionKZ: string;
    descriptionRU: string;
    descriptionEN: string;
    structureKz?: string | undefined;
    structureRu?: string | undefined;
    structureEn?: string | undefined;
    certification: boolean;
    expirationPeriod?: string | undefined;
    owner?: string | undefined;
    enrollmentPeriod?: string | undefined; 
    studentsMin?: string | undefined; 
    studentsMax?: string | undefined;
    requirementsKz?: string | undefined;
    requirementsRu?: string | undefined;
    requirementsEn?: string | undefined;
    assesmentCriteriaKZ?: string | undefined;
    assesmentCriteriaRU?: string | undefined;
    assesmentCriteriaEN?: string | undefined;
}

const onSubmit = () => {
    
}

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }
  
const columns: ColumnsType<DataType> = [
{
    title: 'Name',
    dataIndex: 'name',
},
{
    title: 'Age',
    dataIndex: 'age',
},
{
    title: 'Address',
    dataIndex: 'address',
},
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

export const CourseSelect = ({initialValue}: {initialValue: number[]}) => {
    const [selectedList, setSelectedlist] = useState<{label: string, value: React.Key}[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(initialValue);
    const [modal, setModal] = useState(false);
    
    const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedlist(() => selectedRows.map((item: DataType) => ({label: item.name, value: item.key})));
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleDropdownVisibleChange = (open: boolean) => {
        setModal(open)
    }

    // useEffect(() => {
    //     const initialSelected: any = initialValue.map((selected: number) => {
    //         return data.find((item: DataType) => item.key === selected)
    //     })

    //     setSelectedlist(() => initialSelected.map((item: DataType) => ({label: item.name, value: item.key})))
    // }, [initialValue])
    
    return (
        <>
             <Modal
                title="Vertically centered modal dialog"
                centered
                open={modal}
                onOk={() => setModal(false)}
                onCancel={() => setModal(false)}
            >
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </Modal>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                open={false}
                value={selectedList}
                onDropdownVisibleChange={(open: boolean) => handleDropdownVisibleChange(open)}
            />
        </>
        
    )
}