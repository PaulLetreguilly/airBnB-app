import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

export default function HomeScreen() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const review = (num) => {
    // console.log(num);
    if (num === 0) {
      return (
        <>
          <FontAwesome name="star" size={20} color="lightgray"></FontAwesome>
          <FontAwesome name="star" size={20} color="lightgray"></FontAwesome>
          <FontAwesome name="star" size={20} color="lightgray"></FontAwesome>
          <FontAwesome name="star" size={20} color="lightgray"></FontAwesome>
          <FontAwesome name="star" size={20} color="lightgray"></FontAwesome>
        </>
      );
    } else if (num === 1) {
      return (
        <>
          <FontAwesome name="star" size={20} color="gold"></FontAwesome>
          <FontAwesome name="star" size={20} color="lightgray"></FontAwesome>
          <FontAwesome name="star" size={20} color="lightgray"></FontAwesome>
          <FontAwesome name="star" size={20} color="lightgray"></FontAwesome>
          <FontAwesome name="star" size={20} color="lightgray"></FontAwesome>
        </>
      );
    } else if (num === 2) {
      return (
        <>
          <FontAwesome name="star" size={20} color="gold"></FontAwesome>
          <FontAwesome name="star" size={20} color="gold"></FontAwesome>
          <FontAwesome name="star" size={20} color="lightgray"></FontAwesome>
          <FontAwesome name="star" size={20} color="lightgray"></FontAwesome>
          <FontAwesome name="star" size={20} color="lightgray"></FontAwesome>
        </>
      );
    } else if (num === 3) {
      return (
        <>
          <FontAwesome name="star" size={20} color="gold"></FontAwesome>
          <FontAwesome name="star" size={20} color="gold"></FontAwesome>
          <FontAwesome name="star" size={20} color="gold"></FontAwesome>
          <FontAwesome name="star" size={20} color="lightgray"></FontAwesome>
          <FontAwesome name="star" size={20} color="lightgray"></FontAwesome>
        </>
      );
    } else if (num === 4) {
      return (
        <>
          <FontAwesome name="star" size={20} color="gold"></FontAwesome>
          <FontAwesome name="star" size={20} color="gold"></FontAwesome>
          <FontAwesome name="star" size={20} color="gold"></FontAwesome>
          <FontAwesome name="star" size={20} color="gold"></FontAwesome>
          <FontAwesome name="star" size={20} color="lightgray"></FontAwesome>
        </>
      );
    } else {
      return (
        <>
          <FontAwesome name="star" size={20} color="gold"></FontAwesome>
          <FontAwesome name="star" size={20} color="gold"></FontAwesome>
          <FontAwesome name="star" size={20} color="gold"></FontAwesome>
          <FontAwesome name="star" size={20} color="gold"></FontAwesome>
          <FontAwesome name="star" size={20} color="gold"></FontAwesome>
        </>
      );
    }
  };

  return isLoading ? (
    <ActivityIndicator size="large" style={{ flex: 1 }} />
  ) : (
    <View style={styles.mainContainer}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate("Room", { id: item._id });
              }}
            >
              <View style={styles.container}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.photos[0].url,
                  }}
                ></Image>
                <Text style={styles.price}>{item.price} €</Text>
                <View style={styles.row}>
                  <View>
                    <Text style={styles.pad}>{item.title}</Text>
                    <View style={styles.row}>
                      {review(item.ratingValue)}
                      <Text style={styles.reviews}>{item.reviews} reviews</Text>
                    </View>
                  </View>
                  <Image
                    style={styles.userImg}
                    source={{ uri: item.user.account.photo.url }}
                  ></Image>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  mainContainer: {},
  container: {
    position: "relative",
    marginHorizontal: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    borderTopColor: "lightgrey",
    borderTopWidth: 1,
    paddingVertical: 20,
  },
  image: { height: 200 },
  price: {
    width: 50,
    height: 20,
    backgroundColor: "black",
    color: "white",
    position: "absolute",
    bottom: 100,
    left: 0,
    textAlign: "center",
  },
  reviews: { color: "gray", paddingBottom: 10 },
  row: { flexDirection: "row" },
  pad: { paddingVertical: 10 },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    top: 10,
    right: 0,
  },
});
