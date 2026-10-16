import { FlatList, StyleSheet, Text, View } from 'react-native';
import DespesaItem from './DespesaItem';

export default function DespesaLista({ despesas }) {
  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DespesaItem despesa={item} />}
      contentContainerStyle={despesas.length === 0 ? styles.listaVazia : styles.lista}
      ListEmptyComponent={
        <View style={styles.estadoVazio}>
          <Text style={styles.textoVazio}>Nenhuma despesa encontrada.</Text>
          <Text style={styles.instrucaoVazia}>
            Adicione uma despesa ou altere o filtro selecionado.
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingBottom: 20,
  },
  listaVazia: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  estadoVazio: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
  textoVazio: {
    color: '#26332e',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  instrucaoVazia: {
    color: '#78817d',
    fontSize: 13,
    textAlign: 'center',
  },
});
