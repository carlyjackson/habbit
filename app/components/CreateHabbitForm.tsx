import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function CreateHabbitForm({ onClose }: { onClose: () => void }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      habbitName: '',
      habbitDescription: '',
      habbitCategory: null,
    },
  });

  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Physical Health', value: 'Physical Health' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Nutrition', value: 'Nutrition' },
    { label: 'Social', value: 'Social' },
    { label: 'Mental Health', value: 'Mental Health' },
    { label: 'Hobbies', value: 'Hobbies' },
    { label: 'Other', value: 'Other' },
  ]);

  const onSubmit = (data: any) => {
    fetch('http://localhost:3000/habbits', {
      // replace local host with server URL from AWS
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((response) => {
        console.log('Habbit created successfully:', response);
      })
      .catch((error) => {
        console.error('Error creating habbit:', error);
      });

    onClose(); // closes the modal
  };

  return (
    <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
      <Text>🐰 what daily habbit would you like to track? 🥕</Text>
      <Controller
        control={control}
        rules={{
          required: true, // update this error message to format it better
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ height: 50, width: 300, marginBottom: 30, marginTop: 10 }}
            mode='flat'
            placeholder='name your habbit...'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            accessibilityLabel='Habbit Name'
          />
        )}
        name='habbitName'
      />
      {errors.habbitName && <Text>Habit name is required.</Text>}

      <Text>
        describe this habbit in more detail, if that&apos;s helpful for you!
      </Text>
      <Controller
        control={control}
        rules={{
          maxLength: 200, // update this error message to format it better
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ height: 75, width: 300, marginBottom: 30, marginTop: 10 }}
            mode='flat'
            placeholder='add more info here...'
            multiline
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='habbitDescription'
      />
      <Text>what category does this habbit belong to?</Text>
      <Controller
        control={control}
        rules={{
          required: 'Please select a category.', // update this error message to format it better
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <DropDownPicker
            open={open}
            setOpen={setOpen}
            items={items}
            value={value}
            setValue={(callback) => {
              const val = callback(value);
              onChange(val);
              setValue(val);
            }}
            setItems={setItems}
            placeholder='Select a category'
            style={{ width: 300, marginBottom: 30, marginTop: 10 }}
            dropDownContainerStyle={{ width: 300 }}
          />
        )}
        name='habbitCategory'
      />

      <Button
        mode='contained'
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 20 }}
        labelStyle={{ fontFamily: 'Nunito' }}
        icon={({ size, color }) => (
          <MaterialCommunityIcons name='rabbit' size={size} color={color} />
        )}
        contentStyle={{ flexDirection: 'row-reverse' }}
      >
        create habbit
      </Button>
    </View>
  );
}
