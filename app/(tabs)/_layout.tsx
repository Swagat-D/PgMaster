import { MaterialCommunityIcons } from "@expo/vector-icons";
// simplified styling: remove gradients
import { Tabs } from "expo-router";
import { Dimensions, Platform, View } from "react-native";
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
      tabBarActiveTintColor: "#CBDFFF",
      tabBarInactiveTintColor: "#A3B7D4",
      tabBarStyle: {
        backgroundColor: "#FFFFFF",
        width: '100%',
        borderTopWidth: 0,
        elevation: 6,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 20,
        height: Platform.select({
        ios: hasNotch ? hp(11) : hp(9.5),
        android: hasNotch ? hp(9.5) : hp(8.5),
        default: hp(8.5),
        }),
        paddingBottom: Platform.select({
        ios: hasNotch ? hp(3) : hp(1.8),
        android: hasNotch ? hp(2.4) : hp(1.6),
        default: hp(1.6),
        }),
        paddingTop: hp(0.6),
        paddingHorizontal: wp(6),
        borderTopRightRadius: normalize(32),
        borderTopLeftRadius: normalize(32),
        marginBottom: 0,
        bottom: 0,
        position: "absolute",
      },
      tabBarLabelStyle: {
        fontSize: normalize(12),
        fontFamily: "Inter-Regular",
        marginTop: normalize(2),
      },
      tabBarIconStyle: {
        marginTop: normalize(1),
        borderWidth: 0,
        borderColor: 'red',
      },
      }}
    >
      <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={focused ? 'home' : 'home-outline'}
            size={ focused ? normalize(28) : normalize(24)}
            color={focused ? '#CBDFFF' : '#171A1F'}
          />
        ),
      }}
      />

      <Tabs.Screen
      name="money"
      options={{
        title: "Money",
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={focused ? 'cash' : 'cash'}
            size={ focused ? normalize(28) : normalize(24)}
            color={focused ? '#CBDFFF' : '#171A1F'}
          />
        ),
      }}
      />

      <Tabs.Screen
      name="complaint"
      options={{
        title: "",
        tabBarLabel: "",
        tabBarIcon: () => (
          <View style={{
            width: hp(8),
            height: hp(8),
            borderRadius: hp(4),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E6ECEF',
            marginTop: -normalize(18),
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: -6 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 3
          }}>
            <MaterialCommunityIcons name={'alert'} size={hp(4)} color={'#CBDFFF'} />
          </View>
        ),
      }}
      />

      <Tabs.Screen
      name="tenants"
      options={{
        title: "Tenants",
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={focused ? 'account-multiple' : 'account-multiple-outline'}
            size={ focused ? normalize(28) : normalize(24)}
            color={focused ? '#CBDFFF' : '#171A1F'}
          />
        ),
      }}
      />

      <Tabs.Screen
      name="property"
      options={{
        title: "Property",
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={'domain'}
            size={ focused ? normalize(28) : normalize(24)}
            color={focused ? '#CBDFFF' : '#171A1F'}
          />
        ),
      }}
      />
    </Tabs>
  );
}