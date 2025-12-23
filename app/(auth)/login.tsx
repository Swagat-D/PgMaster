import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const wp = (p: number) => (width * p) / 100;
const hp = (p: number) => (height * p) / 100;
const normalize = (size: number) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const inputRef = useRef<TextInput | null>(null);
  const [focused, setFocused] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top','bottom']}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}
        >
          <View style={[styles.center]}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.subtitle}>India&apos;s 1st Renting Super App 🇮🇳</Text>

        <Text style={styles.subtitle}>Login with Phone number</Text>

        <View style={styles.phoneRow}>
          <Text style={styles.cc}>+91</Text>

          <View style={[styles.digitsContainer, focused && styles.digitsContainerFocused]}>
              {Array.from({ length: 10 }).map((_, i) => {
                const char = phone[i];
                return (
                  <Text
                    key={i}
                    style={char ? styles.digitFilled : styles.digitPlaceholder}
                  >
                    {char ?? '0'}
                  </Text>
                );
              })}
              <TextInput
                ref={inputRef}
                style={styles.overlayInput}
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
                selectionColor="transparent"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                underlineColorAndroid="transparent"
                
              />
            </View>

          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => setPhone(prev => prev.slice(0, -1))}
            accessibilityLabel="Delete one digit"
          >
            <Text style={styles.clearIcon}>⌫</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.sendBtn} activeOpacity={0.9} onPress={() => router.push(`/(auth)/otp?phone=${phone}&from=login`)}>
          <Text style={styles.sendText}>Send OTP</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>By continuing you agree to our</Text>
        <Text style={styles.termsBold}>Terms of Service  &  Privacy Policy</Text>

        </View>
      


      <View style={styles.tenantContainer}>
        <Text style={styles.tenantText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/signUp')}>
          <Text style={styles.tenantAppText}>Sign Up</Text>
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
  subtitle: { 
    fontSize: normalize(16), 
    color: '#050505', 
    marginBottom: hp(4), 
    fontFamily: 'Poppins-Regular' 
  },
  phoneRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '100%', 
    marginBottom: hp(3) ,
    paddingHorizontal: wp(10)
  },
  cc: { 
    fontSize: normalize(26), 
    fontFamily: 'Poppins-Mixed', 
    color: '#000000', 
    width: normalize(44), 
    textAlign: 'left' 
  },
  digitsContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: wp(2)
  },
  phoneInput: { 
    flex: 1, 
    fontSize: normalize(22), 
    letterSpacing: 6, 
    color: '#6B7280', 
    fontFamily: 'Poppins-Light', 
    marginHorizontal: wp(3) 
  },
  hiddenInput: { 
    width: 1, 
    height: 1, 
    opacity: 0 
  },
  overlayInput: { 
    position: 'absolute', 
    left: 0, 
    right: 0, 
    top: 0, 
    bottom: 0, 
    opacity: 0 
  },
  digitsContainerFocused: { 
    borderBottomWidth: 0.6, 
    borderBottomColor: 'transparent' 
  },
  digitPlaceholder: { 
    fontSize: normalize(26), 
    color: '#D2D2D2', 
    fontFamily: 'Poppins-Mixed' 
  },
  digitFilled: { 
    fontSize: normalize(26), 
    color: '#000000', 
    fontFamily: 'Poppins-Mixed' 
  },
  clearBtn: { 
    width: normalize(36), 
    height: normalize(36), 
    borderRadius: normalize(18), 
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginLeft: wp(1) ,
    marginBottom: hp(1)
  },
  clearIcon: { 
    fontSize: normalize(22), 
    color: '#000000' 
  },
  sendBtn: { 
    backgroundColor: '#FEDC15', 
    paddingVertical: hp(1.6), 
    borderRadius: normalize(35), 
    alignItems: 'center', 
    marginBottom: hp(2), 
    borderWidth: 1, 
    borderColor: '#AEAEAE',
    width: '85%',
  },
  sendText: { 
    fontSize: normalize(16), 
    color: '#000000', 
    fontFamily: 'Poppins-Mixed' 
  },
  terms: { 
    fontSize: normalize(13), 
    color: '#050505', 
    marginTop: hp(1.5) ,
    fontFamily: 'Poppins-Regular'
  },
  termsBold: { 
    fontSize: normalize(14), 
    color: '#050505', 
    fontFamily: 'Poppins-Mixed', 
  },
  tenantContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: hp(14),
  },
  tenantText: {
    fontSize: normalize(14),
    color: '#050505',
    fontFamily: 'Poppins-Regular'
  },
  tenantAppText: {
    fontSize: normalize(14),
    color: '#FF0000',
    fontFamily: 'Poppins-Mixed',
    marginLeft: wp(1)
  }
});
