import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Entypo from '@expo/vector-icons/Entypo';

export default function HabbitScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F4EC',
      }}
    >
      <Text
        style={{
          fontFamily: 'Nunito',
          fontWeight: 'bold',
          fontSize: 24,
          marginBottom: 20,
        }}
      >
        Habbit Setup Screen
      </Text>
      <Text style={{ fontFamily: 'Nunito', fontSize: 16, marginBottom: 20 }}>
        Here you can create and manage your habbits!
      </Text>
      {/* button to create a new habbit */}
      <Button
        textColor='#F9F4EC'
        buttonColor='#88C7B2'
        mode='elevated'
        icon={({ size, color }) => (
          <Entypo name='add-to-list' size={size} color={color} style={{margin: 2}} />
        )}
        onPress={() => console.log('Pressed')}
      >
        create a new habbit
      </Button>
      {/* list of existing habbits */}
    </View>
  );
}
// goal is to create a screen where users can set up their habbits
// this will include a form to input a label for the habbit, a description, and a frequency/time for the habit
// the form will be submitted and the habit will be saved to a database with the help of a GraphQL mutation
// the user can click a button to create a new habbit, which will open a modal with the form
// the user can also view their existing habbits in a list, and click on a habbit to view its details
// the user can also edit or delete a habbit from the list
