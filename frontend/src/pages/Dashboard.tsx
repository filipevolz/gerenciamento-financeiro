import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Trash2 } from 'lucide-react';
import { format as formatDate } from 'date-fns';
import { AppHeader, HeaderActionButton } from '../components/AppHeader';
import { ThemeToggle } from '../components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { CategoryCombobox } from '@/components/CategoryCombobox';

const INCOME_STORAGE_KEY = 'gf:incomes';
const EXPENSE_STORAGE_KEY = 'gf:expenses';
const INCOME_CATEGORY_STORAGE_KEY = 'gf:income-categories';
const EXPENSE_CATEGORY_STORAGE_KEY = 'gf:expense-categories';

const defaultIncomeCategories = [
  'Salário',
  'Freelance',
  'Comissão',
  'Investimentos',
  'Bônus',
  'Aluguel',
  'Outros'
];

const defaultExpenseCategories = [
  'Alimentação',
  'Moradia',
  'Transporte',
  'Educação',
  'Saúde',
  'Lazer',
  'Contas',
  'Investimentos',
  'Outros'
];

type FinanceEntry = {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
};

type FinanceFormState = {
  amount: string;
  category: string;
  description: string;
  date: string;
};

const today = () => new Date().toISOString().slice(0, 10);

const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const formatDisplayDate = (value: string) => {
  if (!value) return '-';
  const date = new Date(value + 'T00:00:00');
  if (Number.isNaN(date.getTime())) {
    return '-';
  }
  return date.toLocaleDateString('pt-BR');
};

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const loadArray = (key: string, fallback: string[]): string[] => {
  if (typeof window === 'undefined') return fallback;

  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) return fallback;
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      const merged = new Set<string>([...fallback]);
      parsed.forEach((item) => {
        if (typeof item === 'string' && item.trim()) {
          merged.add(item.trim());
        }
      });
      return Array.from(merged);
    }
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
  }

  return fallback;
};

const loadEntries = (key: string): FinanceEntry[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => ({
          id: typeof item.id === 'string' ? item.id : generateId(),
          amount: Number(item.amount) || 0,
          category: typeof item.category === 'string' ? item.category : 'Outros',
          description: typeof item.description === 'string' ? item.description : '',
          date: typeof item.date === 'string' ? item.date : today(),
        }))
        .filter((item) => item.amount > 0);
    }
  } catch (error) {
    console.error('Erro ao carregar lançamentos:', error);
  }

  return [];
};

const HeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 140px 24px 96px;
  background: ${({ theme }) => theme.background};
  transition: background 0.3s ease;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const CardBase = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 26px;
  padding: 28px;
  box-shadow: 0 28px 70px ${({ theme }) => theme.shadow};
  backdrop-filter: blur(18px);
  color: ${({ theme }) => theme.textPrimary};
  transition: background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
`;

const SummaryCard = styled(CardBase)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SummaryLabel = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const SummaryValue = styled.span<{ variant: 'income' | 'expense' | 'balance' }>`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  ${({ variant, theme }) =>
    variant === 'income'
      ? css`
          color: ${theme.positive};
        `
      : variant === 'expense'
      ? css`
          color: ${theme.negative};
        `
      : css`
          color: ${theme.textPrimary};
        `}
`;

const SummaryDescription = styled.span`
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.95rem;
`;

const FormsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
`;

const FormCard = styled(CardBase)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

const SectionSubtitle = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.95rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InlineInputs = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
`;

const FormError = styled.span`
  display: inline-block;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(220, 38, 38, 0.18);
  border: 1px solid rgba(220, 38, 38, 0.32);
  color: #fee2e2;
  font-size: 0.9rem;
`;

const ListsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 24px;
`;

const ListCard = styled(CardBase)`
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-height: 420px;
`;

const ListHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ListTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
`;

const ListSubtitle = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
`;

const EntryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.border};
    border-radius: 999px;
  }
`;

const EntryRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(140px, 160px) auto;
  gap: 18px;
  align-items: center;
  padding: 16px 18px;
  border-radius: 18px;
  background: ${({ theme }) => theme.surfaceSolid};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 16px 36px ${({ theme }) => theme.shadow};
`;

const EntryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const EntryCategory = styled.span`
  font-weight: 600;
  font-size: 1rem;
`;

const EntryNote = styled.span`
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.9rem;
`;

const EntryMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
`;

const EntryDate = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.85rem;
`;

const EntryAmount = styled.span<{ variant: 'income' | 'expense' }>`
  font-size: 1.05rem;
  font-weight: 700;
  ${({ variant, theme }) =>
    variant === 'income'
      ? css`
          color: ${theme.positive};
        `
      : css`
          color: ${theme.negative};
        `}
`;

