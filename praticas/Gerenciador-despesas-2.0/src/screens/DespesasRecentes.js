import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';
import { useTheme } from '../store/theme-context';

export default function DespesasRecentes({ navigation }) {
  const { expenses } = useExpenses();
  const { themeColors } = useTheme();

  const recentExpenses = useMemo(() => {
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    return expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date).getTime();
        return expenseDate >= sevenDaysAgo && expenseDate <= now;
      })
      .sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());
  }, [expenses]);

  const total = useMemo(
    () => recentExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0),
    [recentExpenses],
  );

  return (
    <View style={[styles.screen, { backgroundColor: themeColors.background }]}>
      <DespesaSaida
        expenses={recentExpenses}
        navigation={navigation}
        themeColors={themeColors}
        count={recentExpenses.length}
        total={total}
        emptyTitle="Nenhuma despesa recente"
        emptyMessage="As despesas dos últimos 7 dias aparecerão aqui."
        emptyIcon="🗓️"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
