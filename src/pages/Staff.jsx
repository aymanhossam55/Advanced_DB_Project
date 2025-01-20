import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Form, Input, Modal, message } from 'antd';
import './staff.css';

const Staff = () => {
    const [staff, setStaff] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [form] = Form.useForm(); // Get the form instance

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/staff');
            setStaff(response.data);
        } catch (error) {
            message.error('Failed to fetch staff');
        }
    };

    const handleAddEditStaff = async (values) => {
        try {
            if (editingStaff) {
                await axios.put(`http://localhost:5000/api/staff/${editingStaff.S_ID}`, values);
                message.success('Staff updated successfully');
            } else {
                await axios.post('http://localhost:5000/api/staff', values);
                message.success('Staff added successfully');
            }
            fetchStaff();
            setIsModalOpen(false);
            form.resetFields(); // Reset form fields after submitting
        } catch (error) {
            message.error('Failed to save staff');
        }
    };

    const handleDeleteStaff = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/staff/${id}`);
            message.success('Staff deleted successfully');
            fetchStaff();
        } catch (error) {
            message.error('Failed to delete staff');
        }
    };

    const handleEditStaff = (staffMember) => {
        setEditingStaff(staffMember);
        setIsModalOpen(true);
        form.setFieldsValue(staffMember); // Set form values for editing
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'S_Fname',
            key: 'S_Fname',
        },
        {
            title: 'Last Name',
            dataIndex: 'S_Lname',
            key: 'S_Lname',
        },
        {
            title: 'Phone Number',
            dataIndex: 'S_phoneN',
            key: 'S_phoneN',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'B_date',
            key: 'B_date',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button onClick={() => handleEditStaff(record)}>Edit</Button>
                    <Button danger onClick={() => handleDeleteStaff(record.S_ID)} style={{ marginLeft: 8 }}>Delete</Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <div className="staff-header">
                <h2>Staff</h2>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>Add Staff</Button>
            </div>
            <Table dataSource={staff} columns={columns} rowKey="S_ID" />

            <Modal
                title={editingStaff ? 'Edit Staff' : 'Add Staff'}
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()} // Now calls form.submit() correctly
            >
                <Form
                    form={form} // Attach the form instance
                    initialValues={editingStaff || { S_Fname: '', S_Lname: '', S_phoneN: '', B_date: '' }}
                    onFinish={handleAddEditStaff}
                >
                    <Form.Item label="First Name" name="S_Fname" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Last Name" name="S_Lname" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="S_phoneN" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Date of Birth" name="B_date" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Staff;
