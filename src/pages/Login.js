import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import ParticlesBg from 'particles-bg';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("/path_to_your_background_image.jpg") no-repeat center center fixed;
  background-size: cover;
  position: relative;
`;

const ParticleWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const LoginForm = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  text-align: center;
  z-index: 2;
  background-color: rgba(255,255,255,0.95);
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #405189;
  margin-bottom: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  animation: ${bounce} 1s infinite;

  &:hover {
    background-color: #218838;
  }
`;

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://parkspotter-backened.onrender.com/accounts/user_login/', {
        login: username,
        password: password,
      });

      const { token, user_id, role } = response.data;

      if (role === 'admin') {
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('role', role);
        setLoggedIn(true);
        toast.success('Login successful!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000); 
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Not an admin',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || 'Wrong username or password',
      });
    }
  };

  return (
    <LoginContainer>
      <Toaster />
      <ParticleWrapper>
        <ParticlesBg type="cobweb" bg={true} />
      </ParticleWrapper>
      <LoginForm>
        <Logo>ParkSpotter</Logo>
        <p>Admin</p>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <FormGroup>
            <Label>Username</Label>
            <Input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>
          <Button type="submit">Sign In</Button>
        </form>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
