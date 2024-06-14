import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

export default function Login({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (token) {
      AsyncStorage.setItem('token', token);
      navigation.navigate('home');
    }
  }, [token]);

  const fazerLogin = async () => {
    try {
      const response = await axios.post('https://laladaysz.pythonanywhere.com/api/token/', {
        username: usuario,
        password: senha,
      });
      setToken(response.data.access);
    } catch (error) {
      alert('Não foi possível fazer o login.');
    }
  };

  return (
    <View style={styles.container}>
                    
        <Text style={styles.titleTextPrincipal}>Login</Text>
            <View style={styles.form}>
              <View style={styles.campo}>
                <Text style={styles.label}>Usuário</Text>
                <TextInput
                  placeholder="Insira seu usuário..."
                  style={styles.formInput}
                  value={usuario}
                  onChangeText={setUsuario}
                />
              </View>
              <View style={styles.campo}>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                  placeholder="Insira sua senha..."
                  style={styles.formInput}
                  value={senha}
                  secureTextEntry={true}
                  onChangeText={setSenha}
                />
              </View>
              <TouchableOpacity style={styles.formButton} onPress={fazerLogin}>
                <Text style={styles.textButton}>Entrar</Text>
              </TouchableOpacity>
              <Text>{message}</Text>
            </View>
          
        </View>
    
  );
}
