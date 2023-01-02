import { Image, View, Text, StyleSheet, Keyboard } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react";
import { useContext } from "react";
import { NavigationContext } from "../App";


function NavBar() {
    
    const navigation = useNavigation();
    const navigationContext = useContext(NavigationContext);
    
    const goToHomePage = () => {
        navigation.navigate('HomeScreen');
        navigationContext.setCurrentScreen('HomeScreen');
    }

    const goToCart = () => {
        navigation.navigate('CartScreen');
        navigationContext.setCurrentScreen('CartScreen');
    }

    const goToOrdersPage = () => {
        navigation.navigate('OrderScreen');
        navigationContext.setCurrentScreen('OrderScreen');
    }

    const goToAuthenticationPage = () => {
        navigation.navigate('AuthenticationScreen');
        navigationContext.setCurrentScreen('AuthenticationScreen');
    }

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setKeyboardVisible(true); // or some other action
        }
        );
        const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setKeyboardVisible(false); // or some other action
        }
        );

        return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
        };
    }, []);

    return(
        <>
            {!isKeyboardVisible && 
                <View style={{height: 50, backgroundColor: "#01135d", flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <View style={{...styles.iconContainer, borderBottomColor: navigationContext.currentScreen == 'HomeScreen' ? '#fff' : '#01135d'}}>
                        <Icon name="home" color={'#fff'} size={25} onPress={goToHomePage}></Icon>
                    </View>
                    <View style={{...styles.iconContainer, borderBottomColor: navigationContext.currentScreen == 'CartScreen' ? '#fff' : '#01135d'}}>
                        <Icon name="shopping-cart" color={'#fff'} size={25} onPress={goToCart}></Icon>
                    </View>
                    <View style={{...styles.iconContainer, borderBottomColor: navigationContext.currentScreen == 'OrderScreen' ? '#fff' : '#01135d'}}>
                        <Icon name="file-text" color={'#fff'} size={20} onPress={goToOrdersPage}></Icon>
                    </View>
                    <View style={{...styles.iconContainer, borderBottomColor: navigationContext.currentScreen == 'AuthenticationScreen' ? '#fff' : '#01135d'}}>
                        <Icon name="user-circle" color={'#fff'} size={23} onPress={goToAuthenticationPage}></Icon>
                    </View>
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        height: 35, 
        width: 35, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderColor: '#01135d', 
        borderWidth: 3, 
        borderBottomLeftRadius: 4, 
        borderBottomRightRadius: 4
    }
  });

export default NavBar;