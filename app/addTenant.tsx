import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');
const wp = (p: number) => (width * p) / 100;
const hp = (p: number) => (height * p) / 100;
const normalize = (size: number) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

export default function AddTenant() {
  const [step, setStep] = useState(1);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownCallback, setDropdownCallback] = useState<(v:string)=>void>(()=>{});
  const [dropdownKey, setDropdownKey] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const [currentDropdownRef, setCurrentDropdownRef] = useState<any>(null);

  const [form, setForm] = useState({
    fullName: '',
    gender: '',
    profession: '',
    phone: '',
    email: '',
    address: '',
    pincode: '',
    state: '',

    property: '',
    roomNo: '',
    joiningDate: '',
    moveOut: '',
    lockIn: '',
    noticePeriod: '',
    agreementPeriod: '',
    rentalType: '',

    rentPrice: '',
    securityDeposit: '',
    lockInPeriod: '',
    noticePeriodMoney: '',
    electricityReading: '',
    automaticRentReminder: true,
  });

  const scrollRef = useRef<ScrollView | null>(null);
  const fullNameRef = useRef<any>(null);
  const phoneRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const addressRef = useRef<any>(null);
  const pincodeRef = useRef<any>(null);
  const rentPriceRef = useRef<any>(null);
  const securityDepositRef = useRef<any>(null);
  const electricityReadingRef = useRef<any>(null);

  const router = useRouter();

  useEffect(()=>{
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates?.height || 0);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    });
    return ()=>{ showSub.remove(); hideSub.remove(); }
  },[])

  const scrollToRef = (ref: any) => {
    setTimeout(() => {
      try {
        if (ref && ref.current && typeof ref.current.measure === 'function') {
          ref.current.measure((fx: number, fy: number, w: number, h: number, px: number, py: number) => {
            const offset = Platform.OS === 'ios' ? 120 : 100;
            scrollRef.current?.scrollTo({ y: Math.max(py - offset, 0), animated: true });
          });
        } else {
          scrollRef.current?.scrollToEnd({ animated: true });
        }
      } catch (e) {
        scrollRef.current?.scrollToEnd({ animated: true });
      }
    }, 250);
  };

  const next = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
      scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    } else {
      try {
        Toast.show({
          type: 'success',
          text1: 'Tenant added successfully',
        });
      } catch (e) {
      }
      router.back();
    }
  };

  const prev = () => {
    if (step > 1) setStep(step - 1);
    else router.back();
  };

  const renderProgress = () => (
    <>
      <View style={styles.headerWrap}>
        <View style={styles.backRow}>
          <TouchableOpacity onPress={prev} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Tenant</Text>
        </View>
      </View>

      <View style={styles.progressWrap}>
        <View style={styles.dotsRow}>
          <View style={[styles.dot, step === 1 && styles.dotActive]} />
          <View style={styles.line} />
          <View style={[styles.dot, step === 2 && styles.dotActive]} />
          <View style={styles.line} />
          <View style={[styles.dot, step === 3 && styles.dotActive]} />
        </View>
      </View>
    </>
  );

  function openDropdown(options: string[], key: string, ref?: any) {
    Keyboard.dismiss();
    setDropdownOptions(options);
    setDropdownKey(key);
    setCurrentDropdownRef(ref);
    
    if (ref && ref.current) {
      setTimeout(() => {
        try {
          ref.current.measureInWindow((x: number, y: number, w: number, h: number) => {
            setDropdownPosition({ top: y + h, left: x, width: w });
            setDropdownVisible(true);
          });
        } catch (e) {
          setDropdownPosition(null);
          setDropdownVisible(true);
        }
      }, 50);
    } else {
      setDropdownPosition(null);
      setDropdownVisible(true);
    }
  }

  const onSelectDropdown = (value: string) => {
    if (dropdownKey) {
      setForm(prev => ({ ...prev, [dropdownKey]: value } as any));
    } else if (dropdownCallback) {
      dropdownCallback(value);
    }
    setDropdownVisible(false);
    setDropdownKey(null);
  };

  const DropdownOverlay = () => {
    if (!dropdownVisible) return null;
    
    const isLargeList = dropdownOptions.length > 6;
    
    return (
      <View style={styles.overlayContainer} pointerEvents="box-none">
        <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View
          style={[
            styles.dropdownOverlay,
            dropdownPosition
              ? { top: dropdownPosition.top, left: dropdownPosition.left, width: dropdownPosition.width }
              : { alignSelf: 'center', width: wp(90), bottom: keyboardVisible ? keyboardHeight + 16 : 80 },
          ]}
        >
          {isLargeList ? (
            <ScrollView style={{ maxHeight: hp(30) }}>
              {dropdownOptions.map((opt) => (
                <TouchableOpacity key={opt} style={styles.dropdownItem} onPress={() => onSelectDropdown(opt)}>
                  <Text style={styles.dropdownText}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            dropdownOptions.map((opt) => (
              <TouchableOpacity key={opt} style={styles.dropdownItem} onPress={() => onSelectDropdown(opt)}>
                <Text style={styles.dropdownText}>{opt}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={Platform.OS === 'ios' ? ['top'] : ['top']}>
      <StatusBar style="dark" translucent />
      {renderProgress()}

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 80}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            ref={scrollRef} 
            contentContainerStyle={[styles.scroll, { paddingBottom: keyboardVisible ? keyboardHeight + 16 : hp(14) }]} 
            showsVerticalScrollIndicator={false} 
            keyboardShouldPersistTaps="handled"
          >
          {step === 1 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Basic Information</Text>

              <Text style={styles.label}>Full Name</Text>
              <TextInput 
                ref={fullNameRef}
                style={styles.input} 
                placeholder="Full Name" 
                placeholderTextColor="#909090" 
                value={form.fullName} 
                onChangeText={v => setForm({ ...form, fullName: v })} 
                onFocus={() => scrollToRef(fullNameRef)}
              />

              <View style={styles.rowInputs}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Gender</Text>
                              <TouchableOpacity style={styles.select} ref={(r) => { if (r) (r as any).genderRef = r; }} onPress={(e) => {
                                const ref = (e.currentTarget as any).genderRef ? { current: (e.currentTarget as any).genderRef } : null;
                                openDropdown(['Male','Female','Other'], 'gender', ref);
                              }}>
                                <Text style={form.gender ? styles.selectValueText : styles.selectText}>{form.gender || 'Select'}</Text>
                                <Ionicons name="chevron-down" size={18} color="#909090" />
                              </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Profession</Text>
                              <TouchableOpacity style={styles.select} ref={(r) => { if (r) (r as any).professionRef = r; }} onPress={(e) => {
                                const ref = (e.currentTarget as any).professionRef ? { current: (e.currentTarget as any).professionRef } : null;
                                openDropdown(['Student','Working Professional','Self-Employed','Other'], 'profession', ref);
                              }}>
                                <Text style={form.profession ? styles.selectValueText : styles.selectText}>{form.profession || 'Select'}</Text>
                                <Ionicons name="chevron-down" size={18} color="#909090" />
                              </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.phoneRow}>
                <View style={styles.phonePrefix}><Text style={styles.selectText}>+91</Text></View>
                <TextInput 
                  ref={phoneRef} 
                  style={[styles.input, styles.phoneInput]} 
                  placeholder="Phone Number" 
                  placeholderTextColor="#909090" 
                  value={form.phone} 
                  onChangeText={v => setForm({ ...form, phone: v })} 
                  keyboardType="phone-pad" 
                  onFocus={() => scrollToRef(phoneRef)}
                />
              </View>

              <Text style={styles.label}>Email</Text>
              <TextInput 
                ref={emailRef} 
                style={styles.input} 
                placeholder="Tenant Email id" 
                placeholderTextColor="#909090" 
                value={form.email} 
                onChangeText={v => setForm({ ...form, email: v })} 
                keyboardType="email-address" 
                onFocus={() => scrollToRef(emailRef)}
              />

              <Text style={styles.label}>Permanent Address</Text>
              <TextInput 
                ref={addressRef}
                style={styles.input} 
                placeholder="Address Line" 
                placeholderTextColor="#909090" 
                value={form.address} 
                onChangeText={v => setForm({ ...form, address: v })} 
                onFocus={() => scrollToRef(addressRef)}
              />

              <View style={styles.rowInputs}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Pincode</Text>
                  <TextInput 
                    ref={pincodeRef}
                    style={[styles.input, styles.smallInput]} 
                    placeholder="Pincode" 
                    placeholderTextColor="#909090" 
                    value={form.pincode} 
                    onChangeText={v => setForm({ ...form, pincode: v })} 
                    keyboardType="number-pad"
                    onFocus={() => scrollToRef(pincodeRef)}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>State</Text>
                  <TouchableOpacity style={styles.select} ref={(r) => { if (r) (r as any).stateRef = r; }} onPress={(e) => {
                    const ref = (e.currentTarget as any).stateRef ? { current: (e.currentTarget as any).stateRef } : null;
                    openDropdown([
                      'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi'
                      ], 'state', ref);
                  }}>
                    <Text style={form.state ? styles.selectValueText : styles.selectText}>{form.state || 'Select'}</Text>
                    <Ionicons name="chevron-down" size={18} color="#909090" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {step === 2 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Room & Rent Details</Text>

              <View style={styles.rowInputs}>
                <View style={{ flex: 1 }}>
                <Text style={styles.label}>Property</Text>
                <TouchableOpacity style={styles.select} ref={(r) => { if (r) (r as any).propertyRef = r; }} onPress={(e) => {
                  const ref = (e.currentTarget as any).propertyRef ? { current: (e.currentTarget as any).propertyRef } : null;
                  openDropdown(['Property A','Property B','Property C'], 'property', ref);
                }}>
                  <Text style={form.property ? styles.selectValueText : styles.selectText}>{form.property || 'Select'}</Text>
                  <Ionicons name="chevron-down" size={18} color="#909090" />
                </TouchableOpacity>
                </View>
                <View style={{ width: wp(1.5) }} />
                <View style={{ flex: 1 }}>
                <Text style={styles.label}>Room No</Text>
                <TouchableOpacity style={styles.select} ref={(r) => { if (r) (r as any).roomRef = r; }} onPress={(e) => {
                  const ref = (e.currentTarget as any).roomRef ? { current: (e.currentTarget as any).roomRef } : null;
                  openDropdown(['R1','R2','R3'], 'roomNo', ref);
                }}>
                  <Text style={form.roomNo ? styles.selectValueText : styles.selectText}>{form.roomNo || 'Room No'}</Text>
                  <Ionicons name="chevron-down" size={18} color="#909090" />
                </TouchableOpacity>
                </View>
              </View>

              <View style={styles.rowInputs}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Joining Date</Text>
                  <TouchableOpacity style={styles.select} ref={(r) => { if (r) (r as any).joiningRef = r; }} onPress={(e) => {
                    const ref = (e.currentTarget as any).joiningRef ? { current: (e.currentTarget as any).joiningRef } : null;
                    openDropdown(['Today', '01 Jan 2026', '01 Feb 2026'], 'joiningDate', ref);
                  }}>
                    <Text style={form.joiningDate ? styles.selectValueText : styles.selectText}>{form.joiningDate || 'Joining Date'}</Text>
                    <Ionicons name="chevron-down" size={18} color="#909090" />
                  </TouchableOpacity>
                </View>
                <View style={{ width: wp(1.5) }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Move - out</Text>
                  <TouchableOpacity style={styles.select} ref={(r) => { if (r) (r as any).moveOutRef = r; }} onPress={(e) => {
                    const ref = (e.currentTarget as any).moveOutRef ? { current: (e.currentTarget as any).moveOutRef } : null;
                    openDropdown(['No', '1 month', '2 months'], 'moveOut', ref);
                  }}>
                    <Text style={form.moveOut ? styles.selectValueText : styles.selectText}>{form.moveOut || 'Move - out'}</Text>
                    <Ionicons name="chevron-down" size={18} color="#909090" />
                  </TouchableOpacity>
                </View>
              </View>

              
              <View style={styles.rowInputs}>
                <View style={{ flex: 1 }}>
                <Text style={styles.label}>Lock-in Period</Text>
                <TouchableOpacity style={styles.smallSelect} ref={(r) => { if (r) (r as any).lockInRef = r; }} onPress={(e) => {
                  const ref = (e.currentTarget as any).lockInRef ? { current: (e.currentTarget as any).lockInRef } : null;
                  openDropdown(['3 months','6 months','12 months'], 'lockIn', ref);
                }}>
                  <Text style={form.lockIn ? styles.selectValueText : styles.selectText}>{form.lockIn || 'Lock-in Period'}</Text>
                  <Ionicons name="chevron-down" size={18} color="#909090" />
                </TouchableOpacity>
                </View>
                <View style={{ width: wp(1.5) }} />
                <View style={{ flex: 1 }}>
                <Text style={styles.label}>Notice Period</Text>
                <TouchableOpacity style={styles.smallSelect} ref={(r) => { if (r) (r as any).noticeRef = r; }} onPress={(e) => {
                  const ref = (e.currentTarget as any).noticeRef ? { current: (e.currentTarget as any).noticeRef } : null;
                  openDropdown(['1 month','2 weeks','No notice'], 'noticePeriod', ref);
                }}>
                  <Text style={form.noticePeriod ? styles.selectValueText : styles.selectText}>{form.noticePeriod || 'Notice Period'}</Text>
                  <Ionicons name="chevron-down" size={18} color="#909090" />
                </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.label}>Agreement Period</Text>
              <TouchableOpacity style={styles.selectFull} ref={(r) => { if (r) (r as any).agreementRef = r; }} onPress={(e) => {
                const ref = (e.currentTarget as any).agreementRef ? { current: (e.currentTarget as any).agreementRef } : null;
                openDropdown(['6 months','1 year','2 years'], 'agreementPeriod', ref);
              }}>
                <Text style={form.agreementPeriod ? styles.selectValueText : styles.selectText}>{form.agreementPeriod || 'Agreement Period'}</Text>
                <Ionicons name="chevron-down" size={18} color="#909090" />
              </TouchableOpacity>

              <Text style={styles.label}>Rental Type</Text>
              <TouchableOpacity style={styles.selectFull} ref={(r) => { if (r) (r as any).rentalRef = r; }} onPress={(e) => {
                const ref = (e.currentTarget as any).rentalRef ? { current: (e.currentTarget as any).rentalRef } : null;
                openDropdown(['Per Bed','Full Room'], 'rentalType', ref);
              }}>
                <Text style={form.rentalType ? styles.selectValueText : styles.selectText}>{form.rentalType || 'Rental Type'}</Text>
                <Ionicons name="chevron-down" size={18} color="#909090" />
              </TouchableOpacity>
            </View>
          )}

          {step === 3 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rent & Money Details</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: hp(1.2) }}>
                <Text style={[styles.label, { color: '#FF4D4F' }]}>Automatic Rent Reminder</Text>
                <Switch
                  value={!!form.automaticRentReminder}
                  onValueChange={() => setForm(prev => ({ ...prev, automaticRentReminder: !prev.automaticRentReminder }))}
                  trackColor={{ false: '#E5E7EB', true: '#FF4D4F' }}
                  thumbColor={Platform.OS === 'android' ? '#fff' : undefined}
                />
              </View>

              <Text style={styles.label}>Rent Price</Text>
              <View style={{ marginBottom: hp(1.2) }}>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    ref={rentPriceRef}
                    style={styles.inputInner}
                    placeholder="Amount"
                    placeholderTextColor="#9CA3AF"
                    value={form.rentPrice}
                    onChangeText={v => setForm(prev => ({ ...prev, rentPrice: v }))}
                    keyboardType="numeric"
                    onFocus={() => scrollToRef(rentPriceRef)}
                  />
                  <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7} onPress={() => {}}>
                    <Ionicons name="create-outline" size={22} color="#111" />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.label}>Security Deposit</Text>
              <View style={{ marginBottom: hp(1.2) }}>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    ref={securityDepositRef}
                    style={styles.inputInner}
                    placeholder="Deposit Amount"
                    placeholderTextColor="#9CA3AF"
                    value={form.securityDeposit}
                    onChangeText={v => setForm(prev => ({ ...prev, securityDeposit: v }))}
                    keyboardType="numeric"
                    onFocus={() => scrollToRef(securityDepositRef)}
                  />
                  <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7} onPress={() => {}}>
                    <Ionicons name="create-outline" size={22} color="#111" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.rowInputs}>
                <View style={{ flex: 1 }}>
                <Text style={styles.label}>Lock-in Period</Text>
                <TouchableOpacity style={styles.select} ref={(r) => { if (r) (r as any).lockInRef = r; }} onPress={(e) => {
                  const ref = (e.currentTarget as any).lockInRef ? { current: (e.currentTarget as any).lockInRef } : null;
                  openDropdown(['3 months','6 months','12 months'], 'lockIn', ref);
                }}>
                  <Text style={form.lockIn ? styles.selectValueText : styles.selectText}>{form.lockIn || 'Lock-in Period'}</Text>
                  <Ionicons name="chevron-down" size={18} color="#909090" />
                </TouchableOpacity>
                </View>
                <View style={{ width: wp(1.5) }} />
                <View style={{ flex: 1 }}>
                <Text style={styles.label}>Notice Period</Text>
                <TouchableOpacity style={styles.select} ref={(r) => { if (r) (r as any).noticeRef = r; }} onPress={(e) => {
                  const ref = (e.currentTarget as any).noticeRef ? { current: (e.currentTarget as any).noticeRef } : null;
                  openDropdown(['1 month','2 weeks','No notice'], 'noticePeriod', ref);
                }}>
                  <Text style={form.noticePeriod ? styles.selectValueText : styles.selectText}>{form.noticePeriod || 'Notice Period'}</Text>
                  <Ionicons name="chevron-down" size={18} color="#909090" />
                </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.label}>Room Electricity Reading</Text>
              <View style={styles.inputWithIcon}>
                <TextInput
                  ref={electricityReadingRef}
                  style={styles.inputInner}
                  placeholder="Meter Units"
                  placeholderTextColor="#9CA3AF"
                  value={form.electricityReading}
                  onChangeText={v => setForm(prev => ({ ...prev, electricityReading: v }))}
                  keyboardType="numeric"
                  onFocus={() => scrollToRef(electricityReadingRef)}
                />
                <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7} onPress={() => {}}>
                  <Ionicons name="create-outline" size={22} color="#111" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View style={styles.footerWrap} pointerEvents="box-none">
        <TouchableOpacity onPress={next} style={styles.nextButton} activeOpacity={0.9} 
          
        >
          <Text style={styles.nextButtonText}>{step < 3 ? 'Next' : 'Add Tenant'}</Text>
        </TouchableOpacity>
      </View>
      <DropdownOverlay />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#CBDFFF' },
  headerWrap: { backgroundColor: '#EDF4FF', paddingHorizontal: wp(4), paddingTop: hp(3.5), paddingBottom: hp(2) },
  flex: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { paddingHorizontal: wp(4), paddingTop: hp(2), paddingBottom: hp(14), backgroundColor: '#FFFFFF' },

  progressWrap: { backgroundColor: '#FFFFFF', paddingHorizontal: wp(4), paddingTop: hp(1.5) },
  backRow: { flexDirection: 'row', alignItems: 'center' },
  backBtn: { width: normalize(24), height: normalize(24), borderRadius: normalize(12), justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: normalize(18), marginLeft: wp(3), color: '#171A1F', fontFamily: 'Inter-SemiBold' },

  dotsRow: { flexDirection: 'row', alignItems: 'center', marginTop: hp(0.6), paddingHorizontal: wp(2) },
  dot: { width: normalize(18), height: normalize(18), borderRadius: normalize(9), backgroundColor: '#909090', borderWidth: 0.5, borderColor: '#6E6C6C' },
  dotActive: { backgroundColor: '#D7E6FF', borderColor: '#6E6C6C' },
  line: { height: 2, backgroundColor: '#D1D5DB', flex: 1, marginHorizontal: wp(3) },

  section: { },
  sectionTitle: { fontSize: normalize(16), fontFamily: 'Inter-SemiBold', marginBottom: hp(1), color: '#171A1F' },
  label: { fontSize: normalize(15), color: '#000000', marginBottom: hp(0.6), fontFamily: 'Inter-Regular' },
  input: { backgroundColor: '#FFFFFF', borderRadius: normalize(10), paddingHorizontal: wp(4), paddingVertical: hp(1.4), marginBottom: hp(1.1), borderWidth: 1, borderColor: '#E6E6E6' },
  select: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: normalize(10), paddingHorizontal: wp(4), paddingVertical: hp(1.6), marginBottom: hp(1.1), borderWidth: 1, borderColor: '#E6E6E6', marginRight: wp(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  selectFull: { backgroundColor: '#FFFFFF', borderRadius: normalize(10), paddingHorizontal: wp(4), paddingVertical: hp(1.4), marginBottom: hp(1.1), borderWidth: 1, borderColor: '#E6E6E6', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  selectText: { color: '#909090', fontSize: normalize(15) },
  selectValueText: { color: '#111111', fontSize: normalize(15) },
  rowInputs: { flexDirection: 'row', alignItems: 'center', marginBottom: hp(0.8) },
  smallInput: { flex: 1, width: '95%' },

  footerWrap: { position: 'absolute', left: 0, right: 0, bottom: hp(2), paddingHorizontal: wp(4), paddingBottom: hp(2), backgroundColor: 'transparent' },
  nextButton: { backgroundColor: '#CBDFFF', borderRadius: normalize(35), paddingVertical: hp(1.8), alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#AEAEAE' },
  nextButtonText: { fontSize: normalize(18), color: '#171A1F', fontFamily: 'Inter-SemiBold' },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  dropdownOverlay: {
    position: 'absolute',
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderRadius: normalize(8),
    overflow: 'hidden',
    maxHeight: hp(22),
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  dropdownItem: {
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(4),
    borderBottomWidth: 0.5,
    borderBottomColor: '#F1F5F9',
  },
  dropdownText: { fontSize: normalize(15), color: '#111' },
  phoneRow: { flexDirection: 'row', alignItems: 'center', marginBottom: hp(1.1) },
  phonePrefix: { backgroundColor: '#EEF6FF', paddingHorizontal: wp(3.2), paddingVertical: hp(1.4), borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderWidth: 1, borderColor: '#E6E6E6' },
  phoneInput: { flex: 1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginLeft: 0, marginBottom: 0, paddingVertical: hp(1.4) },
  inputWithIcon: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: normalize(10), paddingHorizontal: wp(3.5), paddingVertical: hp(1.2), marginBottom: hp(1.1), borderWidth: 1, borderColor: '#E6E6E6' },
  inputInner: { flex: 1, paddingVertical: 0, fontSize: normalize(15), color: '#111' },
  iconBtn: { marginLeft: wp(3), width: normalize(24), height: normalize(24), alignItems: 'center', justifyContent: 'center' },
  smallSelect: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: normalize(10), paddingHorizontal: wp(3.5), paddingVertical: hp(1.05), marginBottom: hp(1.1), borderWidth: 1, borderColor: '#E6E6E6', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
