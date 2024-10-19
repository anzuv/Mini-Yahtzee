import { Text, View, FlatList, Button } from "react-native";
import {useState, useEffect } from 'react';
import { SCOREBOARD_KEY } from "../constants/Game";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../style/style";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Scoreboard = ({navigation}) => {

    const [score, setScore] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', ()=> {
            getScoreboardData();
        })
        return unsubscribe;
    }, [navigation]);

    const getScoreboardData = async() => {
        try {
            const jsonValue= await AsyncStorage.getItem(SCOREBOARD_KEY)
            if (jsonValue !== null) {
                const tmpScores = JSON.parse(jsonValue);
                //opettajan versiossa tässä välissä tehdään lajittelu
                //perusteella laskevassa järjestyksessä (ks. harjoitustyön tehtävänanto)
                setScore(tmpScores);    
            }  
        } catch (e) {
            
        }
    }

    const clearScoreboard = async () =>  {
        try {
            await AsyncStorage.removeItem(SCOREBOARD_KEY);
            setScore([]);   
        } catch (e) {
            
        }
    }

    return(
        <>
            <Header />
            <View>
            <FlatList
                    data={score}
                    renderItem={({ item }) => (
                        <View style={styles.scoreItem}>
                            <Text>{item.name} - {item.points} points</Text>
                            <Text>{item.date} {item.time}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.key.toString()}
                />
                <Button title="Clear Scoreboard" onPress={clearScoreboard} />
            </View>
            <Footer />
        </>
    )
}