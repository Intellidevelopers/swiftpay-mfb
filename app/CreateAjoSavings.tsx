import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, FlatList, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { BottomSheet } from '@rneui/themed';

interface CustomCheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity onPress={() => onValueChange(!value)}>
      <View style={{ 
        width: 20, 
        height: 20, 
        backgroundColor: value ? 'blue' : 'white',
        borderRadius: 5, 
        borderWidth: 2, 
        borderColor: 'gray', 
        justifyContent: 'center', 
        alignItems: 'center'
      }} />
    </TouchableOpacity>
  );
};

const CreateAjoSavings = () => {
  const [amountToInvest, setAmountToInvest] = useState('');
  const [selectedAjoType, setSelectedAjoType] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isPlanDropdownVisible, setIsPlanDropdownVisible] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMethodDropdownVisible, setIsMethodDropdownVisible] = useState(false);

  const ajoSavingsTypes = [
    { label: 'Daily Ajo Savings', value: 'Daily' },
    { label: 'Weekly Ajo Savings', value: 'weekly' },
    { label: 'Monthly Ajo Savings', value: 'monthly' },
    { label: 'Yearly Ajo Savings', value: 'yearly' },
  ];

  const paymentMethod = [
    { label: 'SwiftPay Balance', value: 'SwiftPay Balance' }
  ];

  const [isTransactionPinVisible, setIsTransactionPinVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const handlePay = () => {
    setIsTransactionPinVisible(true); // Show the transaction pin bottom sheet
  };

  const handleConfirmPayment = () => {
    setIsTransactionPinVisible(false); // Hide the transaction pin bottom sheet
    setIsSuccessVisible(true); // Show the success bottom sheet
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

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="left" size={20} />
        </TouchableOpacity>
        <Text style={styles.title}>CREATE AJO SAVINGS</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Ajo Savings Type */}
          <Text style={styles.label}>Ajo Savings Type</Text>
          <TouchableOpacity
            style={styles.modalDropdown}
            onPress={() => setIsDropdownVisible(true)}
          >
            <Text style={styles.dropdownText}>
              {selectedNetwork || 'Select saving type'}
            </Text>
            <AntDesign name="down" size={16} color="#666" />
          </TouchableOpacity>

          {/* Amount to Invest */}
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Amount To Save"
            placeholderTextColor="#A9A9A9"
            keyboardType="numeric"
            value={amountToInvest}
            onChangeText={setAmountToInvest}
          />

          {/* Duration */}
          <Text style={styles.label}>Duration</Text>
          <TextInput
            style={styles.input2}
            placeholder="Enter Duration"
            placeholderTextColor="#A9A9A9"
            value={endDate}
            onChangeText={setEndDate}
          />

          {/* Payment Method */}
          <Text style={styles.label}>Payment Method</Text>
          <TouchableOpacity
            style={styles.modalDropdown}
            onPress={() => setIsMethodDropdownVisible(true)}
          >
            <Text style={styles.dropdownText}>
              {selectedMethod || 'Select Payment Method'}
            </Text>
            <AntDesign name="down" size={16} color="#666" />
          </TouchableOpacity>

          {/* Ajo Referral Code */}
          <Text style={styles.label}>Ajo Referral Code (Optional)</Text>
          <TextInput
            style={styles.input2}
            placeholder="Enter Referral Code"
            placeholderTextColor="#A9A9A9"
            value={endDate}
            onChangeText={setEndDate}
          />

          {/* Terms & Conditions */}
          <View style={styles.termsContainer}>
            <CustomCheckbox value={agreeTerms} onValueChange={setAgreeTerms} />
            <Text style={styles.termsText}>
              I Have Read And Agree To The Terms & Conditions And Privacy Policy
            </Text>
          </View>

          {/* Start Ajo Savings Button */}
          <TouchableOpacity style={styles.holdNowButton} onPress={handlePay}>
            <Text style={styles.holdNowText}>Start Ajo Savings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            USING A REFERRAL CODE FOR AJO SAVINGS CAN HELP REDUCE THE PERCENTAGE FEE YOU'LL PAY FOR YOUR AJO SAVINGS
          </Text>
        </View>
      </ScrollView>
      <Modal
            visible={isDropdownVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsDropdownVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitles}>Select Saving Type</Text>
                <FlatList
                  data={ajoSavingsTypes}
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
            visible={isMethodDropdownVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsMethodDropdownVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitles}>Select Saving Type</Text>
                <FlatList
                  data={paymentMethod}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => {
                        setSelectedMethod(item.label);
                        setIsMethodDropdownVisible(false);
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
              <Text style={styles.bottomSheetTitle}>Complete Action</Text>
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
          <Text style={[styles.successBottomSheetHeader, styles.successBottomSheetHeader2]}>Congratulation!</Text>
      <Text style={[styles.desc, styles.desc2]}>Your Ajo Savings has been created succesfully</Text>

      <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/AjoSavingsDetails')}>
            <Text style={styles.nextButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
        },
        title: {
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        balanceContainer: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginBottom: 20,
          padding: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#E0E0E0',
          backgroundColor: '#f8f8f8'
        },
        balanceLabel: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        swiftPayText: {
          fontSize: 16,
          color: '#000',
          fontWeight: "500"
        },
        balanceInput: {
          backgroundColor: '#D3E3FD',
          borderRadius: 20,
          padding: 6,
          paddingHorizontal: 15
        },
        balance: {
          fontSize: 16,
          color: '#000',
          fontWeight: "700"
        },
        input: {
          borderWidth: 1,
          borderColor: '#E0E0E0',
          borderRadius: 8,
          padding: 10,
          color: '#000',
          marginBottom: -10, // Negative margin to overlay on top of the rate container
          zIndex: 3, // Ensure input is on top
          backgroundColor: '#fff', // Background color to cover the rate container below
          width: '100%',
          alignSelf: "center"
        },
        rateContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#D3E3FD',
          borderRadius: 10,
          padding: 15,
          position: 'relative',
          width: '100%',
          alignSelf: "center",
          zIndex: 1
        },
        rateLabel: {
          fontSize: 16,
          color: '#000',
          fontWeight: "500"
        },
        rateValue: {
          fontSize: 16,
          color: '#000',
          fontWeight: "500"
        },
        pickerContainer: {
          borderWidth: 1,
          borderColor: '#E0E0E0',
          borderRadius: 5,
        },
        picker: {
          height: 50,
          color: '#000',
        },
        termsContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          marginTop: 10
        },
        termsText: {
          flex: 1,
          fontSize: 12,
          marginLeft: 10,
          color: '#000',
        },
        holdNowButton: {
          backgroundColor: '#0000FF',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
          marginBottom: 20
        },
        holdNowText: {
          color: '#fff',
          fontSize: 16,
        },
        header:{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 50,
          padding: 20,
        },
        logo:{
          width: 100,
          height: 100,
          resizeMode: 'contain',
          marginRight: 10,
          alignSelf: 'center',
        },
        label:{
          fontSize: 16,
          fontWeight: '500',
          marginBottom: 10,
          marginTop: 20,
          color: '#000',
        },
        input2: {
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: 8,
            padding: 10,
            color: '#000',
            backgroundColor: '#fff', // Background color to cover the rate container below
          },
          notice:{
            backgroundColor: "#0000ff",
            marginBottom: 40,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          },
          content:{
            padding: 15,
          },
          noticeText:{
            color: '#fff',
            fontSize: 12,
            textAlign: 'center',
            marginTop: 10,
          },
          modalDropdown: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 10,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
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
          modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          bottomSheetContent: {
            padding: 20,
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
          bottomSheetTitle: {
            fontSize: 15,
            fontWeight: '700',
          },
          bottomSheetText: {
            fontSize: 16,
            marginBottom: 10,
          },
          successBottomSheetText: {
            fontSize: 14,
            marginBottom: 20,
            alignItems: "center",
            fontWeight: "600"
          },
          successBottomSheetTextLabel: {
            fontSize: 14,
            marginBottom: 20,
            alignItems: "center",
            color: "#666"
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
            marginBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            paddingBottom: 10
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
          successBottomSheetHeader:{
            fontSize: 18,
            fontWeight: "700",
            marginBottom: 5
          },
          successBottomSheetHeader2:{
            fontSize: 18,
            fontWeight: "700",
            marginBottom: 5,
            textAlign: "center",
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
            color: '#888',
            fontSize: 14,
            marginBottom: 20,
          },
          desc2: {
            color: '#888',
            fontSize: 14,
            marginBottom: 20,
            textAlign: 'center',
          },
          otpContainer: {
            flexDirection: 'row',
            marginBottom: 30,
            gap: 15,
          },
          otpInput: {
            width: 55,
            height: 60,
            borderWidth: 1,
            borderColor: '#999', // Success green color for the border
            borderRadius: 8,
            textAlign: 'center',
            fontSize: 30,
            color: '#000',
            fontWeight: "900"
          },
          
          icon:{
            width: 25,
            height: 25
          },
      });
      

export default CreateAjoSavings;
