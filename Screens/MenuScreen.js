import { View, Text, Image, ScrollView, SectionList, SafeAreaView, StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useEffect, useState } from 'react';
import Icon from "react-native-vector-icons/FontAwesome";
import { useContext } from "react";
import { MealContext } from "../App";


function MenuScreen () {
 const [loading, setLoading] = useState(false);

 const mealContext = useContext(MealContext);

  const addToCart = async (mealId) => {
    setLoading(true);
    try {
      const response = await fetch(fetchContext.fetchURL + '/api/cart/AddToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mealId),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const translateTitle = (title) => {
    if(title == 'Garnish'){
      return 'Garnituri'
    }else if(title == 'Soup'){
        return 'Supe'
    }else if(title == 'Meat'){
      return 'Carnuri'
    }
  } 

    // const [menu, setMenu] = useState([
    //     {
    //         category: 'Supe',
    //         data: [{
    //             name: 'Ciorba de burta',
    //             price: '15.00 lei/portie',
    //             PictureURL: 'https://sodelicious.ro/wp-content/uploads/2019/11/ciorba-de-burta-720x720.jpg'
    //         },
    //         {
    //             name: 'Ciorba de legume',
    //             price: '15.00 lei/portie',
    //             PictureURL: 'https://hangrymonkey.ro/wp-content/uploads/2021/11/023_ciorba-legume-verdeata.jpg'
    //         }]
    //     },
    //     {
    //         category: 'Carne',
    //         data: [{
    //             name: 'Pulpa de pui',
    //             price: '10.00 lei/buc',
    //             PictureURL: 'https://www.chefnicolaietomescu.ro/storage/articles/000/000/550/1D8E2C0C-2421-4B6A-A41B-E260FD49DFB0.jpeg'
    //         }]
    //     },
    //     {   
    //         category: 'Garnituri',
    //         data: [{
    //             name: 'Cartofi prajiti',
    //             price: '5.00 lei/portie',
    //             PictureURL: 'https://www.e-retete.ro/files/recipes/cartofi-prajiti-dietetici.jpg'
    //         },
    //         {
    //             name: 'Orez',
    //             price: '5.00 lei/portie',
    //             PictureURL: 'https://images.aws.nestle.recipes/resized/d90389c62ad29903e4d5308f81326b34_maggi-pilaf-de-orez-cu-legume_944_531.png'
    //         }]
    //     }
    // ])

const FoodWrapper = ({ food }) => (
    <View style={styles.item}>
        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <Icon name="plus-circle" color={'#fff'} size={30} onPress={() => addToCart(food.id)}></Icon>
            <View style={{marginLeft: 15}}>
                <Text style={styles.title}>{food.name}</Text>
                <Text style={{color: 'white'}}>{food.price} lei</Text>
            </View>
        </View>
        <Image source={{uri: food.pictureURL}} style={styles.image}></Image>
    </View>
  );

    if(mealContext.meals.foodsCategorized){
      return(
        <View style={styles.container}>
              <SectionList
              sections={mealContext.meals.foodsCategorized}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => <FoodWrapper food={item} />}
              renderSectionHeader={({ section: { title } }) => (
                  <Text style={styles.header}>{translateTitle(title)}</Text>
              )}/>
      </View>
      )
    }
    else{
      return (<></>)
    }
}

const styles = StyleSheet.create({
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
        borderRadius: 20
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff",
      color: "#01135d",
      fontWeight: 'bold'
    },
    title: {
      fontSize: 20,
      color: 'white'
    }
  });

export default MenuScreen;