import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { router, Href } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ExchangeProps = {
  navigation: {
    goBack: () => void;
  };
};

const transactions = [
    {
        id: 1,
        type: 'Sell USDT',
        date: '2024-03-24 10:34:23',
        amount: '234,776.00 NGN',
        price: '1467.98 NGN',
        quantity: '20.000 USDT',
        orderNo: '123456789834567',
        status: 'Completed',
        route: '/Bureau' as Href,  // Ensure correct type
      },
      {
        id: 2,
        type: 'Sell BTC',
        date: '2024-03-24 10:34:23',
        amount: '234,776.00 NGN',
        price: '1467.98 NGN',
        quantity: '20.000 BTC',
        orderNo: '123456789834567',
        status: 'In Progress',
      },
      {
        id: 3,
        type: 'Sell ETH',
        date: '2024-03-24 10:34:23',
        amount: '234,776.00 NGN',
        price: '1467.98 NGN',
        quantity: '20.000 ETH',
        orderNo: '123456789834567',
        status: 'Cancelled',
      },
  // other transactions...
];

const SellTrading: React.FC<ExchangeProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'Sell' | 'History'>('Sell');
  const [activeStatus, setActiveStatus] = useState<'All' | 'In Progress' | 'Completed' | 'Cancelled'>('All');



  const filteredTransactions = transactions.filter((transaction) =>
    activeStatus === 'All' ? true : transaction.status === activeStatus
  );

  const navigateToSellScreen = (cryptoDetails: { name: string; price: string; quantity: string; limits: string }) => {
    router.push({
      pathname: '/SellBtc',
      params: cryptoDetails,
    });
  };

  const handleOptionPress = (cryptoData: { name: any; price: any; quantity: any; limits: any; }) => {
    router.push({
      pathname: '/SellBtc', // Adjust the route as per your screen file name
      params: {
        cryptoName: cryptoData.name,
        price: cryptoData.price,
        quantity: cryptoData.quantity,
        limits: cryptoData.limits,
      },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)')}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>S2P Trading</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={activeTab === 'Sell' ? styles.activeTabButton : styles.tabButton}
          onPress={() => setActiveTab('Sell')}
        >
          <Text style={activeTab === 'Sell' ? styles.activeTabText : styles.tabText}>Sell</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTab === 'History' ? styles.activeTabButton : styles.tabButton}
          onPress={() => setActiveTab('History')}
        >
          <Text style={activeTab === 'History' ? styles.activeTabText : styles.tabText}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Content based on active tab */}
      {activeTab === 'Sell' ? (
        // Existing Sell tab content
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Existing Sell tab content */}
          <View style={styles.subCrypto}>
            <Text style={styles.cryptohead}>USDT</Text>
            <Text style={styles.cryptohead}>USDC</Text>
            <Text style={styles.cryptohead}>BTC</Text>
            <Text style={styles.cryptohead}>ETH</Text>
            <Text style={styles.cryptohead}>BNB</Text>
          </View>

          {/* Updated TouchableOpacity */}
          <TouchableOpacity
            onPress={() =>
                handleOptionPress({
                  name: 'Bitcoin',
                  price: '1445',
                  quantity: '34.3466 BTC',
                  limits: '10,000.00 - 65,689.87 NGN',
                })
              }
          >
            <View style={styles.CardContainer}>
            <View style={styles.optionContainer}>
              <View style={styles.textContainer}>
                <Image source={require('../assets/icons/btc.png')} style={styles.icon} />
                <Text style={styles.title}>Bitcoin</Text>
              </View>
              <View style={styles.label}>
                <View style={styles.dot}></View>
                <Text style={styles.label}>Available</Text>
            </View>
            </View>
            <View style={styles.assetsName}>
              <Text style={styles.price}>$ 64,897</Text>
              <Text style={styles.quantity}>Quantity 34.3466 BTC</Text>
              <Text style={styles.limit}>Limits 10,000.00 - 65,689.87 NGN</Text>
              <View style={styles.leftLine}>
                <Text style={styles.balanceName}>Swiftpay Balance</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              handleOptionPress({
                name: 'Ethereum',
                price: '690',
                quantity: '34.3466 BTC',
                limits: '10,000.00 - 65,689.87 NGN',
              })
            }
          >
            <View style={styles.CardContainer2}>
            <View style={styles.optionContainer}>
            <View style={styles.textContainer}>
                <Image source={require('../assets/icons/ethereum.png')} style={styles.icon} />
                <Text style={styles.title}>Ethereum</Text>
            </View>
            <View style={styles.closed}>
                <View style={styles.closedot}></View>
                <Text style={styles.closedLabel}>Closed</Text>
            </View>
            </View>
            <View style={styles.assetsName}>
            <Text style={styles.price}>$ 5,356</Text>

            <Text style={styles.quantity}>Quantity 34.3466 ETH</Text>
            <Text style={styles.limit}>Limits     10,000.00 - 65,689.87 NGN</Text>
            <View style={styles.leftLine}>
                <Text style={styles.balanceName}>Swiftpay Balance</Text>
            </View>
            </View>
          </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              handleOptionPress({
                name: 'USDT',
                price: '440',
                quantity: '34.3466 USDT',
                limits: '10,000.00 - 65,689.87 NGN',
              })
            }
          >
            <View style={styles.CardContainer2}>
          <View style={styles.optionContainer}>
            <View style={styles.textContainer}>
              <Image source={require('../assets/icons/tether.png')} style={styles.icon} />
              <Text style={styles.title}>USDT</Text>
            </View>
            <View style={styles.label}>
                <View style={styles.dot}></View>
                <Text style={styles.label}>Available</Text>
            </View>
          </View>
          <View style={styles.assetsName}>
            <Text style={styles.price}>$ 5,356</Text>

            <Text style={styles.quantity}>Quantity 34.3466 ETH</Text>
            <Text style={styles.limit}>Limits     10,000.00 - 65,689.87 NGN</Text>
            <View style={styles.leftLine}>
              <Text style={styles.balanceName}>Swiftpay Balance</Text>
            </View>
          </View>
        </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              handleOptionPress({
                name: 'USDT',
                price: '209',
                quantity: '34.3466 USDT',
                limits: '10,000.00 - 65,689.87 NGN',
              })
            }
          >
            <View style={styles.CardContainer2}>
          <View style={styles.optionContainer}>
            <View style={styles.textContainer}>
              <Image source={require('../assets/icons/tether.png')} style={styles.icon} />
              <Text style={styles.title}>USDT</Text>
            </View>
            <View style={styles.label}>
                <View style={styles.dot}></View>
                <Text style={styles.label}>Available</Text>
            </View>
          </View>
          <View style={styles.assetsName}>
            <Text style={styles.price}>$ 5,356</Text>

            <Text style={styles.quantity}>Quantity 34.3466 ETH</Text>
            <Text style={styles.limit}>Limits     10,000.00 - 65,689.87 NGN</Text>
            <View style={styles.leftLine}>
              <Text style={styles.balanceName}>Swiftpay Balance</Text>
            </View>
          </View>
        </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              handleOptionPress({
                name: 'USDT',
                price: '1897',
                quantity: '34.3466 USDT',
                limits: '10,000.00 - 65,689.87 NGN',
              })
            }
          >
            <View style={styles.CardContainer2}>
          <View style={styles.optionContainer}>
            <View style={styles.textContainer}>
              <Image source={require('../assets/icons/tether.png')} style={styles.icon} />
              <Text style={styles.title}>USDT</Text>
            </View>
            <View style={styles.label}>
                <View style={styles.dot}></View>
                <Text style={styles.label}>Available</Text>
            </View>
          </View>
          <View style={styles.assetsName}>
            <Text style={styles.price}>$ 5,356</Text>

            <Text style={styles.quantity}>Quantity 34.3466 ETH</Text>
            <Text style={styles.limit}>Limits     10,000.00 - 65,689.87 NGN</Text>
            <View style={styles.leftLine}>
              <Text style={styles.balanceName}>Swiftpay Balance</Text>
            </View>
          </View>
        </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              handleOptionPress({
                name: 'USDT',
                price: '5550',
                quantity: '34.3466 USDT',
                limits: '10,000.00 - 65,689.87 NGN',
              })
            }
          >
            <View style={styles.CardContainer2}>
          <View style={styles.optionContainer}>
            <View style={styles.textContainer}>
              <Image source={require('../assets/icons/tether.png')} style={styles.icon} />
              <Text style={styles.title}>USDT</Text>
            </View>
            <View style={styles.label}>
                <View style={styles.dot}></View>
                <Text style={styles.label}>Available</Text>
            </View>
          </View>
          <View style={styles.assetsName}>
            <Text style={styles.price}>$ 5,356</Text>

            <Text style={styles.quantity}>Quantity 34.3466 ETH</Text>
            <Text style={styles.limit}>Limits     10,000.00 - 65,689.87 NGN</Text>
            <View style={styles.leftLine}>
              <Text style={styles.balanceName}>Swiftpay Balance</Text>
            </View>
          </View>
        </View>
          </TouchableOpacity>
          {/* Add more crypto options as needed */}
        </ScrollView>
      ) : (
        // Existing History tab content
        <ScrollView showsVerticalScrollIndicator={false}>
        {/* Status Filter Tabs */}
        <View style={styles.subCrypto}>
          {['All', 'In Progress', 'Completed', 'Cancelled'].map((status) => (
            <TouchableOpacity key={status} onPress={() => setActiveStatus(status as 'All' | 'In Progress' | 'Completed' | 'Cancelled')}>
              <Text style={activeStatus === status ? styles.activeCryptoText : styles.cryptoText}>{status}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filtered History Content */}
        <View style={styles.historyContainer}>
          {filteredTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionHeaderContainer}>
                <View style={styles.transactionHeader}>
                  <Text style={styles.transactionType}>{transaction.type}</Text>
                  <MaterialIcons name='chat' size={20} color={'#666'} style={styles.message}/>
                  <Text style={getStatusStyle(transaction.status)}>{transaction.status}</Text>
                </View>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.transactionDetail}>Amount</Text>
                <Text style={styles.amount}>{transaction.amount}</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.transactionDetail}>Price</Text>
                <Text style={styles.value}>{transaction.price}</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.transactionDetail}>Total Quantity</Text>
                <Text style={styles.value}>{transaction.quantity}</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.transactionDetail}>Order No</Text>
                <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                  <Text style={styles.value}>{transaction.orderNo}</Text>
                  <TouchableOpacity>
                    <AntDesign name='copy1' size={18}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      )}
    </SafeAreaView>
  );
};

