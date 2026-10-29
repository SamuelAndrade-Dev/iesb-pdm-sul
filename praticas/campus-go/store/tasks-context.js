import { createContext, useContext, useMemo, useState } from 'react';

const TasksContext = createContext(null);

const initialTasks = [
  { id: '1', title: 'Revisar programação mobile', description: 'Rever componentes, estado e navegação do React Native.', completed: false },
  { id: '2', title: 'Preparar trabalho de Interface', description: 'Organizar referências e finalizar os últimos ajustes.', completed: false },
  { id: '3', title: 'Ler capítulo de Engenharia de Software', description: 'Anotar os principais conceitos para a próxima aula.', completed: true },
];

export function TasksContextProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);

  const value = useMemo(() => ({
    tasks,
    addTask(task) {
      setTasks((current) => [{ ...task, id: String(Date.now()), completed: false }, ...current]);
    },
    completeTask(id) {
      setTasks((current) => current.map((task) => (
        task.id === id ? { ...task, completed: true } : task
      )));
    },
    getTask(id) {
      return tasks.find((task) => task.id === id);
    },
  }), [tasks]);

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks deve ser usado dentro de TasksContextProvider.');
  }
  return context;
}
