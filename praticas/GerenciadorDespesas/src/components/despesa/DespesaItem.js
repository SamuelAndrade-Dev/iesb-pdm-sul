import { StyleSheet, Text, View } from 'react-native';

function getDataFormatada(data) {
  const dataDaDespesa = data instanceof Date ? data : new Date(data);

  if (Number.isNaN(dataDaDespesa.getTime())) {
    return 'Data inválida';
  }

  return dataDaDespesa.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function DespesaItem({ despesa }) {
  return (
    <View style={styles.card}>
      <View style={styles.informacoes}>
        <Text style={styles.descricao} numberOfLines={2}>
          {despesa.descricao}
        </Text>
        <View style={styles.detalhes}>
          <Text style={styles.data}>{getDataFormatada(despesa.data)}</Text>
          <View style={styles.categoria}>
            <Text style={styles.textoCategoria}>{despesa.categoria}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.valor}>R$ {despesa.valor.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e8ece9',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  informacoes: {
    flex: 1,
    marginRight: 12,
  },
  descricao: {
    color: '#202a26',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  detalhes: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  data: {
    color: '#78817d',
    fontSize: 12,
  },
  categoria: {
    backgroundColor: '#eef0ef',
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  textoCategoria: {
    color: '#59635e',
    fontSize: 11,
    fontWeight: '600',
  },
  valor: {
    color: '#173f35',
    fontSize: 15,
    fontWeight: '700',
  },
});
