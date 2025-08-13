import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';

interface Habbit {
  id: number;
  name: string;
  category: string;
  created_at: string;
  description: string | null;
}

interface Completion {
  completed_date: string;
}

export default function ProgressScreen() {
  const [habbits, setHabbits] = useState<Habbit[]>([]);
  const [selectedHabit, setSelectedHabit] = useState<number | undefined>(undefined);
  const [completionData, setCompletionData] = useState<Completion[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingHabbits, setLoadingHabbits] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/habbits')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.habbits)) {
          setHabbits(data.habbits);
          if (data.habbits.length > 0) setSelectedHabit(data.habbits[0].id);
        } else {
          console.warn('Unexpected habits data:', data.habbits);
          setHabbits([]);
        }
      })
      .catch((err) => console.error('Error fetching habits:', err))
      .finally(() => setLoadingHabbits(false));
  }, []);

  useEffect(() => {
    if (!selectedHabit) return;
    setLoading(true);
    fetch(`http://localhost:3000/habbits/${selectedHabit}/completions`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.completions)) {
          setCompletionData(data.completions);
        } else {
          console.warn('Unexpected completions data:', data.completions);
          setCompletionData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching completion data:', err);
        setLoading(false);
      });
  }, [selectedHabit]);

  const streakData = () => {
    if (completionData.length === 0) return [];

    const sorted = [...completionData].sort(
      (a, b) =>
        new Date(a.completed_date).getTime() -
        new Date(b.completed_date).getTime()
    );

    let streak = 0;
    let lastDate: Date | null = null;

    return sorted.map((entry) => {
      const currentDate = new Date(entry.completed_date);
      if (
        lastDate &&
        (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24) === 1
      ) {
        streak++;
      } else {
        streak = 1;
      }
      lastDate = currentDate;
      return { date: currentDate, streak: streak };
    });
  };

  const dataPoints = streakData();

  // fallback to avoid empty chart errors
  const labels =
    dataPoints.length > 0
      ? dataPoints.map((dp) => `${dp.date.getMonth() + 1}/${dp.date.getDate()}`)
      : [''];

  const dataSet =
    dataPoints.length > 0 ? dataPoints.map((dp) => dp.streak) : [0];

  const chartData = {
    labels,
    datasets: [
      {
        data: dataSet,
        color: () => '#FF9F1C',
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFAF0',
    backgroundGradientTo: '#FFFAF0',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 159, 28, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(106, 153, 78, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#6A994E',
      fill: '#6A994E',
    },
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🥕 Habit Streak Progress 📈</Text>

      {loadingHabbits ? (
        <ActivityIndicator size="large" color="#FF9F1C" />
      ) : habbits.length > 0 ? (
        <Picker
          selectedValue={selectedHabit}
          onValueChange={(value) => setSelectedHabit(value)}
          style={styles.picker}
          mode="dropdown"
        >
          {habbits.map((habit) => (
            <Picker.Item key={habit.id} label={habit.name} value={habit.id} />
          ))}
        </Picker>
      ) : (
        <Text style={styles.noData}>No habits found.</Text>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#FF9F1C" />
      ) : dataPoints.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <LineChart
            data={chartData}
            width={Math.max(dataPoints.length * 60, screenWidth - 40)}
            height={280}
            chartConfig={chartConfig}
            style={styles.chart}
            fromZero
            yAxisSuffix="🥕"
            bezier
            verticalLabelRotation={-45}
            segments={4}
            withInnerLines={false}
          />
        </ScrollView>
      ) : (
        <Text style={styles.noData}>No completions yet 🐇</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFFAF0' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#2E4057',
  },
  picker: {
    marginBottom: 20,
    backgroundColor: '#FFEEDB',
    borderRadius: 10,
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
  chart: {
    borderRadius: 16,
    paddingBottom: 30, 
  },
});