const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Completed':
        return styles.statusCompleted;
      case 'In Progress':
        return styles.statusInProgress;
      case 'Cancelled':
        return styles.statusCancelled;
      default:
        return styles.statusDefault;
    }
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
  },
  placeholder: {
    width: 50, // Same width as the backButton to keep alignment
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Allow text to take remaining space and center
  },
  listContainer: {
    paddingBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  textContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  CardContainer: {
    backgroundColor: '#D3EDFC',
    marginBottom: 20,
    borderRadius: 10,
  },
  assetsName: {
    paddingHorizontal: 10,
  },
  price: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 10,
  },
  quantity: {
    color: '#666',
    marginBottom: 5,
  },
  limit: {
    color: '#666',
    marginBottom: 10,
  },
  balanceName: {
    color: '#111',
    fontWeight: '500',
    marginBottom: 5,
  },
  label: {
    color: '#00c31f',
    backgroundColor: '#e3ffe8',
    paddingHorizontal: 10,
    borderRadius: 10,
    fontWeight: '600',
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center"
  },
  closed: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    borderRadius: 10,
    fontWeight: '600',
    paddingVertical: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  closedLabel: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    borderRadius: 10,
    color: '#888',
    fontWeight: '600',
    paddingVertical: 5,
  },
  leftLine: {
    borderLeftWidth: 3,
    borderLeftColor: '#1400fb',
    paddingHorizontal: 3,
    borderRadius: 2,
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 10,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#ddd',
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  activeTabText: {
    fontSize: 18,
    fontWeight: '500',
  },
  tabText: {
    color: '#999',
    fontSize: 18,
    fontWeight: '500',
  },
  tabButton: {},
  subCrypto: {
    flexDirection: 'row',
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  activeCryptoText: {
    fontWeight: '700',
    marginBottom: 20,
    fontSize: 16
  },
  cryptoText: {
    fontWeight: '700',
    marginBottom: 20,
    color: "#d7d7d7"
  },
  cryptohead: {
    fontWeight: '700',
    marginBottom: 20,
    color: "#000"
  },
  historyContainer: {
    flex: 1,
  },
  historyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 50,
  },
  CardContainer2: {
    marginBottom: 20,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBlockColor: "#eee"
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  transactionType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#008A16"
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
    fontWeight: "500"
  },
  transactionDetail: {
    fontSize: 14,
    color: '#888',
    marginBottom: 3,
    fontWeight: "500"
  },
  statusCompleted: {
    color: '#00c31f',
    fontWeight: '600',
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 5,
  },
  statusInProgress: {
    color: '#f2c600',
    fontWeight: '600',
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 5,
  },
  statusCancelled: {
    color: '#ff3b30',
    fontWeight: '600',
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 5,
  },
  statusDefault:{},
  flex:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  value:{
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
    fontWeight: "700"
  },
  amount:{
    fontWeight: "900",
    fontSize: 20
  },
  transactionHeaderContainer:{
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 8,
    paddingBottom: 8
  },
  message:{
    left: 55
  },
  dot:{
    backgroundColor: "#00c31f",
    height: 10,
    width: 10,
    borderRadius: 100,
  },
  closedot:{
    backgroundColor: "#666",
    height: 10,
    width: 10,
    borderRadius: 100,
  },

});

export default SellTrading;
