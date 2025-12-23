import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const wp = (p: number) => (width * p) / 100;
const hp = (p: number) => (height * p) / 100;
const normalize = (size: number) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

export default function Role() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  const options = ['Property Manager', 'Property Operator', 'Landlord'];

  return (
    <SafeAreaView style={styles.container} edges={["top","bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.center}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />

          <Text style={styles.title}>India 1st Renting Super App 🇮🇳</Text>

          <TouchableOpacity activeOpacity={0.9} style={styles.select} onPress={() => setOpen(s => !s)}>
            <Text style={[styles.selectText, !role && { color: '#6B7280' }]}>{role ?? 'Select Your Role'}</Text>
            <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={normalize(20)} color="#111827" />
          </TouchableOpacity>

          {open && (
            <View style={styles.dropdown}>
              {options.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={styles.option}
                  onPress={() => { setRole(opt); setOpen(false); }}
                >
                  <Text style={styles.optionText}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {role && (
            <TouchableOpacity style={styles.nextBtn} activeOpacity={0.9} onPress={() => router.push('/(auth)/select')}>
              <Text style={styles.nextText}>Next Step</Text>
            </TouchableOpacity>
          )}

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
    paddingTop: hp(16) 
  },
  logo: {
     width: hp(12),
    height: hp(12),
    marginBottom: hp(2) 
  },
  title: { fontSize: normalize(16), color: '#050505', marginBottom: hp(3), fontFamily: 'Poppins-Regular' },
  select: {
    width: '86%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(10),
    borderWidth: 1,
    borderColor: '#E6E6E6',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
    // small shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  selectText: { fontSize: normalize(16), color: '#111827', fontFamily: 'Poppins-Regular' },
  dropdown: {
    width: '86%',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(10),
    marginTop: hp(1),
    // drop shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    zIndex: 50,
    overflow: 'hidden'
  },
  option: { paddingVertical: hp(2), paddingHorizontal: wp(4) },
  optionText: { fontSize: normalize(16), color: '#111827', fontFamily: 'Poppins-Regular' },
  nextBtn: {
    backgroundColor: '#FEDC15',
    paddingVertical: hp(1.8),
    borderRadius: normalize(35),
    alignItems: 'center',
    marginTop: hp(4),
    borderWidth: 1,
    borderColor: '#AEAEAE',
    width: '86%'
  },
  nextText: { fontSize: normalize(16), color: '#000000', fontFamily: 'Poppins-Mixed' }
});
