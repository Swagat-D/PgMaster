import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const wp = (p: number) => (width * p) / 100;
const hp = (p: number) => (height * p) / 100;
const normalize = (size: number) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

export default function SelectProperty() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>('PG Rooms');

  const items = [
    { key: 'PG Rooms', icon: 'bed-outline' },
    { key: 'Hostel', icon: 'business-outline' },
    { key: 'Co-Livings', icon: 'people-outline' },
    { key: 'Flats', icon: 'business' },

    { key: 'Rk_s', icon: 'business-outline' },
    { key: 'Studio Appt.', icon: 'grid-outline' },
    { key: 'Co- Working', icon: 'briefcase-outline' },
    { key: 'Homestaye', icon: 'home-outline' },

    { key: 'Library', icon: 'book-outline' },
    { key: 'Shops', icon: 'storefront-outline' },
    { key: 'Hotel', icon: 'bed-outline' },
    { key: 'Kothi', icon: 'business-outline' },

    { key: 'Independent Floors', icon: 'layers-outline' },
    { key: 'Villa', icon: 'home-outline' },
    { key: 'PentHouse', icon: 'aperture' },
    { key: 'WareHouse', icon: 'archive' }
  ];

  const cols = 4;
  const gap = wp(2);
  const containerPct = 0.86;
  const containerWidth = width * containerPct;
  const tileSize = Math.floor(((containerWidth - gap * (cols - 1)) / cols) * 0.86);

  return (
    <SafeAreaView style={styles.container} edges={["top","bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.center}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />

          <Text style={styles.title}>India 1st Renting Super App 🇮🇳</Text>

          <Text style={styles.headline}>Select Property Type</Text>

            <View style={[styles.containerBox, { width: `${containerPct * 100}%` }]}> 
              {Array.from({ length: 4 }).map((_, rowIdx) => (
                <View key={rowIdx} style={styles.row}>
                  {items.slice(rowIdx * 4, rowIdx * 4 + 4).map((it) => {
                    const active = selected === it.key;
                    return (
                      <TouchableOpacity
                        key={it.key}
                        style={[styles.tile, { width: tileSize }]}
                        activeOpacity={0.9}
                        onPress={() => setSelected(active ? null : it.key)}
                      >
                        <View style={[styles.iconWrap, active && styles.iconWrapActive, { width: tileSize * 0.74, height: tileSize * 0.74 }]}> 
                          <Ionicons name={it.icon as any} size={Math.round(tileSize * 0.38)} color={active ? '#000' : '#111827'} />
                        </View>
                        <Text style={[styles.tileLabel, { width: tileSize }]} numberOfLines={2}>{it.key}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>

          <TouchableOpacity style={styles.submitBtn} activeOpacity={0.9} onPress={() => router.push('/home')}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backRow} onPress={() => router.back()}>
            <Text style={styles.backIcon}>
              <Ionicons name="arrow-back-outline" />
              </Text>
            <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  scrollContainer: { 
    flexGrow: 1 
  },
  center: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    paddingTop: hp(4) 
  },
  logo: { 
    width: hp(12), 
    height: hp(12), 
    marginBottom: hp(2) 
  },
  title: { 
    fontSize: normalize(16), 
    color: '#050505', 
    marginBottom: hp(2), 
    fontFamily: 'Poppins-Regular' 
  },
  headline: { 
    fontSize: normalize(18), 
    color: '#050505', 
    marginBottom: hp(3), 
    fontFamily: 'Poppins-Mixed', 
    textAlign: 'center' 
  },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  tile: { 
    alignItems: 'center', 
    marginBottom: hp(0.5) 
  },
  containerBox: { 
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    borderWidth: 1,
    borderColor: '#E6E6E6',
    paddingTop: hp(2),
    paddingHorizontal: wp(2)
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginBottom: hp(2) 
  },
  iconWrap: { 
    borderRadius: normalize(16),
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    padding: wp(2)
  },
  iconWrapActive: { backgroundColor: '#FEF3C7' },
  tileLabel: { marginTop: hp(0.6), fontSize: normalize(11), color: '#111827', textAlign: 'center', width: '100%', fontFamily: 'Poppins-Regular' },
  submitBtn: {
    backgroundColor: '#FEDC15',
    paddingVertical: hp(1.6),
    borderRadius: normalize(35),
    alignItems: 'center',
    marginTop: hp(3),
    borderWidth: 1,
    borderColor: '#AEAEAE',
    width: '86%',
    marginBottom: hp(2)
  },
  submitText: { fontSize: normalize(16), color: '#000000', fontFamily: 'Poppins-Mixed' },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backIcon: {
    fontSize: normalize(20),
    color: '#000000',
    marginRight: wp(2)
  },
  backText: {
    fontSize: normalize(16),
    color: '#000000',
    fontFamily: 'Poppins-Regular'
  }
});