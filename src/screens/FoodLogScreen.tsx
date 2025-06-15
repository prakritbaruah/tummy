import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';
import { useAppDispatch } from '../store';
import { addFoodEntry } from '../store/foodSlice';
import { FoodEntry } from '../types/food';

export default function FoodLogScreen() {
  const [showTextInput, setShowTextInput] = useState(false);
  const [showMicrophoneText, setShowMicrophoneText] = useState(false);
  const [foodText, setFoodText] = useState('');
  const dispatch = useAppDispatch();

  const handleCameraPress = () => {
    // TODO: Implement camera functionality
    console.log('Camera pressed');
    setShowTextInput(false);
    setShowMicrophoneText(false);
  };

  const handleMicrophonePress = () => {
    // TODO: Implement microphone functionality
    console.log('Microphone pressed');
    setShowMicrophoneText(true);
    setShowTextInput(false);
  };

  const handleWritingPress = () => {
    setShowTextInput(true);
    setShowMicrophoneText(false);
  };

  const handleBarcodePress = () => {
    // TODO: Implement barcode scanning functionality
    console.log('Barcode pressed');
    setShowTextInput(false);
  };

  const handleSubmit = () => {
    if (foodText.trim()) {
      const newEntry: FoodEntry = {
        id: Date.now().toString(),
        name: foodText.trim(),
        quantity: '1 serving',
        timestamp: Date.now(),
      };
      dispatch(addFoodEntry(newEntry));
      setFoodText('');
      setShowTextInput(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.heading}>
        Track your meals
      </Text>
      <View style={styles.buttonRow}>
        <Button
          icon="camera"
          mode="contained"
          onPress={handleCameraPress}
          style={styles.button}
        >
          Camera
        </Button>
        <Button
          icon="microphone"
          mode="contained"
          onPress={handleMicrophonePress}
          style={styles.button}
        >
          Voice
        </Button>
        <Button
          icon="pencil"
          mode="contained"
          onPress={handleWritingPress}
          style={styles.button}
        >
          Text
        </Button>
      </View>

      {showMicrophoneText && (
        <View style={styles.explanationContainer}>
          <Text variant="bodyMedium" style={styles.explanationText}>
            Speak naturally about what you ate and drank today and our AI will do the rest.
          </Text>
        </View>
      )}

      {showTextInput && (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Write naturally about what you ate and drank today and our AI will do the rest."
            value={foodText}
            onChangeText={setFoodText}
            style={styles.textInput}
            multiline
          />
          <Button 
            mode="contained" 
            onPress={handleSubmit} 
            style={styles.submitButton}
          >
            Submit
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    marginBottom: 24,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  explanationContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
  },
  explanationText: {
    color: '#1976d2',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  inputContainer: {
    marginTop: 20,
  },
  textInput: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 8,
  },
}); 