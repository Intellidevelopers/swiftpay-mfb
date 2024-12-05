import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Pressable, Image, FlatList, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BottomSheet } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import Networks from '@/components/Networks';
import DropDownPicker from 'react-native-dropdown-picker';
import useWalletStore from '@/stores/useWalletStore';


const BuyBtc = () => { 
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isTransactionPinVisible, setIsTransactionPinVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const { cryptoName = 'BTC', price = '44,500 NGN', quantity = '1.23', limits } = useLocalSearchParams();

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden(!isBalanceHidden);
  };

  const handlePreview = () => {
    setIsPreviewVisible(true);
  };

  const handleContinue = () => {
    setIsPreviewVisible(false);
    setIsTransactionPinVisible(true); // Show the transaction pin bottom sheet

  };


  const handleConfirmPayment = () => {
    setIsTransactionPinVisible(false); // Hide the transaction pin bottom sheet
    setIsSuccessVisible(true); // Show the success bottom sheet
  };
 // Modal Dropdown States
 const [isDropdownVisible, setIsDropdownVisible] = useState(false);
 const [selectedNetwork, setSelectedNetwork] = useState('');
 const networkItems = [
   { label: 'BEP20', value: 'bep20' },
   { label: 'ERC20', value: 'erc20' },
   { label: 'TRC20', value: 'trc20' },
   { label: 'Polygon', value: 'polygon' },
   { label: 'Solana', value: 'solana' },
   { label: 'Celo', value: 'celo' },
   { label: 'Optimism', value: 'optimism' },
   { label: 'TON', value: 'ton' },
 ];

 const { walletAddress, network } = useWalletStore(); // Retrieve wallet details

  const [selectedWalletAddress, setSelectedWalletAddress] = useState(walletAddress || '');

  React.useEffect(() => {
    // Autofill the fields when walletAddress and network change
    if (walletAddress) setSelectedWalletAddress(walletAddress);
    if (network) setSelectedNetwork(network);
  }, [walletAddress, network]);

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

  const [usdtAmount, setUsdtAmount] = useState(''); // State to store USDT amount
  const exchangeRate = 750; // Conversion rate for USDT to NGN

  // Calculate amount in NGN
  const amountInNGN = usdtAmount ? (parseFloat(usdtAmount) * exchangeRate).toFixed(2) : '0.00';


  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)')}>
            <AntDesign name="arrowleft" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Buy {cryptoName}</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Main Content */}
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Price Section */}
          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.priceValue}>{price}</Text>
          </View>

          {/* Details Section */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Quantity</Text>
            <Text style={styles.detailValue}>{quantity}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Payment Method</Text>
            <View style={styles.leftLine}>
              <Text style={styles.balanceName}>Swiftpay Balance</Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Network</Text>
            <Text style={styles.detailValue}>(BEP20)</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Payment Duration</Text>
            <Text style={styles.detailValue}>15 Min(s)</Text>
          </View>

          {/* Balance Section */}
          <View style={styles.balanceSection}>
            <View>
              <Text style={styles.balanceLabel}>Swiftpay Balance</Text>
              <Text style={styles.balanceAmount}>
                {isBalanceHidden ? '******' : '₦ 2,345.98'}
              </Text>
            </View>
            <TouchableOpacity onPress={toggleBalanceVisibility}>
              <AntDesign name={isBalanceHidden ? 'eyeo' : 'eye'} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <Networks/>
          <View style={styles.notice}>
            <AntDesign name='exclamationcircle' color={'#0000ff'} size={16}/>
            <Text style={styles.noticeText}>
              Note: Ensure you input the right info, as we would not be held liable for any loss of asset.
            </Text>
          </View>

          <Text style={styles.label}>Crypto Network</Text>
          <TouchableOpacity
            style={styles.modalDropdown}
            onPress={() => setIsDropdownVisible(true)}
          >
            <Text style={styles.dropdownText}>
              {selectedNetwork || 'Select Network'}
            </Text>
            <AntDesign name="down" size={16} color="#666" />
          </TouchableOpacity>


          {/* Input Fields */}
          <Text style={styles.paymentText}>Your Wallet Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Wallet Address"
            value={selectedWalletAddress}
            onChangeText={(text) => setSelectedWalletAddress(text)} // Update the state
            editable={true} // Ensure it’s editable
            selectTextOnFocus={true} // Optional: Automatically select text on focus
            keyboardType="default"
          />


      <Text style={styles.paymentText}>Amount of USDT to buy</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Enter USDT Amount" 
        placeholderTextColor="#666" 
        keyboardType="number-pad"
        value={usdtAmount}
        onChangeText={(text) => setUsdtAmount(text)}
      />

      {/* Display calculated NGN amount */}
      <Text style={styles.paymentText}>Amount to pay in NGN</Text>
      <View style={styles.estimate}>
        <Text style={styles.estimateValue}>{amountInNGN} NGN</Text>
      </View>
            <Text style={styles.info}> SwiftPay charges a 10% fee on all transactions</Text>
            

          {/* Buy Button */}
          <TouchableOpacity style={styles.buyButton} onPress={handlePreview}>
            <Text style={styles.buyButtonText}>Proceed</Text>
          </TouchableOpacity>

          <Text style={styles.noteBottom}>
            The coin you buy will be sent to the wallet address above.
          </Text>
        </ScrollView>

        {/* Preview Bottom Sheet */}
        <BottomSheet isVisible={isPreviewVisible} onBackdropPress={() => setIsPreviewVisible(false)}>
          <View style={styles.bottomSheetContent}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Order Preview</Text>
              <TouchableOpacity onPress={() => setIsPreviewVisible(false)}>
                <AntDesign name="closecircleo" size={20} color="red" />
              </TouchableOpacity>
            </View>
            <Text style={styles.amount}>{cryptoName}</Text>
            <View style={styles.flex}>
              <Text style={styles.bottomSheetText}>Price</Text>
              <Text style={styles.bottomSheetText}>{price}</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.bottomSheetText}>Network</Text>
              <Text style={styles.bottomSheetText}>(BEP20)</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.bottomSheetText}>Name</Text>
              <Text style={styles.bottomSheetText}>Binance Smart Chain</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.bottomSheetText}>Withdrawals Enabled</Text>
              <Text style={styles.bottomSheetText}>Yes</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.bottomSheetText}>Deposits Enabled</Text>
              <Text style={styles.bottomSheetText}>Yes</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.bottomSheetText}>Payment Duration</Text>
              <Text style={styles.bottomSheetText}>15 Min(s)</Text>
            </View>
            <TouchableOpacity
             style={styles.buyButton} onPress={handleContinue}>
              <Text style={styles.buyButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>

        {/* Success Bottom Sheet */}
        <BottomSheet isVisible={isSuccessVisible} onBackdropPress={() => setIsSuccessVisible(false)}>
          <View style={styles.bottomSheetContent}>
            <TouchableOpacity onPress={() => setIsSuccessVisible(false)}>
              <AntDesign name="closecircleo" size={20} color="red" />
            </TouchableOpacity>
            <Image source={require('../assets/icons/success.png')} style={styles.logo} />
            <Text style={styles.successBottomSheetHeader}>Your order has been completed</Text>
          </View>
        </BottomSheet>
      </View>

      <Modal
            visible={isDropdownVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsDropdownVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitles}>Select Network</Text>
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

          <BottomSheet isVisible={isTransactionPinVisible} onBackdropPress={() => setIsTransactionPinVisible(false)}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Complete Payment</Text>
              <TouchableOpacity onPress={() => setIsTransactionPinVisible(false)}>
                <AntDesign name='closecircleo' size={20} color={'red'} style={styles.icon} />
              </TouchableOpacity>
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

      {/* Success Bottom Sheet */}
      <BottomSheet isVisible={isSuccessVisible} onBackdropPress={() => setIsSuccessVisible(false)}>
        <View style={styles.bottomSheetContent}>
          
          <Image source={require('../assets/icons/success.png')} style={styles.logo} />
          <Text style={styles.successBottomSheetHeader}>Payment Successful</Text>
      <Text style={styles.desc}>Your payment of {price} for {cryptoName} is successful</Text>

      <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/Receipt')}>
            <Text style={styles.nextButtonText}>View Receipt</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10
  },
  backButton: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
  },
  placeholder: {
    width: 50,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00952A',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#000',
  },
  balanceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#D4E7F3',
  },
  row: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  balanceAmount: {
    fontSize: 24,
    color: '#000',
    fontWeight: "700",
  },
  note: {
    color: '#1400fb',
    fontSize: 15,
    marginBottom: 20,
  },
  input: {
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  flexInput: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#EAEAEA',
  },
  currencyText: {
    marginRight: 10,
    color: '#666',
    fontSize: 16,
  },
  pressableText: {
    color: '#1400FB',
    fontWeight: 'bold',
    fontSize: 16,
  },
  paymentText: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "500",
  },
  estimate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "#DFF1FC",
    padding: 10,
    borderRadius: 10,
  },
  buyButton: {
    backgroundColor: '#1400FB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buyButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'medium',
  },
  noteBottom: {
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
    marginTop: 10,
  },
  est: {
    fontSize: 16,
    color: "#999",
    fontWeight: "700",
  },
  estTitle: {
    fontSize: 16,
    color: "#666",
    fontWeight: "400",
  },
  leftLine: {
    borderLeftWidth: 3,
    borderLeftColor: '#1400fb',
    paddingHorizontal: 3,
    borderRadius: 2,
    marginBottom: 10,
  },
  balanceName: {
    color: '#666',
    fontWeight: '500',
    marginBottom: 5,
  },
  headline: {
    borderBottomWidth: 3,
    borderBottomColor: '#1400fb',
    borderRadius: 2,
    marginBottom: 20,
    width: 160,
    fontWeight: "500",
    fontSize: 16,
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '500',
    left: 100
  },
  bottomSheetText: {
    fontSize: 16,
    marginBottom: 10,
  },
  successBottomSheetText: {
    fontSize: 16,
    marginBottom: 10,
    alignItems: "center"
  },
  successBottomSheetTextgreen: {
    fontSize: 16,
    marginBottom: 10,
    alignItems: "center",
    color: "#00952A",
    fontWeight: "700"
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10
  },
  icon: {
    alignSelf: 'flex-end',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amount:{
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700"
  },
  logo:{
    width: 120,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center"
  },
  successBottomSheetHeader:{
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30
  },
  successBottomSheetContainer:{
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    backgroundColor: "#fdfdfd",
    borderRadius: 10
  },
  subText:{
    fontWeight: "700",
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    marginBottom: 10
  },
  notice:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 1,
    gap: 5,
    marginTop: 10,
    marginBottom: 20
  },
  noticeText:{
    fontSize: 12,
    color: "#0000ff"
  },
  estimateValue:{
    fontWeight: "700",
    fontSize: 18,
  },
  info:{
    fontSize: 12,
    color: "#000",
    marginBottom: 10
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500'
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#f5f5f5',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});

export default BuyBtc;
