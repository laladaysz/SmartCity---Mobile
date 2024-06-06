import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, Modal, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import styles from './styles';

export default function Geo() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    
    const [la, setLa] = useState(null);
    const [lo, setLo] = useState(null);

    const [distance1, setDistance1] = useState(null); // Distância até o ponto fixo 1
    const [distance2, setDistance2] = useState(null); // Distância até o ponto fixo 2
    const [temp, setTemp] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);

    const [sensor, setSensor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [sensors, setSensors] = useState([]);

    const initialRegion = {
        latitude: -22.9140639,
        longitude: -47.068686,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    };

    const haversine = (lat1, lon1, lat2, lon2) => {
        const toRad = (value) => (value * Math.PI) / 180;

        const R = 6371000; // Raio da Terra em metros
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distância em metros

        return d;
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            const locationSubscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 1,
                },
                (newLocation) => {
                    setLocation(newLocation.coords);
                    setLa(newLocation.coords.latitude);
                    setLo(newLocation.coords.longitude);

                    // Calcular a distância entre a localização atual e os pontos fixos
                    if (sensors.length > 0) {
                        sensors.forEach(sensor => {
                            const distance = haversine(newLocation.coords.latitude, newLocation.coords.longitude, sensor.latitude, sensor.longitude);
                            sensor.distance = distance; // Armazena a distância no sensor
                        });

                        const closestSensor = sensors.reduce((prev, curr) => prev.distance < curr.distance ? prev : curr);
                        setSensor(closestSensor); // Define o sensor mais próximo
                        setTemp(closestSensor.temp); // Atualiza a temperatura do sensor mais próximo
                    }
                }
            );

            fetchSensors(); // Busca sensores do banco de dados

            return () => {
                locationSubscription.remove();
            };
        })();
    }, [sensors]);

    const fetchSensors = async () => {
        try {
            const token = localStorage.getItem('access_token'); // Pode usar AsyncStorage para armazenar token em produção
            const response = await axios.get('http://127.0.0.1:8000/api/sensores/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setSensors(response.data);
            setLoading(false);

        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
            >
                {sensors.map(sensor => (
                    <Marker
                        key={sensor.id}
                        coordinate={{ latitude: sensor.latitude, longitude: sensor.longitude }}
                        pinColor="blue" // Cor do marcador para os sensores
                    />
                ))}
                {location && (
                    <Marker
                        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                        pinColor="red" // Cor do marcador para a localização atual
                    />
                )}
            </MapView>

            <View style={styles.cxs}>
                <View style={styles.cx}><Text style={styles.cxTxt}>Latitude: </Text><Text style={styles.cxTxt}>{la}</Text></View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Longitude: </Text><Text style={styles.cxTxt}>{lo}</Text></View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Distância até o sensor mais próximo: </Text>{sensor && <Text style={styles.cxTxt}>{sensor.distance.toFixed(1)} metros</Text>}</View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Temperatura:</Text><Text style={styles.cxTxt}>{temp}ºC</Text></View>
            </View>

            <View style={styles.details}>
                <Pressable style={styles.btnDetails}
                onPress={()  => setModalVisible(true)}
                >
                    <Text style={styles.textDetails}>Details</Text>
                </Pressable>

                <Modal animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {loading ? (
                                <ActivityIndicator size="large" color="#054f77" />
                            ) : (
                                sensor ? (
                                    <>
                                        <Text style={styles.modalTitle}>Sensor {sensor.id}</Text>
                                        <Text style={styles.modalText}>Responsável: {sensor.responsavel}</Text>
                                        <Text style={styles.modalText}>Localidade: {sensor.localizacao}</Text>
                                        <Text style={styles.modalText}>Latitude: {sensor.latitude}</Text>
                                        <Text style={styles.modalText}>Longitude: {sensor.longitude}</Text>
                                        <Text style={styles.modalText}>Temperatura: {temp}ºC</Text>
                                    </>
                                ) : (
                                    <Text style={styles.modalText}>Sensor não encontrado.</Text>
                                )
                            )}
                        
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </View>  
                </Modal>
            </View>
        </View>
    );
}
