import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const VerifyAccount = () => {
  const [otp, setOtp] = useState(['', '', '', '', '']); // Array to store OTP digits
  const [timer, setTimer] = useState(57); // Resend timer state

  // Refs for input fields
  const textInputs: Record<string, React.RefObject<TextInput>> = otp.reduce((refs, _, index) => {
    refs[`otpInput-${index}`] = React.createRef<TextInput>();
    return refs;
  }, {} as Record<string, React.RefObject<TextInput>>);

  // Function to handle OTP input change
  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus the next input
    if (value && index < otp.length - 1) {
      const nextInput = `otpInput-${index + 1}`;
      textInputs[nextInput]?.current?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your Account</Text>
      <Text style={styles.subtitle}>Check your email or your SMS for an OTP from us</Text>

      <View style={styles.otpContainer}>
        <Text style={styles.enterPinText}>Enter PIN</Text>
        <View style={styles.otpInputContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={`otp-${index}`}
              ref={textInputs[`otpInput-${index}`]}
              style={styles.otpInput}
              value={digit}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
                  const prevField = textInputs[`otpInput-${index - 1}`]?.current;
                  prevField?.focus();
                }
              }}
            />
          ))}
        </View>
      </View>

      <Text style={styles.resendText}>Resend in 0:{timer.toString().padStart(2, '0')}</Text>

      <TouchableOpacity style={styles.verifyButton} onPress={() => router.push('/VerifyPhone')}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  otpContainer: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#F3F6FA',
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
  },
  enterPinText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10
  },
  otpInput: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  resendText: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    alignSelf: 'flex-start'
  },
  verifyButton: {
    marginTop: 30,
    backgroundColor: '#0000ff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
