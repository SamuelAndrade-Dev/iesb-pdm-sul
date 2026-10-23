import { useMemo, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import useDebounce from '../hooks/useDebounce';
import { useExpenses } from '../store/expenses-context';
import { useTheme } from '../store/theme-context';

export default function TodasDespesas({ navigation }) {
  const { expenses } = useExpenses();
  const { themeColors } = useTheme();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search.trim());

  const visibleExpenses = useMemo(() => {
    const normalizedSearch = debouncedSearch.toLocaleLowerCase('pt-BR');
    return expenses.filter((expense) =>
      expense.description.toLocaleLowerCase('pt-BR').includes(normalizedSearch),
    );
  }, [expenses, debouncedSearch]);

  const total = useMemo(
    () => visibleExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0),
    [visibleExpenses],
  );

  const listHeader = (
    <View>
      <TextInput
        accessibilityLabel="Buscar despesas por descrição"
        placeholder="Buscar por descrição"
        placeholderTextColor={themeColors.secondaryText}
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        returnKeyType="search"
        style={[
          styles.searchInput,
          {
            backgroundColor: themeColors.surface,
            borderColor: themeColors.border,
            color: themeColors.text,
          },
        ]}
      />
    </View>
  );

  return (
    <View style={[styles.screen, { backgroundColor: themeColors.background }]}>
      <DespesaSaida
        expenses={visibleExpenses}
        navigation={navigation}
        themeColors={themeColors}
        count={visibleExpenses.length}
        total={total}
        listHeaderComponent={listHeader}
        emptyTitle={search.trim() ? 'Nenhum resultado encontrado' : 'Nenhuma despesa'}
        emptyMessage={
          search.trim()
            ? 'Tente buscar por outra descrição.'
            : 'Toque em + para adicionar sua primeira despesa.'
        }
        emptyIcon="🧾"
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 48,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 16,
  },
});
