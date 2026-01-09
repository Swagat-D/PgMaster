import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { Dimensions, Image, Linking, Modal, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tenantsData from '../../src/data/tenants'

const { width, height } = Dimensions.get('window')
const wp = (p:number) => (width * p) / 100
const hp = (p:number) => (height * p) / 100
const normalize = (s:number) => Math.round(s * (width/375))

export default function AddComplaint() {
  const [status, setStatus] = useState<'open'|'solved'|'inprogress'>('open')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [raisedBy, setRaisedBy] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [tenantModalVisible, setTenantModalVisible] = useState(false)
  const [tenantQuery, setTenantQuery] = useState('')
  const [selectedTenantId, setSelectedTenantId] = useState<string | null>(null)

  const filteredTenants = useMemo(() => {
    const q = tenantQuery.trim().toLowerCase()
    if (!q) return tenantsData
    return tenantsData.filter(t => t.name.toLowerCase().includes(q) || t.room.toLowerCase().includes(q))
  }, [tenantQuery])

  // Assigned To modal state and sample employee list
  const [assignedModalVisible, setAssignedModalVisible] = useState(false)
  const [assignedQuery, setAssignedQuery] = useState('')
  const [selectedAssigneeId, setSelectedAssigneeId] = useState<string | null>(null)

  const employees = [
    { id: 'e1', name: 'Raghav Shah', role: 'Employee', mobile: '+919876543210' },
    { id: 'e2', name: 'Rahul Samrat', role: 'Sales Team', mobile: '+919876543211' },
    { id: 'e3', name: 'Salman Khan', role: 'Employee', mobile: '+919876543212' },
    { id: 'e4', name: 'Rakhul Preeti', role: 'Employee', mobile: '+919876543213' },
  ]

  const filteredEmployees = useMemo(() => {
    const q = assignedQuery.trim().toLowerCase()
    if (!q) return employees
    return employees.filter(e => e.name.toLowerCase().includes(q) || (e.role || '').toLowerCase().includes(q))
  }, [assignedQuery])

  return (
    <SafeAreaView style={styles.container} edges={['top','left','right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#CBDFFF" />
      <View style={styles.headerWrap}>
        <View style={styles.backRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Complaint</Text>
        </View>
      </View>

      <View style={styles.content}>

        <Text style={styles.label}>Complaint Type</Text>
        <TouchableOpacity style={styles.input} activeOpacity={0.9}>
          <Text style={styles.inputPlaceholder}>{type || 'Select Type'}</Text>
          <Ionicons name="chevron-down" size={18} color="#6B7280" />
        </TouchableOpacity>

        <Text style={[styles.label,{marginTop:hp(2)}]}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Write Complaint Details ..."
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />

        <Text style={[styles.label,{marginTop:hp(2)}]}>Raised By</Text>
        <TouchableOpacity style={styles.input} activeOpacity={0.9} onPress={() => setTenantModalVisible(true)}>
          <Text style={raisedBy ? styles.inputValue : styles.inputPlaceholder}>{raisedBy || 'Select Tenants / Room No'}</Text>
        </TouchableOpacity>

        <Text style={[styles.label,{marginTop:hp(2)}]}>Assigned To</Text>
        <TouchableOpacity style={styles.input} activeOpacity={0.9} onPress={() => setAssignedModalVisible(true)}>
          <Text style={assignedTo ? styles.inputValue : styles.inputPlaceholder}>{assignedTo || 'Select Employees'}</Text>
        </TouchableOpacity>

        <Text style={[styles.label,{marginTop:hp(2)}]}>Status</Text>
        <View style={styles.segmentRow}>
          <TouchableOpacity style={[styles.segmentPill, status==='open' && styles.segmentActive]} onPress={() => setStatus('open')}>
            <Text style={[styles.segmentText, status==='open' && styles.segmentTextActive]}>Open</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.segmentPill, status==='solved' && styles.segmentActive]} onPress={() => setStatus('solved')}>
            <Text style={[styles.segmentText, status==='solved' && styles.segmentTextActive]}>Solved</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.segmentPill, status==='inprogress' && styles.segmentActive]} onPress={() => setStatus('inprogress')}>
            <Text style={[styles.segmentText, status==='inprogress' && styles.segmentTextActive]}>In Progress</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.label,{marginTop:hp(2)}]}>Upload Photo</Text>
        <View style={styles.photosRow}>
          {images.map((uri, idx) => (
            <View key={idx} style={styles.imageWrapper}>
              <View style={styles.photoThumb}>
                <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
              </View>
              <TouchableOpacity style={styles.removeBtn} onPress={() => setImages(prev => prev.filter((_, i) => i !== idx))}>
                <Ionicons name="close" size={14} color="#111" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={[styles.photoThumb, styles.photoAdd]} onPress={async () => {
            try {
              const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
              if (!res.canceled) {
                const uri = res.assets && res.assets[0] && res.assets[0].uri
                if (uri) {
                  setImages(prev => [...prev, uri])
                }
              }
            } catch (e) {
              if (Platform.OS === 'android') ToastAndroid.show('Unable to pick image', ToastAndroid.SHORT)
            }
          }}>
            <Ionicons name="image-outline" size={28} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.9}
          onPress={() => {
            try {
              if (Platform.OS === 'android') {
                ToastAndroid.show('Complaint added', ToastAndroid.SHORT)
              } else {
                Alert.alert('Success', 'Complaint added')
              }
            } catch (e) { }
            setTimeout(() => router.back(), 400)
          }}
        >
          <Text style={styles.addBtnText}>Add Complaint</Text>
        </TouchableOpacity>

      </View>

      {/* Tenant Selection Modal */}
      <Modal visible={tenantModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCardWrapper}>
            <View style={styles.modalCard}>
              <View style={styles.modalIconWrap}>
                <TouchableOpacity style={styles.modalIconCircle} onPress={() => setTenantModalVisible(false)}>
                  <Ionicons name="close" size={18} color="#DFAF2B" />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalTitle}>Raised By</Text>

              <View style={{ width: '100%', marginTop: hp(1) }}>
                <View style={styles.modalSearchInput}>
                  <TouchableOpacity onPress={() => { /* focus handled by input */ }} style={styles.modalSearchIconWrap}>
                    <Ionicons name="search" size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TextInput
                    value={tenantQuery}
                    onChangeText={setTenantQuery}
                    placeholder="Search Tenants / Room name"
                    placeholderTextColor="#6B7280"
                    style={styles.modalSearchField}
                    returnKeyType="search"
                    clearButtonMode="while-editing"
                  />
                </View>

                <ScrollView style={styles.sheetList} contentContainerStyle={{ paddingBottom: hp(2) }}>
                  {filteredTenants.map((t) => (
                    <Pressable
                      key={t.id}
                      onPress={() => {
                        setRaisedBy(`${t.name} , Room : ${t.room}`)
                        setSelectedTenantId(t.id)
                        setTenantModalVisible(false)
                      }}
                      style={[styles.sheetItem, selectedTenantId === t.id && styles.sheetItemActive]}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.sheetAvatar}>
                          <Text style={{ color: '#fff', fontFamily: 'Inter-SemiBold' }}>{(t.name || 'U').split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase()}</Text>
                        </View>
                        <View style={{ marginLeft: wp(3) }}>
                          <Text style={styles.sheetName}>{t.name}</Text>
                          <Text style={styles.sheetRole}>Room : {t.room}</Text>
                        </View>
                      </View>
                      <TouchableOpacity style={styles.sheetCallBtn} onPress={() => { if (t.mobile) Linking.openURL(`tel:${t.mobile}`) }}>
                        <Ionicons name="call" size={16} color="#fff" />
                      </TouchableOpacity>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* Assigned To Modal */}
      <Modal visible={assignedModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCardWrapper}>
            <View style={styles.modalCard}>
              <View style={styles.modalIconWrap}>
                <TouchableOpacity style={styles.modalIconCircle} onPress={() => setAssignedModalVisible(false)}>
                  <Ionicons name="close" size={18} color="#DFAF2B" />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalTitle}>Assigned To</Text>

              <View style={{ width: '100%', marginTop: hp(1) }}>
                <View style={styles.modalSearchInput}>
                  <TouchableOpacity onPress={() => {}} style={styles.modalSearchIconWrap}>
                    <Ionicons name="search" size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TextInput
                    value={assignedQuery}
                    onChangeText={setAssignedQuery}
                    placeholder="Search Employees"
                    placeholderTextColor="#6B7280"
                    style={styles.modalSearchField}
                    returnKeyType="search"
                    clearButtonMode="while-editing"
                  />
                </View>

                <ScrollView style={styles.sheetList} contentContainerStyle={{ paddingBottom: hp(2) }}>
                  {filteredEmployees.map((e) => (
                    <Pressable
                      key={e.id}
                      onPress={() => {
                        setAssignedTo(e.name)
                        setSelectedAssigneeId(e.id)
                        setAssignedModalVisible(false)
                      }}
                      style={[styles.sheetItem, selectedAssigneeId === e.id && styles.sheetItemActive]}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.sheetAvatar}>
                          <Text style={{ color: '#fff', fontFamily: 'Inter-SemiBold' }}>{(e.name || 'U').split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase()}</Text>
                        </View>
                        <View style={{ marginLeft: wp(3) }}>
                          <Text style={styles.sheetName}>{e.name}</Text>
                          <Text style={styles.sheetRole}>{e.role || 'Employee'}</Text>
                        </View>
                      </View>
                      <TouchableOpacity style={styles.sheetCallBtn} onPress={() => { if (e.mobile) Linking.openURL(`tel:${e.mobile}`) }}>
                        <Ionicons name="call" size={16} color="#fff" />
                      </TouchableOpacity>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#FFFFFF' },
  headerWrap: { backgroundColor: '#EDF4FF', paddingHorizontal: wp(4), paddingTop: hp(2), paddingBottom: hp(2) },
  backRow: { flexDirection: 'row', alignItems: 'center' },
  backBtn: { width: normalize(24), height: normalize(24), borderRadius: normalize(12), justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: normalize(18), marginLeft: wp(3), color: '#171A1F', fontFamily: 'Inter-SemiBold' },
  content: { flex: 1, padding: wp(4), paddingBottom: hp(8) },
  label: { fontSize: normalize(14), color:'#111827', marginBottom: hp(0.6) },
  input: { backgroundColor:'#FFFFFF', borderWidth:1, borderColor:'#E5E7EB', borderRadius:10, paddingHorizontal: wp(3), paddingVertical: hp(1.6), flexDirection:'row', alignItems:'center', justifyContent:'space-between' },
  inputPlaceholder: { color:'#9CA3AF', fontFamily:'Inter-Regular' },
  textArea: { backgroundColor:'#FFFFFF', borderWidth:1, borderColor:'#E5E7EB', borderRadius:10, padding: wp(3), minHeight: hp(12), textAlignVertical:'top', color:'#111827' },
  segmentRow: { flexDirection:'row', gap: wp(3), marginTop: hp(0.6) },
  segmentPill: { paddingHorizontal: wp(3.5), paddingVertical: hp(0.8), borderRadius: normalize(20), backgroundColor:'rgba(255, 255, 255, 0.37)', borderWidth:0.6, borderColor:'#ABABAB' },
  segmentActive: { backgroundColor:'rgba(255, 178, 178, 0.79)', borderColor:'#ABABAB' },
  segmentText: { color:'#6B6B6B', fontFamily:'Inter-SemiBold', fontSize: normalize(12) },
  segmentTextActive: { color:'#940000', fontFamily:'Inter-SemiBold' },
  photosRow: { flexDirection:'row', gap: wp(3), marginTop: hp(0.8) },
  imageWrapper: { position: 'relative', marginRight: wp(3) },
  photoThumb: { width: wp(18), height: wp(18), borderRadius: 10, borderWidth: 1, borderColor: '#E6E6E6', overflow: 'hidden', backgroundColor: '#FFFFFF' },
  photoAdd: { justifyContent:'center', alignItems:'center', borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 10, backgroundColor: '#FFFFFF' },
  removeBtn: { position: 'absolute', top: -6, right: -6, width: normalize(26), height: normalize(26), borderRadius: normalize(13), backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E6E6E6', justifyContent: 'center', alignItems: 'center' },
  addBtn: { backgroundColor:'#DCEAFE', paddingVertical: hp(1.5), borderRadius: 36, alignItems:'center', borderWidth: 1, borderColor: '#AEAEAE', marginTop: hp(4) },
  addBtnText: { fontSize: normalize(16), color:'#111827', fontFamily:'Inter-SemiBold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end', alignItems: 'stretch', paddingHorizontal: 0 },
  modalCardWrapper: { width: '100%', alignItems: 'center' },
  modalCard: { width: '100%', backgroundColor: '#FFFFFF', borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingTop: normalize(14), paddingHorizontal: wp(5), minHeight: hp(34), paddingBottom: hp(4), alignItems: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: -6 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 10 },
  modalIconCircle: { width: hp(4), height: hp(4), borderRadius: hp(2.5), backgroundColor: '#FEE4E2', borderWidth: 1, borderColor: 'rgba(217,31,31,0.12)', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' },
  modalTitle: { fontSize: normalize(18), fontFamily: 'Inter-SemiBold', color: '#181D27', marginTop: normalize(6), textAlign: 'left', alignSelf: 'flex-start' },
  modalIconWrap: { width: '100%', alignItems: 'center' },
  modalSearchInput: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: normalize(22), paddingVertical: hp(0.6), paddingHorizontal: wp(2), borderWidth: 1, borderColor: '#D8D8ED', marginTop: hp(1) },
  modalSearchIconWrap: { width: normalize(34), height: normalize(34), borderRadius: normalize(17), backgroundColor: '#040403', justifyContent: 'center', alignItems: 'center', marginRight: wp(2) },
  modalSearchField: { flex: 1, fontSize: normalize(14), paddingVertical: 0, color: '#111827', fontFamily: 'Poppins-Regular' },
  sheetList: { width: '100%', marginTop: hp(1), maxHeight: hp(38) },
  sheetItem: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: normalize(12), paddingVertical: hp(1.2), paddingHorizontal: wp(3), marginBottom: hp(1), shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 1, borderWidth: 1, borderColor: '#EEF2F6', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sheetItemActive: { backgroundColor: '#EAF6FF' },
  sheetAvatar: { width: normalize(40), height: normalize(40), borderRadius: normalize(20), backgroundColor: '#F7B267', justifyContent: 'center', alignItems: 'center' },
  sheetName: { fontSize: normalize(14), fontFamily: 'Inter-SemiBold', color: '#111827' },
  sheetRole: { fontSize: normalize(12), fontFamily: 'Inter-Regular', color: '#6B7280' },
  sheetCallBtn: { width: normalize(36), height: normalize(36), borderRadius: normalize(18), backgroundColor: '#0FAF4E', justifyContent: 'center', alignItems: 'center' },
  inputValue: { color: '#000000', fontFamily: 'Inter-Regular' },
})
