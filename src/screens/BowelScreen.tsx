import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, SegmentedButtons } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useAppDispatch, useAppSelector } from '../store';
import { addBowelEntry, BowelEntry, Timing, Urgency } from '../store/bowelSlice';

export default function BowelScreen() {
  const [urgency, setUrgency] = useState<Urgency>('low');
  const [consistency, setConsistency] = useState(4);
  const [timing, setTiming] = useState<Timing>('morning');
  const [mucusPresent, setMucusPresent] = useState(false);
  const [bloodPresent, setBloodPresent] = useState(false);
  
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
    setUrgency('low');
    setConsistency(4);
    setTiming('morning');
    setMucusPresent(false);
    setBloodPresent(false);
  };

  const getUrgencyValue = (urgency: Urgency): number => {
    const urgencyLevels: Urgency[] = ['low', 'medium', 'high'];
    return urgencyLevels.indexOf(urgency) / (urgencyLevels.length - 1);
  };

  const getUrgencyFromValue = (value: number): Urgency => {
    const urgencyLevels: Urgency[] = ['low', 'medium', 'high'];
    const index = Math.round(value * (urgencyLevels.length - 1));
    return urgencyLevels[index];
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
          <View style={styles.sliderContainer}>
            <View style={styles.sliderLabels}>
              <Text variant="bodySmall">Low</Text>
              <Text variant="bodySmall">High</Text>
            </View>
            <Slider
              value={getUrgencyValue(urgency)}
              onValueChange={(value) => setUrgency(getUrgencyFromValue(value))}
              minimumValue={0}
              maximumValue={1}
              step={0.5}
              style={styles.slider}
              minimumTrackTintColor="#1976d2"
              maximumTrackTintColor="#e0e0e0"
              thumbTintColor="#1976d2"
            />
            <Text variant="bodyMedium" style={styles.currentValue}>
              {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
            </Text>
          </View>

          <Text variant="titleMedium" style={styles.label}>Consistency</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderLabels}>
              <Text variant="bodySmall">Hard</Text>
              <Text variant="bodySmall">Liquid</Text>
            </View>
            <Slider
              value={consistency}
              onValueChange={setConsistency}
              minimumValue={1}
              maximumValue={7}
              step={1}
              style={styles.slider}
              minimumTrackTintColor="#1976d2"
              maximumTrackTintColor="#e0e0e0"
              thumbTintColor="#1976d2"
            />
            <Text variant="bodyMedium" style={styles.currentValue}>
              Type {consistency}
            </Text>
          </View>

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
                Bowel movement
              </Text>
              <Text variant="bodyMedium">
                Timing: {entry.timing.charAt(0).toUpperCase() + entry.timing.slice(1)}
              </Text>
              <Text variant="bodyMedium">
                Urgency: {entry.urgency.charAt(0).toUpperCase() + entry.urgency.slice(1)}
              </Text>
              <Text variant="bodyMedium">
                Consistency: Type {entry.consistency}
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
  sliderContainer: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  slider: {
    height: 40,
  },
  currentValue: {
    textAlign: 'center',
    marginTop: 8,
    color: '#1976d2',
    fontWeight: '500',
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