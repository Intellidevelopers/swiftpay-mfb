import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Switch,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  TextInput
} from 'react-native';
import { AntDesign, Feather, Ionicons, Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const AjoContributionDashboard = () => {
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = React.useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [walletModalVisible, setWalletModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Open wallet picker
  const openWalletPicker = () => {
    setWalletModalVisible(true);
  };

  const [wallets] = useState(['SwiftPay Wallet', 'Bitcoin Wallet', 'Ethereum Wallet']); // Example wallets


  // Handle wallet selection
  const handleWalletSelect = (wallet: string) => {
    setSelectedWallet(wallet);
    setWalletModalVisible(false); // Close picker after selection
  };
  

  const toggleAutoSave = () => setIsAutoSaveEnabled(!isAutoSaveEnabled);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerText}>Ajo Contribution</Text>
      </View>

     <ScrollView showsVerticalScrollIndicator={false}>
       {/* Dashboard Card */}
       <ImageBackground
        source={require('../assets/ajo.png')} // Add the correct image URL here
        style={styles.dashboardCard}
        imageStyle={styles.imageStyle}
      >
        <Text style={styles.cardInterestText}>10% Per Annum</Text>
        <Text style={styles.cardBalanceTitle}>Ajo Contribution Balance</Text>
        <Text style={styles.cardBalance}>₦3,000.00</Text>
        <TouchableOpacity style={styles.createButton} onPress={() => router.push('/CreateAjo')}>
          <Text style={styles.createButtonText}>Create Ajo Contribution</Text>
        </TouchableOpacity>
      </ImageBackground>

      {/* Auto Save */}
      <Text style={styles.headText}>Auto Save</Text>
      <View style={styles.autoSaveContainer}>
        <Text style={styles.autoSaveText}>
          Save Automatically Daily, Weekly Or Monthly With Autosave
        </Text>
        <Switch
          value={isAutoSaveEnabled}
          onValueChange={toggleAutoSave}
          thumbColor={isAutoSaveEnabled ? '#0000ff' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/Confirmation')}>
          <View style={styles.tab}>
          <Ionicons name="add-circle-outline" size={24} color="#555" />
          </View>
          <Text style={styles.actionButtonText}>Join Ajo Contribution</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
          <View style={styles.tab}>
          <Ionicons name="wallet-outline" size={24} color="#555" />
          </View>
          <Text style={styles.actionButtonText}>Withdraw</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/Transactions')}>
          <View style={styles.tab}>
          <Octicons name="history" size={24} color="#555" />
          </View>
          <Text style={styles.actionButtonText}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      <View style={styles.transactionList}>
        <Text style={styles.transactionDate}>06-7-2020</Text>
        <TouchableOpacity style={styles.transactionItem} onPress={() => router.push('/AjoDetails')}>
          <View style={styles.flex}>
          <View style={styles.logo}>
            <Image source={require('../assets/piggy.png')} style={styles.image}/>
          </View>
          <View>
            <Text style={styles.transactionTitle}>Monthly Auto Save</Text>
            <Text style={styles.transactionSubtitle}>Monthly Savings Deposit</Text>
          </View>
          </View>
          <View>
          <Text style={styles.transactionAmount}>+3000</Text>
          <Text style={styles.transactionBalance}>80,000</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.transactionDate}>06-7-2020</Text>
        <TouchableOpacity style={styles.transactionItem} onPress={() => router.push('/AjoDetails')}>
          <View style={styles.flex}>
          <View style={styles.logo}>
            <Image source={require('../assets/piggy.png')} style={styles.image}/>
          </View>
          <View>
            <Text style={styles.transactionTitle}>Monthly Auto Save</Text>
            <Text style={styles.transactionSubtitle}>Monthly Savings Deposit</Text>
          </View>
          </View>
          <View>
          <Text style={styles.transactionAmount}>+3000</Text>
          <Text style={styles.transactionBalance}>80,000</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.transactionDate}>06-7-2020</Text>
        <TouchableOpacity style={styles.transactionItem} onPress={() => router.push('/AjoDetails')}>
          <View style={styles.flex}>
          <View style={styles.logo}>
            <Image source={require('../assets/piggy.png')} style={styles.image}/>
          </View>
          <View>
            <Text style={styles.transactionTitle}>Monthly Auto Save</Text>
            <Text style={styles.transactionSubtitle}>Monthly Savings Deposit</Text>
          </View>
          </View>
          <View>
          <Text style={styles.transactionAmount}>+3000</Text>
          <Text style={styles.transactionBalance}>80,000</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.transactionDate}>06-7-2020</Text>
        <TouchableOpacity style={styles.transactionItem} onPress={() => router.push('/AjoDetails')}>
          <View style={styles.flex}>
          <View style={styles.logo}>
            <Image source={require('../assets/piggy.png')} style={styles.image}/>
          </View>
          <View>
            <Text style={styles.transactionTitle}>Monthly Auto Save</Text>
            <Text style={styles.transactionSubtitle}>Monthly Savings Deposit</Text>
          </View>
          </View>
          <View>
          <Text style={styles.transactionAmount}>+3000</Text>
          <Text style={styles.transactionBalance}>80,000</Text>
          </View>
        </TouchableOpacity>
        {/* Add more transactions here if needed */}
      </View>
     </ScrollView>
     <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.flex}>
            <Text style={styles.modalTitle}>Withdraw money to wallet</Text>
            <TouchableOpacity onPress={() => setModalVisible(false )} style={styles.close}>
            <Feather name='x' size={20} color={'#0000ff'}/>
            </TouchableOpacity>
            </View>

            {/* Wallet Picker */}
            <Text style={styles.labelText}>Select Source</Text>
            <TouchableOpacity style={styles.walletPicker} onPress={openWalletPicker}>
              <Text style={styles.walletPickerText}>
                {selectedWallet ? selectedWallet : 'Select Wallet'}
              </Text>
              <AntDesign name="down" size={16} color="black" />
            </TouchableOpacity>

            {/* Wallet Picker Modal */}
            <Modal
              visible={walletModalVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setWalletModalVisible(false)}
            >
              <TouchableOpacity
                style={styles.walletModalOverlay}
                onPress={() => setWalletModalVisible(false)}
              >
                <View style={styles.walletModalContent}>
                  <FlatList
                    data={wallets}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.walletOption}
                        onPress={() => handleWalletSelect(item)}
                      >
                        <Text style={styles.walletOptionText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                  />
                </View>
              </TouchableOpacity>
            </Modal>

            {/* Amount Input */}
            <Text style={styles.labelText}>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />

            <Text style={styles.labelText}>Transfer PIN</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={pin}
              onChangeText={setPin}
            />

            {/* Close Modal */}
            <TouchableOpacity style={styles.nextButton}>
              <Text style={{color: '#fff'}}>Withdraw Money</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  dashboardCard: {
    height: 180,
    borderRadius: 15,
    padding: 16,
    marginVertical: 16,
    backgroundColor: '#0000ff',
    justifyContent: 'center',
    marginBottom: 20
  },
  imageStyle: {
    borderRadius: 15,
    width: 150,
    height: 150,
    resizeMode: 'contain',
    left: 170
  },
  cardInterestText: {
    color: '#FFF',
    fontSize: 12,
  },
  cardBalanceTitle: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 8,
  },
  cardBalance: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 8,
  },
  createButton: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  createButtonText: {
    color: '#4F8EF7',
    fontWeight: 'bold',
  },
  autoSaveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  autoSaveText: {
    color: '#333',
    fontSize: 13,
    width: '80%'
  },
  
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensures even spacing between the buttons
    marginVertical: 16,
  },
  actionButton: {
    alignItems: 'center',
    width: 80, // Set a fixed width to maintain uniformity
  },
  actionButtonText: {
    color: '#333',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center', // Centers text within the fixed width
    width: '100%', // Matches the width of the parent button
  },
  tab: {
    backgroundColor: '#D7E7FF',
    borderRadius: 8,
    width: 60, // Uniform size for the icon container
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionList: {
    marginVertical: 16,
  },
  transactionDate: {
    fontSize: 14,
    color: '#999',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    color: 'green',
    fontSize: 14,
  },
  transactionBalance: {
    color: '#333',
    fontSize: 14,
  },
  headText:{
    fontWeight: 'bold',
  },
  logo:{
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#D7E7FF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image:{
    width: 30,
    height: 30,
    borderRadius: 50,
    resizeMode: 'contain'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 330,
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
    color: "#666"
  },
  modalButton: {
    backgroundColor: '#0000ff',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mock:{
    width: 150,
    height: 150,
    resizeMode: "contain"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    marginBottom: 20
  },
  inputDate: {
    padding: 10,
    color: "#666",
    fontSize: 16,
    paddingHorizontal: 2

  },
  pickerContainer: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  pickerIcon: {
    position: 'absolute',
    right: 10,
  },
  picker: {
    borderWidth: 1,
  },
  iconContainer: {
    position: 'absolute',
    left: 10,
  },
  pickerItem: {
    fontSize: 16,
    color: '#333',
  },
  selectedItem: {
    color: '#3b82f6', // Change to blue when selected
  },
  balanceText: {
    fontSize: 12,
    color: '#999',
    marginVertical: -10,
    marginBottom: 20
  },
  transferText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  returnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  returnsItem: {
    flex: 1,
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: "#555"
  },
  returnsTitle: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10
  },
  returnsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#0000ff"
  },
  taxText: {
    fontSize: 13,
    color: '#000',
    marginBottom: 10,
  },
  scheduleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  scheduleText: {
    fontSize: 16,
    color: '#333',
    fontWeight: "500"
  },
  startText: {
    fontSize: 16,
    color: '#333',
    fontWeight: "500"
  },
  immediatelyText: {
    fontSize: 14,
    color: '#0000ff',
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  confirmButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  withdrawTitle:{
    fontSize: 18,
    fontWeight: "500",
  },
  flex:{
    justifyContent: 'space-between',
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  labelText:{
    fontSize: 13,
    fontWeight: '500'
  },

  walletPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
    borderColor: "#0000ff"
  },
  walletPickerText: {
    fontSize: 14,
  },

  walletModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  walletModalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 250,
  },
  walletOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  walletOptionText: {
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#0000ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  close:{
    left: 60
  }
})

export default AjoContributionDashboard;
