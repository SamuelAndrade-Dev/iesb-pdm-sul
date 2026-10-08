import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IconButton from './components/IconButton';
import { ExpensesProvider } from './components/ExpensesContext';
import DespesasRecentes from './screens/DespesasRecentes';
import GerenciarDespesa from './screens/GerenciarDespesa';
import TodasDespesas from './screens/TodasDespesas';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add-circle-outline"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate('GerenciarDespesa')}
          />
        ),
        tabBarLabelStyle: { fontSize: 12 },
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTitleStyle: { color: '#1B2940', fontWeight: '700' },
        headerTintColor: '#287D70',
        headerShadowVisible: false,
        tabBarActiveTintColor: '#287D70',
        tabBarInactiveTintColor: '#8994A7',
        tabBarStyle: {
          height: 64,
          paddingTop: 6,
          paddingBottom: 7,
          borderTopColor: '#EBEFF5',
          backgroundColor: '#FFFFFF',
        },
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ExpensesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Despesas"
            component={BottomTabScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GerenciarDespesa"
            component={GerenciarDespesa}
            options={{
              title: 'Gerenciar despesa',
              headerStyle: { backgroundColor: '#F5F7FB' },
              headerTintColor: '#1B2940',
              headerTitleStyle: { color: '#1B2940', fontWeight: '700' },
              headerShadowVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesProvider>
  );
}
