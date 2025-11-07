import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 120px 20px 60px;
`;

export const FormWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Form = styled.form`
  background: rgba(255, 255, 255, 0.18);
  padding: 50px 40px;
  border-radius: 26px;
  box-shadow: 0 30px 80px rgba(41, 0, 71, 0.35);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;

  @media (max-width: 480px) {
    padding: 40px 30px;
  }
`;

export const Title = styled.h1`
  color: #ffffff;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  margin-bottom: 18px;
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.85);
  color: #2f146d;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25);

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px rgba(149, 62, 255, 0.65);
    background: rgba(255, 255, 255, 0.92);
  }

  &::placeholder {
    color: rgba(47, 20, 109, 0.55);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #ff7ae8 0%, #7c3aed 50%, #5a30f0 100%);
  color: white;
  border: none;
  border-radius: 18px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 12px;
  box-shadow: 0 15px 35px rgba(92, 51, 255, 0.35);

  &:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 20px 45px rgba(92, 51, 255, 0.5);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const ErrorMessage = styled.div`
  background: rgba(255, 82, 82, 0.18);
  color: #ffe0e0;
  padding: 14px 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  font-size: 0.95rem;
  border: 1px solid rgba(255, 82, 82, 0.45);
`;

export const LinkContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

export const LinkText = styled.p`
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;

  a {
    color: #ffe26f;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      color: #ffeaa5;
      text-decoration: underline;
    }
  }
`;

