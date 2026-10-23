import { FlatList, StyleSheet, Text, View } from 'react-native';
import DespesaItem from './DespesaItem';

function EmptyState({ icon, title, message, themeColors }) {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>{icon}</Text>
      <Text style={[styles.emptyTitle, { color: themeColors.text }]}>{title}</Text>
      <Text style={[styles.emptyMessage, { color: themeColors.secondaryText }]}>{message}</Text>
    </View>
  );
}

export default function DespesaLista({
  expenses,
  navigation,
  themeColors,
  ListHeaderComponent,
  emptyTitle,
  emptyMessage,
  emptyIcon,
  keyboardShouldPersistTaps,
}) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(expense) => expense.id}
      renderItem={({ item }) => (
        <DespesaItem
          expense={item}
          themeColors={themeColors}
          onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: item.id })}
        />
      )}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <EmptyState
          icon={emptyIcon}
          title={emptyTitle}
          message={emptyMessage}
          themeColors={themeColors}
        />
      }
      contentContainerStyle={styles.listContent}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    padding: 18,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 42,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 8,
  },
});
