import React, { useEffect, useState } from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import { useContext } from 'react';
import { FetchContext, NavigationContext } from '../App';

function CartScreen() {

    const navigationContext = useContext(NavigationContext);
    const fetchContext = useContext(FetchContext);

    const navigation = useNavigation();
    const [isCartEmpty, setIsCartEmpty] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [price, setPrice] = useState(24);

    const goToHomePage = () => {
        navigation.navigate('HomeScreen');
        navigationContext.setCurrentScreen('HomeScreen');
    }

    const goToPaymentScreen = () => {
        navigationContext.setCurrentScreen('OrderScreen');
        navigation.navigate('PaymentScreen'); 
    }

    const fetchCartItems = async () => {
        setLoading(true);
        try {
         const response = await fetch(fetchContext.fetchURL + '/api/cart/GetCartItems');
         const json = await response.json();
         setCartItems(json);
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
    }

    useEffect(() => {
        fetchCartItems();
    }, [navigationContext])

    const increaseQuantity = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(fetchContext.fetchURL + '/api/cart/IncreaseQuantity', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(id), 
            });
            const json = await response.json();
            console.log(json);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }

          setPrice(price + cartItems[id - 24].meal.price);
    }   
    
    const decreaseQuantity = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(fetchContext.fetchURL + '/api/cart/DecreaseQuantityOrDelete', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(id), 
            });
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }

          setPrice(price - cartItems[id - 24].meal.price);
    }   

    // const [cartData, setCartData] = useState([
    //     {
    //         id: 1,
    //         name: 'Ciorba de burta',
    //         price: 15.00,
    //         PictureURL: 'https://sodelicious.ro/wp-content/uploads/2019/11/ciorba-de-burta-720x720.jpg',
    //         cantitate: 1
    //     },
    //     {
    //         id: 2,
    //         name: 'Pulpa de pui',
    //         price: 10.00,
    //         PictureURL: 'https://www.chefnicolaietomescu.ro/storage/articles/000/000/550/1D8E2C0C-2421-4B6A-A41B-E260FD49DFB0.jpeg',
    //         cantitate: 1
    //     },
    //     {
    //         id: 3,
    //         name: 'Cartofi prajiti',
    //         price: 5.00,
    //         PictureURL: 'https://www.e-retete.ro/files/recipes/cartofi-prajiti-dietetici.jpg',
    //         cantitate: 1
    //     },
    //     {
    //         id: 4,
    //         name: 'Pulpa de pui',
    //         price: 10.00,
    //         PictureURL: 'https://www.chefnicolaietomescu.ro/storage/articles/000/000/550/1D8E2C0C-2421-4B6A-A41B-E260FD49DFB0.jpeg',
    //         cantitate: 1
    //     },
    //     {
    //         id: 5,
    //         name: 'Cartofi prajiti',
    //         price: 5.00,
    //         PictureURL: 'https://www.e-retete.ro/files/recipes/cartofi-prajiti-dietetici.jpg',
    //         cantitate: 1
    //     }
    // ])

    const FoodWrapper = ({ food, index }) => (
        <View style={styles.item}>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <Image source={{uri: food.meal.pictureURL}} style={styles.image}></Image>
                <View>
                    <Text style={styles.title}>{food.meal.name}</Text>
                    <Text style={{color: 'white'}}>{food.meal.price} lei</Text>
                </View>
            </View>
            <View style={{marginRight: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="chevron-up" color={'#fff'} size={25} onPress={() => {increaseQuantity(index + 24); fetchCartItems()}}></Icon>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{food.quantity}</Text>
                <Icon name="chevron-down" color={'#fff'} size={25} onPress={() => {decreaseQuantity(index + 24); fetchCartItems()}}></Icon>
            </View>
        </View>
    );

    const Summary = () => (
        <View style={{height: 150, paddingTop: 10, marginBottom: 10}}>
            <View style={{borderColor: "#01135d", borderWidth: 5, borderRadius: 10, height: 125, padding: 15, flexDirection: 'column', justifyContent: 'center'}}>
                <View style={styles.summaryContainers}>
                    <Text style={styles.summaryText}>Cost total produse:</Text>
                    <Text style={styles.summaryText}>{price} lei</Text>
                </View>
                <View style={styles.summaryContainers}>
                    <Text style={styles.summaryText}>Reducere aplicata:</Text>
                    <Text style={styles.summaryText}>0%</Text>
                </View>
                <View style={styles.summaryContainers}>
                    <Text style={styles.summaryTotalText}>Total:</Text>
                    <Text style={styles.summaryTotalText}>{price} lei</Text>
                </View>
            </View>
        </View>
    )

  return (
        <View style={{flex: 1}}>
            {cartItems.length == 0 &&
                <View style={styles.emptyWrapper}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={{uri: 'https://cdn.dribbble.com/users/693462/screenshots/2380486/media/b497f28a6d8d2a9323ad7cfc38753bfb.png?compress=1&resize=400x300&vertical=top'}} style={{width: 300, height: 300}}></Image>
                        <Text style={styles.emptyText}>Cosul este gol!</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonStyle} onPress={goToHomePage}>
                        <Text style={styles.buttonTextStyle}>Incepeti cumparaturile!</Text>
                    </TouchableOpacity>
                </View>
            }
            {cartItems.length != 0 &&
                <View style={styles.container}>
                    <Text style={styles.header}>Cosul dumneavoastra</Text>
                    <FlatList
                        data={cartItems}
                        renderItem={({ item, index }) => <FoodWrapper food={item} index={index} />}
                        keyExtractor={item => item.id}
                        ListFooterComponent={<Summary />}
                    />
    
                    <View style={{height: 80, padding: 15}}>
                        <TouchableOpacity style={styles.finalizeButtonStyle} onPress={goToPaymentScreen}>
                            <Text style={styles.buttonTextStyle}>Finalizati comanda</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
  )
}

const styles = StyleSheet.create({
    emptyWrapper: {
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingBottom: 50,
        height: '100%'
    },
    emptyText: {
        fontSize: 24,
        color: "#01135d",
        fontWeight: 'bold',
        marginTop: -60
    },
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
    },
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 15
    },
    item: {
        backgroundColor: "#01135d",
        height: 125,
        marginVertical: 8,
        borderRadius: 10,
        flexDirection: "row",
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      image: {
          height: 100,
          width: 100,
          borderRadius: 20,
          marginRight: 15
      },
      title: {
        fontSize: 24,
        color: 'white'
      },
      header: {
        fontSize: 24,
        color: "#01135d",
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10
      },
      finalizeButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
        backgroundColor: '#01135d'
    },
    summaryText: {
        fontSize: 16,
        color: '#01135d'
    },
    summaryTotalText: {
        fontSize: 18,
        color: '#01135d',
        fontWeight: 'bold'
    },
    summaryContainers: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderBottomWidth: 1,
        marginBottom: 10,
        borderBottomColor: '#01135d'
    }
  });

export default CartScreen