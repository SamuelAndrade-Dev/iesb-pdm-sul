import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { router } from 'expo-router';
import { ActionButton, Card } from '../components/Screen';
import { useTasks } from '../store/tasks-context';
import { colors } from '../theme';

export default function NewTaskScreen() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function saveTask() {
    if (!title.trim()) {
      Alert.alert('Título obrigatório', 'Escreva um título para a tarefa.');
      return;
    }
    addTask({ title: title.trim(), description: description.trim() || 'Sem descrição.' });
    router.back();
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.intro}>Planeje seu próximo passo. A descrição é opcional.</Text>
        <Card style={styles.form}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Ex.: Estudar para a prova"
            placeholderTextColor={colors.muted}
            style={styles.input}
            maxLength={90}
            autoFocus
            returnKeyType="next"
          />
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Adicione alguns detalhes"
            placeholderTextColor={colors.muted}
            style={[styles.input, styles.multiline]}
            maxLength={240}
            multiline
            textAlignVertical="top"
          />
          <ActionButton label="Criar tarefa" onPress={saveTask} />
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20 },
  intro: { color: colors.muted, fontSize: 14, lineHeight: 21, marginBottom: 18 },
  form: { gap: 11 },
  label: { color: colors.ink, fontSize: 14, fontWeight: '800', marginTop: 3 },
  input: { minHeight: 48, borderRadius: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: 13, color: colors.ink, fontSize: 14 },
  multiline: { minHeight: 112, paddingTop: 12 },
});
