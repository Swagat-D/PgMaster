import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Dimensions, Platform, StatusBar, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";


const { width, height } = Dimensions.get("window");

// Calculate responsive sizes
const getLogoSize = () => {
  if (width < 360) return 42;
  if (width < 400) return 46;
  return 50;
};

const getProfileSize = () => {
  if (width < 360) return 42;
  if (width < 400) return 46;
  return 42;
};

const getNotificationSize = () => {
  if (width < 360) return 22;
  if (width < 400) return 24;
  return 26;
};

export default function Header() {
  const insets = useSafeAreaInsets();
  const logoSize = getLogoSize();
  const profileSize = getProfileSize();
  const notificationSize = getNotificationSize();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top > 0 ? insets.top : (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0) }]}>
      <View style={styles.content}>
        {/* Logo */}
        <TouchableOpacity activeOpacity={0.8}>
          <Image
            source={require("../../assets/logo.png")}
            style={[styles.logo, { width: logoSize, height: logoSize }]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Right Side Icons */}
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7} 
            onPress={() => router.push("/")}
          >
            <Ionicons name="notifications-outline" size={notificationSize} color="#000000" />
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>3</Text>
            </View>
          </TouchableOpacity>

          {/* User Profile Picture */}
          <TouchableOpacity 
            style={[styles.profileButton, { width: profileSize, height: profileSize }]} 
            activeOpacity={0.8}
            onPress={() => router.push("/")}
          >
            <Image
              source={require("../../assets/pht.png")}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Math.max(width * 0.05, 16),
    paddingTop: Platform.OS === "ios" ? 8 : 12,
    paddingBottom: Platform.OS === "ios" ? 12 : 14,
    minHeight: 60,
  },
  logo: {
    maxWidth: 60,
    maxHeight: 60,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: width < 360 ? 12 : width < 400 ? 14 : 16,
  },
  iconButton: {
    position: "relative",
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadBadge: {
    position: "absolute",
    top: 2,
    right: 2,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    backgroundColor: "#FF3B30",
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  unreadText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 12,
  },
  profileButton: {
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#F0F0F0",
    backgroundColor: "#FFFFFF",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
});