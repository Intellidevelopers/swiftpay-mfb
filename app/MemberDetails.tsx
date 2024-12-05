import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ProgressBar from '@/components/ProgressBar';

type Member = {
  id: string;
  name: string;
  role: 'Admin' | 'Member';
};

const MemberDetails: React.FC = () => {
  const { member } = useLocalSearchParams();
  const parsedMember: Member = member ? JSON.parse(member as string) : { id: '', name: '', role: 'Member' };
  
  const [isAdminModalVisible, setAdminModalVisible] = useState(false);
  const [isRemoveModalVisible, setRemoveModalVisible] = useState(false);

  const handleMakeAdmin = () => {
    Alert.alert("Success", `${parsedMember.name} has been made an admin.`);
    setAdminModalVisible(false);
  };

  const handleRemoveMember = () => {
    Alert.alert("Success", `${parsedMember.name} has been removed.`);
    setRemoveModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.memberName}>{parsedMember.name}</Text>
        <Image source={require('../assets/user.png')} style={styles.largeProfileImage} />
        <View style={styles.info}>
          <Text style={styles.label}>Member Estimated Amount</Text>
          <Text style={styles.amount}>0.00</Text>
          <Text style={styles.label}>Member Active Savings</Text>
          <Text style={styles.amount}>0.00</Text>
          <Text style={styles.label}>RIS</Text>
          <ProgressBar progress={0.5} />
          <Text style={styles.depo}>+3 Deposit</Text>
          <Text style={styles.roleText}>{parsedMember.role}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.makeAdminButton}
              onPress={() => setAdminModalVisible(true)}
            >
              <Text style={styles.buttonText}>Make Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => setRemoveModalVisible(true)}
            >
              <Text style={styles.buttonText}>Remove Member</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Make Admin Modal */}
      <Modal
        visible={isAdminModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAdminModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Make Admin</Text>
            <Text style={styles.modalText}>
              Are you sure you want to make {parsedMember.name} an admin?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setAdminModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleMakeAdmin}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Remove Member Modal */}
      <Modal
        visible={isRemoveModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setRemoveModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Remove Member</Text>
            <Text style={styles.modalText}>
              Are you sure you want to remove {parsedMember.name} from the group?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setRemoveModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleRemoveMember}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MemberDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginTop: 40,
  },
  largeProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 12,
  },
  memberName: {
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '700',
  },
  info: {
    paddingHorizontal: 16,
  },
  amount: {
    fontSize: 20,
    color: 'green',
  },
  roleText: {
    fontSize: 16,
    marginTop: 8,
    color: '#fff',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  makeAdminButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  confirmButton: {
    backgroundColor: 'blue',
  },
  label:{
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  depo:{
    fontSize: 14,
    color: 'green',
    marginTop: 4,
    marginBottom: 8,
  }
});
