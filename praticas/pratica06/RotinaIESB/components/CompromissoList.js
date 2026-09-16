import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function CompromissoList({ itens, onDelete, tituloLista, listaVazia }) {
  return (
    <View style={styles.containerLista}>
      <Text style={styles.titulo}>{tituloLista}</Text>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={itens.length === 0 ? styles.listEmptyContainer : undefined}
        ListEmptyComponent={<Text style={styles.emptyText}>{listaVazia}</Text>}
        renderItem={({ item }) => (
          <View style={styles.cardItem}>
            <View style={styles.infoText}>
              <Text style={styles.itemTexto}>{item.texto}</Text>
              <Text style={styles.itemData}>{item.criadoEm}</Text>
            </View>
            <Pressable
              style={({ pressed }) => [styles.deleteButton, pressed && styles.deleteButtonPressed]}
              android_ripple={{ color: '#FFD2D2' }}
              onPress={() => onDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Remover</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerLista: { flex: 1, width: '100%' },
  titulo: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  listEmptyContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#777', fontSize: 14, textAlign: 'center' },
  cardItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#FFF', padding: 14, borderRadius: 8, marginBottom: 10,
    borderLeftWidth: 4, borderLeftColor: '#0056B3', elevation: 1,
  },
  infoText: { flex: 1, marginRight: 10 },
  itemTexto: { fontSize: 15, color: '#222', fontWeight: '500' },
  itemData: { fontSize: 11, color: '#888', marginTop: 4 },
  deleteButton: { backgroundColor: '#DC3545', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, overflow: 'hidden' },
  deleteButtonPressed: { opacity: 0.7 },
  deleteButtonText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
});
