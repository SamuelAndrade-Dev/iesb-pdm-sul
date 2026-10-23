import { StyleSheet, Text, View } from 'react-native';

export default function DespesaSumario({ count, total, themeColors }) {
  const totalLabel = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(total);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.primary }]}>
      <View>
        <Text style={styles.label}>Despesas exibidas</Text>
        <Text style={styles.count}>{count}</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.label}>Total</Text>
        <Text style={styles.total}>{totalLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 13,
    opacity: 0.85,
  },
  count: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  totalContainer: {
    alignItems: 'flex-end',
  },
  total: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
});
