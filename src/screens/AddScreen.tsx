import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const { height: screenHeight } = Dimensions.get('window');

export default function AddScreen() {
  const [slideAnim] = useState(new Animated.Value(screenHeight));
  const navigation = useNavigation();

  useEffect(() => {
    // Slide up animation when component mounts
    Animated.timing(slideAnim, {
      toValue: screenHeight * 0.5, // Show panel at 30% from top
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, 
  []);

  const handleClose = () => {
    // Slide down animation before navigating back
    Animated.timing(slideAnim, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      navigation.goBack();
    });
  };

  const handleAddMeal = () => {
    // Navigate directly without animation conflicts
    navigation.navigate('FoodLog' as never);
  };

  const handleAddSymptoms = () => {
    // Navigate directly without animation conflicts
    navigation.navigate('Symptoms' as never);
  };

  const handleAddBowelMovement = () => {
    // Navigate directly without animation conflicts
    navigation.navigate('Bowel' as never);
  };

  return (
    <View style={styles.container}>
      {/* Background overlay */}
      <View style={styles.overlay} />
      
      {/* Sliding panel */}
      <Animated.View style={[styles.panel, { top: slideAnim }]}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.title}>
              What would you like to add?
            </Text>
            
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={handleAddMeal}
                style={styles.button}
                icon="food"
              >
                Add Meal
              </Button>
              
              <Button
                mode="contained"
                onPress={handleAddSymptoms}
                style={styles.button}
                icon="medical-bag"
              >
                Add Symptoms
              </Button>
              
              <Button
                mode="contained"
                onPress={handleAddBowelMovement}
                style={styles.button}
                icon="clipboard-pulse"
              >
                Add Bowel Movement
              </Button>
            </View>
            
            <Button
              mode="outlined"
              onPress={handleClose}
              style={styles.closeButton}
            >
              Cancel
            </Button>
          </Card.Content>
        </Card>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  panel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: screenHeight * 0.7,
    backgroundColor: 'transparent',
  },
  card: {
    flex: 1,
    margin: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#1976d2',
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 24,
  },
  button: {
    paddingVertical: 8,
  },
  closeButton: {
    marginTop: 8,
  },
}); 