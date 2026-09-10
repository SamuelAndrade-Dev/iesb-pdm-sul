import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importação dos componentes da pasta components/
import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [textoMeta, setTextoMeta] = useState('');
  const [metas, setMetas] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. useEffect: Carregar metas do AsyncStorage ao montar o componente
  useEffect(() => {
    async function carregarMetas() {
      try {
        const metasSalvas = await AsyncStorage.getItem(STORAGE_KEY);
        if (metasSalvas !== null) {
          setMetas(JSON.parse(metasSalvas));
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as metas salvas.');
      } finally {
        setIsLoaded(true); // Indica que a carga inicial terminou
      }
    }

    carregarMetas();
  }, []);

  // 2. useEffect: Salvar metas no AsyncStorage sempre que a lista mudar
  useEffect(() => {
    async function salvarMetas() {
      // Salva apenas se o carregamento inicial já tiver sido concluído
      if (!isLoaded) return;

      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível salvar as alterações.');
      }
    }

    salvarMetas();
  }, [metas, isLoaded]);

  // Função para adicionar nova meta
  const handleAdicionarMeta = () => {
    if (textoMeta.trim() === '') {
      Alert.alert('Atenção', 'Por favor, digite uma meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoMeta.trim(),
      concluida: false,
      criadaEm: new Date().toLocaleDateString('pt-BR'),
    };

    setMetas((metasAtuais) => [novaMeta, ...metasAtuais]);
    setTextoMeta('');
  };

  // Função para remover meta por ID
  const handleRemoverMeta = (id) => {
    setMetas((metasAtuais) => metasAtuais.filter((meta) => meta.id !== id));
  };

  // Função para alternar o status de concluída (Desafio)
  const handleToggleConcluida = (id) => {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  };

  // Cálculos para o contador do desafio
  const totalMetas = metas.length;
  const concluidas = metas.filter((m) => m.concluida).length;
  const pendentes = totalMetas - concluidas;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

        {/* Cabeçalho */}
        <View style={styles.header}>
          <Image
            source={require('./assets/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.titulo}>Metas do Semestre</Text>
            <Text style={styles.contador}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>
        </View>

        {/* Entrada de dados */}
        <MetaInput
          value={textoMeta}
          onChangeText={setTextoMeta}
          onAdd={handleAdicionarMeta}
        />

        {/* Lista de Metas */}
        <MetaList
          metas={metas}
          onDelete={handleRemoverMeta}
          onToggle={handleToggleConcluida}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  contador: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});