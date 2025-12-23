import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const wp = (p: number) => (width * p) / 100;
const hp = (p: number) => (height * p) / 100;
const normalize = (size: number) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

export default function OTP() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const phone = Array.isArray(params?.phone) ? params.phone[0] : params?.phone;
  const from = Array.isArray(params?.from) ? params.from[0] : params?.from;

  useEffect(() => {
  }, [params, phone, from]);
  const [otp, setOtp] = useState('');
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const handleChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, '').slice(0, 6);
    setOtp(cleaned);
  };

  const boxes = Array.from({ length: 6 }).map((_, i) => otp[i] ?? '');

  return (
    <SafeAreaView style={styles.container} edges={["top","bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.center}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />

          <Text style={styles.title}>India 1st Renting Super App 🇮🇳</Text>

          <Text style={styles.instruction}>Enter the OTP sent to</Text>

          <View style={styles.phoneRow}> 
            <Text style={styles.phoneText}>{phone ?? '8260397998'}</Text>
            <TouchableOpacity onPress={() => router.back()} accessibilityLabel="Edit phone">
            <Ionicons name="create-outline" style={styles.editIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.otpRow}>
            {boxes.map((ch, i) => (
              <View key={i} style={[styles.otpBox, ch ? styles.otpBoxFilled : null]}>
                <Text style={ch ? styles.otpTextFilled : styles.otpText}>{ch}</Text>
              </View>
            ))}

            <TextInput
              ref={inputRef}
              value={otp}
              onChangeText={handleChange}
              style={styles.overlayInput}
              keyboardType="numeric"
              maxLength={6}
              selectionColor="transparent"
              underlineColorAndroid="transparent"
            />
          </View>

          <TouchableOpacity
            style={[styles.verifyBtn, otp.length !== 6 && styles.verifyBtnDisabled]}
            activeOpacity={0.9}
            onPress={() => {
              if (otp.length == 6) {
                const origin = typeof from === 'string' ? from : String(from ?? '');
                  if (origin === 'signup') {
                  router.push('/(auth)/role');
                } else {
                  router.push('/home');
                }
              }
            }}
          >
            <Text style={styles.verifyText}>Verify OTP</Text>
          </TouchableOpacity>

          <View style={styles.resendRow}>
            <Text style={styles.resendText}>Didn’t receive code? </Text>
            <TouchableOpacity onPress={() => { /* implement resend */ }}>
              <Text style={styles.resendLink}>Resend</Text>
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
  center: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    transform: [{ translateY: -hp(8) }],
  },
  scrollContainer: { flexGrow: 1 },
  logo: { 
    width: normalize(96), 
    height: normalize(96), 
    marginBottom: hp(2) 
  },
  title: { 
    fontSize: normalize(16), 
    color: '#050505', 
    marginBottom: hp(4), 
    fontFamily: 'Poppins-Regular' 
  },
  instruction: { 
    fontSize: normalize(16), 
    color: '#6B7280', 
    marginBottom: hp(1), 
    fontFamily: 'Poppins-Regular' 
  },
  phoneRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: hp(3) 
  },
  phoneText: { 
    fontSize: normalize(16),
    fontFamily: 'Poppins-Mixed', 
    color: '#050505', 
    marginRight: wp(2) 
  },
  editIcon: { 
    fontSize: normalize(18), 
    color: '#000000' ,
    alignSelf: 'center',
    paddingBottom: wp(1.5)
  },
  otpRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    paddingHorizontal: wp(6), 
    marginBottom: hp(3) 
  },
  otpBox: { 
    width: normalize(52), 
    height: normalize(52), 
    borderRadius: normalize(10), 
    borderWidth: 1.6, 
    borderColor: '#E6E6E6', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF' 
  },
  otpBoxFilled: { 
    borderColor: '#FEDC15' 
  },
  otpText: { 
    fontSize: normalize(22), 
    color: '#050505', 
    fontFamily: 'Poppins-Mixed',
    alignSelf : 'center' 
  },
  otpTextFilled: { 
    fontSize: normalize(22), 
    color: '#000000', 
    fontFamily: 'Poppins-Mixed' ,
    alignSelf : 'center'
  },
  overlayInput: { 
    position: 'absolute', 
    left: 0, 
    right: 0, 
    top: 0, 
    bottom: 0, 
    opacity: 0 
  },
  verifyBtn: { 
    backgroundColor: '#FEDC15', 
    paddingVertical: hp(1.6), 
    borderRadius: normalize(35), 
    alignItems: 'center', 
    marginBottom: hp(2), 
    borderWidth: 1, 
    borderColor: '#AEAEAE',
    width: '85%',
  },
  verifyText: { 
    fontSize: normalize(16), 
    color: '#000000', 
    fontFamily: 'Poppins-Mixed' 
  },
  verifyBtnDisabled: { 
    backgroundColor: '#D9D9D9', 
    borderColor: '#D1D1D1' 
  },
  resendRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: hp(1) 
  },
  resendText: { 
    fontSize: normalize(14), 
    color: '#2D2D2D', 
    fontFamily: 'Poppins-Mixed' 
  },
  resendLink: { 
    fontSize: normalize(14), 
    color: '#FF0000', 
    fontFamily: 'Poppins-Mixed', 
    marginLeft: 4 
  }
});
