import { View, Image, TouchableOpacity, Text, TextInput, StyleSheet, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'

const PaymentScreen = () => {

    const validCVV = new RegExp('^[1-9]{3}$');
    const validMonth = new RegExp('^(0?[1-9]|1[012])$')
    const validYear = new RegExp('^20[1-9]{2}$')
    const validCardHolder = new RegExp('^[A-Z][a-z]+ [A-Z][a-z]+$')
    const validCardNumber = new RegExp('^[0-9]{16}$')

    const [errorText, setErrorText] = useState('');

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

    const navigation = useNavigation();

    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [cvv, setCvv] = useState('');

    const goToOrdersScreen = () => {
        navigation.navigate('OrderScreen');
    }

    const pay = () => {
        if(!validCardNumber.test(cardNumber)){
            setErrorText('Please enter a valid card number!');
        }

        else if(!validCardHolder.test(cardHolder)){
            setErrorText('Please enter a valid card holder!');
        }

        else if(!validMonth.test(month)){
            setErrorText('Please enter a valid month!');
        }

        else if(!validYear.test(year)){
            setErrorText('Please enter a valid year!');
        }

        else if(!validCVV.test(cvv)){
            setErrorText('Please enter a valid cvv!');
        }

        else{
            setErrorText('');
        }

        if(errorText === '' && cardHolder !== '' && cardNumber !== '' && month !== '' && year !== '' && cvv !== ''){
            goToOrdersScreen();
        }
    }

  return (
    <View style={{display: 'flex', alignItems: 'center', paddingTop: 50}}>
        {!isKeyboardVisible &&
            <Image
                source={{uri: 'https://static.vecteezy.com/system/resources/previews/005/257/272/original/blue-credit-card-icon-isolated-on-white-background-money-and-payments-around-the-world-concept-flat-design-style-illustration-template-for-your-business-projects-vector.jpg'}}
                style={{width: 400, height: 200}}
            />
        }

        <View style={styles.InputsContainerStyle}>
            <View style={styles.InputContainerStyle}>
                <TextInput 
                    style={styles.InputStyle} 
                    placeholder='Card number'
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    />
                <TextInput 
                    style={styles.InputStyle} 
                    placeholder='Card holder'
                    value={cardHolder}
                    onChangeText={setCardHolder}
                    />
                <View style={styles.DateInputsContainerStyle}>
                    <TextInput 
                        style={styles.DateInputStyle} 
                        placeholder='Month'
                        value={month}
                        onChangeText={setMonth}
                        />
                    <TextInput 
                        style={styles.DateInputStyle} 
                        placeholder='Year'
                        value={year}
                        onChangeText={setYear}
                        />
                </View>
                <TextInput 
                    style={styles.InputStyle} 
                    placeholder='CVV'
                    value={cvv}
                    onChangeText={setCvv}
                    />
            </View>
            <Text style={{color: 'red', textAlign: 'center', marginTop: 10}}>{errorText}</Text>
        </View>
        <TouchableOpacity style={styles.ButtonStyle} onPress={pay}>
            <Text style={styles.ButtonTextStyle}>Platiti</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    InputsContainerStyle: {
        height: 200,
        marginTop: 60,
        marginBottom: 60
    },
    InputContainerStyle: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    DateInputsContainerStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    InputStyle: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#01135d',
        width: 250,
        height: 40,
        paddingLeft: 10
    },
    DateInputStyle: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#01135d',
        width: 120,
        height: 40,
        paddingLeft: 10
    },
    ButtonStyle: {
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
        backgroundColor: '#01135d'
    },
    ButtonTextStyle: {
        fontSize: 16,
        lineHeight: 25,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        color: 'white',
    },
  });

export default PaymentScreen