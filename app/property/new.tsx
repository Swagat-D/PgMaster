import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const wp = (p: number) => (width * p) / 100;
const hp = (p: number) => (height * p) / 100;
const normalize = (s: number) => Math.round(s * (width / 375));

export default function AddRoom() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [beds, setBeds] = useState<string>('');
  const [rent, setRent] = useState('');
  const [floor, setFloor] = useState('');
  const [meter, setMeter] = useState('');
  const [meterDate, setMeterDate] = useState('');
  const [amenities, setAmenities] = useState<string[]>(['Geyser','Washing Machine','Ac','Table']);
  const [images, setImages] = useState<string[]>([]);
  const [amenityModalVisible, setAmenityModalVisible] = useState(false);
  const [newAmenity, setNewAmenity] = useState('');

  const pickImage = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
      if (!res.canceled) {
        const uri = res.assets && res.assets[0] && res.assets[0].uri;
        if (uri) setImages(prev => [...prev, uri]);
      }
    } catch (e) { }
  };

  const removeAmenity = (idx: number) => setAmenities(prev => prev.filter((_, i) => i !== idx));
  const openAddAmenity = () => {
    setNewAmenity('');
    setAmenityModalVisible(true);
  };
  const addAmenity = () => {
    const v = (newAmenity || '').toString().trim();
    if (v) setAmenities(prev => [...prev, v]);
    setNewAmenity('');
    setAmenityModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top','left','right']}>
      <StatusBar style="dark" backgroundColor="#EDF4FF" />
      <View style={styles.headerWrap}>
        <View style={styles.backRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Room</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.rowTwo}>
          <View style={{ flex: 1, marginRight: wp(2) }}>
            <Text style={styles.label}>Room Name</Text>
            <TextInput value={name} onChangeText={setName} placeholder="Name" placeholderTextColor="#9CA3AF" style={styles.input} />
          </View>

          <View style={{ flex: 1, marginLeft: wp(2) }}>
            <Text style={styles.label}>No of Beds</Text>
            <TouchableOpacity style={[styles.input, styles.select]} activeOpacity={0.9} onPress={() => {}}>
              <Text style={styles.inputPlaceholder}>{beds || 'Select'}</Text>
              <Ionicons name="chevron-down" size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rowTwo}>
          <View style={{ flex: 1, marginRight: wp(2) }}>
            <Text style={styles.label}>Rent</Text>
            <TextInput value={rent} onChangeText={setRent} placeholder="Amount" placeholderTextColor="#9CA3AF" keyboardType="numeric" style={styles.input} />
          </View>

          <View style={{ flex: 1, marginLeft: wp(2) }}>
            <Text style={styles.label}>Floor</Text>
            <TouchableOpacity style={[styles.input, styles.select]} activeOpacity={0.9} onPress={() => {}}>
              <Text style={styles.inputPlaceholder}>{floor || 'Select'}</Text>
              <Ionicons name="chevron-down" size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.label, { marginTop: hp(2) }]}>Electricity Reading</Text>
        <View style={styles.rowTwo}> 
          <TextInput value={meter} onChangeText={setMeter} placeholder="Last Meter Reading" placeholderTextColor="#9CA3AF" style={[styles.input, { flex: 1, marginRight: wp(2) }]} />
          <TouchableOpacity style={[styles.input, { flex: 1, marginLeft: wp(2) }]} onPress={() => {}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Text style={styles.inputPlaceholder}>{meterDate || 'Reading Date'}</Text>
              <Ionicons name="calendar" size={18} color="#6B7280" />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={[styles.label, { marginTop: hp(2) }]}>Amenities</Text>
        <View style={styles.amenitiesWrap}>
          {amenities.map((a, i) => (
            <View key={i} style={styles.amenityPill}>
              <Text style={styles.amenityText}>{a}</Text>
              <TouchableOpacity style={styles.amenityRemove} onPress={() => removeAmenity(i)}>
                <Ionicons name="close" size={12} color="#111" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addAmenity} onPress={openAddAmenity}>
            <Ionicons name="add" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Add Amenity Modal */}
        <Modal visible={amenityModalVisible} transparent animationType="fade">
          <View style={styles.modalOverlaySmall}>
            <Pressable style={styles.backdropSmall} onPress={() => setAmenityModalVisible(false)} />
            <View style={styles.modalCardSmall}>
              <Text style={styles.modalTitleSmall}>Add Amenity</Text>
              <TextInput value={newAmenity} onChangeText={setNewAmenity} placeholder="Amenity name" placeholderTextColor="#9CA3AF" style={styles.modalInputSmall} />
              <View style={styles.modalButtonsRow}>
                <TouchableOpacity style={styles.modalCancelBtnSmall} onPress={() => setAmenityModalVisible(false)}>
                  <Text style={styles.modalCancelTextSmall}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalAddBtnSmall} onPress={addAmenity}>
                  <Text style={styles.modalAddTextSmall}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Text style={[styles.label, { marginTop: hp(2) }]}>Image</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.photosRow, { paddingRight: wp(3) }]}>
          {images.map((uri, idx) => (
            <View key={idx} style={styles.imageWrapper}>
              <View style={styles.photoThumb}>
                <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
              </View>
              <TouchableOpacity style={styles.removeBtn} onPress={() => setImages(prev => prev.filter((_, i) => i !== idx))}>
                <Ionicons name="close" size={14} color="#111" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={[styles.photoThumb, styles.photoAdd]} onPress={pickImage}>
            <Ionicons name="image-outline" size={28} color="#9CA3AF" />
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity style={styles.addBtn} activeOpacity={0.9} onPress={() => router.back()}>
          <Text style={styles.addBtnText}>Add Room</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerWrap: { backgroundColor: '#EDF4FF', paddingHorizontal: wp(4), paddingTop: hp(2), paddingBottom: hp(2) },
  backRow: { flexDirection: 'row', alignItems: 'center' },
  backBtn: { width: normalize(24), height: normalize(24), borderRadius: normalize(12), justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: normalize(18), marginLeft: wp(3), color: '#171A1F', fontFamily: 'Inter-SemiBold' },
  content: { padding: wp(4), paddingBottom: hp(6) },
  rowTwo: { flexDirection: 'row', alignItems: 'center', marginTop: hp(1) },
  label: { fontSize: normalize(14), color: '#111827', marginBottom: hp(0.6) },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, paddingHorizontal: wp(3), paddingVertical: hp(1.6), fontSize: normalize(14), color: '#111827' },
  inputPlaceholder: { color: '#9CA3AF' },
  select: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  photosRow: { flexDirection: 'row', gap: wp(3), marginTop: hp(0.8), alignItems: 'center' },
  imageWrapper: { position: 'relative', marginRight: wp(3) },
  photoThumb: { width: wp(18), height: wp(18), borderRadius: 10, borderWidth: 1, borderColor: '#E6E6E6', overflow: 'hidden', backgroundColor: '#FFFFFF' },
  photoAdd: { justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 10, backgroundColor: '#FFFFFF' },
  removeBtn: { position: 'absolute', top: -6, right: -6, width: normalize(26), height: normalize(26), borderRadius: normalize(13), backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E6E6E6', justifyContent: 'center', alignItems: 'center' },
  addBtn: { backgroundColor: '#DCEAFE', paddingVertical: hp(1.6), borderRadius: 36, alignItems: 'center', borderWidth: 1, borderColor: '#AEAEAE', marginTop: hp(4) },
  addBtnText: { fontSize: normalize(16), color: '#111827', fontFamily: 'Inter-SemiBold' },
  amenitiesWrap: { flexDirection: 'row', flexWrap: 'wrap', marginTop: hp(0.5) },
  amenityPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: wp(3.5), paddingVertical: hp(0.6), borderWidth: 1, borderColor: '#E6E6E6', marginRight: wp(2), marginBottom: hp(1) },
  amenityText: { color: '#111827', marginRight: wp(2) },
  amenityRemove: { width: normalize(20), height: normalize(20), borderRadius: normalize(10), backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  addAmenity: { width: normalize(36), height: normalize(36), borderRadius: normalize(18), backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center' },
  modalOverlaySmall: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.35)' },
  backdropSmall: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  modalCardSmall: { width: wp(90), maxWidth: 380, backgroundColor: '#FFFFFF', borderRadius: 12, padding: wp(4), shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 10 },
  modalTitleSmall: { fontSize: normalize(16), fontFamily: 'Inter-SemiBold', color: '#111827', marginBottom: hp(1) },
  modalInputSmall: { borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 8, paddingHorizontal: wp(3), paddingVertical: hp(1), fontSize: normalize(14), color: '#111827' },
  modalButtonsRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: hp(2), gap: wp(3) },
  modalCancelBtnSmall: { paddingVertical: hp(1), paddingHorizontal: wp(3), borderRadius: 8, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E6E6E6' },
  modalCancelTextSmall: { color: '#111827' },
  modalAddBtnSmall: { paddingVertical: hp(1), paddingHorizontal: wp(3.5), borderRadius: 8, backgroundColor: '#DCEAFE' },
  modalAddTextSmall: { color: '#000000' },
});
