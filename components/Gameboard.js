import { Text, View, Pressable } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../style/style";
import { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-native-flex-grid';
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS,
    BONUS_POINTS_LIMIT, 
    SCOREBOARD_KEY} from '../constants/Game'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";

let board = [];

export default Gameboard = ({navigation, route}) => {

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('Throw dices.');
    const [gameEndStatus, setGameEndStatus] = useState(false);
    //mitkä arpakuutioista ovat valittuina?
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    //arpakuutioiden silmäluvut
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
    //Mitkä arpakuutioiden silmäluvuista ovat valittu pisteisiin
    const [selectedDicePoints, setSelectedDicePoints]= useState(new Array(MAX_SPOT).fill(0));
    //Valittujen arpakuutioiden kokonaispistemäärä
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
    const [playerName, setPlayerName] = useState('');
    const [score, setScore] = useState([]);

    const startNewGame = () => {
        setNbrOfThrowsLeft(NBR_OF_THROWS); 
        setSelectedDices(new Array(NBR_OF_DICES).fill(false)); 
        setDiceSpots(new Array(NBR_OF_DICES).fill(0)); 
        setGameEndStatus(false); 
        setStatus('Heitä noppia'); 
    }
    
    useEffect(() => {
        if (nbrOfThrowsLeft === 0) {
            setStatus("Game end! Start the new game");
            setGameEndStatus(true);
        }
    }, [nbrOfThrowsLeft]);

    useEffect(() => {
        if(playerName === '' && route.params?.player){
            setPlayerName(route.params.player);
        }
    },[]);

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
                setScore(tmpScores);    
            }  
        } catch (e) {       
        }
    }

    const savePlayerPoints = async () => {
        const newKey = score.length + 1;
        const playerPoints = {
            key: newKey,
            name: playerName,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            points: dicePointsTotal.reduce((total, num) => total + num, 0) 
        }
        try {
            const newScore = [...score, playerPoints];
            const jsonValue = JSON.stringify(newScore);
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
            resetGame(); 
        } catch (e) {
            console.error("Error saving points", e);
        }
    };
    
    
    const dicesRow = [];
    for (let dice = 0; dice < NBR_OF_DICES; dice++) {
      dicesRow.push(
        <Col key={"dice"+ dice}>
            <Pressable 
                key={"row" + dice}
                onPress={() => chooseDice(dice)}>
            <MaterialCommunityIcons
                name={board[dice]}
                key={"dice" + dice}
                size={50} 
                color={getDiceColor(dice)}>
            </MaterialCommunityIcons>
            </Pressable>
        </Col>
      );
    }

    //Tässä luodaan pisterivi sarakkeittain (Col)
    const pointsRow = [];
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={"pointsRow" + spot}>
                <Text style={styles.pointsrow} key={"pointsRow" + spot }>{getSpotTotal(spot)}</Text>
            </Col>
        );
    }

    //Tässä luodaan rivi, joka kertoo onko pisteet ja valittu silmäluvulle
    const pointsToSelectRow = [];
    for(let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
       pointsToSelectRow.push(
        <Col key={"buttonRow" + diceButton}>
            <Pressable 
                key={"buttonRow" + diceButton}
                onPress={() => chooseDicePoints(diceButton)}>
                <MaterialCommunityIcons
                    name={"numeric-" + (diceButton + 1) + "-circle"}
                    key={"buttonRow" + diceButton}
                    size={42}
                    color={getDicePointsColor(diceButton)}>
                </MaterialCommunityIcons>
            </Pressable>
        </Col>
       );
    }

    const chooseDice = (i) => {
        let dices = [...selectedDices];
        dices[i] = !selectedDices[i]; 
        setSelectedDices(dices);
    }

    const chooseDicePoints = (i) => {
        if (nbrOfThrowsLeft === 0) {
            let selectedPoints = [...selectedDicePoints];
            let points = [...dicePointsTotal];
            if(!selectedPoints[i]){
                selectedPoints[i] = true;
                let nbrOfDices = 
                    diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1: total), 0);
                points[i] = nbrOfDices * (i + 1);
            }
            else{
                setStatus("You already selected points for " + (i + 1));
                return points[i];
            }
            setDicePointsTotal(points);
            setSelectedDicePoints(selectedPoints);
            return points[i];
        }
        else {
            setStatus("Throw " + NBR_OF_THROWS + " times before settings points.");
        }
    }

    function getDiceColor(i) {
        if (selectedDices[i]) {
            return "pink"; 
        } else {
            return "blue"; 
        }
    }
    
    function getDicePointsColor(i) {
        return selectedDicePoints[i] ? "pink" : "blue";
    }
    function getSpotTotal(i) {
        return dicePointsTotal[i];
    }
    const throwDices = () => {
        if (nbrOfThrowsLeft > 0 && !gameEndStatus) {
            let spots = [...diceSpots];
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random() * 6 + 1);
                    board[i] = 'dice-' + randomNumber;
                    spots[i] = randomNumber;
                }
            }
            setNbrOfThrowsLeft(nbrOfThrowsLeft - 1); 
            setDiceSpots(spots); 
            setStatus('Select and throw dices again'); 
            checkGameEnd(); 
        } else {
            setStatus('No throws left, or the game has ended.'); 
        }
    };
    

    const resetGame = () => {
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setStatus('Throw dices.');
        setGameEndStatus(false);
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        setDiceSpots(new Array(NBR_OF_DICES).fill(0));
        setSelectedDicePoints(new Array(MAX_SPOT).fill(0));
        setDicePointsTotal(new Array(MAX_SPOT).fill(0));
        board = new Array(NBR_OF_DICES).fill('dice-1');
    };
    
    

    const checkGameEnd = () => {
        if (selectedDicePoints.every(point => point > 0)) {
            setGameEndStatus(true);
            setNbrOfThrowsLeft(0); 
            setStatus("Game end! You can save your points.");
        }
    };
          
return(
        <>
            <Header />
            <View>
                <Container>
                    <Row>{dicesRow}</Row>
                </Container>
                <Text style={styles.gameboardtext}>Throws left: {nbrOfThrowsLeft}</Text>
                <Text style={styles.gameboardtext}>{status}</Text>
                <Pressable
                style={styles.throwDicesbutton}
                onPress={() => gameEndStatus ? startNewGame() : throwDices()}>
                <Text style={styles.playButtonText}>
                    {gameEndStatus ? 'START THE NEW GAME' : 'THROW THE DICES'}
                </Text>
                </Pressable>
                <Container>
                    <Row>{pointsRow}</Row>
                </Container>
                <Container>
                    <Row>{pointsToSelectRow}</Row>
                </Container>
                <Text style={styles.playername2}> Player: {playerName} </Text>
                <Pressable
                    style={styles.throwDicesbutton}
                    onPress={() => savePlayerPoints()}>
                        <Text style={styles.playButtonText}>SAVE POINTS</Text>
                </Pressable>
            </View>
            <Footer />
        </>
    );
}