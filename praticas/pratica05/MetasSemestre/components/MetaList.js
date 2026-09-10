import React from 'react';
import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';

export default function MetaList({ metas, onDelete, onToggle }) {
  
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Pressable 
        style={styles.itemContent}
        onPress={() => onToggle(item.id)}
        android_ripple={{ color: '#E0E0E0' }}
      >
        <Text style={[styles.texto, item.concluida && styles.textoConcluida]}>
          {item.texto}
        </Text>
      </Pressable>
      
      <Pressable 
        style={styles.deleteButton} 
        onPress={() => onDelete(item.id)}
        android_ripple={{ color: '#FFCDD2', radius: 20 }}
      >
        <Text style={styles.deleteText}>X</Text>
      </Pressable>
    </View>
  );

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListEmptyComponent={
        <Text style={styles.empty}>Nenhuma meta cadastrada no momento.</Text>
      }
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  itemContent: {
    flex: 1,
    padding: 16,
  },
  texto: {
    fontSize: 16,
    color: '#333',
  },
  textoConcluida: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEbee',
  },
  deleteText: {
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 16,
  },
});