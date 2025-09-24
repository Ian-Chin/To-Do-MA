import Icon from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MainMenuProps = {
  navigation: any;
};

export default function MainMenu() {
  const navigation = useNavigation<StackNavigationProp<any>>();
    
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Icon name="check-square" size={48} color="#753704" />
          <Text style={styles.appName}>TaskMaster</Text>
        </View>
        <Text style={styles.tagline}>Organize your day, achieve your goals</Text>
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("ViewTask")}
          activeOpacity={0.7}
        >
          <View style={styles.menuIconContainer}>
            <Icon name="list" size={24} color="#fff" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>View Tasks</Text>
            <Text style={styles.menuDescription}>Manage your to-do list</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("CalendarPage")}
          activeOpacity={0.7}
        >
          <View style={[styles.menuIconContainer, { backgroundColor: "#4d79ff" }]}>
            <Icon name="calendar" size={24} color="#fff" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Calendar</Text>
            <Text style={styles.menuDescription}>View tasks by date</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("SettingsPage")}
          activeOpacity={0.7}
        >
          <View style={[styles.menuIconContainer, { backgroundColor: "#ff9500" }]}>
            <Icon name="settings" size={24} color="#fff" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Settings</Text>
            <Text style={styles.menuDescription}>Customize your experience</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.replace("Login")}
        activeOpacity={0.7}
      >
        <Icon name="log-out" size={18} color="#753704" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
        <Text style={styles.copyrightText}>© 2023 TaskMaster App</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    marginLeft: 12,
    color: "#753704",
  },
  tagline: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 24,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#753704",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 14,
    color: "#666",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#753704",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  logoutText: {
    color: "#753704",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  footer: {
    alignItems: "center",
    marginTop: "auto",
    paddingTop: 16,
  },
  versionText: {
    fontSize: 14,
    color: "#999",
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: "#bbb",
  },
});