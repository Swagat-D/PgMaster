import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const wp = (p: number) => (width * p) / 100;
const hp = (p: number) => (height * p) / 100;
const normalize = (size: number) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

// use inline requires in Image components for consistency with other pages

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const prepare = async () => {
      setTimeout(onFinish, 1800);
    };
    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.centerWrap}>
        <Image source={require('../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
        <Text style={styles.title}>Easy my Pg</Text>
        <Text style={styles.subtitle}>India&apos;s 1st Renting Super App 🇮🇳</Text>
      </View>

      <Image source={require('../../assets/building.png')} style={styles.building} resizeMode="cover" />

      <View style={styles.footerWrap} pointerEvents="none">
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Made by Owners.</Text>
          <Image source={require('../../assets/Protect.png')} style={styles.protect} />
          <Text style={styles.footerText}>Trusted by Owners.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerWrap: {
    position: 'absolute',
    top: hp(30),
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  logoImage: {
    width: normalize(95),
    height: normalize(101),
  },
  title: {
    fontSize: normalize(34),
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    marginTop: hp(1),
  },
  subtitle: {
    fontSize: normalize(16),
    color: '#050505',
    fontFamily: 'Poppins-Light',
  },
  building: {
    position: 'absolute',
    bottom: hp(16),
    width: '100%',
  },
  footerWrap: {
    position: 'absolute',
    bottom: hp(5),
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    marginBottom: hp(1.5),
  },
  protect: {
    width: normalize(14),
    height: normalize(14),
    marginRight: wp(1),
    resizeMode: 'contain',
  },
  footerText: {
    color: '#050505',
    fontSize: normalize(12),
    fontFamily: 'Poppins-Regular',
  },  
});

