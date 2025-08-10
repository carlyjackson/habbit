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
          name='home'
          component={HomeScreen}
          options={{
            tabBarLabel: 'home',
            tabBarLabelStyle: { fontFamily: 'Nunito' },
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name='home' color={color} size={size} />
            ),
            tabBarActiveTintColor: '#F6A98D',
          }}
        />
        <Tab.Screen
          name='habbits'
          component={HabbitScreen}
          options={{
            tabBarLabel: 'habbits',
            tabBarLabelStyle: { fontFamily: 'Nunito' },
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <MaterialCommunityIcons name='rabbit' size={size} color={color} />
            ),
            tabBarActiveTintColor: '#88C7B2',
          }}
        />
        <Tab.Screen
          name='chat'
          component={ChatScreen}
          options={{
            tabBarLabel: 'chat',
            tabBarLabelStyle: { fontFamily: 'Nunito' },
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name='chatbubbles-outline' size={size} color={color} />
            ),
            tabBarActiveTintColor: '#F5DA8C',
          }}
        />

        <Tab.Screen
          name='tracking'
          component={TrackingScreen}
          options={{
            tabBarLabel: 'tracking',
            tabBarLabelStyle: { fontFamily: 'Nunito' },
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <FontAwesome6 name='carrot' size={size} color={color} />
            ),
            tabBarActiveTintColor: '#EB6A55',
          }}
        />
        <Tab.Screen
          name='progress'
          component={ProgressScreen}
          options={{
            tabBarLabel: 'progress',
            tabBarLabelStyle: { fontFamily: 'Nunito' },
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Entypo name='line-graph' size={size} color={color} />
            ),

            tabBarActiveTintColor: '#B892C4',
          }}
        />
        <Tab.Screen
          name='settings'
          component={SettingsScreen}
          options={{
            tabBarLabel: 'settings',
            tabBarLabelStyle: { fontFamily: 'Nunito' },
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
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
