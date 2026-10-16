import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';

const DIAS_RECENTES = 7;

export default function DespesasRecentes({ despesas, navigation }) {
  const despesasRecentes = useMemo(() => {
    const agora = Date.now();
    const inicioDoPeriodo = agora - DIAS_RECENTES * 24 * 60 * 60 * 1000;

    return despesas
      .filter((despesa) => {
        const data = new Date(despesa.data).getTime();
        return data >= inicioDoPeriodo && data <= agora;
      })
      .sort(
        (despesaA, despesaB) =>
          new Date(despesaB.data).getTime() -
          new Date(despesaA.data).getTime(),
      );
  }, [despesas]);

  return (
    <View style={styles.tela}>
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.titulo}>Despesas recentes</Text>
          <Text style={styles.subtitulo}>Seus últimos 7 dias</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('GerenciarDespesa')}
          style={({ pressed }) => [
            styles.botaoAdicionar,
            pressed && styles.botaoPressionado,
          ]}
        >
          <Text style={styles.simboloAdicionar}>+</Text>
          <Text style={styles.textoAdicionar}>Adicionar</Text>
        </Pressable>
      </View>

      <DespesaSaida despesas={despesasRecentes} />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  cabecalho: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  titulo: {
    color: '#202a26',
    fontSize: 22,
    fontWeight: '800',
  },
  subtitulo: {
    color: '#78817d',
    fontSize: 13,
    marginTop: 4,
  },
  botaoAdicionar: {
    alignItems: 'center',
    backgroundColor: '#24745a',
    borderRadius: 12,
    flexDirection: 'row',
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  simboloAdicionar: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '500',
    lineHeight: 20,
    marginRight: 5,
  },
  textoAdicionar: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});
