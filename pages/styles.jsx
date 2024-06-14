import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#054f77'
    },
    titleTextPrincipal: {
      color: '#ffffff',
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 10
    },
    form: {
      padding: 70,
      backgroundColor: '#ffffff',
      borderRadius: 30
    },
    formInput: {
      color: '#ffffff',
      borderRadius: 30,
      margin: 5,
      height: 10,
      width: 30,
      borderColor: '#000'
    },
    label: {
      fontSize: 20,
      marginBottom: 10,
      fontWeight: 'bold',
      
    },
    formInput: {
      borderRadius: 30,
      width: 140,
      height: 45,
      borderWidth: 1,
      padding: 10,


    },
    formButton: {
      backgroundColor: '#054f77',
      borderRadius: 30,
      padding: 10,
      marginTop: 20,
      shadowColor: '#000',
      alignItems: 'center',
      justifyContent: 'center'
    },
    textButton: {
      fontWeight: 'bold',
      color: '#ffffff'
    },
    campo: {
      marginBottom: 20
    }

    
  });
  
  export default styles