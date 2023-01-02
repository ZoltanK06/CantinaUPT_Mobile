import { Image, View } from "react-native";


function Header() {
    return(
        <View style={{height: 48, backgroundColor: "#01135d", marginLeft: 39}}>
            <Image source={{ uri: 'https://www.sspolitehnica.ro/wp-content/uploads/2021/07/upt-logo.png'}} style={{ width: 150, height: 110, marginTop: -30, marginLeft: -38}}></Image>
        </View>
    );
}

export default Header;