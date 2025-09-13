import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CombinedNavigator from './CombinedNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <CombinedNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
