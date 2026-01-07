import { Ionicons } from '@expo/vector-icons'
import React, { useMemo, useRef, useState } from 'react'
import { Dimensions, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import complaintsData from '../../src/data/complaints'

type ComplaintItem = {
  id: string
  title: string
  raisedBy: string
  room: string
  createdOn: string
  status: 'open' | 'inprogress' | 'resolved'
}

const { width, height } = Dimensions.get('window')
const wp = (p: number) => (width * p) / 100
const hp = (p: number) => (height * p) / 100
const normalize = (size: number) => {
  const scale = width / 375
  return Math.round(size * scale)
}

const sampleComplaints: ComplaintItem[] = complaintsData;

export default function Complaint() {
  const [searchText, setSearchText] = useState('')
  const [segment, setSegment] = useState<'open' | 'inprogress' | 'resolved'>('open')
  const inputRef = useRef<TextInput | null>(null)

  const filtered = useMemo(() => {
    const q = searchText.trim().toLowerCase()
    return sampleComplaints.filter(c => {
      if (segment === 'open' && c.status !== 'open') return false
      if (segment === 'inprogress' && c.status !== 'inprogress') return false
      if (segment === 'resolved' && c.status !== 'resolved') return false
      if (!q) return true
      return c.title.toLowerCase().includes(q) || c.raisedBy.toLowerCase().includes(q) || c.room.toLowerCase().includes(q)
    })
  }, [searchText, segment])

  return (
    <SafeAreaView style={styles.container} edges={[ 'bottom' ]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* Top: Search + Filter (styled like property page) */}
        <View style={styles.topControls}>
          <View style={styles.searchInput}>
            <TouchableOpacity onPress={() => inputRef.current?.focus()} activeOpacity={0.9} style={styles.searchIconWrap}>
              <Ionicons name="search" size={18} color="#FFFFFF" />
            </TouchableOpacity>
            <TextInput
              ref={inputRef}
              style={styles.searchField}
              placeholder="Search Complaints"
              placeholderTextColor="#6B7280"
              value={searchText}
              onChangeText={setSearchText}
              returnKeyType="search"
              onSubmitEditing={() => Keyboard.dismiss()}
              clearButtonMode="while-editing"
            />
          </View>
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.9}>
            <Ionicons name="filter-outline" size={20} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Segment bar */}
        <View style={styles.segmentWrap}>
          <View style={styles.segmentBg}>
            <TouchableOpacity onPress={() => setSegment('open')} style={[styles.segmentPill, segment === 'open' && styles.segmentPillActive]}>
              <Text style={segment === 'open' ? styles.segmentTextActive : styles.segmentText}>Open</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSegment('inprogress')} style={[styles.segmentPill, segment === 'inprogress' && styles.segmentPillActive]}>
              <Text style={segment === 'inprogress' ? styles.segmentTextActive : styles.segmentText}>In Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSegment('resolved')} style={[styles.segmentPill, segment === 'resolved' && styles.segmentPillActive]}>
              <Text style={segment === 'resolved' ? styles.segmentTextActive : styles.segmentText}>Resolved</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* List */}
        <View style={styles.listContainer}>
          {filtered.map(c => (
            <View key={c.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{c.title}</Text>
                <View style={[
                  styles.statusWrap,
                  c.status === 'open' ? styles.statusOpen : c.status === 'inprogress' ? styles.statusInprogress : styles.statusResolved,
                ]}>
                  <Text style={[
                    styles.statusText,
                    c.status === 'open' ? styles.statusTextOpen : c.status === 'inprogress' ? styles.statusTextInprogress : styles.statusTextResolved,
                  ]}>{c.status === 'open' ? 'Open' : c.status === 'inprogress' ? 'In Progress' : 'Resolved'}</Text>
                </View>
              </View>

              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Raised By :</Text>
                <Text style={styles.cardValue}>{c.raisedBy} ,{c.room}</Text>
              </View>

              <View style={styles.cardRow}> 
                <Text style={styles.cardLabel}>Created on :</Text>
                <Text style={styles.cardValue}>{c.createdOn}</Text>
              </View>

              <TouchableOpacity style={styles.detailsBtn} activeOpacity={0.9}>
                <Text style={styles.detailsText}>Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

      </ScrollView>

      {/* Floating Add button - fixed position above bottom tabs */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
        <Ionicons name="add" size={28} color="#414141" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { paddingVertical: hp(1.5), flexGrow: 1 },
  listContainer: { paddingHorizontal: wp(4), paddingBottom: hp(9) },

  topControls: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp(6), marginBottom: hp(1.5) },
  searchInput: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: normalize(22), paddingVertical: hp(0.6), paddingHorizontal: wp(2), borderWidth: 1, borderColor: '#D8D8ED' },
  searchIconWrap: { width: normalize(34), height: normalize(34), borderRadius: normalize(17), backgroundColor: '#040403', justifyContent: 'center', alignItems: 'center', marginRight: wp(2) },
  searchField: { flex: 1, fontSize: normalize(14), paddingVertical: 0, color: '#111827', fontFamily: 'Poppins-Regular' },
  filterBtn: { marginLeft: wp(2), width: normalize(42), height: normalize(42), borderRadius: normalize(21), justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#D8D8ED', backgroundColor: '#FFFFFF' },

  segmentWrap: { paddingHorizontal: wp(4), marginBottom: hp(1.2) },
  segmentBg: { backgroundColor: '#000', borderRadius: normalize(8), padding: wp(1.2), flexDirection: 'row', justifyContent: 'space-between' },
  segmentPill: { flex: 1, paddingVertical: hp(0.6), alignItems: 'center', borderRadius: normalize(6), marginHorizontal: wp(0.5), backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F3F4F6' },
  segmentPillActive: { backgroundColor: '#CBDFFF', borderColor: '#7A7E7E' },
  segmentText: { color: '#111827', fontFamily: 'Inter-Medium' },
  segmentTextActive: { color: '#111827', fontFamily: 'Inter-SemiBold' },

  card: { backgroundColor: '#FFFFFF', borderRadius: normalize(12), paddingVertical: hp(1.5), paddingHorizontal: wp(3), marginBottom: hp(1.5), shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2, borderWidth: 1, borderColor: '#EEF2F6' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: hp(1) },
  cardTitle: { fontSize: normalize(16), fontFamily: 'Inter-SemiBold', color: '#000000' },
  statusWrap: { backgroundColor: 'rgba(255, 178, 178, 0.79)', paddingHorizontal: wp(3.5), paddingVertical: hp(0.4), borderRadius: normalize(18),borderWidth:1, borderColor:'rgba(171, 171, 171, 0.80)' },
  statusText: { fontSize: normalize(12), fontFamily: 'Inter-SemiBold' },
  statusOpen: { backgroundColor: 'rgba(255, 178, 178, 0.79)', borderColor: 'rgba(171,171,171,0.80)' },
  statusTextOpen: { color: '#940000' },
  statusInprogress: { backgroundColor: '#FFECA7', borderColor: 'rgba(171,171,171,0.80)' },
  statusTextInprogress: { color: '#9A7904' },
  statusResolved: { backgroundColor: 'rgba(51, 209, 58, 0.37)', borderColor: 'rgba(171,171,171,0.80)' },
  statusTextResolved: { color: '#007918' },

  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: hp(0.3) },
  cardLabel: { fontSize: normalize(12.5), color: '#333333', fontFamily: 'Inter-Regular' },
  cardValue: { fontSize: normalize(13.2), color: '#3F3E3E', fontFamily: 'Inter-Medium' },

  detailsBtn: { marginTop: hp(1), borderWidth: 1, borderColor: '#909090', borderRadius: normalize(7), paddingVertical: hp(1), alignItems: 'center', backgroundColor: '#FEFEFE' },
  detailsText: { color: '#000000', fontFamily: 'Inter-Regular', fontSize: normalize(15) },
  emptyWrap: { padding: wp(4), alignItems: 'center' },
  emptyTitle: { fontSize: normalize(18), fontFamily: 'Inter-SemiBold', color: '#171A1F' },
  emptySubtitle: { fontSize: normalize(14), color: '#6B7280', fontFamily: 'Inter-Regular' },
  fab: { position: 'absolute', right: wp(6), bottom: hp(12), width: normalize(50), height: normalize(50), borderRadius: normalize(12), backgroundColor: '#D7E6FF', justifyContent: 'center', alignItems: 'center', borderWidth:1.2, borderColor:'#EAEBEE' },
})
