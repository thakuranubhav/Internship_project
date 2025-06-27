import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/layout/Spinner';

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandeler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/users/login', values);
      message.success("Login successful");
      setLoading(false);
      localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }));
      navigate('/');
    } catch (error) {
      message.error("Login failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
    setEmail('');
    setPassword('');
  }, [navigate]);

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      {loading && <Spinner />}
      <div className="card p-4 shadow w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <Form layout="vertical" onFinish={submitHandeler}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <Link to="/register">New user? Register</Link>
            <Button type="primary" htmlType="submit">Login</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
