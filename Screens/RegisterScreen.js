import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react'

const RegisterScreen = () => {
    const navigation = useNavigation();

    const goToAuthenticationScreen = () => {
        navigation.navigate('AuthenticationScreen');
    }

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.PageWrapper}>
        <View style={styles.AuthenticationBoxWrapper}>
            <Text style={styles.TitleStyle}>Creati-va cont</Text>
            <TextInput
                style={styles.Input}
                placeholder="Nume uilizator"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.Input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.Input}
                placeholder="Parola"
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.Input}
                placeholder="Confirmare parola"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
                style={styles.ButtonStyle}
            >
                <Text style={styles.ButtonTextStyle}>Continuati</Text>
            </TouchableOpacity>
            <Text style={styles.LinkStyle} onPress={goToAuthenticationScreen}>
                Aveti deja cont? Inregistrati-va aici!
            </Text>
        </View>
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
        width: 340,
        height: 550,
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
        paddingLeft: 10
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

    LinkStyle: {
        textDecorationLine: 'underline',
        color: 'white'
    }
})

export default RegisterScreen