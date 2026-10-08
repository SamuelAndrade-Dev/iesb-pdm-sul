import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import ExpenseList, { formatCurrency } from '../components/ExpenseList';
import { useExpenses } from '../components/ExpensesContext';

export default function DespesasRecentes() {
  const { expenses, monthlyBudget } = useExpenses();
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const monthlyExpenses = expenses.filter((expense) => expense.date.startsWith(currentMonth));
  const spent = monthlyExpenses.reduce((total, expense) => total + expense.amount, 0);
  const remaining = Math.max(monthlyBudget - spent, 0);
  const budgetProgress = Math.min(spent / monthlyBudget, 1);
  const recentExpenses = expenses.slice(0, 4);
  const monthLabel = now.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.greetingRow}>
        <View>
          <Text style={styles.eyebrow}>SEU DINHEIRO, SUA ROTINA</Text>
          <Text style={styles.greeting}>Olá, estudante! 👋</Text>
        </View>
        <View style={styles.studentBadge}>
          <Ionicons name="school-outline" size={21} color="#347D76" />
        </View>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryTop}>
          <View>
            <Text style={styles.summaryLabel}>Gastos do mês</Text>
            <Text style={styles.summaryPeriod}>{monthLabel}</Text>
          </View>
          <View style={styles.summaryIcon}>
            <Ionicons name="wallet-outline" size={21} color="#B7F0D7" />
          </View>
        </View>
        <Text style={styles.summaryAmount}>{formatCurrency(spent)}</Text>
        <View style={styles.budgetInfo}>
          <Text style={styles.budgetLabel}>Orçamento mensal</Text>
          <Text style={styles.budgetAmount}>{formatCurrency(monthlyBudget)}</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${budgetProgress * 100}%` }]} />
        </View>
        <View style={styles.summaryFooter}>
          <Ionicons
            name={remaining > 0 ? 'checkmark-circle-outline' : 'alert-circle-outline'}
            size={16}
            color={remaining > 0 ? '#B7F0D7' : '#FFD18A'}
          />
          <Text style={styles.summaryHint}>
            {remaining > 0
              ? `${formatCurrency(remaining)} disponíveis para o resto do mês`
              : 'Você atingiu o orçamento mensal'}
          </Text>
        </View>
        <View style={styles.cardDecoration} />
      </View>

      <View style={styles.quickStats}>
        <View style={styles.quickStatCard}>
          <View style={styles.statIcon}>
            <Ionicons name="receipt-outline" size={17} color="#5978C5" />
          </View>
          <Text style={styles.statValue}>{monthlyExpenses.length}</Text>
          <Text style={styles.statLabel}>despesas no mês</Text>
        </View>
        <View style={styles.quickStatCard}>
          <View style={[styles.statIcon, styles.statIconMint]}>
            <Ionicons name="bus-outline" size={17} color="#348477" />
          </View>
          <Text style={styles.statValue}>
            {formatCurrency(
              monthlyExpenses
                .filter((expense) => expense.category === 'Transporte')
                .reduce((total, expense) => total + expense.amount, 0),
            )}
          </Text>
          <Text style={styles.statLabel}>em transporte</Text>
        </View>
      </View>

      <View style={styles.sectionHeading}>
        <View>
          <Text style={styles.sectionTitle}>Despesas recentes</Text>
          <Text style={styles.sectionSubtitle}>Alimentação, transporte e vida no campus</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{recentExpenses.length}</Text>
        </View>
      </View>

      <ExpenseList expenses={recentExpenses} />
      <Text style={styles.footerNote}>Organize os gastos de hoje para cuidar dos planos de amanhã.</Text>
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
  greetingRow: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrow: {
    color: '#6F7F96',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  greeting: {
    marginTop: 7,
    color: '#1B2940',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  studentBadge: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#DDF4EC',
  },
  summaryCard: {
    overflow: 'hidden',
    marginBottom: 14,
    padding: 21,
    borderRadius: 24,
    backgroundColor: '#21364E',
  },
  summaryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: '#D5E0EC',
    fontSize: 13,
    fontWeight: '600',
  },
  summaryPeriod: {
    marginTop: 5,
    color: '#95A8BC',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  summaryIcon: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#FFFFFF1A',
  },
  summaryAmount: {
    marginTop: 18,
    color: '#FFFFFF',
    fontSize: 31,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  budgetInfo: {
    marginTop: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budgetLabel: {
    color: '#C0CEDC',
    fontSize: 11,
  },
  budgetAmount: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  progressTrack: {
    height: 7,
    overflow: 'hidden',
    marginTop: 8,
    borderRadius: 5,
    backgroundColor: '#FFFFFF2A',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#8DDBBC',
  },
  summaryFooter: {
    marginTop: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  summaryHint: {
    color: '#D5E0EC',
    fontSize: 11,
  },
  cardDecoration: {
    position: 'absolute',
    right: -34,
    bottom: -70,
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    borderColor: '#FFFFFF12',
  },
  quickStats: {
    marginBottom: 25,
    flexDirection: 'row',
    gap: 11,
  },
  quickStatCard: {
    flex: 1,
    minHeight: 102,
    padding: 13,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBEFF5',
  },
  statIcon: {
    width: 31,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    backgroundColor: '#EAF0FF',
  },
  statIconMint: {
    backgroundColor: '#DDF4EC',
  },
  statValue: {
    marginTop: 7,
    color: '#1B2940',
    fontSize: 15,
    fontWeight: '800',
  },
  statLabel: {
    marginTop: 3,
    color: '#8994A7',
    fontSize: 10,
  },
  sectionHeading: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#1B2940',
    fontSize: 17,
    fontWeight: '800',
  },
  sectionSubtitle: {
    marginTop: 4,
    color: '#8994A7',
    fontSize: 11,
  },
  countBadge: {
    minWidth: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    backgroundColor: '#E6EBF4',
  },
  countText: {
    color: '#53637A',
    fontSize: 12,
    fontWeight: '800',
  },
  footerNote: {
    marginTop: 22,
    color: '#98A2B2',
    fontSize: 11,
    textAlign: 'center',
  },
});
