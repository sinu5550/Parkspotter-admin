import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ParticlesBg from 'particles-bg';

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
`;

const RememberMe = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
`;

const SignupLink = styled.div`
  margin-top: 20px;
  font-size: 14px;

  a {
    color: #3498db;
    text-decoration: none;
  }
`;

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoggedIn(true);
    navigate('/dashboard'); 
  };

  return (
    <LoginContainer>
      <ParticleWrapper>
        <ParticlesBg type="cobweb" bg={true} />
      </ParticleWrapper>
      <LoginForm>
        <Logo>ParkSpotter</Logo>
        <p>Admin</p>
        <form>
          <FormGroup>
            <Label>Username</Label>
            <Input type="text" placeholder="Enter username" />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter password" />
          </FormGroup>
          <RememberMe>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to={"#"}>Forgot password?</Link>
          </RememberMe>
          <Button type="button" onClick={handleLogin}>Sign In</Button>
        </form>
        <SignupLink>
          Don't have an account? <Link to={"#"}>Signup</Link>
        </SignupLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
