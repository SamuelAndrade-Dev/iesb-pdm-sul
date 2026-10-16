import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

export default function GerenciarDespesa({ navigation, onSalvarDespesa }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState(new Date());
  const [mostrarSeletorData, setMostrarSeletorData] = useState(false);

  function salvarDespesa() {
    const camposPendentes = [];

    if (!descricao.trim()) {
      camposPendentes.push('descrição');
    }
    if (!valor.trim()) {
      camposPendentes.push('valor');
    }
    if (!categoria) {
      camposPendentes.push('categoria');
    }

    if (camposPendentes.length > 0) {
      Alert.alert(
        'Campos obrigatórios',
        `Preencha ${camposPendentes.join(', ')} antes de salvar.`,
      );
      return;
    }

    const valorNumerico = Number(valor);

    if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Valor inválido', 'Informe um valor maior que zero.');
      return;
    }

    onSalvarDespesa({
      id: `${Date.now()}`,
      descricao: descricao.trim(),
      valor: valorNumerico,
      data,
      categoria,
    });
    navigation.goBack();
  }

  function atualizarData(_, dataSelecionada) {
    if (dataSelecionada) {
      setData(dataSelecionada);
    }

    if (Platform.OS === 'android') {
      setMostrarSeletorData(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.teclado}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.introducao}>
          Informe os detalhes para registrar seu gasto.
        </Text>

        <Text style={styles.rotulo}>Descrição</Text>
        <TextInput
          accessibilityLabel="Descrição da despesa"
          onChangeText={setDescricao}
          placeholder="Ex.: Almoço"
          placeholderTextColor="#98a09c"
          style={styles.campo}
          value={descricao}
          returnKeyType="next"
        />

        <Text style={styles.rotulo}>Valor (R$)</Text>
        <TextInput
          accessibilityLabel="Valor da despesa"
          keyboardType="decimal-pad"
          onChangeText={(novoValor) => {
            if (/^\d*\.?\d{0,2}$/.test(novoValor)) {
              setValor(novoValor);
            }
          }}
          placeholder="0.00"
          placeholderTextColor="#98a09c"
          style={styles.campo}
          value={valor}
        />
        <Text style={styles.ajudaValor}>
          Use ponto para separar as casas decimais (até duas).
        </Text>

        <Text style={styles.rotulo}>Categoria</Text>
        <View style={styles.categorias}>
          {CATEGORIAS.map((itemCategoria) => {
            const selecionada = categoria === itemCategoria;

            return (
              <Pressable
                key={itemCategoria}
                accessibilityRole="button"
                accessibilityState={{ selected: selecionada }}
                onPress={() => setCategoria(itemCategoria)}
                style={[
                  styles.opcaoCategoria,
                  selecionada && styles.opcaoCategoriaSelecionada,
                ]}
              >
                <Text
                  style={[
                    styles.textoCategoria,
                    selecionada && styles.textoCategoriaSelecionada,
                  ]}
                >
                  {itemCategoria}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.rotulo}>Data</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => setMostrarSeletorData((visivel) => !visivel)}
          style={styles.campoData}
        >
          <Text style={styles.textoData}>
            {data.toLocaleDateString('pt-BR')}
          </Text>
          <Text style={styles.iconeCalendario}>Selecionar data</Text>
        </Pressable>

        {mostrarSeletorData && (
          <View style={styles.areaSeletor}>
            <DateTimePicker
              value={data}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onValueChange={atualizarData}
              onDismiss={() => setMostrarSeletorData(false)}
              locale="pt-BR"
            />
            {Platform.OS === 'ios' && (
              <Pressable
                accessibilityRole="button"
                onPress={() => setMostrarSeletorData(false)}
                style={styles.botaoConcluirData}
              >
                <Text style={styles.textoConcluirData}>Concluir</Text>
              </Pressable>
            )}
          </View>
        )}

        <Pressable
          accessibilityRole="button"
          onPress={salvarDespesa}
          style={({ pressed }) => [
            styles.botaoSalvar,
            pressed && styles.botaoSalvarPressionado,
          ]}
        >
          <Text style={styles.textoBotaoSalvar}>Salvar despesa</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  teclado: {
    flex: 1,
  },
  conteudo: {
    padding: 20,
    paddingBottom: 36,
  },
  introducao: {
    color: '#78817d',
    fontSize: 14,
    marginBottom: 24,
  },
  rotulo: {
    color: '#26332e',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 16,
  },
  campo: {
    backgroundColor: '#ffffff',
    borderColor: '#dfe5e1',
    borderRadius: 12,
    borderWidth: 1,
    color: '#202a26',
    fontSize: 15,
    minHeight: 50,
    paddingHorizontal: 14,
  },
  ajudaValor: {
    color: '#87908c',
    fontSize: 11,
    marginTop: 6,
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  opcaoCategoria: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#dfe5e1',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  opcaoCategoriaSelecionada: {
    backgroundColor: '#e3f1eb',
    borderColor: '#24745a',
  },
  textoCategoria: {
    color: '#59635e',
    fontSize: 12,
    fontWeight: '600',
  },
  textoCategoriaSelecionada: {
    color: '#1d6349',
  },
  campoData: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#dfe5e1',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 50,
    paddingHorizontal: 14,
  },
  textoData: {
    color: '#202a26',
    fontSize: 15,
  },
  iconeCalendario: {
    color: '#24745a',
    fontSize: 12,
    fontWeight: '700',
  },
  areaSeletor: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e6ebe8',
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 10,
    padding: 8,
  },
  botaoConcluirData: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textoConcluirData: {
    color: '#24745a',
    fontSize: 14,
    fontWeight: '700',
  },
  botaoSalvar: {
    alignItems: 'center',
    backgroundColor: '#24745a',
    borderRadius: 12,
    marginTop: 30,
    minHeight: 52,
    justifyContent: 'center',
  },
  botaoSalvarPressionado: {
    opacity: 0.85,
  },
  textoBotaoSalvar: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
