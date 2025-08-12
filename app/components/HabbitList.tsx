import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import {
  useFonts,
  Nunito_700Bold,
  Nunito_400Regular,
} from '@expo-google-fonts/nunito';

interface Habbit {
  id: number;
  name: string;
  description?: string;
  category: string;
}

interface HabbitItemProps extends Habbit {
  onDelete: (id: number) => void;
}

export default function HabbitList({
  habbits,
  setHabbits,
}: {
  habbits: Habbit[];
  setHabbits: React.Dispatch<React.SetStateAction<Habbit[]>>;
}) {
  const [fontsLoaded] = useFonts({
    Nunito_700Bold,
    Nunito_400Regular,
  });

  const deleteHabbit = (id: number) => {
    fetch(`http://localhost:3000/habbits/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        setHabbits((prev) => prev.filter((h) => h.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting habbit:', error);
      });
  };

  const HabbitItem = ({
    id,
    name,
    description,
    category,
    onDelete,
  }: HabbitItemProps) => (
    <View style={styles.habbitContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.habbitName}>{name}</Text>
        {description ? (
          <Text style={styles.habbitDescription}>{description}</Text>
        ) : null}
        <Text style={styles.habbitCategory}>Category: {category}</Text>
      </View>
      <Button
        mode='contained'
        compact
        onPress={() => onDelete(id)}
        style={styles.deleteButton}
        labelStyle={styles.deleteButtonLabel}
        buttonColor='#FF6B6B'
        accessibilityLabel={`Delete ${name}`}
      >
        Delete
      </Button>
    </View>
  );

  if (!fontsLoaded) return null;

  return (
    <FlatList
      data={[...habbits].sort((a, b) => b.id - a.id)} // sort descending by id
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <HabbitItem {...item} onDelete={deleteHabbit} />
      )}
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          No habbits yet. Start by creating one! 🐰🥕
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
    backgroundColor: '#FFF8F0',
  },
  habbitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEFD5',
    padding: 15,
    marginBottom: 12,
    borderRadius: 15,
    shadowColor: '#FFA726',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  habbitName: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 18,
    color: '#6B4226',
    marginBottom: 4,
  },
  habbitDescription: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 14,
    color: '#8D6E63',
    marginBottom: 4,
  },
  habbitCategory: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 12,
    color: '#D2691E',
  },
  deleteButton: {
    marginLeft: 15,
    borderRadius: 12,
  },
  deleteButtonLabel: {
    fontFamily: 'Nunito_700Bold',
  },
  emptyText: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    color: '#B76E79',
    textAlign: 'center',
    marginTop: 40,
  },
});
