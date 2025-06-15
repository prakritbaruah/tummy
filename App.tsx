import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './src/store';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import FoodLogScreen from './src/screens/FoodLogScreen';
import SymptomsScreen from './src/screens/SymptomsScreen';
import BowelScreen from './src/screens/BowelScreen';
import DailyLogScreen from './src/screens/DailyLogScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen 
              name="Home" 
              component={HomeScreen}
              options={{
                title: 'Home'
              }}
            />
            <Tab.Screen 
              name="FoodLog" 
              component={FoodLogScreen}
              options={{
                title: 'Food Log'
              }}
            />
            <Tab.Screen 
              name="Symptoms" 
              component={SymptomsScreen}
              options={{
                title: 'Symptoms'
              }}
            />
            <Tab.Screen 
              name="Bowel" 
              component={BowelScreen}
              options={{
                title: 'Bowel'
              }}
            />
            <Tab.Screen 
              name="DailyLog" 
              component={DailyLogScreen}
              options={{
                title: 'Daily Log'
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}
