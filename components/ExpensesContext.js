import { createContext, useContext, useState } from 'react';

const ExpensesContext = createContext(null);

export function formatLocalDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function daysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return formatLocalDate(date);
}

const initialExpenses = [
  { id: '1', title: 'Almoço no campus', category: 'Alimentação', amount: 28.5, date: daysAgo(0) },
  { id: '2', title: 'Passagem de ônibus', category: 'Transporte', amount: 5.6, date: daysAgo(1) },
  { id: '3', title: 'Apostila de cálculo', category: 'Materiais', amount: 42.9, date: daysAgo(2) },
  { id: '4', title: 'Café entre aulas', category: 'Alimentação', amount: 12, date: daysAgo(3) },
  { id: '5', title: 'Impressão de trabalho', category: 'Estudos', amount: 8.5, date: daysAgo(5) },
  { id: '6', title: 'Recarga do passe estudantil', category: 'Transporte', amount: 45, date: daysAgo(7) },
  { id: '7', title: 'Mensalidade da faculdade', category: 'Mensalidade', amount: 520, date: daysAgo(6) },
];

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState(initialExpenses);
  const monthlyBudget = 1200;

  function addExpense(expense) {
    setExpenses((currentExpenses) => [
      { ...expense, id: Date.now().toString() },
      ...currentExpenses,
    ]);
  }

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, monthlyBudget }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de ExpensesProvider.');
  }
  return context;
}
