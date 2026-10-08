import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import ExpenseList, { formatCurrency } from '../components/ExpenseList';
import { useExpenses } from '../components/ExpensesContext';

const categories = [
  { name: 'Mensalidade', icon: 'card-outline', color: '#D39A42' },
  { name: 'Alimentação', icon: 'fast-food-outline', color: '#F2996B' },
  { name: 'Transporte', icon: 'bus-outline', color: '#6F91E8' },
  { name: 'Materiais', icon: 'book-outline', color: '#8B78D6' },
  { name: 'Estudos', icon: 'school-outline', color: '#48A99A' },
];

export default function TodasDespesas() {
  const { expenses, monthlyBudget } = useExpenses();
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const monthlyExpenses = expenses.filter((expense) => expense.date.startsWith(currentMonth));
  const total = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const month = now.toLocaleDateString('pt-BR', { month: 'long' });

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.eyebrow}>PLANEJAMENTO DO ESTUDANTE</Text>
      <Text style={styles.title}>Meu orçamento</Text>
      <Text style={styles.subtitle}>
        Veja para onde vai seu dinheiro entre campus, transporte e estudos.
      </Text>

      <View style={styles.totalCard}>
        <View style={styles.totalIcon}>
          <Ionicons name="wallet-outline" size={21} color="#287D70" />
        </View>
        <Text style={styles.totalLabel}>Total registrado · {month}</Text>
        <Text style={styles.totalAmount}>{formatCurrency(total)}</Text>
        <View style={styles.budgetFooter}>
          <Text style={styles.budgetFooterLabel}>Orçamento do mês</Text>
          <Text style={styles.budgetFooterAmount}>{formatCurrency(monthlyBudget)}</Text>
        </View>
      </View>

      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Gastos por categoria</Text>
      </View>
      <View style={styles.categoryList}>
        {categories.map((category) => {
          const categoryTotal = monthlyExpenses
            .filter((expense) => expense.category === category.name)
            .reduce((sum, expense) => sum + expense.amount, 0);
          const categoryShare = total > 0 ? categoryTotal / total : 0;

          return (
            <View key={category.name} style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: `${category.color}1A` }]}>
                <Ionicons name={category.icon} size={19} color={category.color} />
              </View>
              <View style={styles.categoryMain}>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryAmount}>{formatCurrency(categoryTotal)}</Text>
                </View>
                <View style={styles.categoryTrack}>
                  <View
                    style={[
                      styles.categoryProgress,
                      { width: `${categoryShare * 100}%`, backgroundColor: category.color },
                    ]}
                  />
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.listHeading}>
        <View>
          <Text style={styles.listTitle}>Todas as despesas</Text>
          <Text style={styles.listSubtitle}>Seus lançamentos da vida de estudante</Text>
        </View>
        <Text style={styles.listCount}>{expenses.length}</Text>
      </View>
      <ExpenseList expenses={expenses} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  content: {
    padding: 20,
    paddingBottom: 30,
  },
  eyebrow: {
    marginTop: 3,
    color: '#6F7F96',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  title: {
    marginTop: 7,
    color: '#1B2940',
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    maxWidth: 310,
    marginTop: 6,
    marginBottom: 18,
    color: '#8994A7',
    fontSize: 13,
    lineHeight: 19,
  },
  totalCard: {
    marginBottom: 23,
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#DDF4EC',
  },
  totalIcon: {
    width: 39,
    height: 39,
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: '#FFFFFFA8',
  },
  totalLabel: {
    color: '#4B776E',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  totalAmount: {
    marginTop: 5,
    color: '#1D514A',
    fontSize: 27,
    fontWeight: '800',
  },
  budgetFooter: {
    marginTop: 15,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#1D514A20',
  },
  budgetFooterLabel: {
    color: '#4B776E',
    fontSize: 11,
  },
  budgetFooterAmount: {
    color: '#1D514A',
    fontSize: 11,
    fontWeight: '700',
  },
  sectionHeading: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#1B2940',
    fontSize: 16,
    fontWeight: '800',
  },
  categoryList: {
    gap: 9,
  },
  categoryCard: {
    minHeight: 63,
    padding: 11,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBEFF5',
  },
  categoryIcon: {
    width: 39,
    height: 39,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
  },
  categoryMain: {
    flex: 1,
    marginLeft: 11,
  },
  categoryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryName: {
    color: '#53637A',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryAmount: {
    color: '#1B2940',
    fontSize: 12,
    fontWeight: '700',
  },
  categoryTrack: {
    height: 4,
    overflow: 'hidden',
    marginTop: 8,
    borderRadius: 3,
    backgroundColor: '#EFF2F6',
  },
  categoryProgress: {
    height: '100%',
    borderRadius: 3,
  },
  listHeading: {
    marginTop: 23,
    marginBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listTitle: {
    color: '#1B2940',
    fontSize: 16,
    fontWeight: '800',
  },
  listSubtitle: {
    marginTop: 4,
    color: '#8994A7',
    fontSize: 11,
  },
  listCount: {
    color: '#8994A7',
    fontSize: 12,
    fontWeight: '700',
  },
});
