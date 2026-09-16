import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export default function CompromissoInput({ value, onChangeText, onAdd, labels }) {
  return (
    <View style={styles.containerInput}>
      <TextInput
        style={styles.input}
        placeholder={labels.placeholderCompromisso}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
      />
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed
        ]}
        android_ripple={{ color: '#003B73' }}
        onPress={onAdd}
      >
        <Text style={styles.buttonText}>{labels.botaoAdicionar}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  input: {
    width: '70%',
    height: 48,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    fontSize: 14,
  },
  button: {
    width: '26%',
    height: 48,
    backgroundColor: '#0056B3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});