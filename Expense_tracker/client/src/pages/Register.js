import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/layout/Spinner';

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandeler = async (values) => {
    try {
      setLoading(true);
      await axios.post('/users/register', values);
      message.success("Registration successful");
      setLoading(false);
      navigate('/login');
    } catch (error) {
      message.error("Registration failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      {loading && <Spinner />}
      <div className="card p-4 shadow w-100" style={{ maxWidth: '450px' }}>
        <h2 className="text-center mb-4">Register</h2>
        <Form layout="vertical" onFinish={submitHandeler}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <Link to="/login">Already registered? Login</Link>
            <Button type="primary" htmlType="submit">Register</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
