import { Text, View, Modal } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import CreateHabbitForm from '../components/CreateHabbitForm';

export default function HabbitScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F4EC',
      }}
    >
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <CreateHabbitForm />

          <Button
            mode='contained'
            textColor='#F9F4EC'
            buttonColor='#88C7B2'
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text>cancel</Text>
          </Button>
        </View>
      </Modal>
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
      <Button
        textColor='#F9F4EC'
        labelStyle={{ fontFamily: 'Nunito' }}
        buttonColor='#88C7B2'
        mode='elevated'
        icon={({ size, color }) => (
          <MaterialCommunityIcons name='rabbit' size={size} color={color} />
        )}
        contentStyle={{ flexDirection: 'row-reverse' }}
        onPress={() => setModalVisible(true)}
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
