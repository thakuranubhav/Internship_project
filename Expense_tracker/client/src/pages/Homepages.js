import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, message, Table, DatePicker } from 'antd';
import Layout from '../components/layout/Layout';
import {
  AreaChartOutlined,
  UnorderedListOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import Spinner from '../components/layout/Spinner';
import moment from 'moment';
import Analytics from '../components/Analytics';

const { RangePicker } = DatePicker;

const Homepages = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransections, setAllTrnasections] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectDate, setSelectDate] = useState([]);
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState('table');
  const [editable, setEditable] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined className="mx-2" onClick={() => handleDelete(record)} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getAllTransections = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        const res = await axios.post('/transections/getall-transection', {
          userid: user._id,
          frequency,
          selectDate,
          type,
        });
        setAllTrnasections(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        message.error('Error while getting transactions');
      }
    };
    getAllTransections();
  }, [frequency, selectDate, type, refreshFlag]);

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post('/transections/delete-transection', {
        transactionId: record._id,
      });
      setLoading(false);
      setRefreshFlag((prev) => !prev);
      message.success('Transaction deleted');
    } catch (error) {
      console.log(error);
      message.error('Unable to delete transaction');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      if (editable) {
        await axios.post('/transections/edit-transection', {
          transactionId: editable._id,
          payload: {
            ...values,
            userId: user._id,
          },
        });
        message.success('Transaction updated successfully');
      } else {
        await axios.post('/transections/add-transection', {
          ...values,
          userid: user._id,
        });
        message.success('Transaction added successfully');
      }
      setShowModal(false);
      setEditable(null);
      setRefreshFlag((prev) => !prev);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Failed to add/edit transaction');
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="container my-4">
        <div className="row g-3 align-items-end">
          {/* Frequency Filter */}
          <div className="col-12 col-md-6 col-lg-3">
            <label>Select Frequency</label>
            <Select value={frequency} onChange={setFrequency} className="w-100">
              <Select.Option value="7">Last 1 week</Select.Option>
              <Select.Option value="30">Last 1 month</Select.Option>
              <Select.Option value="365">Last 1 year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === 'custom' && (
              <RangePicker value={selectDate} onChange={setSelectDate} className="w-100 mt-2" />
            )}
          </div>

         
          <div className="col-12 col-md-6 col-lg-3">
            <label>Select Type</label>
            <Select value={type} onChange={setType} className="w-100">
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>

        
          <div className="col-6 col-lg-3">
            <div className="switch-icon border rounded d-flex justify-content-around p-2">
              <UnorderedListOutlined
                className={`${viewData === 'table' ? 'active-icon' : 'inactive-icon'} fs-5`}
                onClick={() => setViewData('table')}
              />
              <AreaChartOutlined
                className={`${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'} fs-5`}
                onClick={() => setViewData('analytics')}
              />
            </div>
          </div>

        
          <div className="col-6 col-lg-3 text-end">
            <button className="btn btn-primary w-100 w-md-auto" onClick={() => setShowModal(true)}>
              Add New
            </button>
          </div>
        </div>
      </div>

      
      <div className="container-fluid px-2">
        {viewData === 'table' ? (
          <div className="table-responsive">
            <Table
              columns={columns}
              dataSource={allTransections}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
            />
          </div>
        ) : (
          <Analytics allTransections={allTransections} />
        )}
      </div>

  
      <Modal
        title={editable ? 'Edit Transaction' : 'Add Transaction'}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setEditable(null);
        }}
        footer={false}
        centered
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="emi">EMI</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Homepages;
