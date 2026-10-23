import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';

const STORAGE_KEY = '@expenses';

export function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense,
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      return [...action.payload];
    default:
      return state;
  }
}

const ExpensesContext = createContext(null);

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canPersist, setCanPersist] = useState(false);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const storedExpenses = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedExpenses !== null) {
          const parsedExpenses = JSON.parse(storedExpenses);
          if (!Array.isArray(parsedExpenses)) {
            throw new Error('Os dados salvos de despesas não são uma lista.');
          }
          dispatch({ type: 'SET', payload: parsedExpenses });
        }
        setCanPersist(true);
      } catch (error) {
        console.error('Não foi possível carregar as despesas salvas.', error);
      } finally {
        setIsLoaded(true);
      }
    }

    loadExpenses();
  }, []);

  useEffect(() => {
    if (!isLoaded || !canPersist) {
      return;
    }

    async function saveExpenses() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.error('Não foi possível salvar as despesas.', error);
      }
    }

    saveExpenses();
  }, [expenses, isLoaded, canPersist]);

  function addExpense(expense) {
    dispatch({ type: 'ADD', payload: expense });
  }

  function updateExpense(expense) {
    dispatch({ type: 'UPDATE', payload: expense });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  const value = {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    isLoaded,
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (context === null) {
    throw new Error('useExpenses deve ser usado dentro de ExpensesContextProvider.');
  }
  return context;
}
