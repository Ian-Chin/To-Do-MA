import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const handleLogin = () => Alert.alert("Navigate", "Go to Login screen");
  const handleSignup = () => Alert.alert("Navigate", "Go to Signup screen");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME</Text>
      <Text style={styles.title}>To-Do</Text>
      <Text style={styles.subtitle}>Organize your tasks simply.</Text>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.outlineButton]} onPress={handleSignup}>
          <Text style={[styles.buttonText, styles.outlineButtonText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff9e4ff",
  },
  title: {
    fontSize: 50,
    fontWeight: "700",
    marginBottom: 8,
    color: "#753704ff",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  buttonsRow: {
    width: "100%",
    paddingHorizontal: 24,
  },
  button: {
    backgroundColor: "#753704ff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  outlineButton: {
    backgroundColor: "#ffffffff",
    borderWidth: 1,
    borderColor: "#753704ff",
  },
  outlineButtonText: {
    color: "#753704ff",
  },
});