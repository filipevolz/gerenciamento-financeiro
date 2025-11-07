import { Link } from 'react-router-dom';
import styled from 'styled-components';
import type { ReactNode } from 'react';

const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 32px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 20;
  pointer-events: none;

  @media (max-width: 768px) {
    padding: 24px 28px;
  }
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  pointer-events: all;
`;

const LogoMark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, #ffe06b 0%, #ff7ae8 50%, #7c3aed 100%);
  box-shadow: 0 12px 35px rgba(94, 27, 255, 0.35);
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};
`;

const BrandText = styled.span`
  font-size: 1.45rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.textPrimary};
`;

const ActionsContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  pointer-events: all;
`;

export const HeaderActionLink = styled(Link)`
  pointer-events: all;
  padding: 12px 26px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.textPrimary};
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 10px 30px ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 38px ${({ theme }) => theme.shadow};
  }
`;

export const HeaderActionButton = styled.button`
  pointer-events: all;
  padding: 12px 26px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.textPrimary};
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 10px 30px ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 38px ${({ theme }) => theme.shadow};
  }
`;

type AppHeaderProps = {
  rightSlot?: ReactNode;
};

export function AppHeader({ rightSlot }: AppHeaderProps) {
  return (
    <HeaderContainer>
      <Brand to="/">
        <LogoMark>GF</LogoMark>
        <BrandText>Gerencie+</BrandText>
      </Brand>

      {rightSlot && <ActionsContainer>{rightSlot}</ActionsContainer>}
    </HeaderContainer>
  );
}
