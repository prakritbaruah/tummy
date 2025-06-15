import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './src/store';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import FoodLogScreen from './src/screens/FoodLogScreen';
import SymptomsScreen from './src/screens/SymptomsScreen';
import BowelScreen from './src/screens/BowelScreen';
import DailyLogScreen from './src/screens/DailyLogScreen';
import AddScreen from './src/screens/AddScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen 
        name="Add" 
        component={AddScreen}
        options={{
          title: 'Add',
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('AddModal');
          },
        })}
      />
      <Tab.Screen 
        name="DailyLog" 
        component={DailyLogScreen}
        options={{
          title: 'Daily Log',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Main" 
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="AddModal" 
              component={AddScreen}
              options={{ 
                presentation: 'transparentModal',
                headerShown: false,
                animation: 'slide_from_bottom'
              }}
            />
            <Stack.Screen 
              name="FoodLog" 
              component={FoodLogScreen}
              options={{ title: 'Add Meal' }}
            />
            <Stack.Screen 
              name="Symptoms" 
              component={SymptomsScreen}
              options={{ title: 'Add Symptoms' }}
            />
            <Stack.Screen 
              name="Bowel" 
              component={BowelScreen}
              options={{ title: 'Add Bowel Movement' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}
