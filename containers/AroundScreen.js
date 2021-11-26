import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import MapView from "react-native-maps";

export default function AroundScreen() {
  const [mapData, setMapData] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const locate = async () => {
      try {
        const resp = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms/around"
        );
        // console.log("log of locate fonction ===> ", resp.data[0].location);
        setMapData(resp.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    locate();
  }, []);

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          //   latitude: coords.latitude,  user's coord
          //   longitude: coords.longitude,
          latitude: 48.8564449, // Paris's coord
          longitude: 2.4002913,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        {mapData?.map((marker) => {
          return (
            <MapView.Marker
              key={marker._id}
              coordinate={{
                latitude: marker.location[1],
                longitude: marker.location[0],
              }}
              title={marker.title}
              onPress={() => {
                // console.log(marker.title);
                navigation.navigate("Room", { id: marker._id });
              }}
            ></MapView.Marker>
          );
        })}
      </MapView>
    </>
  );
}
