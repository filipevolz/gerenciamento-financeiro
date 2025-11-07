import { Moon, Sun } from 'lucide-react';
import styled from 'styled-components';
import { useThemeMode } from '../context/ThemeContext';

const ToggleButton = styled.button`
  pointer-events: all;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  padding: 10px 18px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.textPrimary};
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.01em;
  cursor: pointer;
  box-shadow: 0 12px 35px ${({ theme }) => theme.shadow};
  transition: transform 0.2s ease, box-shadow 0.3s ease, background 0.3s ease;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 40px ${({ theme }) => theme.shadow};
  }
`;

const Label = styled.span`
  text-transform: capitalize;
`;

export function ThemeToggle() {
  const { themeMode, toggleTheme } = useThemeMode();

  return (
    <ToggleButton type="button" onClick={toggleTheme} aria-label="Alternar tema">
      {themeMode === 'light' ? <Moon /> : <Sun />}
      <Label>{themeMode === 'light' ? 'Escuro' : 'Claro'}</Label>
    </ToggleButton>
  );
}
