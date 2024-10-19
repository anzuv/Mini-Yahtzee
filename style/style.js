import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header: {
    marginTop: 10,
    marginBottom: 15,
    flexDirection: 'row',
    backgroundColor: "pink",
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
    backgroundColor: "pink",
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
  gamerules: {
    margin: 5,
    fontSize: 15,
    textAlign: 'left',
    color: '#0b033b'
  },
  heading: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: "blue",
      marginBottom: 5,
  },
  subheading: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: "blue",
      marginTop: 5,
      marginBottom: 5,
  },
  playButton: {
    backgroundColor: "pink",  
    borderRadius: 10,
    margin: 70,          
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "blue", 
    borderWidth: 2,
    marginTop: 20,
  },
  playButtonText: {
      color: 'blue', 
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
  },
  icon: {
    alignSelf: 'center', 
    marginBottom: 20,
  },
  OkButton: {
    backgroundColor: "pink",  
    margin: 70,          
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "blue", 
    borderWidth: 2,
    marginTop: 15,
  },
  playername: {
    color: "blue",
    fontSize: 20,
    textAlign: 'center',
  },
  throwDicesbutton: {
    backgroundColor: "pink",  
    borderRadius: 10,
    marginRight: 70,
    marginLeft: 70,
    marginBottom: 30,
    marginTop: 20,          
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "blue", 
    borderWidth: 2,
  },
  pointsrow: {
    color: "blue",
    fontSize: 15,
    textAlign: 'center',
  },
  playername2: {
    color: "blue",
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  gameboardtext: {
    color: "blue",
    fontSize: 20,
    textAlign: 'left',
    marginTop: 10,
  },
});