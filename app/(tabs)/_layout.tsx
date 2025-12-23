import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, Dimensions } from "react-native";
import Header from "../../src/components/Header";

const { width, height } = Dimensions.get("window");

const wp = (percentage: number) => (width * percentage) / 100;
const hp = (percentage: number) => (height * percentage) / 100;
const normalize = (size: number) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

const hasNotch = height > 800 || Platform.OS === "ios";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
      headerShown: true,
      header: () => <Header />,
      tabBarActiveTintColor: "#FFDF6B",
      tabBarInactiveTintColor: "#FFFFFF",
      tabBarStyle: {
        backgroundColor: "#000000",
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        height: Platform.select({
        ios: hasNotch ? hp(9) : hp(8),
        android: hasNotch ? hp(8) : hp(7),
        default: hp(7),
        }),
        paddingBottom: Platform.select({
        ios: hasNotch ? hp(2.6) : hp(1.2),
        android: hasNotch ? hp(1.8) : hp(1.2),
        default: hp(1.2),
        }),
        paddingTop: hp(1),
        paddingHorizontal: wp(4),
        borderRadius: normalize(20),
        marginHorizontal: wp(4),
        marginBottom: Platform.select({
        default: normalize(30),
        }),
        position: "absolute",
      },
      tabBarLabelStyle: {
        fontSize: normalize(width < 360 ? 10 : width < 400 ? 11 : 12),
        fontWeight: "400",
        marginTop: normalize(2),
      },
      tabBarIconStyle: {
        marginTop: normalize(1),
      },
      }}
    >
      <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        tabBarIcon: ({ color, focused }) => (
        <MaterialCommunityIcons 
          name="home-outline" 
          size={ focused ? normalize(28) : normalize(24)} 
          color={color} 
        />
        ),
      }}
      />

      <Tabs.Screen
      name="money"
      options={{
        title: "Money",
        tabBarIcon: ({ color, focused }) => (
        <MaterialCommunityIcons 
          name="cash-multiple" 
          size={focused ? normalize(28) : normalize(24)}
          color={color} 
        />
        ),
      }}
      />

      <Tabs.Screen
      name="tenants"
      options={{
        title: "Tenants",
        tabBarIcon: ({ color, focused }) => (
        <MaterialCommunityIcons 
          name="account-multiple-outline" 
          size={focused ? normalize(28) : normalize(24)}
          color={color}
        />
        ),
      }}
      />

      <Tabs.Screen
      name="property"
      options={{
        title: "Property",
        tabBarIcon: ({ color, focused }) => (
        <MaterialCommunityIcons 
          name="domain" 
          size={focused ? normalize(28) : normalize(24)} 
          color={color} 
        />
        ),
      }}
      />
    </Tabs>
  );
}