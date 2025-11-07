import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { useFinisherHeader } from '../hooks/useFinisherHeader';
import { AppHeader, HeaderActionLink } from '../components/AppHeader';
import {
  Container,
  FormWrapper,
  Form,
  Title,
  Input,
  Button,
  ErrorMessage,
  LinkText,
  LinkContainer,
} from '../styles/AuthStyles';

export function Login() {
  useFinisherHeader();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login({ email, password });
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard');
    } catch (err: any) {
      setError(
        err.response?.data?.error || 'Erro ao fazer login. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="finisher-header">
      <AppHeader rightSlot={<HeaderActionLink to="/register">Criar conta</HeaderActionLink>} />
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <Title>Bem-vindo de volta!</Title>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>

          <LinkContainer>
            <LinkText>
              Não tem uma conta? <Link to="/register">Cadastre-se</Link>
            </LinkText>
          </LinkContainer>
        </Form>
      </FormWrapper>
    </Container>
  );
}

