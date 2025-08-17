import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function CreateHabbitForm({ onClose }: { onClose: () => void }) {
  const {
    control,
    handleSubmit, // wrapper for onSubmit - handles validation
    formState: { errors }, // validation error messages for each field
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
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log('Habbit created successfully:', response);
      })
      .catch((error) => {
        console.error('Error creating habbit:', error);
      });

    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🐰 What daily habbit would you like to track? 🥕</Text>

      <Controller
        control={control}
        rules={{ required: 'Please enter a habbit name!' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.habbitName && styles.inputError]}
            mode="flat"
            placeholder="Name your habbit..."
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            accessibilityLabel="Habbit Name"
            error={!!errors.habbitName}
          />
        )}
        name="habbitName"
      />
      {errors.habbitName && <Text style={styles.errorText}>{errors.habbitName.message}</Text>}

      <Text style={styles.label}>Describe this habbit in more detail, if you like:</Text>
      <Controller
        control={control}
        rules={{ maxLength: { value: 200, message: 'Max 200 characters' } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.textarea, errors.habbitDescription && styles.inputError]}
            mode="flat"
            placeholder="Add more info here..."
            multiline
            numberOfLines={4}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.habbitDescription}
          />
        )}
        name="habbitDescription"
      />
      {errors.habbitDescription && <Text style={styles.errorText}>{errors.habbitDescription.message}</Text>}

      <Text style={styles.label}>What category does this habbit belong to?</Text>
      <Controller
        control={control}
        rules={{ required: 'Please select a category.' }}
        render={({ field: { onChange, value } }) => (
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={(callback) => {
              const val = callback(value);
              onChange(val);
              setValue(val);
            }}
            setItems={setItems}
            placeholder="Select a category"
            style={[styles.dropdown, errors.habbitCategory && styles.inputError]}
            dropDownContainerStyle={styles.dropdownContainer}
            listMode="SCROLLVIEW"
          />
        )}
        name="habbitCategory"
      />
      {errors.habbitCategory && <Text style={styles.errorText}>{errors.habbitCategory.message}</Text>}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.submitButton}
        labelStyle={styles.buttonLabel}
        icon={({ size, color }) => <MaterialCommunityIcons name="rabbit" size={size} color={color} />}
        contentStyle={{ flexDirection: 'row-reverse' }}
      >
        Create habbit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#2e7d32',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    alignSelf: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Nunito_700Bold',
    color: '#4CAF50', // fresh green
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    marginBottom: 8,
    color: '#558B2F',
  },
  input: {
    backgroundColor: '#F0FFF0',
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    marginBottom: 12,
  },
  textarea: {
    backgroundColor: '#F0FFF0',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    marginBottom: 12,
    textAlignVertical: 'top',
  },
  dropdown: {
    backgroundColor: '#F0FFF0',
    borderRadius: 12,
    borderColor: '#A5D6A7',
    marginBottom: 12,
  },
  dropdownContainer: {
    backgroundColor: '#F0FFF0',
    borderRadius: 12,
  },
  inputError: {
    borderColor: '#E57373',
    borderWidth: 1,
  },
  errorText: {
    color: '#E53935',
    marginBottom: 12,
    fontSize: 13,
    fontFamily: 'Nunito_400Regular',
  },
  submitButton: {
    marginTop: 12,
    backgroundColor: '#88C7B2',
    borderRadius: 16,
    height: 50,
    justifyContent: 'center',
  },
  buttonLabel: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    color: '#F9F4EC',
  },
});
