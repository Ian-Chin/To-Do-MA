import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MainMenuProps = {
  navigation: any;
};

export default function MainMenu({ navigation }: MainMenuProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Menu</Text>
      <Text style={styles.subtitle}>Choose what you want to do</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Tasks")}
      >
        <Text style={styles.buttonText}> View Tasks</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddTask")}
      >
        <Text style={styles.buttonText}> Calender</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={styles.buttonText}>⚙ Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={[styles.buttonText, styles.logoutText]}>𓉞 Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
    color: "#753704ff",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#753704ff",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 8,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#753704ff",
  },
  logoutText: {
    color: "#753704ff",
  },
});
