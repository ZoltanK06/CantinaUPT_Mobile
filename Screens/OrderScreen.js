import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { NavigationContext } from '../App';


function OrderScreen() {
  const [orderStatus, setOrderStatus] = useState('In progress');

  const navigation = useNavigation();
  const navigationContext = useContext(NavigationContext);

  const goToHomePage = () => {
      navigation.navigate('HomeScreen');
      navigationContext.setCurrentScreen('HomeScreen');
  }


  return (
    <View>
      {orderStatus == 'In progress' &&
        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 50, paddingHorizontal: 50}}>
          <Image style={{width: 275, height: 275}} source={{uri: 'https://media.istockphoto.com/id/1259317444/vector/cooking-pot-icon-vector-illustration-symbol.jpg?s=612x612&w=0&k=20&c=_3X3VKoVd7xJtb1c3aC7Mj9XcekWSJTRFNX-AibHXTg='}} />
          <Text style={{color: '#01135d', fontSize: 22, fontWeight: 'bold', textAlign: 'center'}}>Comanda dumneavoastra este in curs de pregatire</Text>
          <Text style={{color: '#01135d', fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 200}}>Se poate prelua in aproximativ 10 minute</Text>
        </View>
      }
      
      {orderStatus == 'Prepared' && 
        <View style={{justifyContent: 'center', alignItems: 'center', paddingHorizontal: 50, height: '100%'}}>
          <Image style={{width: 200, height: 200}} source={{uri: 'https://www.iconsdb.com/icons/preview/gray/purchase-order-xxl.png'}} />
          <Text style={{color: '#01135d', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 40}}>Comanda dumneavoastra asteapta sa fie preluata</Text>
        </View>
      }

      {orderStatus == 'No order' && 
        <View style={{justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 50, height: '100%', paddingTop: 80, paddingBottom: 50}}>
          <View>
            <Image style={{width: 175, height: 175}} source={{uri: 'https://cdn2.iconfinder.com/data/icons/outline-web-application-1/18/search-256.png'}} />
            <Text style={{color: '#01135d', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 40}}>Nu exista comanda in progres</Text>
          </View>
          <TouchableOpacity style={styles.buttonStyle} onPress={goToHomePage}>
                    <Text style={styles.buttonTextStyle}>Incepeti cumparaturile!</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 15,
      backgroundColor: '#01135d'
  },
  buttonTextStyle: {
      fontSize: 16,
      lineHeight: 25,
      fontWeight: 'bold',
      letterSpacing: 0.5,
      color: 'white',
  }
});

export default OrderScreen;