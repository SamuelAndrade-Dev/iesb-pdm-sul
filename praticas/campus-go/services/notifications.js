import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

export async function scheduleTaskReminder(title) {
  if (Platform.OS === 'web') {
    throw new Error('Lembretes locais não estão disponíveis na versão web.');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('task-reminders', {
      name: 'Lembretes de tarefas',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  let permission = await Notifications.getPermissionsAsync();
  if (!permission.granted) {
    permission = await Notifications.requestPermissionsAsync();
  }
  if (!permission.granted) {
    throw new Error('Permissão para notificações negada. Ative-a nas configurações do dispositivo.');
  }

  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'Hora de estudar!',
      body: `Não se esqueça: ${title}`,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 10,
      ...(Platform.OS === 'android' ? { channelId: 'task-reminders' } : {}),
    },
  });
}
