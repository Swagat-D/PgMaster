import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Modal, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { getComplaintById } from '../../src/data/complaintsData';

const { width, height } = Dimensions.get('window');
const wp = (percentage: number) => (width * percentage) / 100;
const hp = (percentage: number) => (height * percentage) / 100;
const normalize = (size: number) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

export default function ComplaintDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const scrollRef = useRef<ScrollView | null>(null as any)
  const complaint = getComplaintById(String(id));
  const [modalVisible, setModalVisible] = useState(false);
  const [isResolved, setIsResolved] = useState(complaint?.status !== 'open');
  const [status, setStatus] = useState<'open' | 'inprogress' | 'resolved'>(complaint?.status || 'open');
  const [showStatus, setShowStatus] = useState(false);

  const statusLabel = (s: 'open' | 'inprogress' | 'resolved') => {
    if (s === 'open') return 'Open';
    if (s === 'inprogress') return 'In Progress';
    return 'Resolved';
  }

  const onChangeStatus = (s: 'open' | 'inprogress' | 'resolved') => {
    setStatus(s);
    setShowStatus(false);
  }

  useEffect(() => {
    if (showStatus) {
      setTimeout(() => {
        try {
          scrollRef.current?.scrollToEnd({ animated: true });
        } catch (e) {        }
      }, 120);
    }
  }, [showStatus]);

  if (!complaint) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#111" />
        </TouchableOpacity>
        <View style={{ padding: wp(4) }}>
          <Text>Complaint not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#CBDFFF" />
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ticket Details</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView ref={scrollRef} contentContainerStyle={[styles.content, showStatus ? { paddingBottom: hp(6) } : {}]} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <View style={styles.titlePillsRow}>
            <Text style={styles.complaintTitle}>{complaint.title}</Text>
            <View style={styles.pillsRow}>
              <View style={[
                styles.statusPill,
                status === 'open' ? styles.statusOpen : status === 'inprogress' ? styles.statusInprogress : styles.statusResolved,
              ]}>
                <Text style={[
                  styles.statusText,
                  status === 'open' ? styles.statusTextOpen : status === 'inprogress' ? styles.statusTextInprogress : styles.statusTextResolved,
                ]}>{statusLabel(status)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Raised By :</Text>
            <Text style={styles.cardValue}>{complaint.raisedBy} ,{complaint.room}</Text>
          </View>
          
          <View style={styles.cardRow}> 
            <Text style={styles.cardLabel}>Created on :</Text>
            <Text style={styles.cardValue}>{complaint.createdOn}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>{complaint.description}</Text>
        </View>

        <Text style={styles.sectionTitle}>Complaint Log</Text>
        {((complaint as any).logs && (complaint as any).logs.length > 0 ? (complaint as any).logs : [
          { title: 'Ticket created', time: complaint.createdAt || '' },
        ]).map((log: { title: string; time: string }, idx: number) => (
          <View key={idx} style={styles.logItem}>
            <View style={styles.logDot} />
            <View style={styles.logTextContainer}>
              <Text style={styles.logTitle}>{log.title}</Text>
              <Text style={styles.logTime}>{log.time}</Text>
            </View>
          </View>
        ))}

        <View style={styles.commentRow}>
          <TextInput placeholder="Add New Activity" placeholderTextColor="#8A8787" style={styles.commentInput} />
          <TouchableOpacity style={styles.addBtn }><Text style={{ color: '#000000', fontFamily: "Inter-Regular", fontSize: normalize(11.8) }}>Update</Text></TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: hp(2) }]}>Raised By :</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoLeft}>
            <View style={styles.personIcon}><Ionicons name="person" size={16} color="#111" /></View>
            <View>
              <Text style={styles.cardValueLarge}>{complaint.raisedBy}</Text>
              <Text style={styles.cardLabelSmall}>Room : {complaint.room}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.iconCircle}><Ionicons name="call" size={16} color="#fff" /></TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: hp(2) }]}>Assigned to :</Text>
        {Array.isArray(complaint.assignedTo) && complaint.assignedTo.length > 0 ? (
          complaint.assignedTo.map((a, idx) => (
            <View key={idx} style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <View style={styles.personIcon}><Ionicons name="person" size={16} color="#111" /></View>
                <View>
                  <Text style={styles.cardValueLarge}>{a.name}</Text>
                  <Text style={styles.cardLabelSmall}>{a.role || 'Employee'}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.iconCircle}><Ionicons name="call" size={16} color="#fff" /></TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <View style={styles.personIcon}><Ionicons name="person" size={16} color="#111" /></View>
              <View>
                <Text style={styles.cardValueLarge}>Not Assigned</Text>
                <Text style={styles.cardLabelSmall}>Employee</Text>
              </View>
            </View>
          </View>
        )}

        <Text style={[styles.sectionTitle, { marginTop: hp(2) }]}>Photos</Text>
        <View style={styles.photosRow}>
          <View style={styles.photoThumb}>
            <Image source={complaint.photos && complaint.photos.length ? { uri: complaint.photos[0] } : require('../../assets/home.png')} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
          </View>
          <View style={[styles.photoThumb, { justifyContent: 'center', alignItems: 'center' }]}>
            <Ionicons name="image-outline" size={28} color="#9CA3AF" />
          </View>
        </View>

        <View style={[styles.statusChangeRow, { marginTop: hp(2) }]}>
          <Text style={styles.changeLabel}>Change Status</Text>
          <View style={styles.statusSelectWrapper}>
            <TouchableOpacity style={styles.statusSelect} onPress={() => setShowStatus(!showStatus)}>
              <Text style={styles.statusSelectText}>{statusLabel(status)}</Text>
              <Ionicons name="chevron-down" size={18} color="#000" />
            </TouchableOpacity>
            {showStatus && (
              <View style={styles.statusOptions}>
                <TouchableOpacity style={styles.statusOption} onPress={() => onChangeStatus('open')}><Text style={styles.statusOptionText}>Open</Text></TouchableOpacity>
                <TouchableOpacity style={styles.statusOption} onPress={() => onChangeStatus('inprogress')}><Text style={styles.statusOptionText}>In Progress</Text></TouchableOpacity>
                <TouchableOpacity style={styles.statusOption} onPress={() => onChangeStatus('resolved')}><Text style={styles.statusOptionText}>Resolved</Text></TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View style={{ height: hp(8) }} />
      </ScrollView>

      <View style={styles.footerRow}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => setModalVisible(true)}><Ionicons name="close-circle-outline" size={22} color="#000000" /><Text style={styles.secondaryText}>  Cancel</Text></TouchableOpacity>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.back()}><Ionicons name="create-outline" size={22} color="#000000" /><Text style={styles.primaryText}>  Save Changes</Text></TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCardWrapper}>
            <View style={styles.modalCard}>
              <View style={styles.modalIconWrap}>
                <View style={styles.modalIconCircle}><Ionicons name="trash-outline" size={20} color="#D91F1F" /></View>
              </View>

              <View style={styles.modalContentInner}>
                <Text style={styles.modalTitle}>Close Complaint</Text>
                <Text style={styles.modalDesc}>Are you sure you want to close this complaint?</Text>
                <Text style={[styles.modalDesca]}>Once closed, this issue will be marked as resolved.</Text>

                <Pressable style={styles.modalPrimaryBtn} onPress={() => {
                  setIsResolved(true);
                  setModalVisible(false);
                  if (Platform.OS === 'android') {
                    ToastAndroid.show('Complaint closed and Marked as Resolved', ToastAndroid.SHORT);
                  }
                  router.back();
                }}>
                  <Text style={styles.modalPrimaryText}>Close Complaint</Text>
                </Pressable>

                <Pressable style={styles.modalCancelBtn} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  headerRow: { 
    height: hp(7) + (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0), 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: wp(4),
    borderBottomWidth: 0, 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 12, 
    backgroundColor: '#EDF4FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backBtn: { 
    width: hp(4.5), 
    height: wp(6), 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  headerTitle: { 
    flex: 1, 
    textAlign: 'left', 
    fontSize: normalize(18), 
    fontFamily: "Inter-Medium", 
    color: '#171A1F',
    paddingLeft: wp(2)
  },
  content: { 
    paddingVertical: hp(2),
    paddingHorizontal: wp(5) 
  },
  topRow: { 
    flexDirection: 'column', 
    alignItems: 'flex-start', 
  },
  titlePillsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateRow: {
    flexDirection: 'row',
    gap: wp(2),
    marginTop: hp(0.8)
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
    marginTop: hp(1),
    gap: wp(2),
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    padding: wp(2.5),
    borderRadius: 8,
    fontFamily: "Inter-Regular",
    fontSize: normalize(11.6),
    color: '#BAB7B7',},
  addBtn: {
    backgroundColor: '#FFD54A',
    width: normalize(84),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  complaintTitle: { 
    fontSize: normalize(17), 
    fontFamily: "Inter-SemiBold",
    color: '#000000' 
  },
  statusPill: { 
    backgroundColor: '#FFECEC', 
    paddingHorizontal: wp(3.5), 
    paddingVertical: hp(0.6), 
    borderRadius: normalize(18), 
    borderWidth: 0.6, 
    borderColor: '#FFD2D6',
    minWidth: normalize(72),
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusText: { 
    color: '#D91F1F', 
    fontSize: normalize(12), 
    fontFamily: 'Inter-SemiBold'
  },
  statusOpen: { backgroundColor: 'rgba(255, 178, 178, 0.79)', borderColor: 'rgba(171,171,171,0.80)' },
  statusTextOpen: { color: '#940000' },
  statusInprogress: { backgroundColor: '#FFECA7', borderColor: 'rgba(171,171,171,0.80)' },
  statusTextInprogress: { color: '#9A7904' },
  statusResolved: { backgroundColor: 'rgba(51, 209, 58, 0.37)', borderColor: 'rgba(171,171,171,0.80)' },
  statusTextResolved: { color: '#007918' },
  cardRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: hp(0.3), paddingHorizontal: normalize(4) },
  cardLabel: { fontSize: normalize(12), color: '#6B7280', fontFamily: 'Inter-Regular', textAlign: 'left' },
  cardValue: { flex: 1, fontSize: normalize(13.2), color: '#111827', fontFamily: 'Inter-Medium', textAlign: 'right' },
  pillsRow: { 
    flexDirection: 'row', 
    gap: wp(2), 
    marginBottom: hp(0.6) 
  },
  sectionTitle: { 
    marginTop: hp(1), 
    marginBottom: hp(0.5), 
    fontFamily: "Inter-Regular", 
    fontSize: normalize(15) ,
    color: '#000000'
  },
  descriptionBox: { 
    backgroundColor: '#F7FAFF', 
    paddingVertical: wp(2), 
    paddingHorizontal: wp(3),
    borderRadius: normalize(8), 
    borderWidth: 1, 
    borderColor: '#E3E3E3' 
  },
  descriptionText: { 
    color: '#333131', 
    lineHeight: normalize(18) ,
    fontFamily: "Inter-Regular",
    fontSize: normalize(11.5),
    textAlign: 'left'
  },
  photosRow: { 
    flexDirection: 'row', 
    gap: wp(3), 
    marginTop: hp(0.6), 
    alignItems: 'center' 
  },
  photoThumb: { 
    width: wp(25), 
    height: wp(25), 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#EEF3F9', 
    overflow: 'hidden' 
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: hp(0.8), paddingHorizontal: normalize(4) },
  infoLeft: { flexDirection: 'row', alignItems: 'center', gap: wp(3) },
  cardValueLarge: { fontSize: normalize(14), fontFamily: 'Inter-SemiBold', color: '#000000' },
  cardLabelSmall: { fontSize: normalize(12), fontFamily: 'Inter-Regular', color: '#6B7280' },
  logItem: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    gap: wp(3), 
    marginTop: hp(10/16),
    marginLeft: wp(2.5)
  },
  changeLabel: { 
    fontSize: normalize(14), 
    fontFamily: 'Inter-Medium',
  },
  statusChangeRow: { marginTop: hp(0.6), width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap' },
  statusSelect: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FDE9B5', paddingHorizontal: wp(4), paddingVertical: hp(1), borderRadius: normalize(8), width: normalize(170) },
  statusSelectText: { color: '#111827', fontFamily: 'Inter-Medium' },
  statusSelectWrapper: { position: 'relative', width: normalize(170) },
  statusOptions: { position: 'absolute', top: '100%', left: 0, width: normalize(170), marginTop: hp(0.6), backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E6E6E6', borderRadius: normalize(8), overflow: 'hidden', zIndex: 20 },
  statusOption: { paddingVertical: hp(1), paddingHorizontal: wp(3) },
  statusOptionText: { color: '#111827' },
  logDot: { 
    width: hp(1), 
    height: hp(1), 
    borderRadius: hp(0.5), 
    backgroundColor: '#FF0000', 
    alignSelf: 'flex-start',
    marginTop: hp(0.5)
  },
  logTextContainer: {
    flex: 1,
    marginLeft: wp(1),
  },
  logTitle: { 
    fontFamily: "Inter-Regular", 
    fontSize: normalize(13), 
    color: '#000000',
    fontWeight: '500'
  },
  logTime: { 
    color: '#4A4646', 
    fontSize: normalize(11), 
    marginTop: hp(0.25) ,
    fontFamily: "Inter-Regular"
  },
  assignedInner: { 
    paddingTop: hp(0.6), 
    marginTop: hp(6/16) 
  },
  assignedItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginBottom: hp(0.8), 
    backgroundColor: '#F7FAFF', 
    padding: wp(2.2), 
    borderRadius: normalize(10), 
    borderWidth: 1.25, 
    borderColor: '#D9D9D9' 
  },
  assignedLeft: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: wp(3) 
  },
  personIcon: { 
    width: normalize(34), 
    height: normalize(34), 
    borderRadius: normalize(17), 
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#EEF3F9' 
  },
  assigneeName: { 
    color: '#000000', 
    fontSize: normalize(12), 
    fontFamily: "Inter-Regular" 
  },
  contactIcons: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  iconCircle: { 
    width: normalize(32), 
    height: normalize(32), 
    borderRadius: normalize(16), 
    backgroundColor: '#04D111', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  footerRow: { 
    flexDirection: 'row', 
    padding: wp(2), 
    gap: wp(3) ,
    marginBottom: hp(4)
  },
  secondaryBtn: { 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    borderWidth: 1, 
    borderColor: '#434343', 
    padding: wp(3), 
    borderRadius: 8, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  primaryBtn: { 
    flex: 1, 
    backgroundColor: '#EEF6FF', 
    borderWidth: 1, 
    borderColor: '#434343', 
    padding: wp(3), 
    borderRadius: 8, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  secondaryText: { 
    color: '#000000',
    fontFamily: "Inter-Medium",
    fontSize: normalize(13) 
  },
  primaryText: { 
    color: '#000000',
    fontFamily: "Inter-Medium",
    fontSize: normalize(13)
   },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(6),
  },
  modalCardWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  modalCard: {
    width: wp(90),
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingTop: normalize(20),
    paddingHorizontal: wp(5),
    minHeight: hp(34),
    paddingBottom: hp(4),
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  modalIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEE4E2',
    borderWidth: 1,
    borderColor: 'rgba(217,31,31,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  modalTitle: {
    fontSize: normalize(18),
    fontFamily: 'Inter-SemiBold',
    color: '#181D27',
    marginTop: normalize(6),
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  modalDesc: {
    textAlign: 'left',
    color: '#6B6B6B',
    fontSize: normalize(13),
    marginTop: hp(1.2),
    lineHeight: normalize(19),
    alignSelf: 'flex-start',
  },
  modalDesca: {
    textAlign: 'left',
    color: '#6B6B6B',
    fontSize: normalize(13),
    lineHeight: normalize(19),
    alignSelf: 'flex-start',
  },
  modalIconWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContentInner: {
    width: '100%',
    alignItems: 'flex-start',
    paddingTop: hp(0.5),
    paddingLeft: 0,
    flex: 1,
  },
  modalPrimaryBtn: {
    width: '100%',
    backgroundColor: '#D92D20',
    paddingVertical: hp(1.4),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  modalPrimaryText: {
    color: '#FFFFFF',
    fontSize: normalize(15),
    fontFamily: 'Inter-SemiBold',
  },
  modalCancelBtn: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: hp(1.2),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: hp(1),
  },
  modalCancelText: {
    color: '#111827',
    fontSize: normalize(14),
    fontFamily: 'Inter-Regular',
  },
});
