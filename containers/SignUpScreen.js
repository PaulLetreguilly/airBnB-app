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
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState();
  const [visible, setVisible] = useState(true);

  const navigation = useNavigation();
  const submit = async () => {
    if (email && description && password && username && confirmPassword) {
      setError("");
      if (password === confirmPassword) {
        try {
          setIsLoading(true);
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email,
              description,
              password,
              username,
            }
          );
          console.log(response.data);
          setId(response.data.id);
          setToken(response.data.token);
        } catch (error) {
          console.log(error.message);
          if (
            error.response.data.error ===
              "This email already has an account." ||
            error.response.data.error ===
              "This username already has an account."
          ) {
            setIsLoading(false);
            setError(error.response.data.error);
          }
        }
      } else {
        setError("Veuillez rentrer deux mots de passe identiques");
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
            placeholder="username"
            onChangeText={(text) => setUsername(text)}
            value={username}
            secureTextEntry={false}
          />
          <TextInput
            style={styles.input}
            placeholder="description"
            onChangeText={(text) => setDescription(text)}
            value={description}
            secureTextEntry={false}
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={visible ? true : false}
          />
          <TextInput
            style={styles.input}
            placeholder="confirm your password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={visible ? true : false}
          />
          <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>
          <Pressable onPress={submit} style={styles.btn}>
            <Text>Sign up</Text>
          </Pressable>
          <Pressable
            style={styles.switch}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text>Already have an account? Sign in</Text>
          </Pressable>
          <Pressable
            style={{ position: "absolute", bottom: 225, right: 45 }}
            onPress={() => {
              setVisible(!visible);
            }}
          >
            {visible ? (
              <Ionicons
                size={20}
                style={{ color: "red" }}
                name="eye"
              ></Ionicons>
            ) : (
              <Ionicons
                size={20}
                style={{ color: "red" }}
                name="eye-off"
              ></Ionicons>
            )}
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
});
