import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import React, {useState} from 'react'

const AuthenticationScreen = () => {
    const navigation = useNavigation();

    const goToRegisterScreen = () => {
        navigation.navigate('RegisterScreen');
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const [loggedIn, setLoggedIn] = useState(true);

    const login = () => {
        if(username !== 'Student infometat' || password !== 'Password123'){
            setErrorText('Nume utilizator sau parola incorecta!');
        }else{
            setLoggedIn(true);
        }
    }

    const logout = () => {
        setErrorText('');
        setUsername('');
        setPassword('');
        setLoggedIn(false);
    }

  return (
    <View style={styles.PageWrapper}>
        {!loggedIn &&
            <View style={styles.AuthenticationBoxWrapper}>
                <Text style={styles.TitleStyle}>Inregistrati-va</Text>
                <TextInput
                    style={errorText === '' ? styles.Input : styles.InputError}
                    placeholder='Nume utilizator'
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={errorText === '' ? styles.Input : styles.InputError}
                    placeholder="Parola"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <Text style={{color: 'red', fontWeight: 'bold'}}>{errorText}</Text>
                <TouchableOpacity
                    style={styles.ButtonStyle}
                    onPress={login}
                >
                    <Text style={styles.ButtonTextStyle}>Continuati</Text>
                </TouchableOpacity>
                <Text style={styles.LinkStyle} onPress={goToRegisterScreen}>
                    Inca nu aveti cont? Creati-va acum!
                </Text>
            </View>
        }
        {loggedIn &&
            <View style={styles.AuthenticationBoxWrapper}>
                <Icon name="user-circle" color={'#fff'} size={75}></Icon>
                <View>
                    <Text style={styles.CredentialStyle}>Nume utilizator: Student infometat</Text>
                    <Text style={styles.CredentialStyle}>Email: student.infometat@student.upt.ro</Text>
                </View>
                <TouchableOpacity
                    style={styles.LogOutButtonStyle}
                    onPress={logout}
                >
                    <Text style={styles.ButtonTextStyle}>Deconectati-va</Text>
                </TouchableOpacity>
            </View>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    PageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

    AuthenticationBoxWrapper: {
        width: 320,
        height: 450,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 30,
        backgroundColor: "#01135d",
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

    Input: {
        width: 250,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 10,
    },

    InputError: {
        width: 250,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 10,
        borderWidth: 3,
        borderColor: 'red'
    },

    ButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor: 'white',
        width: 150,
        marginTop: 20
    },

    LogOutButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor: 'white',
        width: 200,
        marginTop: 20
    },

    ButtonTextStyle: {
        fontSize: 16,
        lineHeight: 25,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        color: '#01135d',
    },

    TitleStyle: {
        fontSize: 20,
        lineHeight: 25,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        color: 'white',
        textAlign: 'center',
        textJustify: 'inter-word' ,
        marginBottom: 20
    },

    CredentialStyle: {
        fontSize: 14,
        lineHeight: 25,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        color: 'white',
        textAlign: 'center',
        textJustify: 'inter-word' ,
        marginBottom: 20
    },

    LinkStyle: {
        textDecorationLine: 'underline',
        color: 'white'
    }
})

export default AuthenticationScreen