import { useState } from 'react';
import { Alert, FlatList, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ActionButton, Card, PageHeading, Screen } from '../../components/Screen';
import { getCurrentPlace } from '../../services/location';
import { scheduleTaskReminder } from '../../services/notifications';
import { useTasks } from '../../store/tasks-context';
import { colors } from '../../theme';

export default function TasksScreen() {
  const { tasks, completeTask } = useTasks();
  const [place, setPlace] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  async function markStudyPlace() {
    setIsLocating(true);
    try {
      const currentPlace = await getCurrentPlace();
      setPlace(currentPlace.description);
      Alert.alert('Local registrado', `Estudei aqui: ${currentPlace.description}`);
    } catch (error) {
      if (error.code === 'LOCATION_PERMISSION_DENIED') {
        Alert.alert(
          'Permissão necessária',
          'Ative o acesso à localização nas configurações para registrar onde você estudou.',
          [
            { text: 'Agora não', style: 'cancel' },
            { text: 'Abrir configurações', onPress: () => Linking.openSettings() },
          ],
        );
      } else {
        Alert.alert('Localização indisponível', error.message || 'Tente novamente em alguns instantes.');
      }
    } finally {
      setIsLocating(false);
    }
  }

  async function remind(task) {
    try {
      await scheduleTaskReminder(task.title);
      Alert.alert('Lembrete agendado', 'Você receberá uma notificação em aproximadamente 10 segundos.');
    } catch (error) {
      Alert.alert('Não foi possível agendar', error.message || 'Tente novamente mais tarde.');
    }
  }

  async function finishTask(id) {
    completeTask(id);
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.warn('O feedback háptico não está disponível neste dispositivo.', error);
    }
    Alert.alert('Muito bem!', 'Tarefa concluída.');
  }

  return (
    <Screen>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <PageHeading
              eyebrow="Organize seu semestre"
              title="Minhas tarefas"
              description="Um passo de cada vez também é progresso."
            >
              <View style={styles.headingButton}>
                <ActionButton label="Estudei aqui" icon="⌖" onPress={markStudyPlace} disabled={isLocating} />
              </View>
              {place ? <Text style={styles.placeLabel}>Último local: {place}</Text> : null}
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/new-task')}
                style={styles.addButton}
              >
                <Ionicons name="add-circle" size={20} color={colors.primary} />
                <Text style={styles.addText}>Adicionar tarefa</Text>
              </Pressable>
            </PageHeading>
          </View>
        }
        renderItem={({ item }) => (
          <Card style={styles.taskCard}>
            <Pressable onPress={() => router.push(`/task/${item.id}`)} accessibilityRole="button">
              <View style={styles.taskHeader}>
                <View style={[styles.statusDot, item.completed && styles.statusDone]} />
                <Text style={[styles.taskTitle, item.completed && styles.completedTitle]}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={18} color={colors.muted} />
              </View>
              <Text style={styles.taskDescription}>{item.description}</Text>
            </Pressable>
            <View style={styles.actions}>
              {!item.completed ? (
                <ActionButton label="Concluir" icon="✓" variant="secondary" onPress={() => finishTask(item.id)} />
              ) : <Text style={styles.doneLabel}>Concluída</Text>}
              <ActionButton label="Lembrar em 10 segundos" icon="◷" variant="quiet" onPress={() => remind(item)} />
            </View>
          </Card>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={<Card style={styles.empty}><Text style={styles.taskDescription}>Você ainda não tem tarefas. Adicione uma para começar.</Text></Card>}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 26 },
  headingButton: { alignSelf: 'flex-start', marginTop: 16 },
  placeLabel: { color: colors.green, fontSize: 13, fontWeight: '600', marginTop: 10 },
  addButton: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 19 },
  addText: { color: colors.primary, fontWeight: '800', fontSize: 14 },
  taskCard: { marginHorizontal: 20 },
  taskHeader: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.amber, marginRight: 10 },
  statusDone: { backgroundColor: colors.green },
  taskTitle: { flex: 1, color: colors.ink, fontSize: 16, fontWeight: '800' },
  completedTitle: { color: colors.muted },
  taskDescription: { color: colors.muted, fontSize: 13, lineHeight: 20, marginTop: 8 },
  actions: { gap: 9, marginTop: 16 },
  doneLabel: { color: colors.green, fontSize: 14, fontWeight: '800', paddingVertical: 10 },
  empty: { marginHorizontal: 20, alignItems: 'center' },
});
