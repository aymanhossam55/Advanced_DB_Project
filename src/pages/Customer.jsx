import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import axios from 'axios';
import './customer.css';

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [form] = Form.useForm();

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/customers');
            console.log(response.data); // Log the response data
            if (response.status === 200 && Array.isArray(response.data)) {
                setCustomers(response.data);
            } else {
                setCustomers([]);
            }
        } catch (error) {
            message.error('Failed to fetch customers');
        } finally {
            setLoading(false);
        }
    };
    

    

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleAdd = () => {
        setEditingCustomer(null);
        setIsModalOpen(true);
        form.resetFields();
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setIsModalOpen(true);
        form.setFieldsValue(customer);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/customers/${id}`);
            message.success('Customer deleted successfully');
            fetchCustomers();
        } catch (error) {
            message.error('Failed to delete customer');
        }
    };

const handleSubmit = async () => {
    try {
        const values = await form.validateFields();
        if (editingCustomer) {
            await axios.put(`http://localhost:5000/api/customers/${editingCustomer.C_ID}`, values);
            message.success('Customer updated successfully');
        } else {
            const response = await axios.post('http://localhost:5000/api/customers', values);
            console.log(response); // Log the response from the backend
            message.success('Customer added successfully');
        }
        fetchCustomers();
        setIsModalOpen(false);
    } catch (error) {
        console.error('Error:', error.response); // Log the full error response for debugging
        message.error(error.response?.data?.message || 'Failed to save customer');
    }
};


    const columns = [
        {
            title: 'First Name',
            dataIndex: 'f_name',
            key: 'f_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'l_name',
            key: 'l_name',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className="actions">
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this customer?"
                        onConfirm={() => handleDelete(record.C_ID)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div className="customer-container">
            <div className="customer-header">
                <h2>Customers</h2>
                <Button type="primary" onClick={handleAdd} style={{margin:"16px 0"}}>
                    Add Customer
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={customers}
                rowKey="C_ID"
                loading={loading}
                pagination={{ pageSize: 4 }}
            />
            <Modal
                title={editingCustomer ? 'Edit Customer' : 'Add Customer'}
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
                okText="Save"
                cancelText="Cancel"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="f_name"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter the first name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="l_name"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please enter the last name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone_number"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Please enter the phone number' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[{ required: true, message: 'Please enter the address' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Customer;
