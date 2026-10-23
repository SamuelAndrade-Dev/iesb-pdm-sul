import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const dateFormatter = new Intl.DateTimeFormat('pt-BR');

export default function DespesaItem({ expense, onPress, themeColors }) {
  const date = new Date(expense.date);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: themeColors.surface, borderColor: themeColors.border },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.details}>
        <Text numberOfLines={1} style={[styles.description, { color: themeColors.text }]}>
          {expense.description}
        </Text>
        <Text style={[styles.metadata, { color: themeColors.secondaryText }]}>
          {expense.category} · {dateFormatter.format(date)}
        </Text>
      </View>
      <Text style={[styles.amount, { color: themeColors.text }]}>
        {currencyFormatter.format(expense.amount)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 76,
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
      },
    }),
  },
  details: {
    flex: 1,
    paddingRight: 12,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
  },
  metadata: {
    fontSize: 13,
    marginTop: 6,
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
});
