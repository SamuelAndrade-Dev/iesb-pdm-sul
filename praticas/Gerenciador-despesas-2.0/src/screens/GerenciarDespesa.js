import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CATEGORIES } from '../constants/categories';
import { useExpenses } from '../store/expenses-context';
import { useTheme } from '../store/theme-context';

const initialForm = {
  description: '',
  amount: '',
  date: new Date(),
  category: '',
};

export function validate(values) {
  const errors = {};
  const description = values.description.trim();
  const amount = Number.parseFloat(values.amount);
  const date = values.date instanceof Date ? values.date : new Date(values.date);

  if (description.length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    errors.amount = 'Informe um valor maior que zero.';
  }
  if (Number.isNaN(date.getTime()) || date.getTime() > Date.now()) {
    errors.date = 'A data não pode ser futura.';
  }
  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }

  return errors;
}

function createForm(expense) {
  if (!expense) {
    return { ...initialForm, date: new Date() };
  }

  return {
    description: expense.description,
    amount: String(expense.amount),
    date: new Date(expense.date),
    category: expense.category,
  };
}

function FormField({ label, error, children, themeColors }) {
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: themeColors.text }]}>{label}</Text>
      {children}
      {error ? (
        <Text
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          style={[styles.errorText, { color: themeColors.danger }]}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

export default function GerenciarDespesa({ navigation, route }) {
  const { expenses, addExpense, updateExpense, deleteExpense, isLoaded } = useExpenses();
  const { themeMode, themeColors, toggleTheme } = useTheme();
  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);
  const expense = expenses.find((item) => item.id === expenseId);
  const [form, setForm] = useState(() => createForm(expense));
  const [errors, setErrors] = useState({});
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  useEffect(() => {
    if (isEditing && isLoaded && expense) {
      setForm(createForm(expense));
    }
  }, [expense, isEditing, isLoaded]);

  const confirmDelete = useCallback(() => {
    if (!expense) {
      return;
    }

    Alert.alert('Excluir despesa', 'Tem certeza de que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expense.id);
          navigation.goBack();
        },
      },
    ]);
  }, [deleteExpense, expense, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
      headerRight: () => (
        <View style={styles.headerActions}>
          {isEditing ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Excluir despesa"
              onPress={confirmDelete}
              hitSlop={10}
              style={styles.headerButton}
            >
              <Text style={[styles.headerButtonText, { color: themeColors.danger }]}>
                Excluir
              </Text>
            </Pressable>
          ) : null}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Ativar modo ${themeMode === 'dark' ? 'claro' : 'escuro'}`}
            onPress={toggleTheme}
            hitSlop={10}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>{themeMode === 'dark' ? '☀️' : '🌙'}</Text>
          </Pressable>
        </View>
      ),
    });
  }, [confirmDelete, isEditing, navigation, themeColors.danger, themeMode, toggleTheme]);

  function handleChange(field, value) {
    const nextForm = { ...form, [field]: value };
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    const fieldError = validate(nextForm)[field];
    setErrors((currentErrors) => {
      if (!fieldError) {
        const { [field]: removedError, ...remainingErrors } = currentErrors;
        return remainingErrors;
      }
      return { ...currentErrors, [field]: fieldError };
    });
  }

  function handleAmountChange(value) {
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      handleChange('amount', value);
    }
  }

  function handleSave() {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const savedExpense = {
      id: isEditing ? expense.id : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      description: form.description.trim(),
      amount: Number.parseFloat(form.amount),
      date: form.date.toISOString(),
      category: form.category,
    };

    if (isEditing) {
      updateExpense(savedExpense);
    } else {
      addExpense(savedExpense);
    }
    navigation.goBack();
  }

  function handleDateChange(event, selectedDate) {
    if (Platform.OS === 'android') {
      setDatePickerVisible(false);
    }
    if (selectedDate) {
      handleChange('date', selectedDate);
    }
  }

  if (isEditing && isLoaded && !expense) {
    return (
      <View style={[styles.missingExpense, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.missingMessage, { color: themeColors.text }]}>
          Esta despesa não está mais disponível.
        </Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  const fieldStyle = (field) => [
    styles.input,
    {
      backgroundColor: themeColors.input,
      borderColor: errors[field] ? themeColors.danger : themeColors.border,
      color: themeColors.text,
    },
  ];

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: themeColors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {Object.keys(errors).length > 0 ? (
          <View
            accessibilityRole="alert"
            style={[
              styles.errorSummary,
              {
                backgroundColor: themeColors.surface,
                borderColor: themeColors.danger,
              },
            ]}
          >
            <Text style={[styles.errorSummaryTitle, { color: themeColors.danger }]}>
              Não foi possível salvar a despesa.
            </Text>
            <Text style={[styles.errorSummaryMessage, { color: themeColors.text }]}>
              Corrija os campos indicados abaixo e tente novamente.
            </Text>
          </View>
        ) : null}

        <FormField label="Descrição" error={errors.description} themeColors={themeColors}>
          <TextInput
            accessibilityLabel="Descrição"
            value={form.description}
            onChangeText={(value) => handleChange('description', value)}
            placeholder="Ex.: Compra no mercado"
            placeholderTextColor={themeColors.secondaryText}
            maxLength={80}
            style={fieldStyle('description')}
          />
        </FormField>

        <FormField label="Valor" error={errors.amount} themeColors={themeColors}>
          <TextInput
            accessibilityLabel="Valor"
            value={form.amount}
            onChangeText={handleAmountChange}
            placeholder="0,00"
            placeholderTextColor={themeColors.secondaryText}
            keyboardType="decimal-pad"
            style={fieldStyle('amount')}
          />
        </FormField>

        <FormField label="Data" error={errors.date} themeColors={themeColors}>
          <Pressable
            accessibilityRole="button"
            onPress={() => setDatePickerVisible((visible) => !visible)}
            style={[fieldStyle('date'), styles.selectionButton]}
          >
            <Text style={{ color: themeColors.text }}>
              {new Intl.DateTimeFormat('pt-BR').format(form.date)}
            </Text>
            <Text style={{ color: themeColors.secondaryText }}>Selecionar data</Text>
          </Pressable>
          {isDatePickerVisible ? (
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={form.date}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                maximumDate={new Date()}
                onChange={handleDateChange}
              />
              {Platform.OS === 'ios' ? (
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setDatePickerVisible(false)}
                  style={styles.datePickerDone}
                >
                  <Text style={{ color: themeColors.primary, fontWeight: '700' }}>Concluir</Text>
                </Pressable>
              ) : null}
            </View>
          ) : null}
        </FormField>

        <FormField label="Categoria" error={errors.category} themeColors={themeColors}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Escolher categoria"
            onPress={() => setCategoryModalVisible(true)}
            style={[fieldStyle('category'), styles.selectionButton]}
          >
            <Text style={{ color: form.category ? themeColors.text : themeColors.secondaryText }}>
              {form.category || 'Selecione uma categoria'}
            </Text>
            <Text style={{ color: themeColors.secondaryText }}>⌄</Text>
          </Pressable>
        </FormField>

        <Pressable
          accessibilityRole="button"
          onPress={handleSave}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>
            {isEditing ? 'Salvar alterações' : 'Salvar despesa'}
          </Text>
        </Pressable>
      </ScrollView>

      <Modal
        transparent
        animationType="slide"
        visible={isCategoryModalVisible}
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: themeColors.overlay }]}>
          <View style={[styles.modalContent, { backgroundColor: themeColors.surface }]}>
            <View style={styles.modalHeading}>
              <Text style={[styles.modalTitle, { color: themeColors.text }]}>Categoria</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setCategoryModalVisible(false)}
                hitSlop={10}
              >
                <Text style={{ color: themeColors.primary, fontWeight: '600' }}>Fechar</Text>
              </Pressable>
            </View>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                accessibilityRole="button"
                onPress={() => {
                  handleChange('category', category);
                  setCategoryModalVisible(false);
                }}
                style={[styles.categoryOption, { borderBottomColor: themeColors.border }]}
              >
                <Text style={[styles.categoryText, { color: themeColors.text }]}>{category}</Text>
                {form.category === category ? (
                  <Text style={{ color: themeColors.primary, fontWeight: '700' }}>✓</Text>
                ) : null}
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 36,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 50,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  selectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 6,
  },
  errorSummary: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  errorSummaryTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  errorSummaryMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: '#3867D6',
    minHeight: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  headerButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  headerButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickerContainer: {
    marginTop: 8,
  },
  datePickerDone: {
    alignItems: 'flex-end',
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  modalHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  categoryOption: {
    minHeight: 52,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 16,
  },
  missingExpense: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  missingMessage: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
  },
});
