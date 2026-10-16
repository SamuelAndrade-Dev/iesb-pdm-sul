import { StyleSheet, Text, View } from 'react-native';

export default function DespesaSumario({ despesas }) {
  const total = despesas.reduce(
    (acumulador, item) => acumulador + item.valor,
    0,
  );

  return (
    <View style={styles.card}>
      <Text style={styles.rotulo}>Total das despesas</Text>
      <Text style={[styles.total, total > 200 && styles.totalAlto]}>
        R$ {total.toFixed(2)}
      </Text>
      <Text style={styles.quantidade}>
        {despesas.length}{' '}
        {despesas.length === 1 ? 'despesa registrada' : 'despesas registradas'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#e8ece9',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 18,
    padding: 18,
  },
  rotulo: {
    color: '#65716b',
    fontSize: 13,
    fontWeight: '500',
  },
  total: {
    color: '#24745a',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 5,
  },
  totalAlto: {
    color: '#d32f2f',
  },
  quantidade: {
    color: '#87908c',
    fontSize: 12,
    marginTop: 5,
  },
});
