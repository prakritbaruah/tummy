import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Card, SegmentedButtons, useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useAppDispatch, useAppSelector } from '../store';
import { addSymptomEntry } from '../store/symptomsSlice';
import { Timing } from '../types/common';
import { 
  SYMPTOMS, 
  Severity, 
  SymptomData,
  SymptomEntry 
} from '../types/symptoms';

export default function SymptomsScreen() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomInputs, setSymptomInputs] = useState<SymptomData[]>([]);
  const theme = useTheme();
  
  const dispatch = useAppDispatch();

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptom)) {
        // Remove symptom input when unselected
        setSymptomInputs(inputs => inputs.filter(input => input.name !== symptom));
        return prev.filter(s => s !== symptom);
      } else {
        // Add new symptom input with default values
        setSymptomInputs(inputs => [...inputs, {
          name: symptom as typeof SYMPTOMS[number],
          timing: 'Morning',
          severity: 'Moderate'
        }]);
        return [...prev, symptom];
      }
    });
  };

  const handleInputChange = (symptom: string, field: 'timing' | 'severity', value: Timing | Severity | number) => {
    if (field === 'severity' && typeof value === 'number') {
      // Convert slider value to severity level
      const severityLevels: Severity[] = ['Low', 'Mild', 'Moderate', 'High', 'Severe'];
      const index = Math.round(value * (severityLevels.length - 1));
      value = severityLevels[index];
    }
    
    setSymptomInputs(inputs => 
      inputs.map(input => 
        input.name === symptom 
          ? { ...input, [field]: value }
          : input
      )
    );
  };

  const handleAddAllSymptoms = () => {
    symptomInputs.forEach(input => {
      const newEntry: SymptomEntry = {
        ...input,
        id: Date.now().toString() + input.name,
        timestamp: Date.now(),
      };
      dispatch(addSymptomEntry(newEntry));
    });
    
    // Clear all selections
    setSelectedSymptoms([]);
    setSymptomInputs([]);
  };

  const getSeverityValue = (severity: Severity): number => {
    const severityLevels: Severity[] = ['Low', 'Mild', 'Moderate', 'High', 'Severe'];
    return severityLevels.indexOf(severity) / (severityLevels.length - 1);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text variant="headlineMedium" style={styles.heading}>
        Track your symptoms
      </Text>
      <Text variant="titleMedium" style={styles.label}>Select Symptoms</Text>
      <View style={styles.checklist}>
        {SYMPTOMS.map((symptom) => (
          <TouchableOpacity 
            key={symptom} 
            style={[
              styles.checkboxRow,
              selectedSymptoms.includes(symptom) && styles.selectedRow
            ]}
            onPress={() => handleSymptomToggle(symptom)}
          >
            <Text 
              style={[
                styles.checkboxLabel,
                selectedSymptoms.includes(symptom) && styles.selectedText
              ]}
            >
              {symptom}
            </Text>
            <Text style={styles.checkmark}>
              {selectedSymptoms.includes(symptom) ? '✓' : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {symptomInputs.map((input) => (
        <Card key={input.name} style={styles.symptomCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.symptomTitle}>{input.name}</Text>
            
            <Text variant="titleSmall" style={styles.label}>Timing</Text>
            <SegmentedButtons
              value={input.timing}
              onValueChange={value => handleInputChange(input.name, 'timing', value as Timing)}
              buttons={[
                { value: 'morning', label: 'Morning' },
                { value: 'afternoon', label: 'Afternoon' },
                { value: 'evening', label: 'Evening' },
              ]}
              style={styles.segmentedButtons}
            />

            <Text variant="titleSmall" style={styles.label}>Severity</Text>
            <View style={styles.sliderContainer}>
              <View style={styles.sliderLabels}>
                <Text variant="bodySmall">Low</Text>
                <Text variant="bodySmall">Severe</Text>
              </View>
              <Slider
                value={getSeverityValue(input.severity)}
                onValueChange={(value: number) => handleInputChange(input.name, 'severity', value)}
                minimumValue={0}
                maximumValue={1}
                step={0.25}
                style={styles.slider}
                minimumTrackTintColor="#1976d2"
                maximumTrackTintColor="#e0e0e0"
                thumbTintColor="#1976d2"
              />
              <Text variant="bodyMedium" style={styles.currentSeverity}>
                {input.severity.charAt(0).toUpperCase() + input.severity.slice(1)}
              </Text>
            </View>
          </Card.Content>
        </Card>
      ))}

      {symptomInputs.length > 0 && (
        <Button 
          mode="contained" 
          onPress={handleAddAllSymptoms}
          style={styles.addAllButton}
        >
          Add Symptoms
        </Button>
      )}


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
  },
  heading: {
    marginBottom: 24,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  symptomCard: {
    marginBottom: 16,
    elevation: 2,
  },
  label: {
    marginBottom: 8,
    marginTop: 16,
    fontWeight: '600',
  },
  symptomTitle: {
    marginBottom: 16,
    color: '#1976d2',
  },
  checklist: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    elevation: 1,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedRow: {
    backgroundColor: '#e3f2fd',
    borderRadius: 4,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    color: '#1976d2',
    fontWeight: '500',
  },
  checkmark: {
    color: '#1976d2',
    fontSize: 18,
    fontWeight: 'bold',
  },
  segmentedButtons: {
    marginBottom: 16,
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
  currentSeverity: {
    textAlign: 'center',
    marginTop: 8,
    color: '#1976d2',
    fontWeight: '500',
  },
  addAllButton: {
    marginTop: 8,
    marginBottom: 24,
  },
}); 