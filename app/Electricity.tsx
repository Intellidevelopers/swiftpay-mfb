import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import Modal from 'react-native-modal';
import { BottomSheet } from '@rneui/themed';

// Define the type for the provider
interface Provider {
  id: string;
  name: string;
  logo: any; // Use 'any' for the logo since you're using require
}

const Electricity = () => {
  // Use the Provider type for the selectedProvider state
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null); // Allow null or a provider object
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Prepaid');
  const [isTransactionPinVisible, setIsTransactionPinVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);


  const serviceProviders: Provider[] = [
    { id: '1', name: 'Ibadan Electricity', logo: require('../assets/banks/firstbank.png') },
    { id: '2', name: 'Eko Electricity', logo: require('../assets/banks/access.png') },
    // Add more providers here
  ];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleProviderSelect = (provider: Provider) => {
    setSelectedProvider(provider); // Set the selected provider
    setShowDropdown(false);
  };

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

  const handleContinue = () => {
    setModalVisible(false);
    setIsTransactionPinVisible(true)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backbutton} onPress={() => router.back()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Electricity</Text>
      </View>

      {/* Header */}
      <ScrollView showsVerticalScrollIndicator={false}>
        

        {/* Tab Content */}
        {selectedTab === 'Prepaid' ? (
          <View>
            <View style={styles.cardContainer}>
          <Text style={styles.label}>Service Postpaid Provider</Text>
          <TouchableOpacity 
            style={styles.electricityHeader}
            onPress={() => setShowDropdown(!showDropdown)}>
            <View style={styles.subHeader}>
              <Image source={selectedProvider ? selectedProvider.logo : require('../assets/banks/firstbank.png')} style={styles.icon}/>
              <Text style={styles.dropdownLabel}>
                {selectedProvider ? selectedProvider.name : 'Select Provider'}
              </Text>
            </View>
            <AntDesign style={{ right: 10 }} name={showDropdown ? 'up' : 'down'} size={20} />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownContainer}>
              {serviceProviders.map((provider) => (
                <TouchableOpacity 
                  key={provider.id} 
                  style={styles.dropdownItem} 
                  onPress={() => handleProviderSelect(provider)}>
                  <Image source={provider.logo} style={styles.icon2} />
                  <Text>{provider.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          {/* Header Buttons */}
          {/* Header Buttons */}
<View style={styles.buttonContainer}>
  <TouchableOpacity 
    style={styles.prepaidButton}
    onPress={() => setSelectedTab('Prepaid')}
  >
    <Text style={styles.prepaidButtonText}>Prepaid</Text>
  </TouchableOpacity>

  <TouchableOpacity 
    style={styles.postpaidButton}
    onPress={() => setSelectedTab('Postpaid')}
  >
    <Text style={styles.postpaidButtonText}>Postpaid</Text>
  </TouchableOpacity> 
</View>


        </View>

        <View style={styles.meterContainer}>
          <View style={styles.row1}>
            <Text>Meter Number</Text>
            <View style={styles.row2}>
                <Text>Beneficiaries</Text>
                <AntDesign name='right' size={15} />
            </View>
          </View>

          <TextInput 
            placeholder='Enter meter number'
            style={styles.input}
          />
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.tabButtonRow}>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
          </View>
          <View style={styles.tabButtonRow}>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.amountInputContainer}>
              <Text>₦</Text>
              <TextInput 
                placeholder='Enter Amount'
                style={styles.amountInput}
              />
            </View>
            <TouchableOpacity style={styles.payButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
          </View>
        ) : (
          <View >
            <View style={styles.cardContainer}>
          <Text style={styles.label}>Service Prepaid Provider</Text>
          <TouchableOpacity 
            style={styles.electricityHeader}
            onPress={() => setShowDropdown(!showDropdown)}>
            <View style={styles.subHeader}>
              <Image source={selectedProvider ? selectedProvider.logo : require('../assets/banks/firstbank.png')} style={styles.icon}/>
              <Text style={styles.dropdownLabel}>
                {selectedProvider ? selectedProvider.name : 'Select Provider'}
              </Text>
            </View>
            <AntDesign style={{ right: 10 }} name={showDropdown ? 'up' : 'down'} size={20} />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownContainer}>
              {serviceProviders.map((provider) => (
                <TouchableOpacity 
                  key={provider.id} 
                  style={styles.dropdownItem} 
                  onPress={() => handleProviderSelect(provider)}>
                  <Image source={provider.logo} style={styles.icon2} />
                  <Text>{provider.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          {/* Header Buttons */}
         {/* Header Buttons */}
<View style={styles.buttonContainer}>
  <TouchableOpacity 
    style={{
      backgroundColor: "#f5f5f5",
      padding: 10,
      paddingHorizontal: 40,
      borderRadius: 10
    }}
    onPress={() => setSelectedTab('Prepaid')}
  >
    <Text style={{
        color: "#000"
    }}>Prepaid</Text>
  </TouchableOpacity>

  <TouchableOpacity 
    style={{
      backgroundColor: "#F0F4F3",
      padding: 10,
      paddingHorizontal: 40,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#0FA078"
    }}
    onPress={() => setSelectedTab('Postpaid')}
  >
    <Text style={{
        color: "#0fa078"
    }}>Postpaid</Text>
  </TouchableOpacity> 
</View>

        </View>

        

        <View style={styles.amountContainer}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.tabButtonRow}>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
          </View>
          <View style={styles.tabButtonRow}>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.amountInputContainer}>
              <Text>₦</Text>
              <TextInput 
                placeholder='Enter Amount'
                style={styles.amountInput}
              />
            </View>
            <TouchableOpacity style={styles.payButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
          </View>
        )}

        
      </ScrollView>

      <Modal 
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}>
        <View style={styles.modalContent}>
        <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle2}>Payment</Text>
            </View>
            <Text style={styles.amount}>₦1,000.00</Text>

            <View style={styles.flex}>
              <Text style={styles.label}>Amount</Text>
              <Text style={styles.bottomSheetText}>₦1,000.00</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.label}>Provider</Text>
              <Text style={styles.bottomSheetText}>Enugu Electricity</Text>
            </View>
            
            <View style={styles.flex}>
              <Text style={styles.label}>Balance</Text>
              <Text style={styles.bottomSheetText}>(₦2,567.44)</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.label}>Cashback</Text>
              <Text style={styles.bottomSheetText}>+15Pts</Text>
            </View>
          <TouchableOpacity style={styles.confirmButton} onPress={handleContinue}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <BottomSheet isVisible={isTransactionPinVisible} onBackdropPress={() => setIsTransactionPinVisible(false)}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Complete Payment</Text>
              
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
      <Text style={styles.desc}>Your subscription of 1000 Unit is successful</Text>

      <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/BillReceipt')}>
            <Text style={styles.nextButtonText}>View Receipt</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Electricity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 20,
    marginBottom: 20
  },
  backbutton:{
    padding: 13,
    borderRadius: 50
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  icon:{
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    resizeMode: "contain"
  },
  icon2:{
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    marginRight: 5
  },
  cardContainer:{
    backgroundColor: "#fff",
    padding: 5,
    flexDirection: "column",
    borderRadius: 15,
    marginBottom: 20
  },
  meterContainer:{
    backgroundColor: "#fff",
    padding: 15,
    flexDirection: "column",
    borderRadius: 15,
    marginBottom: 20
  },
  electricityHeader:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  subHeader:{
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 10
  },
  buttonContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5
  },
  prepaidButton:{
    backgroundColor: "#F0F4F3",
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0FA078"
  },
  prepaidButtonText:{
    color: "#0fa078"
  },
  postpaidButton:{
    backgroundColor: "#f5f5f5",
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 10
  },
  postpaidButtonText:{
    color: "#555"
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
  input:{
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  amountContainer:{
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20
  },
  tabbutton:{
    backgroundColor: "#f5f5f5",
    width: 90,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 15,
  },
  tabButtonRow:{
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between"
  },
  label:{
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 20
  },
  inputContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  amountInputContainer:{
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    width: '75%',
    borderBottomColor: "#666",
    marginBottom: 20
  },
  amountInput:{
    padding: 10,
    flex: 1
  },
  payButton:{
    backgroundColor: "#0000ff",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  buttonText:{
    color: "#fff"
  },
  dropdownLabel:{
    fontWeight: "900"
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#0000ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabButton: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  activeTabButton: {
    backgroundColor: "#0FA078",
  },
  tabButtonText: {
    color: "#555",
  },
  activeTabButtonText: {
    color: "#fff",
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 1
  },
  amount:{
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#0000ff"
  },
  bottomSheetText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "700"

  },
  bottomSheetTitle2: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 10,
    textAlign: "center",
    alignSelf: "center"
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 10,
    textAlign: "center",
    alignSelf: "center"
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  successBottomSheetHeader:{
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5
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
  desc: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 15,
    alignSelf: "center"
  },
  otpInput: {
    width: 50,
    height: 50,
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
})