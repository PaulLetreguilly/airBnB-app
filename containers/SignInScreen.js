import axios from "axios";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen({ setToken, setId }) {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();
  const submit = async () => {
    if (email && password) {
      setError("");
      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email,
            password,
          }
        );
        console.log(response.data);
        setId(response.data.id);
        setToken(response.data.token);
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
        if (error.response.data.error === "Unauthorized") {
          setIsLoading(false);
          setError("Wrong email / password");
        }
      }
    } else {
      setError("Veuillez remplir tout les champs");
    }
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView>
      <KeyboardAwareScrollView>
        <View style={styles.mainContainer}>
          <Image
            source={require("../assets/logo2.png")}
            style={styles.logo}
          ></Image>
          <TextInput
            style={styles.input}
            placeholder="email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            secureTextEntry={false}
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={visible ? false : true}
          ></TextInput>
          <Pressable
            style={styles.icon}
            onPress={() => {
              setVisible(!visible);
            }}
          >
            {!visible ? (
              <Ionicons
                name="eye"
                size={20}
                style={{ color: "red" }}
              ></Ionicons>
            ) : (
              <Ionicons
                size={20}
                style={{ color: "red" }}
                name="eye-off"
              ></Ionicons>
            )}
          </Pressable>
          <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>
          <Pressable onPress={submit} style={styles.btn}>
            <Text>Sign in</Text>
          </Pressable>
          <Pressable
            style={styles.switch}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>No account? Register</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { alignItems: "center", marginVertical: 25 },
  logo: {
    width: 100,
    height: 100,
  },
  input: {
    borderBottomColor: "red",
    borderBottomWidth: 2,
    height: 40,
    width: 300,
    marginTop: 40,
  },
  btn: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 40,
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  switch: {
    marginTop: 15,
  },
  icon: { position: "absolute", right: 40, bottom: 150 },
});
