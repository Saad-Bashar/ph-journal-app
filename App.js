import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import CreateScreen from "./screens/CreateScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialising, setInitialising] = useState(true);
  const [user, setUser] = useState();

  console.log(user);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initialising) setInitialising(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {!user ? (
          <>
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Create" component={CreateScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
