import { Text, View, Image } from 'react-native';

export default function HomeScreen() {
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