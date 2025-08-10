import {
  Entypo,
  Feather,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HabbitScreen from './screens/HabbitScreen';
import SettingsScreen from './screens/SettingsScreen';
import TrackingScreen from './screens/TrackingScreen';
import ProgressScreen from './screens/ProgressScreen';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import { View } from 'react-native';
import { PaperProvider } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <PaperProvider>
    <View style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: { fontFamily: 'Nunito' },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='home' color={color} size={size} />
            ),
            tabBarActiveTintColor: '#F6A98D',
          }}
        />
        <Tab.Screen
          name='Habits'
          component={HabbitScreen}
          options={{
            tabBarLabel: 'Habbits',
            tabBarLabelStyle: { fontFamily: 'Nunito' },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='rabbit' size={size} color={color} />
            ),
            tabBarActiveTintColor: '#88C7B2',
          }}
        />
        <Tab.Screen
          name='Chat'
          component={ChatScreen}
          options={{
            tabBarLabel: 'Chat',
            tabBarLabelStyle: { fontFamily: 'Nunito' },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='chatbubbles-outline' size={size} color={color} />
            ),
            tabBarActiveTintColor: '#F5DA8C',
          }}
        />

        <Tab.Screen
          name='Tracking'
          component={TrackingScreen}
          options={{
            tabBarLabel: 'Tracking',
            tabBarLabelStyle: { fontFamily: 'Nunito' },
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name='carrot' size={size} color={color} />
            ),
            tabBarActiveTintColor: '#EB6A55',
          }}
        />
        <Tab.Screen
          name='Progress'
          component={ProgressScreen}
          options={{
            tabBarLabel: 'Progress',
            tabBarLabelStyle: { fontFamily: 'Nunito' },
            tabBarIcon: ({ color, size }) => (
              <Entypo name='line-graph' size={size} color={color} />
            ),

            tabBarActiveTintColor: '#B892C4',
          }}
        />
        <Tab.Screen
          name='Settings'
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarLabelStyle: { fontFamily: 'Nunito' },
            tabBarIcon: ({ color, size }) => (
              <Feather name='settings' size={size} color={color} />
            ),
            tabBarActiveTintColor: '#F7B7B2',
          }}
        />
      </Tab.Navigator>
      </View>
    </PaperProvider>
  )
}
