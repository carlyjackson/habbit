import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';

export default function HabbitList() {
    const [habbits, setHabbits] = useState([]);
    interface Habbit {
        id: number;
        name: string;
        description?: string;
        category: string;
    }

    useEffect(() => {
        console.log("inside useEffect");
        const fetchHabbits = async () => {
            console.log("fetching habbits");
            try {
                const response = await fetch('http://localhost:3000/habbits');
                const data = await response.json();
                setHabbits(data.habbits);
            } catch (error) {
                console.error('Error fetching habbits:', error);
            }
        };

        fetchHabbits();
    }, []);

    return (
        <View>
            
            {habbits?.length > 0 ? (
                <View>
                <Text style={{ fontFamily: 'Nunito', fontSize: 20, marginBottom: 10 }}>
                    here&apos;s the habbits you&apos;re currently tracking:
                </Text>
                {habbits.map((habbit: Habbit) => (
                    <Text key={habbit.id} style={{ fontFamily: 'Nunito', fontSize: 16 }}>
                        {habbit.name} - {habbit.category} - {habbit.description || 'No description provided'}
                    </Text>
                ))} 
                    </View>
            ) : (
                <Text style={{ fontFamily: 'Nunito', fontSize: 16 }}>
                    No habbits found.
                </Text>
            )}
        </View>
    );
}

