import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Pressable, 
  Switch, 
  ScrollView 
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LABELS } from './labels';

export default function App() {
  const [textoInput, setTextoInput] = useState('');
  const [isObrigatoria, setIsObrigatoria] = useState(true);
  const [onlyMandatory, setOnlyMandatory] = useState(false);
  const [disciplinas, setDisciplinas] = useState([
    { id: '1', nome: 'Programação para Dispositivos Móveis', obrigatoria: true },
    { id: '2', nome: 'Estrutura de Dados', obrigatoria: true },
    { id: '3', nome: 'Engenharia de Software', obrigatoria: true },
    { id: '4', nome: 'Tópicos Especiais', obrigatoria: false },
  ]);

  const handleAdicionar = () => {
    if (textoInput.trim() === '') return;

    const novaDisciplina = {
      id: Date.now().toString(),
      nome: textoInput,
      obrigatoria: isObrigatoria,
    };

    setDisciplinas([...disciplinas, novaDisciplina]);
    setTextoInput('');
  };

  const disciplinasExibidas = onlyMandatory
    ? disciplinas.filter((item) => item.obrigatoria)
    : disciplinas;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{LABELS.APP_TITLE}</Text>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder={LABELS.INPUT_PLACEHOLDER}
            placeholderTextColor="#888"
            value={textoInput}
            onChangeText={setTextoInput}
          />
          
          <Pressable 
            onPress={handleAdicionar}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed
            ]}
          >
            <Text style={styles.buttonText}>{LABELS.ADD_BUTTON}</Text>
          </Pressable>
        </View>

        <View style={styles.typeSelectorRow}>
          <Pressable 
            style={[styles.typeButton, isObrigatoria && styles.typeButtonActive]}
            onPress={() => setIsObrigatoria(true)}
          >
            <Text style={[styles.typeText, isObrigatoria && styles.typeTextActive]}>
              Obrigatória
            </Text>
          </Pressable>

          <Pressable 
            style={[styles.typeButton, !isObrigatoria && styles.typeButtonActive]}
            onPress={() => setIsObrigatoria(false)}
          >
            <Text style={[styles.typeText, !isObrigatoria && styles.typeTextActive]}>
              Optativa
            </Text>
          </Pressable>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>{LABELS.FILTER_SWITCH}</Text>
          <Switch
            value={onlyMandatory}
            onValueChange={setOnlyMandatory}
            trackColor={{ false: '#767577', true: '#2196F3' }}
          />
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>{LABELS.LIST_TITLE}</Text>
          <ScrollView style={styles.scrollView}>
            {disciplinasExibidas.map((item) => (
              <View key={item.id} style={styles.cardItem}>
                <Text style={styles.cardText}>{item.nome}</Text>
                <Text style={styles.badgeText}>
                  {item.obrigatoria ? 'Obrigatória' : 'Optativa'}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // flex: 1 faz o container ocupar toda a altura útil da tela
  container: { flex: 1, backgroundColor: '#F5F5F5', paddingHorizontal: 16, paddingTop: 10 },
  
  // alignItems: 'center' centraliza o título na horizontal
  header: { alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  
  // flexDirection: 'row' organiza Input e Botão lado a lado
  // justifyContent: 'space-between' alinha os elementos nas extremidades
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  
  // Demonstração de dimensão em percentual (~70% exigido)
  input: { width: '70%', borderWidth: 1, borderColor: '#CCCCCC', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#FFFFFF', fontSize: 14 },
  
  // Dimensão percentual complementar (~27%)
  // justifyContent e alignItems no 'center' alinham o texto perfeitamente no botão
  button: { width: '27%', backgroundColor: '#2196F3', paddingVertical: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  buttonPressed: { backgroundColor: '#4b9634' },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  
  typeSelectorRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  typeButton: { width: '48%', paddingVertical: 8, borderRadius: 6, borderWidth: 1, borderColor: '#CCCCCC', backgroundColor: '#FFFFFF', alignItems: 'center' },
  typeButtonActive: { backgroundColor: '#2196F3', borderColor: '#2196F3' },
  typeText: { fontSize: 13, color: '#666', fontWeight: '500' },
  typeTextActive: { color: '#FFFFFF', fontWeight: 'bold' },
  
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingHorizontal: 4 },
  switchLabel: { fontSize: 14, color: '#555' },
  
  // Demonstração de uso do Flex: flex: 1 expande a área da lista para ocupar o resto do espaço
  listContainer: { flex: 1 },
  listTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  scrollView: { flex: 1 },
  
  cardItem: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#E0E0E0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardText: { fontSize: 15, color: '#333', flex: 1 },
  badgeText: { fontSize: 12, color: '#666', fontStyle: 'italic', marginLeft: 8 },
});