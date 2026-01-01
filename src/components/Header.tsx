import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = require('react-native').Dimensions.get('window');
const wp = (p: number) => (width * p) / 100;
const hp = (p: number) => (height * p) / 100;
const normalize = (size: number) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

export default function Header() {
  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#CBDFFF" />
      <View style={styles.container}>
        <View style={styles.left}>
          <Image source={require('../../assets/pht.png')} style={styles.avatar} />
        </View>

        <View style={styles.center}>
          <Text style={styles.welcome}>Welcome Gyana</Text>
          <TouchableOpacity style={styles.locationRow} activeOpacity={0.8}>
            <Text style={styles.location}>Kalyani Nagar</Text>
            <Ionicons name="caret-down" size={normalize(16)} color="#000000" style={styles.chev} />
          </TouchableOpacity>
        </View>

        <View style={styles.right}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
            <Ionicons name="headset-outline" size={normalize(18)} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, styles.helpBtn]} onPress={() => {}}>
            <Ionicons name="help-outline" size={normalize(18)} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: '#CBDFFF',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingTop: hp(1.6),
    paddingBottom: hp(1),
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  left: {
    marginRight: wp(3),
  },
  avatar: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(25),
    borderWidth: 1,
    borderColor: '#FFFFFF'
  },
  center: {
    flex: 1,
    justifyContent: 'center'
  },
  welcome: {
    fontSize: normalize(12),
    color: '#E74D3C',
    fontFamily: 'Inter-Regular'
  },
  locationRow: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  location: {
    fontSize: normalize(15),
    color: '#000000',
    fontFamily: 'Poppins-Mixed'
  },
  chev: { marginLeft: wp(1) },
  right: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(3)
  },
  helpBtn: { backgroundColor: '#000000' }
});
