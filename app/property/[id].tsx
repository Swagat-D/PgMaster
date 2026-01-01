import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import roomsDataImport, { Room } from '../../src/data/properties';
import tenantsDataImport, { Tenant } from '../../src/data/tenants';

const { width, height } = Dimensions.get('window');
const wp = (p: number) => (width * p) / 100;
const hp = (p: number) => (height * p) / 100;
const normalize = (size: number) => {
    const scale = width / 375;
    return Math.round(size * scale);
};

const roomsData = roomsDataImport;
const tenantsData = tenantsDataImport;

const formatINR = (amt?: number) => {
    if (amt == null) return '-';
    try {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amt);
    } catch (e) {
        return `₹${amt}`;
    }
};

export default function RoomDetails() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const id = String(params.id ?? params.roomId ?? '');

    const room: Room | undefined = useMemo(() => roomsData.find(r => String(r.id) === id || String(r.roomNumber) === id), [id]);

    const relatedTenants: Tenant[] = useMemo(() => {
        if (!room) return [];
        return tenantsData.filter(t => String(t.room) === String(room.roomNumber));
    }, [room]);

    const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

    if (!room) {
        return (
            <SafeAreaView style={styles.container} edges={[ 'bottom' ]}>
                <View style={styles.notFoundWrap}>
                    <Text style={styles.notFoundText}>Room not found</Text>
                    <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                        <Text style={styles.backText}>Go back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const images = room.images && room.images.length ? room.images : [require('../../assets/home.png')];

    const occupiedBeds = room.occupancyPercent != null ? Math.round((room.occupancyPercent / 100) * room.bedCount) : (room.status === 'full' ? room.bedCount : 0);
    const availableBeds = Math.max(0, room.bedCount - occupiedBeds);

    // Derived safe values from arrays (handle empty or null arrays)
    const firstTicket: string | null = Array.isArray(room.activeTicketIssue) && room.activeTicketIssue.length > 0 ? room.activeTicketIssue[0] : null;
    const remainingTickets = Array.isArray(room.activeTicketIssue) ? Math.max(0, room.activeTicketIssue.length - 1) : 0;
    const rentDueList: string[] = Array.isArray(room.rentDueTenants) ? room.rentDueTenants : [];
    const underNoticeList: string[] = Array.isArray(room.underNoticeTenant) ? room.underNoticeTenant : [];
    const firstUnderNotice = underNoticeList.length > 0 ? underNoticeList[0] : null;

    return (
        <SafeAreaView edges={["top"]} style={styles.safe}>
            <StatusBar style="dark" backgroundColor="#CBDFFF" />
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.imageWrap}>
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                    {images.map((src: any, i: number) => (
                        <Image key={i} source={typeof src === 'string' ? { uri: src } : src} style={styles.image} resizeMode="cover" />
                    ))}
                </ScrollView>

                <TouchableOpacity style={styles.backAction} onPress={() => router.back()} activeOpacity={0.9}>
                    <Ionicons name="arrow-back" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.contentWrap}>
                <View style={styles.headRow}>
                    <View style={styles.roomTitleWrap}>
                        <View style={styles.roomIcon}><MaterialCommunityIcons name="bed-outline" size={18} color="#111827" /></View>
                        <View>
                            <Text style={styles.roomTitle}>Room {room.roomNumber}</Text>
                            <Text style={styles.roomSub}>{room.pricePerBed ? formatINR(room.pricePerBed) : '₹12000'} / Bed · {room.floor ?? 'Ground Floor'}</Text>
                        </View>
                    </View>

                    <View style={[room.status === 'available' ? styles.roomStatusAvailable : styles.roomStatusFull, { alignSelf: 'center' }]}>
                        <Text style={styles.roomStatusText}>{room.status === 'available' ? 'Available' : 'Full'}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.statsSection}>
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <View style={styles.statHeader}>
                                <MaterialCommunityIcons name="bed-outline" size={20} color="#000000" />
                                <Text style={styles.statTitle}>Bed: </Text>
                                <Text style={styles.statCount}>{room.bedCount}</Text>
                            </View>
                            <View style={styles.bedDetails}>
                                <View style={styles.bedRow}>
                                    <Text style={styles.bedLabel}>Available: </Text>
                                    <View style={styles.bedIconsRow}>
                                        {Array.from({ length: Math.min(3, availableBeds) }).map((_, i) => (
                                            <MaterialCommunityIcons key={`a-${i}`} name="bed-outline" size={14} color="#10B981" style={{ marginRight: 4 }} />
                                        ))}
                                        {availableBeds > 3 && (
                                            <View style={styles.bedCountBadge}>
                                                <Text style={styles.bedCountText}>+{availableBeds - 3}</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                                <View style={styles.bedRow}>
                                    <Text style={styles.bedLabel}>Occupied: </Text>
                                    <View style={styles.bedIconsRow}>
                                        {Array.from({ length: Math.min(3, occupiedBeds) }).map((_, i) => (
                                            <MaterialCommunityIcons key={`o-${i}`} name="bed-outline" size={14} color="#FF2D2D" style={{ marginRight: 4 }} />
                                        ))}
                                        {occupiedBeds > 3 && (
                                            <View style={styles.bedCountBadge}>
                                                <Text style={styles.bedCountText}>+{occupiedBeds - 3}</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.statCard}>
                            <View style={styles.statHeader}>
                                <Ionicons name="ticket-outline" size={20} color="#000000" />
                                <Text style={styles.statTitle}>Active Ticket: </Text>
                                <Text style={styles.statCount}>{room.activeTickets ?? 0}</Text>
                            </View>
                            <View style={styles.ticketDetails}>
                                <Text style={styles.ticketIssue}>{firstTicket ?? 'No active issues'}</Text>
                                {remainingTickets > 0 && (
                                    <View style={styles.ticketBadge}>
                                        <Text style={styles.ticketBadgeText}>+{remainingTickets}</Text>
                                    </View>
                                )}
                            </View>
                        </View>

                        <View style={styles.statCard}>
                            <View style={styles.statHeader}>
                                <Ionicons name="cash-outline" size={20} color="#000000" />
                                <Text style={styles.statTitle}>Rent Due: </Text>
                                <Text style={styles.statCount}>{room.rentDueCount ?? 0}</Text>
                            </View>
                            <View style={styles.rentDetails}>
                                {rentDueList.slice(0, 2).map((tenant, index) => (
                                    <View key={index} style={styles.rentPersonRow}>
                                        <Ionicons name="person" size={12} color="#6B7280" />
                                        <Text style={styles.rentPersonName}>{tenant}</Text>
                                    </View>
                                ))}
                                {rentDueList.length > 2 && (
                                    <View style={styles.rentBadge}>
                                        <Text style={styles.rentBadgeText}>{rentDueList.length - 2}+</Text>
                                    </View>
                                )}
                            </View>
                        </View>

                        <View style={styles.statCard}>
                            <View style={styles.statHeader}>
                                <Ionicons name="briefcase-outline" size={20} color="#000000" />
                                <Text style={styles.statTitle}>Under Notice: </Text>
                                <Text style={styles.statCount}>{room.underNoticeCount ?? 0}</Text>
                            </View>
                            {room.underNoticeCount && room.underNoticeCount > 0 && firstUnderNotice && (
                                <View style={styles.noticeDetails}>
                                    <View style={styles.noticePersonRow}>
                                        <Ionicons name="person" size={12} color="#6B7280" />
                                        <Text style={styles.noticePersonName}>{firstUnderNotice}</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                <View style={styles.amenitiesSection}>
                    <Text style={styles.sectionTitle}>Amenities</Text>
                    <View style={styles.amenitiesWrap}>
                        {(room.amenities || []).map((a: string, i: number) => (
                            <View key={i} style={styles.amenityPill}><Text style={styles.amenityText}>{a}</Text></View>
                        ))}
                    </View>
                </View>

                <View style={styles.tenantsSection}>
                    <Text style={styles.sectionTitle}>List Of Tenants :</Text>
                    <View style={styles.listContainer}>
                        {relatedTenants.map(t => (
                            <TouchableOpacity key={t.id} activeOpacity={0.9} style={styles.card} onPress={() => setSelectedTenant(t)}>
                                <View style={styles.avatarWrap}>
                                    <Image source={require('../../assets/pht.png')} style={styles.avatar} />
                                </View>

                                <View style={styles.info}>
                                    <Text style={styles.name}>{t.name}</Text>

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
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
         </ScrollView>

            <View style={styles.actionButtonsSection}>
                <TouchableOpacity style={styles.editButton} activeOpacity={0.9}>
                    <Text style={styles.editButtonText}>Edit Room</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} activeOpacity={0.9}>
                    <Text style={styles.deleteButtonText}>Delete Room</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#CBDFFF' },
    scrollContainer: { flex: 1, backgroundColor: '#FFFFFF' },
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    imageWrap: { width: '100%', height: hp(27), backgroundColor: '#F3F4F6' },
    image: { width: width, height: hp(27) },
    backAction: { position: 'absolute', left: 16, top: 12, width: normalize(36), height: normalize(36), borderRadius: normalize(18), backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 3 },
    contentWrap: { paddingHorizontal: wp(4), paddingBottom: hp(2), backgroundColor: '#FFFFFF' },
    scroll: { paddingHorizontal: wp(4) },
    headRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: hp(2), marginBottom: hp(0.5) },
    divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: hp(1), width: '80%', alignSelf: 'center' },
    roomTitleWrap: { flexDirection: 'row', alignItems: 'center' },
    roomIcon: { width: normalize(40), height: normalize(40), borderRadius: normalize(20), backgroundColor: '#FFF3CD', justifyContent: 'center', alignItems: 'center', marginRight: wp(3) },
    roomTitle: { fontSize: normalize(18), fontFamily: 'Inter-SemiBold', color: '#171A1F' },
    roomSub: { fontSize: normalize(13), color: '#6B7280' },
    roomStatusAvailable: { backgroundColor: '#B0DCB2', paddingHorizontal: wp(4), paddingVertical: hp(0.4), borderRadius: normalize(10) },
    roomStatusFull: { backgroundColor: '#FF8484', paddingHorizontal: wp(4), paddingVertical: hp(0.4), borderRadius: normalize(10) },
    roomStatusText: { color: '#161616' },

    statsSection: {},
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    statCard: { width: '50%', backgroundColor: '#FFFFFF', borderRadius: normalize(12), padding: wp(3.5)},
    statHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: hp(0.8) },
    statTitle: { fontSize: normalize(14), color: '#000000', fontWeight: '600', marginLeft: wp(1.5) },
    statCount: { fontSize: normalize(14), color: '#F97316', fontWeight: '700' },
    
    bedDetails: { marginLeft: wp(6) },
    bedRow: { flexDirection: 'row', alignItems: 'center', marginBottom: hp(0.4) },
    bedLabel: { fontSize: normalize(12), color: '#6B7280' },
    bedIconsRow: { flexDirection: 'row', alignItems: 'center' },
    bedCountBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: wp(1.5), paddingVertical: hp(0.2), borderRadius: normalize(6), marginLeft: wp(0.5) },
    bedCountText: { fontSize: normalize(10), color: '#6B7280', fontWeight: '600' },
    
    ticketDetails: { marginLeft: wp(6), flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
    ticketIssue: { fontSize: normalize(11), color: '#6B7280', flex: 1, lineHeight: normalize(16) },
    ticketBadge: { backgroundColor: '#FEE2E2', paddingHorizontal: wp(2), paddingVertical: hp(0.3), borderRadius: normalize(8), marginLeft: wp(1) },
    ticketBadgeText: { fontSize: normalize(11), color: '#DC2626', fontWeight: '600' },
    
    rentDetails: { marginLeft: wp(6) },
    rentPersonRow: { flexDirection: 'row', alignItems: 'center', marginBottom: hp(0.5) },
    rentPersonName: { fontSize: normalize(11), color: '#374151', marginLeft: wp(1.5) },
    rentBadge: { backgroundColor: '#FEE2E2', paddingHorizontal: wp(2), paddingVertical: hp(0.3), borderRadius: normalize(8), alignSelf: 'flex-start', marginTop: hp(0.2) },
    rentBadgeText: { fontSize: normalize(11), color: '#DC2626', fontWeight: '600' },
    
    noticeDetails: { marginLeft: wp(6) },
    noticePersonRow: { flexDirection: 'row', alignItems: 'center' },
    noticePersonName: { fontSize: normalize(11), color: '#374151', marginLeft: wp(1.5) },

    amenitiesSection: { marginTop: hp(0.5) },
    sectionTitle: { fontSize: normalize(16), fontFamily: 'Inter-SemiBold', marginBottom: hp(1),paddingHorizontal: wp(2), color: '#111827' },
    amenitiesWrap: { flexDirection: 'row', flexWrap: 'wrap', marginLeft: wp(4) },
    amenityPill: { backgroundColor: '#FFFFFF', borderRadius: normalize(20), paddingHorizontal: wp(4), paddingVertical: hp(0.6), borderWidth: 1, borderColor: '#E6E6E6', marginRight: wp(2), marginBottom: hp(1) },
    amenityText: { color: '#111827' },

    tenantsSection: { marginTop: hp(1.5) },
    listContainer: { paddingHorizontal: wp(1), paddingBottom: hp(2) },
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
        borderWidth: 0,
    },
    avatarWrap: { width: wp(26), alignItems: 'center', justifyContent: 'center' },
    avatar: { width: hp(12), height: hp(13.5), borderRadius: normalize(10) },
    info: { flex: 1, paddingLeft: wp(4), justifyContent: 'center' },
    name: { fontSize: normalize(16), color: '#000000', fontFamily: 'Inter-SemiBold', marginBottom: hp(1.25) },
    row: { flexDirection: 'row', alignItems: 'center' },
    icon: { fontSize: normalize(16), width: normalize(20), color: '#000' },
    label: { fontSize: normalize(14), color: '#000000', marginLeft: wp(0.5), marginRight: wp(0.5), fontFamily: 'Poppins-Regular' },
    value: { fontSize: normalize(14), color: '#000', fontFamily: 'Poppins-Mixed' },
    green: { color: '#10B981' },
    grey: { color: '#CB6E00' },
    rent: { color: '#FF2D2D', fontFamily: 'Poppins-Mixed' },

    actionButtonsSection: { flexDirection: 'row', paddingHorizontal: wp(4), paddingTop: hp(1.5), paddingBottom: hp(4), gap: wp(3), backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB' },
    editButton: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: normalize(8), paddingVertical: hp(1.5), justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#D1D5DB' },
    editButtonText: { fontSize: normalize(14), color: '#000000', fontFamily: 'Inter-SemiBold' },
    deleteButton: { flex: 1, backgroundColor: '#BFDBFE', borderRadius: normalize(8), paddingVertical: hp(1.5), justifyContent: 'center', alignItems: 'center' },
    deleteButtonText: { fontSize: normalize(14), color: '#000000', fontFamily: 'Inter-SemiBold' },

    notFoundWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    notFoundText: { fontSize: normalize(18), color: '#111' },
    backBtn: { marginTop: hp(2), backgroundColor: '#FDE68A', paddingHorizontal: wp(4), paddingVertical: hp(0.8), borderRadius: normalize(8) },
    backText: { color: '#000' },
});
