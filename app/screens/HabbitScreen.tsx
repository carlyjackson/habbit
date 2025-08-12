import { Text, View, Modal } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect } from 'react';
import CreateHabbitForm from '../components/CreateHabbitForm';
import HabbitList from '../components/HabbitList';

interface Habbit {
  id: number;
  name: string;
  description?: string;
  category: string;
}

export default function HabbitScreen() {
  const [modalVisible, setModalVisible] = useState(false);
   const [habbits, setHabbits] = useState<Habbit[]>([]);

    useEffect(() => {
      fetchHabbits();
    }, []);
  
  const fetchHabbits = async () => {
        try {
          const response = await fetch('http://localhost:3000/habbits');
          const data = await response.json();
          setHabbits(data.habbits.sort((a: Habbit, b: Habbit) => a.id - b.id));
        } catch (error) {
          console.error('Error fetching habbits:', error);
        }
      };
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F9F4EC',
        paddingHorizontal: 24,
        paddingTop: 48,
        paddingBottom: 16,
      }}
    >
      <Text
        style={{
          fontFamily: 'Nunito_700Bold',
          fontSize: 28,
          color: '#556B2F', 
          marginBottom: 12,
        }}
      >
        Habbit Setup 🐰🥕
      </Text>

      <Text
        style={{
          fontFamily: 'Nunito_400Regular',
          fontSize: 16,
          color: '#6B8E23',
          marginBottom: 24,
        }}
      >
        Create and manage your habbits with Bun’s help!
      </Text>

      <Button
        textColor='#F9F4EC'
        labelStyle={{ fontFamily: 'Nunito_700Bold', fontSize: 14 }}
        buttonColor='#88C7B2' 
        mode='elevated'
        icon={({ size, color }) => (
          <MaterialCommunityIcons name='rabbit' size={size} color={color} />
        )}
        contentStyle={{ flexDirection: 'row-reverse' }}
        onPress={() => setModalVisible(true)}
        style={{ marginBottom: 24 }}
      >
        Create a new habbit
      </Button>

      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <HabbitList habbits={habbits} setHabbits={setHabbits} />
      </View>

      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: '#F9F4EC',
            padding: 24,
          }}
        >
          <CreateHabbitForm onClose={() => {
          fetchHabbits(); // refetch after create to update list
          setModalVisible(false);
        }} />

          <Button
            mode='contained'
            textColor='#F9F4EC'
            buttonColor='#88C7B2'
            onPress={() => setModalVisible(false)}
            style={{ marginTop: 16 }}
          >
            Cancel
          </Button>
        </View>
      </Modal>
    </View>
  );
}
