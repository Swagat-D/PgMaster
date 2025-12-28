import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useRef, useState } from 'react';
import { Dimensions, Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const wp = (p: number) => (width * p) / 100;
const hp = (p: number) => (height * p) / 100;
const normalize = (size: number) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

type Tenant = {
  id: string;
  name: string;
  room: string;
  underNotice: boolean;
  rentAmount?: number;
  joinedDate: string;
  mobile?: string;
  photo?: any;
  underNoticeDays?: number;
  bookingAmount?: number;
  bookingDate?: string;
  moveInDate?: string;
};

const tenantsData: Tenant[] = [
  {
    id: '1',
    name: 'Rihan Kapoor',
    room: '101',
    underNotice: true,
    rentAmount: 1400,
    underNoticeDays: 2,
    joinedDate: '23 Sep 2022',
    bookingAmount: 1400,
    bookingDate: '10 Oct 2025',
    moveInDate: '23 Oct 2025',
    mobile: '+91 9876543210',
  },
  {
    id: '2',
    name: 'Pabitra Sundariii',
    room: '102',
    underNotice: true,
    rentAmount: 1800,
    underNoticeDays: 5,
    joinedDate: '23 Sep 2022',
    bookingDate: '01 Sep 2025',
    moveInDate: '05 Sep 2025',
    mobile: '+91 9876543211',
  },
  {
    id: '3',
    name: 'Swagat Dash',
    room: '101',
    underNotice: true,
    rentAmount: 2000,
    underNoticeDays: 3,
    bookingDate: '15 Jul 2025',
    moveInDate: '20 Jul 2025',
    joinedDate: '23 Sep 2022',
    mobile: '+91 9876543212',
  },
  {
    id: '4',
    name: 'Arjun Sharma',
    room: '102',
    underNotice: false,
    rentAmount: 2200,
    joinedDate: '15 Aug 2022',
    bookingAmount: 2200,
    mobile: '+91 9876543213',
  },
  {
    id: '5',
    name: 'Priya Singh',
    room: '103',
    underNotice: false,
    rentAmount: 1250,
    joinedDate: '10 Jul 2022',
    bookingAmount: 1250,
    mobile: '+91 9876543214',
  },
];

const formatINR = (amt?: number) => {
  if (amt == null) return '-';
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amt);
  } catch (e) {
    return `₹${amt}`;
  }
};

