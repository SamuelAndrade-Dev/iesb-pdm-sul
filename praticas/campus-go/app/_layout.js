import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ExpensesContextProvider } from '../store/expenses-context';
import { TasksContextProvider } from '../store/tasks-context';

export default function RootLayout() {
  return (
    <ExpensesContextProvider>
      <TasksContextProvider>
        <StatusBar style="dark" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="new-task"
            options={{ title: 'Nova tarefa', presentation: 'modal', headerBackTitle: 'Voltar' }}
          />
          <Stack.Screen name="task/[id]" options={{ title: 'Detalhes da tarefa', headerBackTitle: 'Voltar' }} />
        </Stack>
      </TasksContextProvider>
    </ExpensesContextProvider>
  );
}
