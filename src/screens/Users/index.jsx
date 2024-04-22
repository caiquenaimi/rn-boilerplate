import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import Title from "../../components/Title";
import { useEffect, useState } from "react";
import { axios } from "axios";


export default function Users() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  const api_url = process.env.EXPO_PUBLIC_API_URL;

  const getUsers = async () => {
    try {
      const response = await axios.get(`${api_url}/users`);
      const data = await response.json()();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Title texto="Users 👥" />

      {
      users.length === 0 && <Text>Loading...</Text>
      }

      {
      users.map((user) => (
        <Text key={user.id}>{user.name}</Text>
      ))}

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Home")}
      >
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
}