export default function Tenants() {
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef<TextInput | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'under'>('all');

  const filteredTenants = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return tenantsData;
    return tenantsData.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.room.toLowerCase().includes(q) ||
      (t.mobile || '').toLowerCase().includes(q)
    );
  }, [searchText]);

  const visibleTenants = useMemo(() => {
    if (viewMode === 'all') return filteredTenants;
    return filteredTenants.filter(t => t.underNotice);
  }, [filteredTenants, viewMode]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* Top controls: search + filter */}
        <View style={styles.topControls}>
          <View style={styles.searchInput}>
            <TouchableOpacity
              onPress={() => inputRef.current?.focus()}
              activeOpacity={0.9}
              style={styles.searchIconWrap}
            >
              <Ionicons name="search" size={18} color="#FFFFFF" />
            </TouchableOpacity>

            <TextInput
              ref={inputRef}
              style={styles.searchField}
              placeholder="Search Tenants"
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

        {/* Stats cards (two columns) - change based on viewMode */}
        <View style={styles.statsRow}>
          {viewMode === 'all' ? (
            <>
              <View style={styles.statsCol}>
                <View style={styles.statsCard}>
                  <View style={styles.statItem}>
                    <Text style={styles.statTitle}>Today Booking</Text>
                    <View style={styles.badge}><Text style={styles.badgeText}>5</Text></View>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statTitle}>Under Notice</Text>
                    <View style={styles.badgeRed}><Text style={styles.badgeTextRed}>10</Text></View>
                  </View>
                </View>
              </View>

              <View style={styles.statsCol}>
                <View style={styles.statsCard}>
                  <View style={styles.statItem}>
                    <Text style={styles.statTitle}>Pending Due</Text>
                    <View style={styles.badgeRed}><Text style={styles.badgeTextRed}>17</Text></View>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statTitle}>Booking</Text>
                    <View style={styles.badge}><Text style={styles.badgeText}>43</Text></View>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={styles.statsCol}>
                <View style={styles.statsCard}>
                  <View style={styles.statItem}>
                    <Text style={styles.statTitle}>Today Booking</Text>
                    <View style={styles.badge}><Text style={styles.badgeText}>5</Text></View>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statTitle}>Last 7 Days</Text>
                    <View style={styles.badge}><Text style={styles.badgeText}>10</Text></View>
                  </View>
                </View>
              </View>

              <View style={styles.statsCol}>
                <View style={styles.statsCard}>
                  <View style={styles.statItem}>
                    <Text style={styles.statTitle}>Last 15 Days</Text>
                    <View style={styles.badge}><Text style={styles.badgeText}>17</Text></View>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statTitle}>Last 30 Days</Text>
                    <View style={styles.badge}><Text style={styles.badgeText}>43</Text></View>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Black CTA bar with Back action */}
        <View style={styles.ctaBarWrap}>
          <View style={styles.ctaBar}>
            {viewMode === 'all' ? (
              <>
                <Text style={styles.ctaText}>Tenants Waiting to Move</Text>
                <View style={styles.ctaRight}>
                  <Text style={styles.ctaArrow}>
                    <Ionicons name="arrow-forward-outline" size={18} color="#FFFFFF" />
                  </Text>
                  <TouchableOpacity onPress={() => setViewMode('under')} style={styles.viewPill} activeOpacity={0.9}>
                    <Text style={styles.viewPillText}>View</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.ctaText}>Back To Tenants Page</Text>
                <View style={styles.ctaRight}>
                  <Text style={styles.ctaArrow}>
                    <Ionicons name="arrow-forward-outline" size={18} color="#FFFFFF" />
                  </Text>
                  <TouchableOpacity onPress={() => setViewMode('all')} style={styles.ctaBtn} activeOpacity={0.9}>
                    <Text style={styles.ctaBtnText}>Back</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>

        <View style={styles.listContainer}>
          {visibleTenants.map(t => (
            <TouchableOpacity key={t.id} activeOpacity={0.9} style={styles.card}>
              <View style={styles.avatarWrap}>
                <Image source={require('../../assets/pht.png')} style={styles.avatar} />
              </View>

              <View style={styles.info}>
                <Text style={styles.name}>{t.name}</Text>

                {viewMode === 'under' ? (
                  <>
                    <View style={styles.row}>
                      <Ionicons name="home-outline" size={normalize(16)} color="#111827" style={styles.icon} />
                      <Text style={styles.label}>Room:</Text>
                      <Text style={[styles.value, styles.grey]}>{t.room}</Text>
                    </View>

                    <View style={styles.row}>
                      <Ionicons name="card-outline" size={normalize(16)} color="#111827" style={styles.icon} />
                      <Text style={styles.label}>Booking Amount:</Text>
                      <Text style={[styles.value, styles.green]}>{formatINR((t as any).bookingAmount ?? t.rentAmount)}</Text>
                    </View>

                    <View style={styles.row}>
                      <Ionicons name="calendar-outline" size={normalize(16)} color="#111827" style={styles.icon} />
                      <Text style={styles.label}>Booking Date:</Text>
                      <Text style={styles.grey}>{(t as any).bookingDate ?? '-'}</Text>
                    </View>

                    <View style={styles.row}>
                      <Ionicons name="log-in-outline" size={normalize(16)} color="#111827" style={styles.icon} />
                      <Text style={styles.label}>Move-In:</Text>
                      <Text style={styles.rent}>{(t as any).moveInDate ?? '-'}</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.row}>
                      <Ionicons name="home-outline" size={normalize(16)} color="#111827" style={styles.icon} />
                      <Text style={styles.label}>Room:</Text>
                      <Text style={[styles.value, styles.grey]}>{t.room}</Text>
                    </View>

                    <View style={styles.row}>
                      <Ionicons name="notifications-outline" size={normalize(16)} color="#111827" style={styles.icon} />
                      <Text style={styles.label}>Under Notice:</Text>
                      <Text style={[styles.value, t.underNotice ? styles.green : styles.grey]}>{t.underNotice ? 'Yes' : 'No'}</Text>
                    </View>

                    <View style={styles.row}>
                      <Ionicons name="wallet-outline" size={normalize(16)} color="#111827" style={styles.icon} />
                      <Text style={styles.label}>Rent Due:</Text>
                      <Text style={[styles.value, styles.rent]}>{formatINR(t.rentAmount)}</Text>
                    </View>

                    <View style={styles.row}>
                      <Ionicons name="people-outline" size={normalize(16)} color="#111827" style={styles.icon} />
                      <Text style={styles.label}>Joined: </Text>
                      <Text style={styles.grey}>{t.joinedDate}</Text>
                    </View>
                  </>
                )}
              </View>

              {viewMode === 'under' && t.underNotice && (
                <View style={styles.noticeBadge}>
                  <Text style={styles.noticeBadgeText}>{(t as any).underNoticeDays ?? 0} Day</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { paddingVertical: hp(1.5) },
  listContainer: { paddingHorizontal: wp(4), paddingBottom: hp(9) },
  topControls: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp(6), marginBottom: hp(1.5) },
  searchInput: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: normalize(22), paddingVertical: hp(0.6), paddingHorizontal: wp(2), borderWidth: 1, borderColor: '#D8D8ED' },
  searchIconWrap: { width: normalize(34), height: normalize(34), borderRadius: normalize(17), backgroundColor: '#040403', justifyContent: 'center', alignItems: 'center', marginRight: wp(2) },
  searchPlaceholder: { color: '#565D6D', fontSize: normalize(13), fontFamily: 'Poppins-Regular' },
  searchField: { flex: 1, fontSize: normalize(14), paddingVertical: 0, color: '#111827', fontFamily: 'Poppins-Regular' },
  filterBtn: { marginLeft: wp(2), width: normalize(42), height: normalize(42), borderRadius: normalize(21), justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#D8D8ED', backgroundColor: '#FFFFFF' },

  statsRow: { flexDirection: 'row', paddingHorizontal: wp(4), marginBottom: hp(1.5) },
  statsCol: { flex: 1, paddingHorizontal: wp(1) },
  statsCard: { backgroundColor: '#FFFFFF', borderRadius: normalize(10), paddingHorizontal: wp(3), paddingVertical: hp(0.5), borderWidth: 1, borderColor: '#DEE1E6', shadowColor: '#000000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  statItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: hp(1) },
  statTitle: { fontSize: normalize(14), color: '#171A1F', fontFamily: 'Inter-Medium' },
  badge: { backgroundColor: '#ECFDF5', paddingHorizontal: wp(2), paddingVertical: hp(0.5), borderRadius: normalize(8) },
  badgeText: { color: '#10B981', fontSize: normalize(12), fontFamily: 'Poppins-Mixed' },
  badgeRed: { backgroundColor: 'rgba(255, 0, 0, 0.07)',paddingHorizontal: wp(2), paddingVertical: hp(0.5), borderRadius: normalize(8) },
  badgeTextRed: { color: '#FF0000', fontSize: normalize(12), fontFamily: 'Poppins-Mixed' },

  ctaBarWrap: { paddingHorizontal: wp(4), marginBottom: hp(1.5) },
  ctaBar: { backgroundColor: '#000000', borderRadius: normalize(5), paddingVertical: hp(1),paddingHorizontal: wp(8), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  ctaText: { color: '#FFFFFF', fontSize: normalize(13), fontFamily: 'Inter-SemiBold' },
  ctaRight: { flexDirection: 'row', alignItems: 'center' },
  ctaArrow: { color: '#FFECA7', marginRight: wp(10), textAlign: 'center' },
  ctaBtn: { backgroundColor: '#FFECA7', paddingHorizontal: wp(4), paddingVertical: hp(0.3), borderRadius: normalize(5.5) },
  ctaBtnText: { color: '#000', fontSize: normalize(12), fontFamily: 'Inter-SemiBold' },
  viewPill: { backgroundColor: '#FDE68A', paddingHorizontal: wp(4), paddingVertical: hp(0.35), borderRadius: normalize(8) },
  viewPillText: { color: '#000', fontSize: normalize(12), fontFamily: 'Inter-SemiBold' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(12),
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    marginBottom: hp(1.5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
  },
  avatarWrap: { width: wp(26), alignItems: 'center', justifyContent: 'center' },
  avatar: { width: hp(12), height: hp(13.5), borderRadius: normalize(10) },
  info: { flex: 1, paddingLeft: wp(4), justifyContent: 'center' },
  name: { fontSize: normalize(16), color: '#000000', fontFamily: 'Inter-SemiBold', marginBottom: hp(1.25) },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowSmall: { flexDirection: 'row', alignItems: 'center' },
  icon: { fontSize: normalize(16), width: normalize(20), color: '#000' },
  label: { fontSize: normalize(14), color: '#000000', marginLeft: wp(0.5), marginRight: wp(0.5), fontFamily: 'Poppins-Regular' },
  value: { fontSize: normalize(14), color: '#000', fontFamily: 'Poppins-Mixed' },
  green: { color: '#10B981' },
  grey: { color: '#CB6E00' },
  rent: { color: '#FF2D2D', fontFamily: 'Poppins-Mixed' },
  joined: { fontSize: normalize(13), color: '#6B7280', marginLeft: wp(1), fontFamily: 'Poppins-Regular' },
  noticeBadge: { position: 'absolute', top: hp(0.6), right: wp(4), borderWidth: 1, borderColor: '#FF2D2D', paddingHorizontal: wp(3), paddingVertical: hp(0.35), borderRadius: normalize(8), backgroundColor: '#FFFFFF' },
  noticeBadgeText: { color: '#FF2D2D', fontSize: normalize(12), fontFamily: 'Inter-SemiBold' },
});