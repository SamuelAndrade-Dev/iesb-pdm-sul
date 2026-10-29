import { useMemo, useState } from 'react';
import { Alert, FlatList, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { ActionButton, Card, PageHeading, Screen } from '../../components/Screen';
import { useExpenses } from '../../store/expenses-context';
import { colors } from '../../theme';

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export default function WalletScreen() {
  const { expenses, addExpense, isLoaded } = useExpenses();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const total = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    [expenses],
  );

  function saveExpense() {
    const value = Number(amount.replace(',', '.'));
    if (!description.trim() || !Number.isFinite(value) || value <= 0) {
      Alert.alert('Confira os dados', 'Informe uma descrição e um valor maior que zero.');
      return;
    }
    addExpense({
      id: String(Date.now()),
      description: description.trim(),
      amount: value,
      date: new Date().toISOString(),
    });
    setDescription('');
    setAmount('');
  }

  async function shareSummary() {
    try {
      await Share.share({
        message: `Resumo do meu bolso no CampusGo\nDespesas registradas: ${expenses.length}\nTotal: ${currency.format(total)}`,
      });
    } catch (error) {
      Alert.alert('Não foi possível compartilhar', error.message || 'Tente novamente.');
    }
  }

  return (
    <Screen>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <PageHeading
              eyebrow="Controle sem complicação"
              title="Meu bolso"
              description="Acompanhe seus gastos durante o semestre."
            />
            <Card style={styles.totalCard}>
              <Text style={styles.totalCaption}>TOTAL DE DESPESAS</Text>
              <Text style={styles.total}>{currency.format(total)}</Text>
              <Text style={styles.totalFootnote}>{expenses.length} {expenses.length === 1 ? 'lançamento' : 'lançamentos'}</Text>
            </Card>
            <View style={styles.form}>
              <Text style={styles.sectionTitle}>Adicionar despesa</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Ex.: Almoço no campus"
                placeholderTextColor={colors.muted}
                accessibilityLabel="Descrição da despesa"
                style={styles.input}
                maxLength={70}
              />
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="Valor em reais"
                placeholderTextColor={colors.muted}
                accessibilityLabel="Valor da despesa"
                keyboardType="decimal-pad"
                style={styles.input}
              />
              <ActionButton label="Salvar despesa" onPress={saveExpense} />
            </View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Despesas recentes</Text>
              {expenses.length ? <Text style={styles.share} onPress={shareSummary}>Compartilhar</Text> : null}
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <Card style={styles.expenseCard}>
            <View style={styles.expenseText}>
              <Text style={styles.expenseName}>{item.description}</Text>
              <Text style={styles.expenseDate}>{item.date ? new Date(item.date).toLocaleDateString('pt-BR') : 'Data não informada'}</Text>
            </View>
            <Text style={styles.expenseAmount}>{currency.format(Number(item.amount))}</Text>
          </Card>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 9 }} />}
        ListEmptyComponent={
          isLoaded ? (
            <Card style={styles.empty}>
              <Text style={styles.emptyTitle}>Tudo tranquilo por aqui</Text>
              <Text style={styles.emptyText}>Suas despesas aparecerão aqui quando você adicionar um lançamento.</Text>
            </Card>
          ) : <Text style={styles.emptyText}>Carregando despesas salvas…</Text>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 28 },
  totalCard: { marginHorizontal: 20, backgroundColor: colors.ink, borderColor: colors.ink },
  totalCaption: { color: '#BCD0EF', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  total: { color: '#FFFFFF', fontSize: 32, fontWeight: '800', marginTop: 9 },
  totalFootnote: { color: '#BCD0EF', fontSize: 13, marginTop: 5 },
  form: { gap: 10, paddingHorizontal: 20, paddingTop: 24 },
  sectionTitle: { color: colors.ink, fontSize: 17, fontWeight: '800', marginBottom: 2 },
  input: { minHeight: 48, borderRadius: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: 14, color: colors.ink, fontSize: 14 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 22, marginTop: 25, marginBottom: 13 },
  share: { color: colors.primary, fontSize: 13, fontWeight: '800', paddingVertical: 6 },
  expenseCard: { marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  expenseText: { flex: 1, paddingRight: 10 },
  expenseName: { color: colors.ink, fontSize: 14, fontWeight: '700' },
  expenseDate: { color: colors.muted, fontSize: 12, marginTop: 5 },
  expenseAmount: { color: colors.ink, fontSize: 14, fontWeight: '800' },
  empty: { marginHorizontal: 20, alignItems: 'center', paddingVertical: 22 },
  emptyTitle: { color: colors.ink, fontSize: 16, fontWeight: '800' },
  emptyText: { color: colors.muted, fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 6, paddingHorizontal: 24 },
});
