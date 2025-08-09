import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, Image } from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome6,
  Entypo,
  Feather
} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFE7D3',
      }}
    >
      <Image
        source={require('../assets/images/habbit_logo.png')}
        style={{
          width: 200,
          height: 200,
          marginBottom: 20,
          borderRadius: 100,
        }}
      />
      <Text
        style={{
          fontFamily: 'Nunito',
          color: '#B892C4',
          fontWeight: 'bold',
          fontSize: 20,
          margin: 20,
        }}
      >
        Welcome to habbit!
      </Text>
      <Text
        style={{
          fontFamily: 'Nunito',
          color: '#88C7B2',
          fontWeight: 'bold',
          fontSize: 13,
          marginBottom: 20,
        }}
      >
        Let&apos;s start your habit tracking journey. 🥕
      </Text>
      <Text
        style={{
          fontFamily: 'Nunito',
          color: '#F6A98D',
          fontWeight: 'bold',
          fontSize: 13,
          marginBottom: 20,
        }}
      >
        Hop down to the tabs below to explore the app!
      </Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
    </View>
  );
}

function HabitSetUpScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Habit Setup Screen</Text>
    </View>
  );
}

function ProgressScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Progress Screen</Text>
    </View>
  );
}

function TrackingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tracking Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Habits'
        component={HabitSetUpScreen}
        options={{
          tabBarLabel: 'Habbits',
          tabBarIcon: () => (
            <MaterialCommunityIcons name='rabbit' size={24} color='black' />
          ),
        }}
      />
      <Tab.Screen
        name='Tracking'
        component={TrackingScreen}
        options={{
          tabBarLabel: 'Tracking',
          tabBarIcon: () => (
            <FontAwesome6 name='carrot' size={24} color='black' />
          ),
        }}
      />
      <Tab.Screen
        name='Progress'
        component={ProgressScreen}
        options={{
          tabBarLabel: 'Progress',
          tabBarIcon: () => (
            <Entypo name='line-graph' size={24} color='black' />
          ),
        }}
      />
      <Tab.Screen 
      name='Settings' 
      component={SettingsScreen} 
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: () => (
         <Feather name="settings" size={24} color="black" />
        ),
      }}/>
    </Tab.Navigator>
  );
}
