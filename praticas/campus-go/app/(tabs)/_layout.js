import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

const icons = {
  index: ['home-outline', 'home'],
  tasks: ['checkbox-outline', 'checkbox'],
  wallet: ['wallet-outline', 'wallet'],
  profile: ['person-circle-outline', 'person-circle'],
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700', paddingBottom: 3 },
        tabBarStyle: { height: 66, paddingTop: 7, borderTopColor: colors.border, backgroundColor: colors.surface },
        tabBarIcon: ({ focused, color, size }) => {
          const [outline, filled] = icons[route.name];
          return <Ionicons name={focused ? filled : outline} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tarefas' }} />
      <Tabs.Screen name="wallet" options={{ title: 'Bolso' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
