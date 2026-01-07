import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { Dimensions, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import roomsDataImport, { Room } from '../../src/data/properties';

const { width, height } = Dimensions.get('window');
const wp = (p: number) => (width * p) / 100;
const hp = (p: number) => (height * p) / 100;
const normalize = (size: number) => {
	const scale = width / 375;
	return Math.round(size * scale);
};

const roomsData = roomsDataImport;

const formatINR = (amt?: number) => {
	if (amt == null) return '-';
	try {
		return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amt);
	} catch (e) {
		return `₹${amt}`;
	}
};

export default function Property() {
	const router = useRouter();
	const [searchText, setSearchText] = useState('');
	const inputRef = useRef<TextInput | null>(null);

	const [segment, setSegment] = useState<'all' | 'available' | 'occupied'>('all');

	const filteredRooms = useMemo(() => {
		const q = searchText.trim().toLowerCase();
		return roomsData.filter(r => {
			if (segment === 'available' && r.status !== 'available') return false;
			if (segment === 'occupied' && r.status !== 'full') return false;
			if (!q) return true;
			return r.roomNumber.toLowerCase().includes(q);
		});
	}, [searchText, segment]);

	const isEmpty = roomsData.length === 0;

	return (
		<SafeAreaView style={styles.container} edges={[ 'bottom' ]}>
			<ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

				{/* Top controls, stats and segment controls (hidden when no rooms) */}
				{!isEmpty && (
					<>
						<View style={styles.topControls}>
							<View style={styles.searchInput}>
								<TouchableOpacity onPress={() => inputRef.current?.focus()} activeOpacity={0.9} style={styles.searchIconWrap}>
									<Ionicons name="search" size={18} color="#FFFFFF" />
								</TouchableOpacity>

								<TextInput
									ref={inputRef}
									style={styles.searchField}
									placeholder="Search Properties / Rooms"
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

						<View style={styles.statsRow}>
							<View style={styles.statsCol}>
								<View style={styles.statsCard}>
									<View style={styles.statItem}>
										<Text style={styles.statTitle}>Vacant Room</Text>
										<View style={styles.badge}><Text style={styles.badgeText}>5</Text></View>
									</View>
									<View style={styles.statItem}>
										<Text style={styles.statTitle}>Room Full</Text>
										<View style={styles.badgeRed}><Text style={styles.badgeTextRed}>10</Text></View>
									</View>
								</View>
							</View>

							<View style={styles.statsCol}>
								<View style={styles.statsCard}>
									<View style={styles.statItem}>
										<Text style={styles.statTitle}>Beds Vacant</Text>
										<View style={styles.badge}><Text style={styles.badgeText}>12</Text></View>
									</View>
									<View style={styles.statItem}>
										<Text style={styles.statTitle}>Occupancy</Text>
										<View style={styles.badge}><Text style={styles.badgeText}>85.4%</Text></View>
									</View>
								</View>
							</View>
						</View>

						<View style={styles.segmentWrap}>
							<View style={styles.segmentBg}>
								<TouchableOpacity onPress={() => setSegment('all')} style={[styles.segmentPill, segment === 'all' && styles.segmentPillActive]}>
									<Text style={segment === 'all' ? styles.segmentTextActive : styles.segmentText}>All Rooms</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => setSegment('available')} style={[styles.segmentPill, segment === 'available' && styles.segmentPillActive]}>
									<Text style={segment === 'available' ? styles.segmentTextActive : styles.segmentText}>Available</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => setSegment('occupied')} style={[styles.segmentPill, segment === 'occupied' && styles.segmentPillActive]}>
									<Text style={segment === 'occupied' ? styles.segmentTextActive : styles.segmentText}>Occupied</Text>
								</TouchableOpacity>
							</View>
						</View>
					</>
				)}

				{isEmpty ? (
					// Empty state UI (matches provided screenshot)
					<View style={styles.emptyWrap}>
						<Text style={styles.emptyTitle}>No Rooms Added Yet</Text>
						<Text style={styles.emptySubtitle}>Its looks a little empty here. Lets Add Rooms in your property?</Text>
					</View>
				) : (
					<View style={styles.listContainer}>
						{filteredRooms.map((r: Room) => (
							<TouchableOpacity key={r.id} activeOpacity={0.9} onPress={() => router.push(`../property/${r.id}`)} style={styles.roomCard}>
								<View style={styles.roomHeader}>
									<View style={styles.roomTitleWrap}>
										<View style={styles.roomIcon}><MaterialCommunityIcons name="bed-outline" size={18} color="#111827" /></View>
										<Text style={styles.roomTitle}>Room {r.roomNumber}</Text>
									</View>

									<View style={styles.roomHeaderRight}>
										<View style={r.status === 'available' ? styles.roomStatusAvailable : styles.roomStatusFull}>
											<Text style={r.status === 'available' ? styles.roomStatusText : styles.roomStatusText}>{r.status === 'available' ? 'Available' : 'Full'}</Text>
										</View>
										<TouchableOpacity style={styles.shareBtnSmall} activeOpacity={0.8}><Ionicons name="share-outline" size={18} color="#111" /></TouchableOpacity>
									</View>
									</View>

									{/* Stats: two rows, two stats per row */}
									<View style={styles.roomBody}>
										<View style={styles.roomStatsRow}>
											<View style={[styles.roomStatsCol, styles.statInline]}>
												<MaterialCommunityIcons name="bed-outline" size={16} color="#6B7280" style={{ marginRight: 8 }} />
												<Text style={styles.roomStatLabel}>Bed: </Text>
												<Text style={[styles.roomStatValue, styles.grey]}>{r.bedCount}</Text>
											</View>
											<View style={[styles.roomStatsCol, styles.statInline]}>
												<Ionicons name="cash-outline" size={16} color="#6B7280" style={{ marginRight: 8 }} />
												<Text style={styles.roomStatLabel}>Rent Due: </Text>
												<Text style={[styles.roomStatValue, styles.grey]}>{r.rentDueCount}</Text>
											</View>
										</View>

										<View style={styles.roomStatsRow}>
											<View style={[styles.roomStatsCol, styles.statInline]}>
												<Ionicons name="time-outline" size={16} color="#6B7280" style={{ marginRight: 8 }} />
												<Text style={styles.roomStatLabel}>Under Notice: </Text>
												<Text style={[styles.roomStatValue, styles.green]}>{r.underNoticeCount}</Text>
											</View>
											<View style={[styles.roomStatsCol, styles.statInline]}>
												<Ionicons name="ticket-outline" size={16} color="#6B7280" style={{ marginRight: 8 }} />
												<Text style={styles.roomStatLabel}>Active Ticket: </Text>
												<Text style={[styles.roomStatValue, styles.rent]}>{r.activeTickets}</Text>
											</View>
										</View>
									</View>

									<View style={styles.roomActionsRow}>
										{(() => {
											const occupiedBeds = r.occupancyPercent != null ? Math.round((r.occupancyPercent / 100) * r.bedCount) : (r.status === 'full' ? r.bedCount : 0);
											const availableBeds = Math.max(0, r.bedCount - occupiedBeds);
											const showMax = 4;
											const displayCount = Math.min(showMax, r.bedCount);
											const availIcons = Math.min(availableBeds, displayCount);
											const remainingIcons = displayCount - availIcons;
											const fullIcons = Math.min(remainingIcons, r.bedCount - availableBeds);
											const remainingCount = r.bedCount - displayCount;
											return (
												<View style={styles.bedsWrap}>
													{Array.from({ length: availIcons }).map((_, i) => (
														<View key={`a-${i}`} style={[styles.bedIconWrap]}>
															<MaterialCommunityIcons name="bed-outline" size={16} color="#10B981" />
														</View>
													))}
													{Array.from({ length: fullIcons }).map((_, i) => (
														<View key={`f-${i}`} style={[styles.bedIconWrap]}>
															<MaterialCommunityIcons name="bed-outline" size={16} color="#FF2D2D" />
														</View>
													))}
													{remainingCount > 0 && <View style={styles.plusWrap}><Text style={styles.plusText}>+{remainingCount}</Text></View>}
												</View>
											);
										})()}

										<View style={{ marginLeft: 'auto' }}>
											<TouchableOpacity style={styles.addTenantBtn} activeOpacity={0.9} onPress={() => router.push ('/addTenant')}>
												<Text style={styles.addTenantText}>ADD TENANT</Text>
											</TouchableOpacity>
										</View>
									</View>
								</TouchableOpacity>
						))}
					</View>
				)}

			</ScrollView>

			{isEmpty && (
				<View style={styles.bottomCTA} pointerEvents="box-none">
					<View style={styles.bubbleWrap}>
						<View style={styles.emptyCTABox}>
							<Text style={styles.emptyCTAText}>Your space starts here tap to add a room.</Text>
						</View>
					</View>
					<TouchableOpacity style={styles.fab} activeOpacity={0.9}>
						<Text style={styles.plus}>+</Text>
					</TouchableOpacity>
				</View>
			)}
		</SafeAreaView>
	);
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

	statsRow: { flexDirection: 'row', paddingHorizontal: wp(4), marginBottom: hp(1.5) },
	statsCol: { flex: 1, paddingHorizontal: wp(1) },
	statsCard: { backgroundColor: '#FFFFFF', borderRadius: normalize(10), paddingHorizontal: wp(3), paddingVertical: hp(0.5), borderWidth: 1, borderColor: '#DEE1E6', shadowColor: '#000000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
	statItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: hp(1) },
	statTitle: { fontSize: normalize(14), color: '#171A1F', fontFamily: 'Inter-Medium' },
	badge: { backgroundColor: '#ECFDF5', paddingHorizontal: wp(2), paddingVertical: hp(0.5), borderRadius: normalize(8) },
	badgeText: { color: '#10B981', fontSize: normalize(12), fontFamily: 'Poppins-Mixed' },
	badgeRed: { backgroundColor: 'rgba(255, 0, 0, 0.07)',paddingHorizontal: wp(2), paddingVertical: hp(0.5), borderRadius: normalize(8) },
	badgeTextRed: { color: '#FF0000', fontSize: normalize(12), fontFamily: 'Poppins-Mixed' },

	segmentWrap: { paddingHorizontal: wp(4), marginBottom: hp(1.2) },
	segmentBg: { backgroundColor: '#000', borderRadius: normalize(8), padding: wp(1.2), flexDirection: 'row', justifyContent: 'space-between' },
	segmentPill: { flex: 1, paddingVertical: hp(0.6), alignItems: 'center', borderRadius: normalize(6), marginHorizontal: wp(0.5), backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F3F4F6' },
	segmentPillActive: { backgroundColor: '#CBDFFF', borderColor: '#7A7E7E' },
	segmentText: { color: '#111827', fontFamily: 'Inter-Medium' },
	segmentTextActive: { color: '#111827', fontFamily: 'Inter-SemiBold' },

	emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: hp(25) },
	emptyTitle: { fontSize: normalize(20), fontFamily: 'Inter-SemiBold', marginBottom: hp(1) },
	emptySubtitle: { fontSize: normalize(16), color: '#5A6066', textAlign: 'center', marginHorizontal: wp(10), marginBottom: hp(4), fontFamily: 'Inter-Regular', lineHeight: normalize(22) },
	bottomCTA: { position: 'absolute', right: wp(6), bottom: hp(15), alignItems: 'flex-end' },
	bubbleWrap: { alignItems: 'flex-end', marginBottom: hp(1), right: hp(5) },
	emptyCTABox: { backgroundColor: '#FDE68A', paddingHorizontal: wp(5), paddingVertical: hp(1.1), borderRadius: normalize(8), maxWidth: wp(60), shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 4, elevation: 2 },
	emptyCTAText: { color: '#111827', fontSize: normalize(13) },
	fab: { width: normalize(56), height: normalize(56), borderRadius: normalize(28), backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 6, elevation: 6 },
	plus: { color: '#FFF', fontSize: normalize(28), lineHeight: normalize(28) },

	roomCard: { backgroundColor: '#FFFFFF', borderRadius: normalize(12), paddingVertical: hp(1.5), paddingHorizontal: wp(3), marginBottom: hp(1.5), shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 },
	roomHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: hp(1) },
	roomTitleWrap: { flexDirection: 'row', alignItems: 'center' },
	roomIcon: { width: normalize(32), height: normalize(32), borderRadius: normalize(16), backgroundColor: '#FFF3CD', justifyContent: 'center', alignItems: 'center', marginRight: wp(2) },
	roomTitle: { fontSize: normalize(16), fontFamily: 'Inter-SemiBold', color: '#171A1F' },
	roomStatusAvailable: { backgroundColor: '#B0DCB2', paddingHorizontal: wp(4), paddingVertical: hp(0.4), borderRadius: normalize(10) },
	roomStatusText: { color: '#161616' },

	roomBody: { flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', marginBottom: hp(1) },
	roomStatsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: hp(0.4) },
	roomHeaderRight: { flexDirection: 'row', alignItems: 'center' },
	shareBtnSmall: { marginLeft: wp(4), width: normalize(36), height: normalize(36), borderRadius: normalize(18), backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E6E6E6', justifyContent: 'center', alignItems: 'center' },
	statInline: { flexDirection: 'row', alignItems: 'center' },
	roomStatsCol: { alignItems: 'flex-start', flex: 1 },
	roomStatLabel: { fontSize: normalize(14), color: '#6B7280',fontFamily: 'Inter-Regular' },
	roomStatValue: { fontSize: normalize(13), fontFamily: 'Inter-SemiBold' },
	roomActionsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' },
	bedsWrap: { flexDirection: 'row', alignItems: 'center' },
	bedIconWrap: { width: normalize(22), height: normalize(20), justifyContent: 'center', alignItems: 'center' },
	bedAvailable: { backgroundColor: '#ECFDF5', borderWidth: 1, borderColor: '#10B981' },
	bedFull: { backgroundColor: 'rgba(255,45,45,0.08)', borderWidth: 1, borderColor: '#FF2D2D' },
	plusWrap: { marginLeft: wp(1), backgroundColor: '#FFF3CD', paddingHorizontal: wp(1.2), paddingVertical: hp(0.2), borderRadius: normalize(6), borderWidth: 1, borderColor: '#FDE68A' },
	plusText: { color: '#111827', fontSize: normalize(12), fontWeight: '600' },
	addTenantBtn: { borderWidth: 1, borderColor: '#313030', paddingHorizontal: wp(6), paddingVertical: hp(1), borderRadius: normalize(4), marginRight: wp(3) },
	roomStatusFull: { backgroundColor: '#FF8484', paddingHorizontal: wp(4), paddingVertical: hp(0.4), borderRadius: normalize(10) },
	addTenantText: { fontSize: normalize(12), fontWeight: '600' },

	green: { color: '#10B981' },
	rent: { color: '#FF2D2D' },
	grey: { color: '#CB6E00' },
});
