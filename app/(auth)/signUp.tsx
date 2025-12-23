import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const wp = (p: number) => (width * p) / 100;
const hp = (p: number) => (height * p) / 100;
const normalize = (size: number) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

export default function SignUp() {
  const router = useRouter();
  const [owner, setOwner] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState('');
  const [referral, setReferral] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={["top","bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.center}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />

          <Text style={styles.title}>India 1st Renting Super App 🇮🇳</Text>

          <Text style={styles.headline}>PG ka Management?
            {'\n'}Ab Bilkul Easy!</Text>

          <View style={styles.form}>
            <View style={styles.inputWrap}>
              <TextInput
                placeholder="Owner Name"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                value={owner}
                onChangeText={setOwner}
              />
            </View>

            <View style={styles.inputWrap}>
              <TextInput
                placeholder="Mobile Number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                maxLength={10}
                style={styles.input}
                value={mobile}
                onChangeText={setMobile}
              />
            </View>

            <View style={styles.inputWrap}>
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputWrap}>
              <TextInput
                placeholder="Pincode"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                style={styles.input}
                value={pincode}
                onChangeText={setPincode}
              />
            </View>

            <View style={styles.inputWrap}>
              <TextInput
                placeholder="Referral code ( Optional )"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                value={referral}
                onChangeText={setReferral}
              />
            </View>

            <TouchableOpacity
              style={styles.nextBtn}
              activeOpacity={0.9}
              onPress={() => router.push(`/(auth)/otp?phone=${mobile}&from=signup`)}
            >
              <Text style={styles.nextText}>Next Step</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backRow} onPress={() => router.back()}>
              <Text style={styles.backIcon}>
                <Ionicons name="arrow-back-outline" />
              </Text>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          </View>
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
  scrollContainer: { flexGrow: 1 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? hp(4) : hp(3),
  },
  logo: {
    width: normalize(96),
    height: normalize(96),
    marginBottom: hp(2)
  },
  title: {
    fontSize: normalize(16),
    color: '#050505',
    marginBottom: hp(1),
    fontFamily: 'Poppins-Regular'
  },
  headline: {
    textAlign: 'center',
    fontSize: normalize(20),
    color: '#050505',
    fontFamily: 'Poppins-Mixed',
    marginBottom: hp(3),
    lineHeight: normalize(30)
  },
  form: {
    width: '87%',
    alignItems: 'center'
  },
  inputWrap: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(10),
    borderWidth: 1,
    borderColor: '#E6E6E6',
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.6),
    marginBottom: hp(1.2)
  },
  input: {
    fontSize: normalize(16),
    color: '#111827',
    fontFamily: 'Poppins-Regular'
  },
  nextBtn: {
    backgroundColor: '#FEDC15',
    paddingVertical: hp(1.6),
    borderRadius: normalize(35),
    alignItems: 'center',
    marginTop: hp(2),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: '#AEAEAE',
    width: '100%',
  },
  nextText: {
    fontSize: normalize(16),
    color: '#000000',
    fontFamily: 'Poppins-Mixed'
  },
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
