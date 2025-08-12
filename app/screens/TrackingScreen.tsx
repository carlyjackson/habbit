import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';

interface Habbit {
  id: number;
  name: string;
  description?: string;
  category: string;
}

export default function TrackingScreen() {
  const [habbits, setHabbits] = useState<Habbit[]>([]);
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const carrotBounce = useRef(new Animated.Value(1)).current;
  const datePulse = useRef(new Animated.Value(1)).current;

  const [fontsLoaded] = useFonts({
    Nunito_700Bold,
    Nunito_400Regular,
  });

  // Animate date text pulse infinitely
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(datePulse, {
          toValue: 1.1,
          duration: 1200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(datePulse, {
          toValue: 1,
          duration: 1200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [datePulse]);

  // Get formatted date string
  const getFormattedDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  useEffect(() => {
    const fetchHabbits = async () => {
      try {
        const res = await fetch('http://localhost:3000/habbits');
        const data = await res.json();
        setHabbits(data.habbits.sort((a: Habbit, b: Habbit) => a.id - b.id));
      } catch (e) {
        console.error('Error fetching habbits:', e);
      }
    };
    fetchHabbits();
  }, []);

  if (!fontsLoaded) return null;

  // Bounce animation when carrot count changes
  const animateCarrots = () => {
    carrotBounce.setValue(1);
    Animated.sequence([
      Animated.timing(carrotBounce, {
        toValue: 1.4,
        duration: 200,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(carrotBounce, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const toggleComplete = (id: number) => {
    setCompleted((prev) => {
      const newCompleted = { ...prev, [id]: !prev[id] };
      animateCarrots();
      return newCompleted;
    });
  };

  const carrotCount = Object.values(completed).filter(Boolean).length;

  const renderHabbit = ({ item }: { item: Habbit }) => {
    const isDone = completed[item.id] || false;

    return (
      <TouchableOpacity
        style={[styles.habbitContainer, isDone && styles.completedHabbit]}
        onPress={() => toggleComplete(item.id)}
        activeOpacity={0.7}
      >
        <Checkbox
          value={isDone}
          onValueChange={() => toggleComplete(item.id)}
          color={isDone ? '#FF9F1C' : undefined} // carrot orange
          style={styles.checkbox}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.habbitName, isDone && styles.completedText]}>
            {item.name}{' '}
            {isDone && <Text style={styles.carrotEmoji}>🥕</Text>}
          </Text>
          {item.description ? (
            <Text style={[styles.habbitDescription, isDone && styles.completedText]}>
              {item.description}
            </Text>
          ) : null}
          <Text style={[styles.habbitCategory, isDone && styles.completedText]}>
            Category: {item.category}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.dateText, { transform: [{ scale: datePulse }] }]}
        accessible={true}
        accessibilityRole="header"
      >
        Your daily carrots for {getFormattedDate()} ✨
      </Animated.Text>
      <Animated.Text style={[styles.carrotCount, { transform: [{ scale: carrotBounce }] }]}>
        🥕 x {carrotCount}
      </Animated.Text>
      <Text style={styles.title}>🐰 Your Habbits Tracker 🥕</Text>
      <FlatList
        data={habbits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderHabbit}
        ListEmptyComponent={<Text style={styles.emptyText}>No habbits yet. Let’s create some! 🌟</Text>}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF0',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  dateText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 8,
    color: '#6A994E', 
    letterSpacing: 1,
  },
  carrotCount: {
    fontSize: 30,
    fontFamily: 'Nunito_700Bold',
    color: '#FF9F1C', 
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
    color: '#2E4057', 
  },
  habbitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEEDB', 
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#D17E00',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  checkbox: {
    marginRight: 15,
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  habbitName: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 18,
    color: '#3B3A3A',
  },
  carrotEmoji: {
    textDecorationLine: 'none',
  },
  habbitDescription: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  habbitCategory: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    fontStyle: 'italic',
  },
  completedHabbit: {
    backgroundColor: '#D6F6E1', 
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  emptyText: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    color: '#AAA',
  },
});
