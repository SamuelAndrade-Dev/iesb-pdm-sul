import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export default function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Adicionar nova meta..."
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
      />
      <Pressable 
        style={styles.button} 
        onPress={onAdd}
        android_ripple={{ color: '#0B79D0' }}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFF',
    fontSize: 16,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});