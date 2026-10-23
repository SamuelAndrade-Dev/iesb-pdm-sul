import { Pressable, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExpensesContextProvider } from './src/store/expenses-context';
import { ThemeProvider, useTheme } from './src/store/theme-context';
import TodasDespesas from './src/screens/TodasDespesas';
import GerenciarDespesa from './src/screens/GerenciarDespesa';
import DespesasRecentes from './src/screens/DespesasRecentes';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ExpensesTabs() {
  const { themeColors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.secondaryText,
        tabBarStyle: {
          backgroundColor: themeColors.surface,
          borderTopColor: themeColors.border,
        },
      }}
    >
      <Tab.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{ title: 'Todas', tabBarLabel: 'Todas' }}
      />
      <Tab.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{ title: 'Recentes', tabBarLabel: 'Recentes' }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { themeMode, themeColors, toggleTheme } = useTheme();
  const scheme = themeMode;
  const baseNavigationTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...baseNavigationTheme,
    colors: {
      ...baseNavigationTheme.colors,
      background: themeColors.background,
      card: themeColors.surface,
      text: themeColors.text,
      border: themeColors.border,
      primary: themeColors.primary,
    },
  };
  const screenOptions = {
    headerStyle: { backgroundColor: themeColors.surface },
    headerTintColor: themeColors.text,
    headerTitleStyle: { fontWeight: '700' },
    contentStyle: { backgroundColor: themeColors.background },
  };

  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            name="ExpensesTabs"
            component={ExpensesTabs}
            options={({ navigation }) => ({
              title: 'Minhas despesas',
              headerRight: () => (
                <>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Adicionar despesa"
                    onPress={() => navigation.navigate('GerenciarDespesa')}
                    hitSlop={10}
                    style={{ paddingHorizontal: 8 }}
                  >
                    <Text style={{ color: themeColors.primary, fontSize: 28, fontWeight: '600' }}>
                      +
                    </Text>
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Ativar modo ${scheme === 'dark' ? 'claro' : 'escuro'}`}
                    onPress={toggleTheme}
                    hitSlop={10}
                    style={{ paddingHorizontal: 8 }}
                  >
                    <Text style={{ fontSize: 20 }}>{scheme === 'dark' ? '☀️' : '🌙'}</Text>
                  </Pressable>
                </>
              ),
            })}
          />
          <Stack.Screen
            name="GerenciarDespesa"
            component={GerenciarDespesa}
            options={{ title: 'Nova despesa' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ExpensesContextProvider>
        <AppNavigator />
      </ExpensesContextProvider>
    </ThemeProvider>
  );
}
