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

export function Register() {
  useFinisherHeader();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.register({ name, email, password });
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard');
    } catch (err: any) {
      setError(
        err.response?.data?.error || 'Erro ao criar conta. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="finisher-header">
      <AppHeader rightSlot={<HeaderActionLink to="/login">Entrar</HeaderActionLink>} />
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <Title>Crie sua conta</Title>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Input
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Senha (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Criando conta...' : 'Cadastrar'}
          </Button>

          <LinkContainer>
            <LinkText>
              Já tem uma conta? <Link to="/login">Faça login</Link>
            </LinkText>
          </LinkContainer>
        </Form>
      </FormWrapper>
    </Container>
  );
}

