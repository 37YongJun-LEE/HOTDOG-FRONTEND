import * as React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';



export default function Matching() {
  getLocation = async() => {
    const {coords: {latitude,longitude}} = await Location.getCurrentPositionAsync();
    console.log(latitude)
    console.log(longitude)
  }
  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={{latitude:{coords},longitude:{coords}.longitude}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});