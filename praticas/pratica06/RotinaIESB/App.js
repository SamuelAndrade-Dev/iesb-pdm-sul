import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { labels } from './labels';
import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // Efeito 1: Carregar dados do AsyncStorage ao montar o componente
  useEffect(() => {
    async function carregarDados() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (dadosSalvos !== null) {
          setCompromissos(JSON.parse(dadosSalvos));
        }
      } catch (error) {
        Alert.alert('Erro', labels.erroCarregar);
      } finally {
        setCarregado(true);
      }
    }
    carregarDados();
  }, []);

  // Efeito 2: Salvar no AsyncStorage quando o estado dos compromissos mudar
  useEffect(() => {
    async function salvarDados() {
      if (!carregado) return;
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (error) {
        Alert.alert('Erro', labels.erroSalvar);
      }
    }
    salvarDados();
  }, [compromissos, carregado]);

  const handleAdicionar = () => {
    if (texto.trim() === '') {
      Alert.alert(labels.erroTitulo, labels.erroMensagem);
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: texto.trim(),
      criadoEm: new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setCompromissos((listaAnterior) => [...listaAnterior, novoCompromisso]);
    setTexto('');
  };

  const handleRemover = (id) => {
    setCompromissos((listaAnterior) =>
      listaAnterior.filter((item) => item.id !== id)
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            <Image
              source={require('./assets/logo.webp')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.titulo}>{labels.tituloApp}</Text>
              <Text style={styles.subtitulo}>{labels.subtituloApp}</Text>
            </View>
          </View>

          {/* Formulário de Input */}
          <CompromissoInput
            value={texto}
            onChangeText={setTexto}
            onAdd={handleAdicionar}
            labels={labels}
          />

          {/* Lista de Itens */}
          <CompromissoList
            itens={compromissos}
            onDelete={handleRemover}
            tituloLista={labels.tituloLista}
            listaVazia={labels.listaVazia}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0056B3',
  },
  subtitulo: {
    fontSize: 12,
    color: '#666',
  },
});