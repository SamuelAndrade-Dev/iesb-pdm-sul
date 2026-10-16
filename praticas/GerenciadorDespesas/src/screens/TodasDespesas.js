import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';

const CATEGORIAS = [
  'Todas',
  'Alimentação',
  'Transporte',
  'Lazer',
  'Contas',
];

export default function TodasDespesas({ despesas, navigation }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  const despesasFiltradas = useMemo(
    () =>
      categoriaSelecionada === 'Todas'
        ? despesas
        : despesas.filter(
            (despesa) => despesa.categoria === categoriaSelecionada,
          ),
    [categoriaSelecionada, despesas],
  );

  return (
    <View style={styles.tela}>
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.titulo}>Todas as despesas</Text>
          <Text style={styles.subtitulo}>Organize seus gastos por categoria</Text>
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtros}
      >
        {CATEGORIAS.map((categoria) => {
          const selecionada = categoriaSelecionada === categoria;

          return (
            <Pressable
              key={categoria}
              accessibilityRole="button"
              accessibilityState={{ selected: selecionada }}
              onPress={() => setCategoriaSelecionada(categoria)}
              style={[
                styles.filtro,
                selecionada && styles.filtroSelecionado,
              ]}
            >
              <Text
                style={[
                  styles.textoFiltro,
                  selecionada && styles.textoFiltroSelecionado,
                ]}
              >
                {categoria}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <DespesaSaida despesas={despesasFiltradas} />
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
  filtros: {
    gap: 8,
    paddingBottom: 18,
  },
  filtro: {
    backgroundColor: '#ffffff',
    borderColor: '#e0e6e2',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  filtroSelecionado: {
    backgroundColor: '#24745a',
    borderColor: '#24745a',
  },
  textoFiltro: {
    color: '#56615b',
    fontSize: 12,
    fontWeight: '600',
  },
  textoFiltroSelecionado: {
    color: '#ffffff',
  },
});
