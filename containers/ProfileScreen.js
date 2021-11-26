import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  Pressable,
  Button,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function ProfileScreen({ setToken, token, userId }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // const token = AsyncStorage.getItem("userToken");

  const { params } = useRoute();
  // console.log("email :", email);
  // console.log("username :", username);
  // console.log("description :", description);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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

  const editUser = async () => {
    // console.log(token);
    try {
      let body = {};
      if (email && email !== data?.email) {
        body.email = email;
      }
      if (username && username !== data?.username) {
        body.username = username;
      }
      if (description && description !== data?.description) {
        body.description = description;
      }
      const resp = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/update",
        { body },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log(resp.data);
      console.log(body);
    } catch (error) {
      // console.log(error.message);
      // console.log(error.response?.data.error);
    }
  };

  return isLoading ? (
    <View style={{ flex: 1 }}>
      <ActivityIndicator size="large" />
      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  ) : (
    <View style={styles.mainContainer}>
      <View style={styles.topPart}>
        {image ? (
          <Image source={{ uri: image }} style={styles.img} />
        ) : (
          <View style={styles.img}>
            <FontAwesome5 name="user-alt" size={80} color="lightgray" />
          </View>
        )}
        <View style={styles.leftBtns}>
          <Pressable
            style={styles.leftBtn}
            onPress={async () => {
              const cameraRollPerm =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              // only if user allows permission to camera roll
              if (cameraRollPerm.status === "granted") {
                const pickerResult = await ImagePicker.launchImageLibraryAsync({
                  allowsEditing: true,
                  aspect: [4, 3],
                });
                console.log(pickerResult);
                setImage(pickerResult.uri);
              }
            }}
          >
            <FontAwesome5 name="photo-video" size={24} color="gray" />
          </Pressable>
          <Pressable
            style={styles.leftBtn}
            onPress={async () => {
              const cameraPerm =
                await ImagePicker.requestCameraPermissionsAsync();
              const cameraRollPerm =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

              // only if user allows permission to camera AND camera roll
              if (
                cameraPerm.status === "granted" &&
                cameraRollPerm.status === "granted"
              ) {
                const pickerResult = await ImagePicker.launchCameraAsync({
                  allowsEditing: true,
                  aspect: [4, 3],
                });
                setImage(pickerResult.uri);
              }
            }}
          >
            <FontAwesome5 name="camera" size={24} color="gray" />
          </Pressable>
        </View>
      </View>
      <TextInput onChangeText={(e) => setEmail(e)} style={styles.input}>
        {data.email}
      </TextInput>
      <TextInput onChangeText={(e) => setUsername(e)} style={styles.input}>
        {data.username}
      </TextInput>
      <TextInput
        numberOfLines={5}
        multiline={true}
        onChangeText={(e) => setDescription(e)}
        style={styles.descrip}
      >
        {data.description}
      </TextInput>
      <Pressable style={styles.btn} onPress={() => editUser()}>
        <Text>Update</Text>
      </Pressable>
      <Pressable
        style={styles.btn}
        onPress={() => {
          setToken(null);
        }}
      >
        <Text>Log out</Text>
      </Pressable>
    </View>
  );
}
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  mainContainer: {
    width: width * 0.9,
    // height: height * 0.9,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
    // backgroundColor: "pink",
    marginLeft: width * 0.05,
  },
  input: {
    width: 300,
    padding: 5,
    marginVertical: 5,
    borderBottomColor: "red",
    borderBottomWidth: 1,
    // backgroundColor: "beige",
  },
  descrip: {
    width: 300,
    height: 100,
    padding: 5,
    marginVertical: 5,
    borderColor: "red",
    borderWidth: 1,
  },
  btn: {
    width: 100,
    // backgroundColor: "pink",
    padding: 10,
    alignItems: "center",
    borderColor: "red",
    borderRadius: 20,
    borderWidth: 2,
    marginTop: 10,
  },
  topPart: {
    // backgroundColor: "pink",
    flexDirection: "row",
    marginBottom: 50,
  },
  img: {
    width: 120,
    height: 120,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    // backgroundColor: "beige",
  },
  leftBtns: { justifyContent: "center" },
  leftBtn: { paddingVertical: 13 },
});
