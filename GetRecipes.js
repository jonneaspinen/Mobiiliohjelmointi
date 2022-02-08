import React, { useState } from 'react';
import { StyleSheet, Text, Button, TextInput, View, FlatList, Alert, Image } from 'react-native';

export default function GetRecipes() {

    const [keyword, setKeyword] = useState('');
    const [recipes, setRecipes] = useState([]);

    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`

    const getRecipes = () => {
        fetch(url)
        .then(res => res.json())
        .then(data => setRecipes(data.meals))
        .catch(error => {
            Alert.alert('Error', error.message);
        });
    }

    return (
        <View style={{ flex: 1 }}>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='keyword'
                    onChangeText={text => setKeyword(text)} />
                <Button title='Search' onPress={getRecipes} />
            </View>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            {item.strMeal} </Text>
                        <Image
                            style={styles.thumb}
                            source={{ uri : `${item.strMealThumb}` }} />
                    </View>}
            data={recipes} />
        </View >

    );
}

const styles = StyleSheet.create({
    thumb: {
        width: 400,
        height: 100
    },
    input: {
        paddingTop: 40,
        fontSize: 18,
        width: 200
    }
});