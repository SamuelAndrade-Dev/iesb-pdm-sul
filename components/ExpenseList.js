import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

const categoryStyles = {
  Alimentação: { icon: 'fast-food-outline', color: '#F2996B' },
  Transporte: { icon: 'bus-outline', color: '#6F91E8' },
  Materiais: { icon: 'book-outline', color: '#8B78D6' },
  Estudos: { icon: 'school-outline', color: '#48A99A' },
  Mensalidade: { icon: 'card-outline', color: '#D39A42' },
  Moradia: { icon: 'home-outline', color: '#D47BA4' },
  Lazer: { icon: 'game-controller-outline', color: '#D39A42' },
  Outros: { icon: 'ellipsis-horizontal-circle-outline', color: '#8793A8' },
};

export function formatCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });
}

export default function ExpenseList({ expenses }) {
  if (expenses.length === 0) {
    return (
      <View style={styles.emptyState}>
        <View style={styles.emptyIcon}>
          <Ionicons name="receipt-outline" size={24} color="#65738B" />
        </View>
        <Text style={styles.emptyTitle}>Nenhum gasto neste período</Text>
        <Text style={styles.emptyMessage}>
          Toque no botão + para registrar uma despesa da sua rotina de estudante.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      {expenses.map((expense) => {
        const category = categoryStyles[expense.category] ?? categoryStyles.Outros;

        return (
          <View key={expense.id} style={styles.expenseCard}>
            <View style={[styles.expenseIcon, { backgroundColor: `${category.color}1A` }]}>
              <Ionicons name={category.icon} size={21} color={category.color} />
            </View>
            <View style={styles.expenseDetails}>
              <Text style={styles.expenseTitle} numberOfLines={1}>
                {expense.title}
              </Text>
              <Text style={styles.expenseMeta}>
                {expense.category} · {formatDate(expense.date)}
              </Text>
            </View>
            <Text style={styles.expenseAmount}>− {formatCurrency(expense.amount)}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 10,
  },
  expenseCard: {
    minHeight: 76,
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EBEFF5',
  },
  expenseIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expenseDetails: {
    flex: 1,
    marginHorizontal: 12,
  },
  expenseTitle: {
    color: '#1B2940',
    fontSize: 14,
    fontWeight: '700',
  },
  expenseMeta: {
    marginTop: 5,
    color: '#8994A7',
    fontSize: 12,
  },
  expenseAmount: {
    color: '#293750',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 38,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EBEFF5',
  },
  emptyIcon: {
    width: 52,
    height: 52,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#EFF2F8',
  },
  emptyTitle: {
    color: '#1B2940',
    fontSize: 15,
    fontWeight: '700',
  },
  emptyMessage: {
    marginTop: 6,
    color: '#8994A7',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
});
