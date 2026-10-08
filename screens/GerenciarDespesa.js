import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { formatLocalDate, useExpenses } from '../components/ExpensesContext';

const categories = ['Alimentação', 'Transporte', 'Materiais', 'Estudos', 'Mensalidade', 'Moradia', 'Lazer', 'Outros'];

export default function GerenciarDespesa({ navigation }) {
  const { addExpense } = useExpenses();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Alimentação');
  const [error, setError] = useState('');

  function handleSave() {
    const parsedAmount = Number(amount.trim().replace(',', '.'));

    if (!title.trim()) {
      setError('Informe o nome da despesa.');
      return;
    }
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError('Informe um valor maior que zero.');
      return;
    }

    addExpense({
      title: title.trim(),
      amount: parsedAmount,
      category,
      date: formatLocalDate(),
    });
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.eyebrow}>CONTROLE FINANCEIRO DO ESTUDANTE</Text>
          <Text style={styles.title}>Nova despesa</Text>
          <Text style={styles.subtitle}>
            Registre um gasto do campus ou da rotina para acompanhar seu orçamento.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>O que você pagou?</Text>
          <TextInput
            value={title}
            onChangeText={(value) => {
              setTitle(value);
              setError('');
            }}
            placeholder="Ex.: almoço, passagem, material..."
            placeholderTextColor="#A2ACBA"
            style={styles.input}
            maxLength={60}
            returnKeyType="next"
          />

          <Text style={[styles.label, styles.fieldLabel]}>Valor</Text>
          <View style={styles.amountInputWrap}>
            <Text style={styles.currencyPrefix}>R$</Text>
            <TextInput
              value={amount}
              onChangeText={(value) => {
                setAmount(value);
                setError('');
              }}
              placeholder="0,00"
              placeholderTextColor="#A2ACBA"
              style={styles.amountInput}
              keyboardType="decimal-pad"
              maxLength={12}
            />
          </View>

          <Text style={[styles.label, styles.fieldLabel]}>Categoria</Text>
          <View style={styles.categories}>
            {categories.map((item) => {
              const selected = category === item;
              return (
                <Pressable
                  key={item}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => setCategory(item)}
                  style={({ pressed }) => [
                    styles.categoryChip,
                    selected && styles.selectedChip,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={[styles.categoryText, selected && styles.selectedCategoryText]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable
            accessibilityRole="button"
            onPress={handleSave}
            style={({ pressed }) => [styles.saveButton, pressed && styles.savePressed]}
          >
            <Text style={styles.saveText}>Salvar despesa</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}
          >
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>
        </View>
        <Text style={styles.privacyNote}>
          Seus lançamentos ficam disponíveis enquanto o aplicativo estiver aberto.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  intro: {
    marginTop: 4,
    marginBottom: 20,
  },
  eyebrow: {
    color: '#6F7F96',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  title: {
    marginTop: 7,
    color: '#1B2940',
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    maxWidth: 320,
    marginTop: 6,
    color: '#8994A7',
    fontSize: 13,
    lineHeight: 19,
  },
  formCard: {
    padding: 19,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBEFF5',
  },
  label: {
    marginBottom: 8,
    color: '#293750',
    fontSize: 13,
    fontWeight: '700',
  },
  fieldLabel: {
    marginTop: 19,
  },
  input: {
    minHeight: 49,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    backgroundColor: '#FAFBFD',
    color: '#1B2940',
    fontSize: 14,
  },
  amountInputWrap: {
    minHeight: 57,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    backgroundColor: '#FAFBFD',
  },
  currencyPrefix: {
    color: '#6F7F96',
    fontSize: 15,
    fontWeight: '700',
  },
  amountInput: {
    flex: 1,
    marginLeft: 10,
    color: '#1B2940',
    fontSize: 23,
    fontWeight: '800',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: '#F1F4F8',
  },
  selectedChip: {
    backgroundColor: '#DDF4EC',
  },
  categoryText: {
    color: '#65738B',
    fontSize: 12,
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#27685F',
    fontWeight: '800',
  },
  errorText: {
    marginTop: 13,
    color: '#C44D53',
    fontSize: 12,
    fontWeight: '600',
  },
  saveButton: {
    minHeight: 52,
    marginTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#287D70',
  },
  savePressed: {
    opacity: 0.82,
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  cancelButton: {
    minHeight: 43,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: '#718097',
    fontSize: 13,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.65,
  },
  privacyNote: {
    marginTop: 16,
    color: '#98A2B2',
    fontSize: 11,
    textAlign: 'center',
  },
});
