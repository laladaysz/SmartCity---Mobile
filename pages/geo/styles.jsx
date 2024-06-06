import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      width: '100%',
      height: 80,
      // backgroundColor:"#ff0",
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: width - 40,
      height: height / 2,
      borderRadius: 10,
    },
    button: {
      width: "70%",
      height: 40,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
    },
    cxs: {
      // backgroundColor: '#f00',
      width: '80%',
    },
    cx: {
      // backgroundColor: '#ff0',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      marginBottom: 8,
      borderWidth: 1,
      padding: 5,
      borderColor: '#999',
      borderRadius: 20,
      padding: 10
    },
    cxTxt: {
      fontSize: 12,
    },
    modalView: {
      margin: 20, // Margem
      backgroundColor: 'white', // Cor de fundo da view do modal
      borderRadius: 20, // Bordas arredondadas
      padding: 35, // Espaçamento interno
      alignItems: 'center', // Centraliza conteúdo horizontalmente
      shadowColor: '#000', // Cor da sombra
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25, // Opacidade da sombra
      shadowRadius: 4, // Raio da sombra
    },
    buttonClose: {
      backgroundColor: 'red',
      borderRadius: 30 // Cor de fundo do botão de fechar
    },
    btnDetails: {
      padding: 20,
      borderRadius: 30,
      backgroundColor: '#054f77',
    },
    textDetails:{
      color: 'white'
    },
    modalTitle: {
      fontSize: 25,
      marginBottom: 15
    },
    modalText: {
      fontSize: 15,
      marginBottom: 10
    },
    textStyle: {
      color: 'white'
    },
    
  });
  
  export default styles