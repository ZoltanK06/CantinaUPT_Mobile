import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {Text, StyleSheet, SafeAreaView, View, Button, Pressable, Image, Touchable, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native'
import { useContext } from 'react';
import { FetchContext, MealContext } from '../App';

function HomeScreen() {

    const navigation = useNavigation();
    const fetchContext = useContext(FetchContext);
    const goToLoginPage = () => {
        navigation.navigate('MenuScreen');
    }

    const mealContext = useContext(MealContext);

    const [loading, setLoading] = useState(false);
    const [canteens, setCanteens] = useState([]);

    const getCanteens = async () => {
        setLoading(true);
        try {
         const response = await fetch(fetchContext.fetchURL + '/api/canteen/GetEveryCanteensDetails');
         const json = await response.json();
         setCanteens(json);
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
    }

    const getMeals = async (canteenId) => {
        setLoading(true);
        try {
            const response = await fetch(fetchContext.fetchURL + '/api/canteen/GetMealsOfCanteen/' + canteenId);
            const json = await response.json();
            console.log(json.foodsCategorized);
            mealContext.setMeals(json);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
    }

    useEffect(()=> {
        getCanteens();
    }, [])

    return(
        <SafeAreaView style={{flex: 1}}>
            {!loading &&
                <View style={styles.Wrapper}>
                    <View style={styles.HomePage}>
                    <View style={styles.CanteenWrapper}>
                        <View style={styles.CanteenDetails}>
                            <Image source={{uri: canteens[1]?.pictureURL}} style={styles.ImageStyle}></Image>
                            <Text style={styles.TextStyle}>{canteens[1]?.name}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.ButtonStyle}
                            onPress={() => {
                                getMeals(2);
                                if(mealContext.meals != [{}])
                                goToLoginPage();
                            }}
                        >
                            <Text style={styles.ButtonTextStyle}>Continua</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.CanteenWrapper}>
                        <View style={styles.CanteenDetails}>
                            <Image source={{uri: canteens[0]?.pictureURL}} style={styles.ImageStyle}></Image>
                            <Text style={styles.TextStyle}>{canteens[0]?.name}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.ButtonStyle}
                            onPress={() => {
                                getMeals(1);
                                if(mealContext.meals != [{}])
                                goToLoginPage();
                            }}
                        >
                            <Text style={styles.ButtonTextStyle}>Continua</Text>
                        </TouchableOpacity>
                    </View>
                    </View> 
                </View>
            }   
            {loading &&
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>  
                    <ActivityIndicator size="large" />
                </View>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Heading: {
        paddingTop: '10%'
    },

    Wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    HomePage: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 625
    },

    CanteenWrapper: {
        width: 250,
        height: 300,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 15,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,

        borderRadius: 25
    },

    CanteenDetails: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    ImageStyle: {
        height: 175,
        width: 250,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginBottom: 17
    },

    ButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor: '#01135d',
        width: 150
    },

    TextStyle: {
        fontSize: 18,
        lineHeight: 25,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        color: '#01135d',
        textAlign: 'center',
        textJustify: 'inter-word'
    },

    ButtonTextStyle: {
        fontSize: 16,
        lineHeight: 25,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        color: 'white',
    }
})

export default HomeScreen;