const DeleteButton = styled.button`
  border: none;
  background: ${({ theme }) => theme.translucent};
  border-radius: 14px;
  padding: 10px;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 84, 84, 0.15);
    color: ${({ theme }) => theme.negative};
    transform: translateY(-2px);
  }
`;

const EmptyState = styled.div`
  padding: 30px;
  border-radius: 18px;
  border: 1px dashed ${({ theme }) => theme.border};
  text-align: center;
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.95rem;
`;

export function Dashboard() {
  const navigate = useNavigate();
  const userStr = typeof window !== 'undefined' ? window.localStorage.getItem('user') : null;
  const user = userStr ? JSON.parse(userStr) : null;

  const [incomeCategories, setIncomeCategories] = useState<string[]>(() =>
    loadArray(INCOME_CATEGORY_STORAGE_KEY, defaultIncomeCategories)
  );
  const [expenseCategories, setExpenseCategories] = useState<string[]>(() =>
    loadArray(EXPENSE_CATEGORY_STORAGE_KEY, defaultExpenseCategories)
  );
  const [incomes, setIncomes] = useState<FinanceEntry[]>(() => loadEntries(INCOME_STORAGE_KEY));
  const [expenses, setExpenses] = useState<FinanceEntry[]>(() => loadEntries(EXPENSE_STORAGE_KEY));

  const [incomeForm, setIncomeForm] = useState<FinanceFormState>({
    amount: '',
    category: '',
    description: '',
    date: today(),
  });

  const [expenseForm, setExpenseForm] = useState<FinanceFormState>({
    amount: '',
    category: '',
    description: '',
    date: today(),
  });

  const [incomeError, setIncomeError] = useState('');
  const [expenseError, setExpenseError] = useState('');

  useEffect(() => {
    setIncomeForm((prev) => ({
      ...prev,
      category: prev.category || incomeCategories[0] || '',
    }));
  }, [incomeCategories]);

  useEffect(() => {
    setExpenseForm((prev) => ({
      ...prev,
      category: prev.category || expenseCategories[0] || '',
    }));
  }, [expenseCategories]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(INCOME_CATEGORY_STORAGE_KEY, JSON.stringify(incomeCategories));
  }, [incomeCategories]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(EXPENSE_CATEGORY_STORAGE_KEY, JSON.stringify(expenseCategories));
  }, [expenseCategories]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(INCOME_STORAGE_KEY, JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(EXPENSE_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const totalIncome = useMemo(
    () => incomes.reduce((acc, item) => acc + item.amount, 0),
    [incomes]
  );
  const totalExpenses = useMemo(
    () => expenses.reduce((acc, item) => acc + item.amount, 0),
    [expenses]
  );
  const balance = totalIncome - totalExpenses;

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    navigate('/login');
  };

  const handleIncomeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIncomeError('');

    if (!incomeForm.category) {
      setIncomeError('Selecione ou crie uma categoria.');
      return;
    }

    const amount = Number(String(incomeForm.amount).replace(',', '.'));

    if (!amount || amount <= 0) {
      setIncomeError('Informe um valor maior que zero.');
      return;
    }

    const entry: FinanceEntry = {
      id: generateId(),
      amount,
      category: incomeForm.category,
      description: incomeForm.description.trim(),
      date: incomeForm.date || today(),
    };

    setIncomes((prev) => [entry, ...prev]);
    setIncomeForm({
      amount: '',
      category: incomeForm.category,
      description: '',
      date: today(),
    });
  };

  const handleExpenseSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setExpenseError('');

    if (!expenseForm.category) {
      setExpenseError('Selecione ou crie uma categoria.');
      return;
    }

    const amount = Number(String(expenseForm.amount).replace(',', '.'));

    if (!amount || amount <= 0) {
      setExpenseError('Informe um valor maior que zero.');
      return;
    }

    const entry: FinanceEntry = {
      id: generateId(),
      amount,
      category: expenseForm.category,
      description: expenseForm.description.trim(),
      date: expenseForm.date || today(),
    };

    setExpenses((prev) => [entry, ...prev]);
    setExpenseForm({
      amount: '',
      category: expenseForm.category,
      description: '',
      date: today(),
    });
  };

  const removeIncome = (id: string) => {
    setIncomes((prev) => prev.filter((item) => item.id !== id));
  };

  const removeExpense = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const incomeDateValue = incomeForm.date ? new Date(`${incomeForm.date}T00:00:00`) : undefined;
  const expenseDateValue = expenseForm.date ? new Date(`${expenseForm.date}T00:00:00`) : undefined;

  const handleIncomeCategorySelect = (category: string) => {
    setIncomeForm((prev) => ({ ...prev, category }));
  };

  const handleExpenseCategorySelect = (category: string) => {
    setExpenseForm((prev) => ({ ...prev, category }));
  };

  const handleIncomeCategoryCreate = (category: string) => {
    setIncomeCategories((prev) => (prev.includes(category) ? prev : [...prev, category]));
    setIncomeForm((prev) => ({ ...prev, category }));
  };

  const handleExpenseCategoryCreate = (category: string) => {
    setExpenseCategories((prev) => (prev.includes(category) ? prev : [...prev, category]));
    setExpenseForm((prev) => ({ ...prev, category }));
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Container>
      <AppHeader
        rightSlot={
          <HeaderActions>
            <ThemeToggle />
            <HeaderActionButton type="button" onClick={handleLogout}>
              Sair
            </HeaderActionButton>
          </HeaderActions>
        }
      />

      <Content>
        <SummaryGrid>
          <SummaryCard>
            <SummaryLabel>Entradas</SummaryLabel>
            <SummaryValue variant="income">{formatCurrency(totalIncome)}</SummaryValue>
            <SummaryDescription>
              {incomes.length > 0
                ? `${incomes.length} lançamento${incomes.length > 1 ? 's' : ''}`
                : 'Nenhum lançamento ainda'}
            </SummaryDescription>
          </SummaryCard>

          <SummaryCard>
            <SummaryLabel>Saídas</SummaryLabel>
            <SummaryValue variant="expense">{formatCurrency(totalExpenses)}</SummaryValue>
            <SummaryDescription>
              {expenses.length > 0
                ? `${expenses.length} lançamento${expenses.length > 1 ? 's' : ''}`
                : 'Nenhum lançamento ainda'}
            </SummaryDescription>
          </SummaryCard>

          <SummaryCard>
            <SummaryLabel>Saldo atual</SummaryLabel>
            <SummaryValue variant="balance">{formatCurrency(balance)}</SummaryValue>
            <SummaryDescription>
              {balance >= 0 ? 'Você está no azul 🎉' : 'Atenção! Você está no vermelho'}
            </SummaryDescription>
          </SummaryCard>
        </SummaryGrid>

        <FormsGrid>
          <FormCard>
            <SectionTitle>Registrar ganho</SectionTitle>
            <SectionSubtitle>Salário, freelas, bônus, investimentos e outros ganhos.</SectionSubtitle>

            {incomeError && <FormError>{incomeError}</FormError>}

            <StyledForm onSubmit={handleIncomeSubmit}>
              <FieldGroup>
                <Label htmlFor="income-amount" className="text-sm font-semibold text-foreground/80">
                  Valor recebido
                </Label>
                <Input
                  id="income-amount"
                  type="number"
                  min={0}
                  step="0.01"
                  inputMode="decimal"
                  placeholder="Ex: 3500.00"
                  value={incomeForm.amount}
                  onChange={(event) =>
                    setIncomeForm((prev) => ({ ...prev, amount: event.target.value }))
                  }
                  required
                  className="h-12 rounded-2xl border-border/60 bg-background/70 text-base text-foreground shadow-sm focus-visible:ring-primary/40"
                />
              </FieldGroup>

              <InlineInputs>
                <FieldGroup>
                  <Label className="text-sm font-semibold text-foreground/80">Categoria</Label>
                  <CategoryCombobox
                    categories={incomeCategories}
                    value={incomeForm.category}
                    onSelect={handleIncomeCategorySelect}
                    onCreateCategory={handleIncomeCategoryCreate}
                  />
                </FieldGroup>

                <FieldGroup>
                  <Label htmlFor="income-date" className="text-sm font-semibold text-foreground/80">
                    Data
                  </Label>
                  <DatePicker
                    id="income-date"
                    value={incomeDateValue}
                    onChange={(date) =>
                      setIncomeForm((prev) => ({
                        ...prev,
                        date: date ? formatDate(date, 'yyyy-MM-dd') : '',
                      }))
                    }
                    placeholder="Escolha a data"
                    className="h-12"
                  />
                </FieldGroup>
              </InlineInputs>

              <FieldGroup>
                <Label htmlFor="income-description" className="text-sm font-semibold text-foreground/80">
                  Anotação
                </Label>
                <Textarea
                  id="income-description"
                  placeholder="Ex: salário de março, freela design, dividendos etc."
                  value={incomeForm.description}
                  onChange={(event) =>
                    setIncomeForm((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }))
                  }
                  className="min-h-[110px] rounded-2xl border-border/60 bg-background/70 text-base text-foreground shadow-sm focus-visible:ring-primary/40"
                />
              </FieldGroup>

              <Button
                type="submit"
                size="lg"
                className="mt-2 h-12 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg transition hover:opacity-90"
              >
                Adicionar ganho
              </Button>
            </StyledForm>
          </FormCard>

          <FormCard>
            <SectionTitle>Registrar gasto</SectionTitle>
            <SectionSubtitle>Alimentação, moradia, transporte, lazer, saúde e outros gastos.</SectionSubtitle>

            {expenseError && <FormError>{expenseError}</FormError>}

            <StyledForm onSubmit={handleExpenseSubmit}>
              <FieldGroup>
                <Label htmlFor="expense-amount" className="text-sm font-semibold text-foreground/80">
                  Valor gasto
                </Label>
                <Input
                  id="expense-amount"
                  type="number"
                  min={0}
                  step="0.01"
                  inputMode="decimal"
                  placeholder="Ex: 120.50"
                  value={expenseForm.amount}
                  onChange={(event) =>
                    setExpenseForm((prev) => ({ ...prev, amount: event.target.value }))
                  }
                  required
                  className="h-12 rounded-2xl border-border/60 bg-background/70 text-base text-foreground shadow-sm focus-visible:ring-primary/40"
                />
              </FieldGroup>

              <InlineInputs>
                <FieldGroup>
                  <Label className="text-sm font-semibold text-foreground/80">Categoria</Label>
                  <CategoryCombobox
                    categories={expenseCategories}
                    value={expenseForm.category}
                    onSelect={handleExpenseCategorySelect}
                    onCreateCategory={handleExpenseCategoryCreate}
                  />
                </FieldGroup>

                <FieldGroup>
                  <Label htmlFor="expense-date" className="text-sm font-semibold text-foreground/80">
                    Data
                  </Label>
                  <DatePicker
                    id="expense-date"
                    value={expenseDateValue}
                    onChange={(date) =>
                      setExpenseForm((prev) => ({
                        ...prev,
                        date: date ? formatDate(date, 'yyyy-MM-dd') : '',
                      }))
                    }
                    placeholder="Escolha a data"
                    className="h-12"
                  />
                </FieldGroup>
              </InlineInputs>

              <FieldGroup>
                <Label htmlFor="expense-description" className="text-sm font-semibold text-foreground/80">
                  Anotação
                </Label>
                <Textarea
                  id="expense-description"
                  placeholder="Descreva o gasto para acompanhar depois"
                  value={expenseForm.description}
                  onChange={(event) =>
                    setExpenseForm((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }))
                  }
                  className="min-h-[110px] rounded-2xl border-border/60 bg-background/70 text-base text-foreground shadow-sm focus-visible:ring-primary/40"
                />
              </FieldGroup>

              <Button
                type="submit"
                size="lg"
                className="mt-2 h-12 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg transition hover:opacity-90"
              >
                Adicionar gasto
              </Button>
            </StyledForm>
          </FormCard>
        </FormsGrid>

        <ListsGrid>
          <ListCard>
            <ListHeader>
              <ListTitle>Ganhos recentes</ListTitle>
              <ListSubtitle>Controle o que entrou no seu caixa.</ListSubtitle>
            </ListHeader>

            {incomes.length === 0 ? (
              <EmptyState>Nenhum ganho registrado por enquanto.</EmptyState>
            ) : (
              <EntryList>
                {incomes.map((entry) => (
                  <EntryRow key={entry.id}>
                    <EntryInfo>
                      <EntryCategory>{entry.category}</EntryCategory>
                      {entry.description && <EntryNote>{entry.description}</EntryNote>}
                    </EntryInfo>

                    <EntryMeta>
                      <EntryDate>{formatDisplayDate(entry.date)}</EntryDate>
                      <EntryAmount variant="income">{formatCurrency(entry.amount)}</EntryAmount>
                    </EntryMeta>

                    <DeleteButton type="button" onClick={() => removeIncome(entry.id)} aria-label="Remover ganho">
                      <Trash2 size={18} />
                    </DeleteButton>
                  </EntryRow>
                ))}
              </EntryList>
            )}
          </ListCard>

          <ListCard>
            <ListHeader>
              <ListTitle>Gastos recentes</ListTitle>
              <ListSubtitle>Mantenha o controle do que saiu.</ListSubtitle>
            </ListHeader>

            {expenses.length === 0 ? (
              <EmptyState>Nenhum gasto registrado por enquanto.</EmptyState>
            ) : (
              <EntryList>
                {expenses.map((entry) => (
                  <EntryRow key={entry.id}>
                    <EntryInfo>
                      <EntryCategory>{entry.category}</EntryCategory>
                      {entry.description && <EntryNote>{entry.description}</EntryNote>}
                    </EntryInfo>

                    <EntryMeta>
                      <EntryDate>{formatDisplayDate(entry.date)}</EntryDate>
                      <EntryAmount variant="expense">{formatCurrency(entry.amount)}</EntryAmount>
                    </EntryMeta>

                    <DeleteButton type="button" onClick={() => removeExpense(entry.id)} aria-label="Remover gasto">
                      <Trash2 size={18} />
                    </DeleteButton>
                  </EntryRow>
                ))}
              </EntryList>
            )}
          </ListCard>
        </ListsGrid>
      </Content>
    </Container>
  );
}

