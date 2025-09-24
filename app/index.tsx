import Icon from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [scaleAnim] = useState(new Animated.Value(0.9));

  useEffect(() => {
    // Animation sequence
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={["#753704", "#a0522d"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" />
      
      {/* Floating elements for visual interest */}
      <View style={styles.floatingElements}>
        <View style={[styles.floatingCircle, styles.circle1]} />
        <View style={[styles.floatingCircle, styles.circle2]} />
        <View style={[styles.floatingCircle, styles.circle3]} />
      </View>

      <Animated.View 
        style={[
          styles.content, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }]
          }
        ]}
      >

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <View style={styles.logoBackground}>
            <Icon name="check-square" size={60} color="#fff" />
          </View>
          <Text style={styles.title}>TaskMaster</Text>
          <Text style={styles.subtitle}>Organize your tasks simply and efficiently</Text>
        </View>

        {/* Feature Highlights */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Icon name="check-circle" size={20} color="#fff" />
            <Text style={styles.featureText}>Task Management</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="calendar" size={20} color="#fff" />
            <Text style={styles.featureText}>Calendar Integration</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="bell" size={20} color="#fff" />
            <Text style={styles.featureText}>Smart Reminders</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/Login")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Log In</Text>
            <Icon name="arrow-right" size={18} color="#753704" style={styles.buttonIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.outlineButton]}
            onPress={() => router.push("/SignUp")}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, styles.outlineButtonText]}>Sign Up</Text>
            <Icon name="user-plus" size={18} color="#ffff" style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>

        {/* Skip Option */}
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => router.push("/MainMenu")}
        >
          <Text style={styles.skipText}>Continue as Guest</Text>
          <Icon name="chevron-right" size={16} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  floatingElements: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  floatingCircle: {
    position: "absolute",
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  circle1: {
    width: 120,
    height: 120,
    top: height * 0.1,
    left: -30,
  },
  circle2: {
    width: 80,
    height: 80,
    bottom: height * 0.2,
    right: -20,
  },
  circle3: {
    width: 150,
    height: 150,
    top: height * 0.6,
    left: width * 0.7,
  },
  content: {
    width: "90%",
    alignItems: "center",
    zIndex: 2,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoBackground: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  appName: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 1,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: "80%",
  },
  featuresContainer: {
    width: "100%",
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  featureText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 12,
    fontWeight: "500",
  },
  buttonsRow: {
    width: "100%",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: { 
    color: "#753704", 
    fontSize: 18, 
  },
  buttonIcon: {
    marginLeft: 8,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#fff",
    shadowOpacity: 0,
    elevation: 0,
  },
  outlineButtonText: { 
    color: "#fff",
  },
  skipButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  skipText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    marginRight: 4,
  },
});