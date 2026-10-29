import { useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { ActionButton, Card, Screen } from '../../components/Screen';
import { getCurrentPlace } from '../../services/location';
import { scheduleTaskReminder } from '../../services/notifications';
import { useTasks } from '../../store/tasks-context';
import { colors } from '../../theme';

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { tasks, getTask, completeTask } = useTasks();
  const task = getTask(String(id));

  useEffect(() => {
    if (!task && tasks.length) {
      Alert.alert('Tarefa não encontrada', 'Ela pode ter sido removida.');
      router.back();
    }
  }, [task, tasks.length]);

  async function finishTask() {
    completeTask(task.id);
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.warn('O feedback háptico não está disponível neste dispositivo.', error);
    }
    Alert.alert('Muito bem!', 'Tarefa concluída.');
  }

  async function remind() {
    try {
      await scheduleTaskReminder(task.title);
      Alert.alert('Lembrete agendado', 'Você receberá uma notificação em aproximadamente 10 segundos.');
    } catch (error) {
      Alert.alert('Não foi possível agendar', error.message || 'Tente novamente mais tarde.');
    }
  }

  async function studyHere() {
    try {
      const place = await getCurrentPlace();
      Alert.alert('Local registrado', `Estudei aqui: ${place.description}`);
    } catch (error) {
      Alert.alert(
        'Localização indisponível',
        error.code === 'LOCATION_PERMISSION_DENIED'
          ? 'Permissão de localização negada. Ative-a nas configurações do dispositivo.'
          : error.message || 'Tente novamente mais tarde.',
      );
    }
  }

  if (!task) {
    return <Screen />;
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{task.completed ? 'CONCLUÍDA' : 'EM ANDAMENTO'}</Text>
          </View>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
          <View style={styles.actions}>
            {!task.completed ? <ActionButton label="Concluir tarefa" icon="✓" variant="secondary" onPress={finishTask} /> : null}
            <ActionButton label="Lembrar em 10 segundos" icon="◷" variant="quiet" onPress={remind} />
            <ActionButton label="Estudei aqui" icon="⌖" variant="quiet" onPress={studyHere} />
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20 },
  badge: { alignSelf: 'flex-start', backgroundColor: colors.accent, borderRadius: 9, paddingHorizontal: 10, paddingVertical: 6 },
  badgeText: { color: colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 0.7 },
  title: { color: colors.ink, fontSize: 24, fontWeight: '800', marginTop: 17 },
  description: { color: colors.muted, fontSize: 15, lineHeight: 23, marginTop: 10 },
  actions: { gap: 10, marginTop: 25 },
});
