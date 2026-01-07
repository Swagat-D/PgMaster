import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = require('react-native').Dimensions.get('window');
const wp = (p: number) => (width * p) / 100;
const hp = (p: number) => (height * p) / 100;
const normalize = (size: number) => {
	const scale = width / 375;
	return Math.round(size * scale);
};

export default function ProfileView() {
	return (
		<SafeAreaView style={styles.safe} edges={Platform.OS === 'ios' ? ['top'] : ['top']}>
			<StatusBar barStyle="dark-content" backgroundColor="#CBDFFF" />
			<View style={styles.header}>
				<View style={styles.headerInner}>
					<View style={styles.headerTextWrap}>
						<Text style={styles.name}>Raghav</Text>
						<Text style={styles.sub}>Owner ID : PGM2348GH78</Text>
						<Text style={styles.sub}>+91 8760109865</Text>
						<TouchableOpacity activeOpacity={0.8} style={styles.editRow}>
							<Text style={styles.editText}>Edit Profile</Text>
							<Ionicons name="chevron-forward" size={normalize(18)} color="#1F2937" />
						</TouchableOpacity>
					</View>

					<Image source={require('../../assets/pht.png')} style={styles.avatar} />
				</View>
			</View>

			<ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
				<View style={styles.card}>
					<TouchableOpacity style={styles.row} activeOpacity={0.8}>
						<View style={styles.iconBox}><Ionicons name="briefcase-outline" size={normalize(20)} color="#2B6CB0" /></View>
						<Text style={styles.rowText}>Business Details</Text>
						<Ionicons name="chevron-forward" size={normalize(20)} color="#9CA3AF" />
					</TouchableOpacity>

					<TouchableOpacity style={styles.row} activeOpacity={0.8}>
						<View style={styles.iconBox}><MaterialCommunityIcons name="bank" size={normalize(20)} color="#2B6CB0" /></View>
						<Text style={styles.rowText}>Bank Details</Text>
						<Ionicons name="chevron-forward" size={normalize(20)} color="#9CA3AF" />
					</TouchableOpacity>

					<TouchableOpacity style={styles.row} activeOpacity={0.8}>
						<View style={styles.iconBox}><Ionicons name="people-outline" size={normalize(20)} color="#2B6CB0" /></View>
						<Text style={styles.rowText}>Manage Permissions</Text>
						<Ionicons name="chevron-forward" size={normalize(20)} color="#9CA3AF" />
					</TouchableOpacity>

					<TouchableOpacity style={styles.row} activeOpacity={0.8}>
						<View style={styles.iconBox}><Ionicons name="checkmark-done-outline" size={normalize(20)} color="#2B6CB0" /></View>
						<Text style={styles.rowText}>Settlement</Text>
						<Ionicons name="chevron-forward" size={normalize(20)} color="#9CA3AF" />
					</TouchableOpacity>

					<View style={styles.divider} />

					<TouchableOpacity style={styles.row} activeOpacity={0.8}>
						<View style={styles.iconBox}><Ionicons name="information-circle-outline" size={normalize(20)} color="#2B6CB0" /></View>
						<Text style={styles.rowText}>About Us</Text>
						<Ionicons name="chevron-forward" size={normalize(20)} color="#9CA3AF" />
					</TouchableOpacity>

					<TouchableOpacity style={styles.row} activeOpacity={0.8}>
						<View style={styles.iconBox}><Ionicons name="call-outline" size={normalize(20)} color="#2B6CB0" /></View>
						<Text style={styles.rowText}>Contact Us</Text>
						<Ionicons name="chevron-forward" size={normalize(20)} color="#9CA3AF" />
					</TouchableOpacity>

					<View style={styles.divider} />

					<TouchableOpacity style={styles.row} activeOpacity={0.8}>
						<View style={styles.iconBox}><Ionicons name="lock-closed-outline" size={normalize(20)} color="#2B6CB0" /></View>
						<Text style={styles.rowText}>Privacy Policy</Text>
						<Ionicons name="chevron-forward" size={normalize(20)} color="#9CA3AF" />
					</TouchableOpacity>

					<TouchableOpacity style={styles.row} activeOpacity={0.8}>
						<View style={styles.iconBox}><Ionicons name="document-text-outline" size={normalize(20)} color="#2B6CB0" /></View>
						<Text style={styles.rowText}>Terms & Conditions</Text>
						<Ionicons name="chevron-forward" size={normalize(20)} color="#9CA3AF" />
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: '#F3F6FF' },
	header: {
		backgroundColor: '#DDEEFF',
		paddingBottom: hp(3),
		paddingTop: Platform.OS === 'android' ? hp(3) : 0,
	},
	headerInner: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: wp(6),
		paddingTop: hp(2),
	},
	headerTextWrap: { flex: 1, paddingRight: wp(3) },
	name: { fontSize: normalize(20), color: '#0F172A', fontFamily: 'Poppins-Mixed', marginBottom: hp(0.6) },
	sub: { fontSize: normalize(13), color: '#374151', fontFamily: 'Inter-Regular', marginTop: 2 },
	editRow: { flexDirection: 'row', alignItems: 'center', marginTop: hp(1.2) },
	editText: { fontSize: normalize(14), color: '#0F172A', fontFamily: 'Inter-Regular', marginRight: wp(1) },
	avatar: { width: normalize(68), height: normalize(68), borderRadius: normalize(34), borderWidth: 1, borderColor: '#FFFFFF' },
	scroll: { paddingHorizontal: wp(4), paddingTop: hp(2), paddingBottom: hp(6) },
	card: {
		backgroundColor: '#FFFFFF',
		borderRadius: 18,
		paddingVertical: hp(2.2),
		paddingHorizontal: wp(3.5),
		// overlap look
		marginTop: -hp(2.6),
		// shadow
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.06,
		shadowRadius: 8,
		elevation: 3,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: hp(2.2),
	},
	iconBox: {
		width: normalize(44),
		height: normalize(44),
		borderRadius: 10,
		backgroundColor: '#F1F6FB',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: wp(4),
	},
	rowText: { flex: 1, fontSize: normalize(16), color: '#0F172A', fontFamily: 'Poppins-Mixed' },
	divider: { height: StyleSheet.hairlineWidth, backgroundColor: '#E5E7EB', marginVertical: hp(1.4) },
});

