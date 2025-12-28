import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Tenant } from '../data/tenants';

const { width, height } = Dimensions.get('window');
const wp = (p: number) => (width * p) / 100;
const hp = (p: number) => (height * p) / 100;
const normalize = (size: number) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

type Props = {
  visible: boolean;
  tenant: Tenant | null;
  onClose: () => void;
};

export default function TenantDetailsModal({ visible, tenant, onClose }: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.8}>
            <Ionicons name="close-circle" size={36} color="#FDE68A" />
          </TouchableOpacity>

          <View style={styles.cardContainer}>
            <View style={styles.content}>
              <Image source={require('../../assets/pht.png')} style={styles.photo} />
              <Text style={styles.name}>{tenant?.name ?? 'Tenant'}</Text>
              <Text style={styles.room}>Room: <Text style={styles.roomNum}>{tenant?.room ?? '-'}</Text></Text>

              <View style={styles.twoColRow}>
                <View style={styles.leftCol}>
                  <View style={[styles.infoRow, styles.columnItem]}>
                    <Text style={styles.infoLabel}>Rent :</Text>
                    <Text style={styles.infoValue}>{tenant?.rentAmount ? `₹${tenant.rentAmount.toLocaleString('en-IN')}` : '₹0'}</Text>
                  </View>

                  <View style={[styles.infoRowSmall, styles.columnItem]}>
                    <Text style={styles.infoLabel}>DOJ :</Text>
                    <Text style={styles.infoValue}>{tenant?.joinedDate ?? '-'}</Text>
                  </View>
                </View>

                <View style={styles.rightCol}>
                  <View style={[styles.infoRow, styles.columnItem]}>
                    <Text style={styles.infoLabel}>Deposit :</Text>
                    <Text style={styles.infoValue}>₹0</Text>
                  </View>

                  <View style={[styles.infoRowSmall, styles.columnItem]}>
                    <Text style={styles.infoLabel}>DOL :</Text>
                    <Text style={styles.infoValue}>{tenant?.moveInDate ?? '-'}</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Quick Action :</Text>
              <View style={styles.actionsGrid}>
                <TouchableOpacity style={styles.actionBtn}><Text style={styles.actionText}>Delete Tenant</Text></TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}><Text style={styles.actionText}>Change Room</Text></TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}><Text style={styles.actionText}>Documents</Text></TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}><Text style={styles.actionText}>Put on Notice</Text></TouchableOpacity>
              </View>

              <View style={styles.footerRow}>
                <TouchableOpacity style={styles.viewProfileBtn} activeOpacity={0.9}>
                  <Text style={styles.viewProfileText}>View Profile</Text>
                </TouchableOpacity>

                <View style={styles.contactRowInline}>
                  <TouchableOpacity style={styles.contactBtn}><Ionicons name="call-outline" size={16} color="#111" /></TouchableOpacity>
                  <TouchableOpacity style={[styles.contactBtn, styles.whatsapp]}><Ionicons name="logo-whatsapp" size={16} color="#fff" /></TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'flex-end', alignItems: 'center' },
  modal: { width: '100%', backgroundColor: '#FFF', borderTopLeftRadius: normalize(28), borderTopRightRadius: normalize(28), paddingTop: hp(8), paddingBottom: hp(6), paddingHorizontal: wp(2) },
  closeBtn: { position: 'absolute', alignSelf: 'center', top: hp(2), zIndex: 20 },
  cardContainer: { width: '94%', alignSelf: 'center', backgroundColor: '#FFF', borderRadius: normalize(16), paddingVertical: hp(3), paddingHorizontal: wp(4), borderWidth: 1, borderColor: '#E6E6E6' },
  content: { alignItems: 'center' },
  photo: { width: normalize(80), height: normalize(80), borderRadius: normalize(40), marginBottom: hp(1) },
  name: { fontSize: normalize(16), fontFamily: 'Inter-SemiBold', marginBottom: hp(0.5) },
  room: { fontSize: normalize(13), color: '#6B7280', marginBottom: hp(1), fontFamily: 'Inter-Regular' },
  roomNum: { color: '#CB6E00', fontFamily: 'Inter-Medium' },
  rowSpace: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: hp(1.2) },
  infoCol: { alignItems: 'flex-start', flex: 1 },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  infoLabel: { color: '#6C6969', fontSize: normalize(14),fontFamily: 'Inter-Regular', marginRight: wp(2) },
  infoValue: { fontSize: normalize(13), fontFamily: 'Inter-Medium' },
  infoRowSmall: { flexDirection: 'row', alignItems: 'center' },
  columnItem: { marginBottom: hp(0.8) },
  twoColRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: hp(1.2) },
  leftCol: { flex: 1, alignItems: 'flex-start' },
  rightCol: { flex: 1, alignItems: 'flex-end' },
  sectionTitle: { alignSelf: 'flex-start', marginTop: hp(0.5), marginBottom: hp(1.5), fontFamily: 'Inter-SemiBold', fontSize: normalize(14) },
  actionsGrid: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  actionBtn: { width: '48%', backgroundColor: '#FFDEDE', borderColor: '#FF0000', borderWidth: 0.5, paddingVertical: hp(1), borderRadius: normalize(4), alignItems: 'center', marginBottom: hp(1) },
  actionText: { color: '#000000', fontSize: normalize(11), fontFamily: 'Inter-Regular' },
  footerRow: { flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: hp(0.5) },
  viewProfileBtn: { backgroundColor: '#FFF4B8', flex: 1, paddingVertical: hp(1.2), borderRadius: normalize(8), alignItems: 'center', marginRight: wp(3), borderWidth: 0.7, borderColor: '#C09700' },
  viewProfileText: { fontFamily: 'Inter-Medium', fontSize: normalize(10), color: '#000000' },
  contactRowInline: { flexDirection: 'row', alignItems: 'center' },
  contactBtn: { width: normalize(32), height: normalize(32), borderRadius: normalize(16), backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginHorizontal: wp(2), borderWidth: 1, borderColor: '#BFBFBF' },
  whatsapp: { backgroundColor: '#10B981', borderColor: '#10B981' },
  cardShadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 },
});
