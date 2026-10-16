import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DespesasRecentes from './src/screens/DespesasRecentes';
import TodasDespesas from './src/screens/TodasDespesas';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [despesas, setDespesas] = useState(() => {
    const agora = Date.now();

    return [
      {
        id: '1',
        descricao: 'Compras da semana',
        valor: 145.9,
        data: new Date(agora - 1000 * 60 * 60 * 24),
        categoria: 'Alimentação',
      },
      {
        id: '2',
        descricao: 'Transporte por aplicativo',
        valor: 32.5,
        data: new Date(agora - 1000 * 60 * 60 * 12),
        categoria: 'Transporte',
      },
      {
        id: '3',
        descricao: 'Conta de internet',
        valor: 119.9,
        data: new Date(agora - 1000 * 60 * 60 * 24 * 10),
        categoria: 'Contas',
      },
    ];
  });

  function adicionarDespesa(despesa) {
    setDespesas((despesasAtuais) => [despesa, ...despesasAtuais]);
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: '#173f35',
          headerTitleStyle: styles.headerTitle,
          contentStyle: styles.screen,
        }}
      >
        <Stack.Screen name="Principal" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator
              screenOptions={{
                headerStyle: styles.header,
                headerTintColor: '#173f35',
                headerTitleStyle: styles.headerTitle,
                tabBarActiveTintColor: '#24745a',
                tabBarInactiveTintColor: '#79817e',
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabLabel,
              }}
            >
              <Tab.Screen
                name="Recentes"
                options={{ title: 'Despesas recentes' }}
              >
                {(screenProps) => (
                  <DespesasRecentes {...screenProps} despesas={despesas} />
                )}
              </Tab.Screen>
              <Tab.Screen
                name="Todas"
                options={{
                  title: 'Todas as despesas',
                  tabBarLabel: 'Todas as Despesas',
                }}
              >
                {(screenProps) => (
                  <TodasDespesas {...screenProps} despesas={despesas} />
                )}
              </Tab.Screen>
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="GerenciarDespesa"
          options={{ title: 'Nova despesa', presentation: 'modal' }}
        >
          {(screenProps) => (
            <GerenciarDespesa
              {...screenProps}
              onSalvarDespesa={adicionarDespesa}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f7f8f6',
  },
  headerTitle: {
    color: '#173f35',
    fontSize: 18,
    fontWeight: '700',
  },
  screen: {
    backgroundColor: '#f7f8f6',
  },
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopColor: '#e5e9e6',
    height: 62,
    paddingBottom: 7,
    paddingTop: 5,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
