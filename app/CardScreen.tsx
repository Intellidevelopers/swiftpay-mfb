import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { router } from 'expo-router';

const CardScreen: React.FC = () => {
  const [amountOpen, setAmountOpen] = useState(false);
  const [amount, setAmount] = useState(null);
  const [amountItems, setAmountItems] = useState([
    { label: 'Select Amount' },
    { label: '$20', value: '20' },
    { label: '$50', value: '50' },
    { label: '$100', value: '100' },
  ]);

  const [quantity, setQuantity] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.headerText}>Complete the form below to buy a Gift Card</Text>

      {/* Gift Card Information */}
      <View style={styles.cardInfo}>
        <Image
          source={{ uri: 'https://via.placeholder.com/80' }} // Replace with your actual image URI
          style={styles.cardImage}
        />
        <View>
          <Text style={styles.cardTitle}>Fortnite (Standard Edition) 2800 V-Bucks AF</Text>
          <Text style={styles.cardDescription}>USD</Text>
        </View>
      </View>

      {/* Amount Dropdown */}
      <Text style={styles.label}>Amount in USD</Text>
      <DropDownPicker
        open={amountOpen}
        value={amount}
        items={amountItems}
        setOpen={setAmountOpen}
        setValue={setAmount}
        setItems={setAmountItems}
        placeholder="Select Amount"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
      <Text style={styles.note}>SwiftPay charges a 10% fee on all transactions</Text>

      {/* Quantity Input */}
      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      {/* Recipient Name Input */}
      <Text style={styles.label}>Recipient Name</Text>
      <TextInput
        style={styles.input}
        value={recipientName}
        onChangeText={setRecipientName}
      />

      {/* Recipient Email Input */}
      <Text style={styles.label}>Recipient Email</Text>
      <TextInput
        style={styles.input}
        value={recipientEmail}
        onChangeText={setRecipientEmail}
        keyboardType="email-address"
      />

      {/* SwiftPay Balance */}
      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>SwiftPay Balance</Text>
        <Text style={styles.balanceValue}>₦ 5,090.00</Text>
      </View>

      {/* Proceed Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/GiftCardPreview')}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    width: '90%',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
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
  note: {
    fontSize: 12,
    color: '#888',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  balanceSection: {
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
  },
  balanceValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#0000ff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CardScreen;
