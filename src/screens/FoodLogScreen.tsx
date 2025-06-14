import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../store';
import { addFoodEntry, FoodEntry } from '../store/foodSlice';

export default function FoodLogScreen() {
  const [foodName, setFoodName] = useState('');
  const [notes, setNotes] = useState('');
  const dispatch = useAppDispatch();
  const foodEntries = useAppSelector((state) => state.food.entries);

  const handleAddFood = () => {
    if (foodName.trim()) {
      const newEntry: FoodEntry = {
        id: Date.now().toString(),
        name: foodName.trim(),
        timestamp: Date.now(),
        notes: notes.trim() || undefined,
      };
      dispatch(addFoodEntry(newEntry));
      setFoodName('');
      setNotes('');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.inputCard}>
        <Card.Content>
          <TextInput
            label="Food Name"
            value={foodName}
            onChangeText={setFoodName}
            style={styles.input}
          />
          <TextInput
            label="Notes (optional)"
            value={notes}
            onChangeText={setNotes}
            style={styles.input}
            multiline
          />
          <Button mode="contained" onPress={handleAddFood} style={styles.button}>
            Add Food Entry
          </Button>
        </Card.Content>
      </Card>

      <ScrollView style={styles.listContainer}>
        {foodEntries.map((entry: FoodEntry) => (
          <Card key={entry.id} style={styles.entryCard}>
            <Card.Content>
              <Text variant="titleMedium">{entry.name}</Text>
              <Text variant="bodyMedium">
                {new Date(entry.timestamp).toLocaleString()}
              </Text>
              {entry.notes && (
                <Text variant="bodySmall" style={styles.notes}>
                  {entry.notes}
                </Text>
              )}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  inputCard: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
  listContainer: {
    flex: 1,
  },
  entryCard: {
    marginBottom: 8,
  },
  notes: {
    marginTop: 4,
    fontStyle: 'italic',
  },
}); 