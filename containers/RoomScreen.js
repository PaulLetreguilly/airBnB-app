import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import MapView from "react-native-maps";

export default function RoomScreen({ error, isWaiting, coords }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hideText, setHideText] = useState(true);
  const [number, setNumber] = useState(0);

  const { params } = useRoute();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.id}`
        );
        // console.log(response.data.location);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [isWaiting]);
  //   console.log(data?.photos.length);

  useEffect(() => {
    const slideVariable = () => {
      if (number === data?.photos.length - 1) {
        setTimeout(() => {
          setNumber(0);
        }, 4000);
      } else {
        setTimeout(() => {
          setNumber(number + 1);
        }, 4000);
      }
    };
    slideVariable(number);
  }, [number]);

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
    <ScrollView>
      <View style={{ position: "relative" }}>
        {/* <SwiperFlatList autoplay autoplayDelay={2} autoplayLoop showPagination>
        <FlatList
          data={data?.photos}
          keyExtractor={(item) => item.picture_id}
          renderItem={({ item }) => {
            return (
              <Image
                source={{ uri: item.url }}
                style={{ height: 250, width: 300 }}
              />
            );
          }}
        />
      </SwiperFlatList> */}
        {/* <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          showPagination
          //   index={2}
          //   data={data.photos}
          //   renderItem={({ item }) => (
          //     <Image source={{ uri: item.url }} style={{ height: 250 }} />
          //   )}
        >
          <Image source={{ uri: data.photos[0].url }} style={{ height: 250 }} />
          <Image source={{ uri: data.photos[1].url }} style={{ height: 250 }} />
          <Image source={{ uri: data.photos[2].url }} style={{ height: 250 }} />
          <Image source={{ uri: data.photos[3].url }} style={{ height: 250 }} />
        </SwiperFlatList> */}
        <Image
          source={{ uri: data?.photos[number].url }}
          style={{ height: 250 }}
        ></Image>
        <Text
          style={{
            backgroundColor: "black",
            color: "white",
            height: 20,
            width: 50,
            position: "absolute",
            top: 200,
            left: 0,
            textAlign: "center",
          }}
        >
          {data?.price} €
        </Text>
        <View>
          <Text style={{ paddingVertical: 10 }}>{data?.title}</Text>
          <View style={{ flexDirection: "row", paddingBottom: 10 }}>
            {review(data?.ratingValue)}
            <Text>{data?.reviews} reviews</Text>
            <Image
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                position: "absolute",
                bottom: 0,
                right: 5,
              }}
              source={{ uri: data?.user.account.photo.url }}
            ></Image>
          </View>
        </View>
        {hideText ? (
          <Text numberOfLines={3}>{data?.description}</Text>
        ) : (
          <Text>{data?.description}</Text>
        )}

        <Pressable
          onPress={() => {
            setHideText(!hideText);
          }}
        >
          {hideText ? (
            <Text style={{ color: "red", width: 100 }}>
              show more <FontAwesome name="caret-down" size={15} />
            </Text>
          ) : (
            <Text style={{ color: "red" }}>
              show less <FontAwesome name="caret-up" size={15} />
            </Text>
          )}
        </Pressable>
        <View
          style={{
            height: 300,
            width: Dimensions.get("window").width,
            backgroundColor: "lightgray",
            marginVertical: 15,
          }}
        >
          {isWaiting ? (
            <ActivityIndicator size="large" style={{ flex: 1 }} />
          ) : (
            <>
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  //   latitude: 48.8564449, // Paris's coord
                  //   longitude: 2.4002913,
                  latitude: data.location[1],
                  longitude: data.location[0],
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
                showsUserLocation={true}
              >
                <MapView.Marker
                  key={data._id}
                  coordinate={{
                    latitude: data.location[1],
                    longitude: data.location[0],
                  }}
                  title={data.title}
                />
              </MapView>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
