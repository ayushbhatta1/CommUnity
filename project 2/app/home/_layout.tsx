import { Stack } from 'expo-router/stack';
import Colors from '@/constants/Colors';

export default function HomeStackLayout() {
  return (
    <Stack 
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary[600],
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'CommUnity',
          headerShadowVisible: false,
        }} 
      />
      <Stack.Screen 
        name="resource-details" 
        options={{ 
          title: 'Resource Details',
          presentation: 'modal',
        }} 
      />
    </Stack>
  );
}