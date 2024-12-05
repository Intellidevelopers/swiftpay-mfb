import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, Image, TextInput, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BottomSheet } from '@rneui/themed';

const Tv = () => {
  const [selectedTab, setSelectedTab] = useState('TV');
  const [providerModalVisible, setProviderModalVisible] = useState(false);
  const [packageModalVisible, setPackageModalVisible] = useState(false);
  const [isTransactionPinVisible, setIsTransactionPinVisible] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | undefined>(undefined);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isPlanDropdownVisible, setIsPlanDropdownVisible] = useState(false);
  const networkItems = [
    { label: 'Startimes', value: 'Startimes' },
    { label: 'DSTV', value: 'DSTV' },
  ];
  const handleContinue = () => {
    setIsPreviewVisible(true);
  };

  const handlePay = () => {
    setIsPreviewVisible(false);
    setIsTransactionPinVisible(true)

  }

  const providers = [
    { name: 'DSTV', logo: require('../assets/cards/1.png') },
    { name: 'Startimes', logo: require('../assets/cards/2.png') },
    { name: 'GOtv', logo: require('../assets/cards/3.png') }
  ];

  const internetProviders = [
    { name: 'FiberNet', logo: require('../assets/cards/1.png') },
    { name: 'Xfinity', logo: require('../assets/cards/1.png') },
    { name: 'Verizon', logo: require('../assets/cards/1.png') }
  ];

  const plans = selectedTab === 'TV' ? ['Basic', 'Premium', 'Family'] : ['1Mbps', '10Mbps', '50Mbps'];

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
    setIsPlanDropdownVisible(false);
  };

  const packages = ['Basic', 'Premium', 'Family'];
  const internetPackages = ['1Mbps', '10Mbps', '50Mbps'];

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (text: string, index: number) => {
    // Set OTP value at the current index
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input
    if (text && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      // Move to the previous input
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

    
  const handleConfirmPayment = () => {
    setIsTransactionPinVisible(false); // Hide the transaction pin bottom sheet
    setIsSuccessVisible(true); // Show the success bottom sheet
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={20} />
        </TouchableOpacity>
        <Text style={styles.title}>TV & Internet</Text>
        <TouchableOpacity>
          <Text style={styles.history}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setSelectedTab('TV')} style={[styles.tab, selectedTab === 'TV' && styles.activeTab]}>
          <Text style={[styles.tabText, selectedTab === 'TV' && styles.activeTabText]}>TV</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('Internet')} style={[styles.tab, selectedTab === 'Internet' && styles.activeTab]}>
          <Text style={[styles.tabText, selectedTab === 'Internet' && styles.activeTabText]}>Internet</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {selectedTab === 'TV' ? (
          <>
            <View style={styles.selectionRow}>
              <View style={styles.flexHeader}>
              <Text style={styles.selectionLabel}>Select Provider</Text>
              <TouchableOpacity onPress={() => router.push('/Beneficiaries')}>
                <Text style={styles.beneficiaryLabel}>Beneficiaries</Text>
              </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => setProviderModalVisible(true)} style={styles.modalDropdown}>
                {selectedProvider ? (
                  <View style={styles.providerContainer}>
                    <Image source={providers.find(p => p.name === selectedProvider)?.logo} style={styles.icon} />
                    <Text>{selectedProvider}</Text>
                  </View>
                ) : (
                  <Text>Select Provider</Text>
                )}
                <AntDesign name='down' size={20} />
              </TouchableOpacity>
            </View>

            <View style={styles.selectionRow}>
              <Text style={styles.selectionLabel}>Payment Method</Text>
              <View style={styles.paymentMethod}>
                <Text style={styles.paymentText}>30 days</Text>
              </View>
            </View>

            <View style={styles.selectionRow}>
              <Text style={styles.selectionLabel}>Package</Text>
              <TouchableOpacity onPress={() => setPackageModalVisible(true)} style={styles.dropDown2}>
                <Text>{selectedPackage || 'Please Select Package'}</Text>
                <AntDesign name='down' size={20}/>
              </TouchableOpacity>
            </View>

            <Text style={styles.selectionLabel}>Smart Card Number</Text>
              <TextInput 
                placeholder='547847GGU8'
                style={styles.input}
                keyboardType='number-pad'
              />

              <Text style={styles.selectionLabel}>Amount</Text>
              <TextInput 
                placeholder='1000'
                style={styles.input}
                keyboardType='number-pad'
              />
            <TouchableOpacity>
                <Text style={styles.beneficiaryLabel}>Save beneficiary</Text>
              </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.selectionRow}>
            <View style={styles.meterContainer}>

            <Text style={styles.label}>Provider</Text>
          <TouchableOpacity
            style={styles.modalDropdown}
            onPress={() => setIsDropdownVisible(true)}
          >
            <Text style={styles.dropdownText}>
              {selectedNetwork || 'Select Network'}
            </Text>
            <AntDesign name="down" size={16} color="#666" />
          </TouchableOpacity>
            <Text style={styles.selectionLabel}>Enter Hynet User Name</Text>
           
            <TextInput 
              placeholder='Enter hynet user name'
              style={styles.input}
            />
        </View>

        <Text style={styles.label}>Select Plan</Text>
        <TouchableOpacity
              style={styles.modalDropdown}
              onPress={() => setIsPlanDropdownVisible(true)}
            >
              <Text style={styles.dropdownText}>
                {selectedPlan || 'Select Plan'}
              </Text>
              <AntDesign name="down" size={16} color="#666" />
            </TouchableOpacity>

              <Text style={styles.selectionLabel}>Enter Amount</Text>
              <TextInput 
                placeholder='1000'
                style={styles.input}
                keyboardType='number-pad'
              />
            </View>
          </>
        )}
        <TouchableOpacity style={styles.nextButton} onPress={handleContinue}>
            <Text style={styles.nextButtonText}>Confirm</Text>
          </TouchableOpacity>
      </ScrollView>

      {/* Provider Modal */}
      <Modal visible={providerModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitles}>
              {selectedTab === 'TV' ? 'Select Provider' : 'Select Internet Provider'}
            </Text>
            <Picker
            style={{color: '#fff'}}
              selectedValue={selectedProvider}
              onValueChange={(itemValue) => {
                setSelectedProvider(itemValue);
                setProviderModalVisible(false);
              }}
            >
              {(selectedTab === 'TV' ? providers : internetProviders).map((provider) => (
                <Picker.Item label={provider.name} value={provider.name} key={provider.name} />
              ))}
            </Picker>
            <TouchableOpacity onPress={() => setProviderModalVisible(false)} style={styles.modalClose}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={packageModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitles}>
              {selectedTab === 'TV' ? 'Select Package' : 'Select Package'}
            </Text>
            <Picker
            style={{color: '#fff'}}
              selectedValue={selectedProvider}
              onValueChange={(itemValue) => {
                setSelectedPackage(itemValue);
                setPackageModalVisible(false);
              }}
            >
              {(selectedTab === 'TV' ? internetProviders : internetProviders).map((provider) => (
                <Picker.Item label={provider.name} value={provider.name} key={provider.name} />
              ))}
            </Picker>
            <TouchableOpacity onPress={() => setPackageModalVisible(false)} style={styles.modalClose}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomSheet isVisible={isPreviewVisible} onBackdropPress={() => setIsPreviewVisible(false)}>
          <View style={styles.bottomSheetContent}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle2}>Payment</Text>
            </View>
            <Text style={styles.amount}>Startimes - Xfinity</Text>

            <View style={styles.flex}>
              <Text style={styles.label}>Amount</Text>
              <Text style={styles.bottomSheetText}>₦1,000.00</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.label}>Provider</Text>
              <Text style={styles.bottomSheetText}>Startimes</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.label}>Package</Text>
              <Text style={styles.bottomSheetText}>Verizon</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.label}>Cashback</Text>
              <Text style={styles.bottomSheetText}>+15Pts</Text>
            </View>
            <TouchableOpacity style={styles.SellButton} onPress={handlePay}>
              <Text style={styles.SellButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>

      <BottomSheet isVisible={isTransactionPinVisible} onBackdropPress={() => setIsTransactionPinVisible(false)}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Complete</Text>
              
            </View>
          <Text style={styles.successBottomSheetHeader}>Enter Pin</Text>
      <Text style={styles.desc}>Enter pin to complete transaction</Text>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  autoFocus={index === 0} // Auto-focus the first input
                />
              ))}
            </View>
          <TouchableOpacity style={styles.nextButton} onPress={handleConfirmPayment}>
            <Text style={styles.nextButtonText}>Confirm Payment</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      <BottomSheet isVisible={isSuccessVisible} onBackdropPress={() => setIsSuccessVisible(false)}>
        <View style={styles.bottomSheetContent}>
          
          <Image source={require('../assets/icons/success.png')} style={styles.logo} />
          <Text style={styles.successBottomSheetHeader}>Subscription Successful</Text>
      <Text style={styles.desc}>Your subscription to startimes for N4,890.00 is successful</Text>

      <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/BillReceipt')}>
            <Text style={styles.nextButtonText}>View Receipt</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      <Modal
            visible={isDropdownVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsDropdownVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitles}>Select Provider</Text>
                <FlatList
                  data={networkItems}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => {
                        setSelectedNetwork(item.label);
                        setIsDropdownVisible(false);
                      }}
                    >
                      <Text style={styles.modalItemText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  style={styles.closeModalButton}
                  onPress={() => setIsDropdownVisible(false)}
                >
                  <Text style={styles.closeModalText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
        visible={isPlanDropdownVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsPlanDropdownVisible(false)}
      >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Text style={styles.modalTitles}>Select Plan</Text>
            <FlatList
              data={plans}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handlePlanSelection(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setIsPlanDropdownVisible(false)}
            >
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
            </View>
          </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingTop: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
  history: { color: 'green', fontSize: 14 },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  tab: { padding: 10, borderRadius: 10, marginHorizontal: 5 },
  activeTab: { backgroundColor: 'blue', paddingHorizontal: 60 },
  tabText: { fontSize: 16, color: 'grey' },
  activeTabText: { color: 'white' },
  content: { paddingHorizontal: 15 },
  selectionRow: { marginVertical: 10 },
  selectionLabel: { fontSize: 16, marginBottom: 5, fontWeight: '500' },
  dropDown: { borderWidth: 2, borderColor: '#ddd', borderRadius: 5, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  icon: { width: 25, height: 25, marginRight: 10, resizeMode: 'contain' },
  providerContainer: { flexDirection: 'row', alignItems: 'center' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalClose: { marginTop: 10 },
  modalCloseText: { color: 'green', fontSize: 14, textAlign: 'center' },
  backButton:{
    backgroundColor: "#ddd",
    padding: 15,
    borderRadius: 50
  },
  flexHeader:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  beneficiaryLabel:{
    color: "#0000ff",
    fontWeight: "500"
  },
  paymentMethod: { backgroundColor: '#fff', borderRadius: 5, padding: 10, alignSelf: 'flex-start', borderWidth: 1, borderColor: "green", paddingHorizontal: 20 },
  paymentText: { color: 'green', fontWeight: 'bold' },
  dropDown2:{
    borderWidth: 2, borderColor: '#ddd', borderRadius: 5, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' 
  },
  nextButton: {
    backgroundColor: '#0000ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 10,
    textAlign: "center",
    alignSelf: "center"
  },
  desc: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
  successBottomSheetHeader:{
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5
  },
  otpContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 15,
    alignSelf: "center"
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#999', // Success green color for the border
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 30,
    color: '#000',
    fontWeight: "900"
  },
  logo:{
    width: 120,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center"
  },
  meterContainer:{
    backgroundColor: "#fff",
    flexDirection: "column",
    borderRadius: 15,
    marginBottom: 20
  },
  input:{
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#f5f5f5",
    marginBottom: 10
  },
  row1:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20  
  },
  row2:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5  
  },
  bottomSheetTitle2: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 10,
    textAlign: "center",
    alignSelf: "center"
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amount:{
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#0000ff",
    marginBottom: 20
  },
  bottomSheetText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "700"

  },
  label: {
    fontSize: 15,
    marginBottom: 10,
  },
  SellButton: {
    backgroundColor: '#1400FB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  SellButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'medium',
  },
  modalDropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15

  },
  dropdownText: {
    fontSize: 14,
    color: '#000',
  },
  modalContent: {
    backgroundColor: '#333',
    borderRadius: 10,
    width: '80%',
    padding: 20,
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
  },
  modalItemText: {
    fontSize: 16,
    color: '#fff',
  },
  closeModalButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  closeModalText: {
    fontSize: 14,
    color: 'red',
  },
  modalTitles:{
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#fff',
  },
});

export default Tv;
