import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, SegmentedButtons } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useAppDispatch, useAppSelector } from '../store';
import { addBowelEntry, BowelEntry, Timing } from '../store/bowelSlice';

export default function BowelScreen() {
  const [urgency, setUrgency] = useState(3);
  const [consistency, setConsistency] = useState(4);
  const [timing, setTiming] = useState<Timing>('morning');
  const [mucusPresent, setMucusPresent] = useState(false);
  const [bloodPresent, setBloodPresent] = useState(false);
  const [notes, setNotes] = useState('');
  
  const dispatch = useAppDispatch();
  const bowelEntries = useAppSelector((state) => state.bowel.entries);

  const handleAddEntry = () => {
    const newEntry: BowelEntry = {
      id: Date.now().toString(),
      timing,
      urgency,
      consistency,
      mucusPresent,
      bloodPresent,
      timestamp: Date.now(),
    };
    dispatch(addBowelEntry(newEntry));
    
    // Reset form
    setUrgency(0);
    setConsistency(4);
    setTiming('morning');
    setMucusPresent(false);
    setBloodPresent(false);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.inputCard}>
        <Card.Content>
        <Text variant="titleMedium" style={styles.label}>Timing</Text>
          <SegmentedButtons
            value={timing}
            onValueChange={value => setTiming(value as Timing)}
            buttons={[
              { value: 'morning', label: 'Morning' },
              { value: 'afternoon', label: 'Afternoon' },
              { value: 'evening', label: 'Evening' },
            ]}
            style={styles.segmentedButtons}
          />

          <Text variant="titleMedium" style={styles.label}>Urgency</Text>
          <Text style={styles.value}>{urgency}</Text>
          <Slider
            value={urgency}
            onValueChange={setUrgency}
            minimumValue={1}
            maximumValue={5}
            step={1}
            style={styles.slider}
          />

          <Text variant="titleMedium" style={styles.label}>Consistency</Text>
          <Text style={styles.value}>{consistency}</Text>
          <Slider
            value={consistency}
            onValueChange={setConsistency}
            minimumValue={1}
            maximumValue={7}
            step={1}
            style={styles.slider}
          />

          <View style={styles.checkboxContainer}>
            <Button
              mode={mucusPresent ? "contained" : "outlined"}
              onPress={() => setMucusPresent(!mucusPresent)}
              style={styles.checkbox}
            >
              Mucus Present
            </Button>
            <Button
              mode={bloodPresent ? "contained" : "outlined"}
              onPress={() => setBloodPresent(!bloodPresent)}
              style={styles.checkbox}
            >
              Blood Present
            </Button>
          </View>

          <Button mode="contained" onPress={handleAddEntry} style={styles.button}>
            Add Entry
          </Button>
        </Card.Content>
      </Card>

      <ScrollView style={styles.listContainer}>
        {bowelEntries.map((entry) => (
          <Card key={entry.id} style={styles.entryCard}>
            <Card.Content>
              <Text variant="titleMedium">
                {entry.timing.charAt(0).toUpperCase() + entry.timing.slice(1)}
              </Text>
              <Text variant="bodyMedium">
                Urgency: {entry.urgency}/5
              </Text>
              <Text variant="bodyMedium">
                Consistency: {entry.consistency}/7
              </Text>
              <Text variant="bodyMedium">
                {entry.mucusPresent ? 'Mucus Present' : 'No Mucus'}
              </Text>
              <Text variant="bodyMedium">
                {entry.bloodPresent ? 'Blood Present' : 'No Blood'}
              </Text>
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
  label: {
    marginBottom: 8,
  },
  value: {
    textAlign: 'center',
    marginBottom: 4,
  },
  slider: {
    marginBottom: 16,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  checkbox: {
    flex: 1,
    marginHorizontal: 4,
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