import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useAppDispatch, useAppSelector } from '../store';
import { addSymptomEntry, SymptomEntry } from '../store/symptomsSlice';

export default function SymptomsScreen() {
  const [symptomName, setSymptomName] = useState('');
  const [severity, setSeverity] = useState(3);
  const [notes, setNotes] = useState('');
  const dispatch = useAppDispatch();
  const symptomEntries = useAppSelector((state) => state.symptoms.entries);

  const handleAddSymptom = () => {
    if (symptomName.trim()) {
      const newEntry: SymptomEntry = {
        id: Date.now().toString(),
        name: symptomName.trim(),
        severity,
        timestamp: Date.now(),
        notes: notes.trim() || undefined,
      };
      dispatch(addSymptomEntry(newEntry));
      setSymptomName('');
      setSeverity(3);
      setNotes('');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.inputCard}>
        <Card.Content>
          <TextInput
            label="Symptom Name"
            value={symptomName}
            onChangeText={setSymptomName}
            style={styles.input}
          />
          <Text style={styles.sliderLabel}>Severity: {severity}</Text>
          <Slider
            value={severity}
            onValueChange={setSeverity}
            minimumValue={1}
            maximumValue={5}
            step={1}
            style={styles.slider}
          />
          <TextInput
            label="Notes (optional)"
            value={notes}
            onChangeText={setNotes}
            style={styles.input}
            multiline
          />
          <Button mode="contained" onPress={handleAddSymptom} style={styles.button}>
            Add Symptom Entry
          </Button>
        </Card.Content>
      </Card>

      <ScrollView style={styles.listContainer}>
        {symptomEntries.map((entry: SymptomEntry) => (
          <Card key={entry.id} style={styles.entryCard}>
            <Card.Content>
              <Text variant="titleMedium">{entry.name}</Text>
              <Text variant="bodyMedium">
                Severity: {entry.severity}/5
              </Text>
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
  sliderLabel: {
    marginBottom: 8,
  },
  slider: {
    marginBottom: 16,
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