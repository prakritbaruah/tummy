import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useAppSelector } from '../store';
import { FoodEntry } from '../store/foodSlice';
import { SymptomEntry } from '../store/symptomsSlice';

export default function AnalyticsScreen() {
  const foodEntries = useAppSelector((state) => state.food.entries);
  const symptomEntries = useAppSelector((state) => state.symptoms.entries);

  // Simple correlation analysis
  const analyzeCorrelations = () => {
    const correlations: { food: string; symptom: string; count: number }[] = [];
    
    // For each food entry, look for symptoms within 24 hours
    foodEntries.forEach((food: FoodEntry) => {
      const foodTime = food.timestamp;
      const timeWindow = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      symptomEntries.forEach((symptom: SymptomEntry) => {
        const timeDiff = Math.abs(symptom.timestamp - foodTime);
        if (timeDiff <= timeWindow) {
          const existingCorrelation = correlations.find(
            (c) => c.food === food.name && c.symptom === symptom.name
          );
          
          if (existingCorrelation) {
            existingCorrelation.count++;
          } else {
            correlations.push({
              food: food.name,
              symptom: symptom.name,
              count: 1,
            });
          }
        }
      });
    });

    return correlations.sort((a, b) => b.count - a.count);
  };

  const correlations = analyzeCorrelations();

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Food-Symptom Correlations
      </Text>
      <ScrollView style={styles.listContainer}>
        {correlations.map((correlation, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">
                {correlation.food} → {correlation.symptom}
              </Text>
              <Text variant="bodyMedium">
                Occurred together {correlation.count} times
              </Text>
            </Card.Content>
          </Card>
        ))}
        {correlations.length === 0 && (
          <Text style={styles.noData}>
            No correlations found yet. Add more food and symptom entries to see patterns.
          </Text>
        )}
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
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
  },
  card: {
    marginBottom: 8,
  },
  noData: {
    textAlign: 'center',
    marginTop: 32,
    fontStyle: 'italic',
  },
}); 