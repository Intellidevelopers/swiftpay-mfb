import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Modal,
  FlatList,
  RefreshControl,
  Pressable,
  Animated,
  TextInput,
} from 'react-native';
import {
  AntDesign,
  Feather,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
  FontAwesome
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import axios from 'axios';
import { Overlay } from 'react-native-elements';

const { width } = Dimensions.get('window');
// Replace this with your preferred exchange rate API service
const EXCHANGE_RATE_API = 'https://api.exchangerate-api.com/v4/latest/';

const countries = [
  { name: 'Nigeria', currency: 'Naira', code: 'NGN', flag: require('../../assets/flag/nigeria.png') },
  { name: 'United States', currency: 'Dollar', code: 'USD', flag: require('../../assets/flag/usa.png') },
  { name: 'United Kingdom', currency: 'Pound', code: 'GBP', flag: require('../../assets/flag/uk.png') },
  { name: 'Germany', currency: 'Euro', code: 'EUR', flag: require('../../assets/flag/germany.png') },
  // Add more countries as needed
];


// Tab screen components
function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [refreshing, setRefreshing] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [convertedBalance, setConvertedBalance] = useState(balance);
  const [featureBalance, setFeatureBalance] = useState('0.0');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [featurePricesVisible, setFeaturePricesVisible] = useState(true);
  const [modalConvertVisible, setModalConvertVisible] = useState(false);

  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('SGD');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);
  const [selectedCurrencyType, setSelectedCurrencyType] = useState<'from' | 'to'>('from');
  const [currencySign, setCurrencySign] = useState('$');
  
 // Define your subtitles
 const subtitles = [
  "Buy & Sell Cash and Cryptocurrency Swiftly",
  "Secure and Fast Transactions",
  "Exchange Rates You Can Trust",
  "Buy & Redeem your Giftcards with SwiftPay"
];

// State to hold the current subtitle index
const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
// Animated value for fading effect
const fadeAnim = useRef(new Animated.Value(1)).current;

useEffect(() => {
  // Interval to change subtitle every 3 seconds
  const intervalId = setInterval(() => {
    // Start fade-out animation
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade out
      duration: 500, // Duration for fade-out
      useNativeDriver: true,
    }).start(() => {
      // Update the subtitle index after fade-out
      setCurrentSubtitleIndex((prevIndex) => (prevIndex + 1) % subtitles.length);
      
      // Start fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade in
        duration: 500, // Duration for fade-in
        useNativeDriver: true,
      }).start();
    });
  }, 4000);

  // Cleanup interval on component unmount
  return () => clearInterval(intervalId);
}, [fadeAnim]);

useEffect(() => {
  switch (selectedCountry.code) {
    case 'NGN':
      setCurrencySign('₦'); // Naira symbol for Nigeria
      break;
    case 'USD':
      setCurrencySign('$'); // Dollar symbol for US
      break;
    case 'EUR':
      setCurrencySign('€'); // Euro symbol for Germany/Europe
      break;
    default:
      setCurrencySign('$'); // Default to Dollar
  }
}, [selectedCountry]);


  const formatBalance = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };
  

  useEffect(() => {
    if (fromCurrency) {
      fetch(`${EXCHANGE_RATE_API}${fromCurrency}`)
        .then(response => response.json())
        .then(data => setExchangeRates(data.rates))
        .catch(error => console.error('Error fetching exchange rates:', error));
    }
  }, [fromCurrency]);

  const handleConvert = () => {
    if (amount && exchangeRates[toCurrency]) {
      const result = (parseFloat(amount) * exchangeRates[toCurrency]).toFixed(2);
      setConvertedAmount(result);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate a network request or any other operation
    setTimeout(() => {
      setRefreshing(false); // Stop the refreshing animation
      // You can update your state or perform other actions here
    }, 2000);
  }, []);

  const [visible, setVisible] = useState(true); // Modal visibility state

  // Open modal with fade-in animation when navigating to the tab
  useFocusEffect(
    React.useCallback(() => {
      setVisible(true); // Ensure the modal remains visible when navigating back
      fadeIn();
      return () => fadeOut(); // Fade out when navigating away
    }, [])
  );

  // Fade-in animation
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fully visible
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Fade-out animation
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Fully invisible
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    fadeOut(); 
    setVisible(false)
  };

  const renderCountryItem = ({ item }: { item: typeof countries[0] }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => {
        setSelectedCountry(item);
        setModalVisible(false);
      }}
    >
      <Image source={item.flag} style={styles.flag} />
      <Text style={styles.countryText}>{item.name} ({item.currency})</Text>
    </TouchableOpacity>
  );
  
  const renderPrice = () => {
    // Fixed code
    return balanceVisible ? `${currencySign}${formatBalance(featureBalance)}` : '****';
  };
  

   // Update the type of `item` to string
   const renderCurrencyItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.currencyItem}
      onPress={() => {
        if (selectedCurrencyType === 'from') {
          setFromCurrency(item);
        } else {
          setToCurrency(item);
        }
        setCurrencyModalVisible(false);
      }}
    >
      <Text style={styles.currencyItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/MyAccount')}>
        <View style={styles.userContainer}>
          <Image source={require('../../assets/user.png')} style={styles.user} />
          <View style={styles.badge}>
            <Image source={require('../../assets/icons/green-badge.png')} style={styles.badge} />
          </View>
        </View>
      </TouchableOpacity>
      <Text style={styles.greeting}>Hi, Great!</Text>



        <View style={styles.link}>
          <TouchableOpacity style={styles.LinkbackButton} onPress={() => router.push('/QrCodeScreen')}>
            <MaterialIcons name="qr-code-scanner" size={24} color="#0000ff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.LinkbackButton} onPress={() => router.push('/Rates')}>
            <Image source={require('../../assets/icons/convert-card.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.LinkbackButton} onPress={() => router.push('/Notification')}>
            <MaterialCommunityIcons name="bell-ring-outline" size={24} color="#0000ff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.LinkbackButton} onPress={() => router.push('/Profile')}>
            <Feather name="menu" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        {/* Balance and Navigation Section */}
        <View style={styles.balanceContainer}>
          <TouchableOpacity
            style={styles.currencyDropdown}
            onPress={() => setModalVisible(true)}
          >
            <Image source={selectedCountry.flag} style={styles.flag} />
            <Text>{selectedCountry.name} ({selectedCountry.currency})</Text>
            <AntDesign name="down" size={16} color="#666" />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.balanceText} numberOfLines={1} adjustsFontSizeToFit={true}>
                {balanceVisible ? `${selectedCountry.code} ${formatBalance(convertedBalance)}` : '**** **** **'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
              <AntDesign name={balanceVisible ? "eye" : "eyeo"} size={30} color="#666" />
            </TouchableOpacity>
          </View>


        <View style={styles.navIconsContainer}>
          {/* Icons would go here; use your desired icons library */}
          <View style={styles.links}>
            <View style={styles.btn}>
              <TouchableOpacity style={styles.LinkButton} onPress={() => router.push('/Transfer')}>
                <MaterialCommunityIcons name="bank" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.btnText}>Account</Text>
            </View>

            <View style={styles.btn}>
              <TouchableOpacity style={styles.LinkButton} onPress={() => router.push('/AddMoney')}>
                <AntDesign name="plus" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.btnText}>Add</Text>
            </View>

            <View style={styles.btn}>
              <TouchableOpacity style={styles.LinkButton} onPress={() => router.push('/(tabs)/transfer')}>
                <SimpleLineIcons name="arrow-down-circle" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.btnText}>Withdraw</Text>
            </View>

            <View style={styles.btn}>
              <TouchableOpacity style={styles.LinkButton} onPress={() => setModalConvertVisible(true)}>
                <MaterialIcons name="currency-exchange" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.btnText}>Convert</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.kycVerification}>
        <View style={styles.kycHeader}>
          <FontAwesome6 name='user-large' size={16}/>
          <Text style={styles.kycTitle}>Complete  Account Setup</Text>
        </View>

        <TouchableOpacity style={styles.kycBtn} onPress={() => router.push('/KycLevelOne')}>
          <View style={styles.flex}>
            <MaterialIcons name='circle' color={'orange'} size={20}/>
            <Text style={styles.kycText}>Complete KYC</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.status}>unverified</Text>
            <AntDesign name='right' size={18}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.kycBtn} onPress={() => router.push('/KycLevelOne')}>
          <View style={styles.flex}>
            <MaterialIcons name='circle' color={'orange'} size={20}/>
            <Text style={styles.kycText}>Create SwiftPay tag</Text>
          </View>
          <View style={styles.flex}>
            <AntDesign name='right' size={18}/>
          </View>
        </TouchableOpacity>
      </View>

      {/* Money Exchange Section */}
      <View style={styles.cardContainer}>
  <ImageBackground
    source={require('../../assets/images/money-exchange-bg.png')}
    style={styles.moneyExchangeCard}
  >
    <View style={styles.moneyExchangeCardLayer}>
      <Text style={styles.moneyExchangeTitle}>Money Exchange</Text>

      {/* Fixed width container for animated text */}
      <View style={styles.subtitleContainer}>
        <Animated.Text style={[styles.moneyExchangeSubtitle, { opacity: fadeAnim }]}>
          {subtitles[currentSubtitleIndex]}
        </Animated.Text>
      </View>

      <View style={styles.exchangeButtonsContainer}>
        <TouchableOpacity
          style={[styles.exchangeButton, styles.shadow]}
          onPress={() => router.push('/BuyCryptoScreen')}
        >
          <Feather name="arrow-down" size={24} color="#45bf55" />
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.exchangeButton, styles.shadow]}
          onPress={() => router.push('/SellCryptoScreen')}
        >
          <Feather name="arrow-up" size={24} color="red" />
          <Text style={styles.buttonText}>Sell Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
</View>


      {/* Features Section */}
     {/* Features Section */}
<View style={styles.featuresContainer}>
  {/* Individual feature card */}
  <View style={styles.featuresCardContainer}>
    <ImageBackground
      source={require('../../assets/images/tab1.png')}
      style={styles.featureCard}
      resizeMode="cover"  // Added this line
    >
     <TouchableOpacity onPress={() => router.push('/Africa')}>
     <View style={styles.headerCard}>
        <MaterialIcons name="currency-exchange" size={18} color="#0000ff" />
        <Text style={styles.featureTitle}>International Transfer</Text>
      </View>
      <Text style={styles.head}>
        Send money to Africa
      </Text>
      <Text style={styles.featureDescription}>
        Send money to your family & friends in Africa Instantly. Send to their Local Bank account or Mobile wallet in less than a minute. Send from anywhere in the world
      </Text>
        <Text style={styles.featurePrice}>{renderPrice()}</Text>

     </TouchableOpacity>
    </ImageBackground>
    
    <ImageBackground
      source={require('../../assets/images/tab1.png')}
      style={styles.featureCard}
      resizeMode="cover"  // Added this line
    >
      <TouchableOpacity onPress={() => router.push('/Abroad')}>
      <View style={styles.headerCard}>
        <MaterialIcons name="currency-exchange" size={18} color="#0000ff" />
        <Text style={styles.featureTitle}>International Transfer</Text>
      </View>
      <Text style={styles.head}>
        Send money Abroad
      </Text>
      <Text style={styles.featureDescription}>
        Send money Globally. Send to Europe, UK, US instantly with low rates. Send to Local US, UK and EUR bank accounts. Transfer at Low rates
      </Text>
        <Text style={styles.featurePrice2}>{renderPrice()}</Text>
      </TouchableOpacity>
    </ImageBackground>
  </View>

  <View style={styles.featuresCardContainer}>
    <ImageBackground
      source={require('../../assets/images/tab1.png')}
      style={styles.featureCard}
      resizeMode="cover"  // Added this line
    >
      <TouchableOpacity onPress={() => router.push('/HardCurrency')}>
      <View style={styles.headerCard}>
       <Image source={require('../../assets/icons/ring.png')} style={styles.icon}/>
        <Text style={styles.featureTitle}>Holdings</Text>
      </View>
      <Text style={styles.head}>
       Save in Hard Currency
      </Text>
      <Text style={styles.featureDescription}>
        Save money in hard currency (USD, EUR, GBP) and Gold. Protect your money from inflation and make a profit when the rates go high.
      </Text>
        <Text style={styles.featurePrice}>{renderPrice()}</Text>
        </TouchableOpacity>
    </ImageBackground>
    
   <ImageBackground
      source={require('../../assets/images/tab1.png')}
      style={styles.featureCard}
      resizeMode="cover"  // Added this line
    ><TouchableOpacity onPress={() => router.push('/Stock')}>
      <View style={styles.headerCard}>
        <Image source={require('../../assets/icons/ring.png')} style={styles.icon}/>
        <Text style={styles.featureTitle}>Holdings</Text>
      </View>
      <Text style={styles.head}>
        Invest In Stock & Metals
      </Text>
      <Text style={styles.featureDescription}>
        Save money in Foreign Currency (USD, EUR, GBP) and Metals (GOLD, SILVER, etc). Protect your money from Inflation and make a...
      </Text>
        <Text style={styles.featurePrice}>{renderPrice()}</Text>
        </TouchableOpacity>
    </ImageBackground>
  </View>

  <View style={styles.featuresCardContainer}>
    <ImageBackground
      source={require('../../assets/images/tab1.png')}
      style={styles.featureCard}
      resizeMode="cover"  // Added this line
    >
      <TouchableOpacity onPress={() => router.push('/AjoSavings')}>
      <View style={styles.headerCard}>
        <MaterialIcons name="download" size={18} color="#0000ff" />
        <Text style={styles.featureTitle}>Ajo Savings</Text>
      </View>
      <Text style={styles.head}>
       Ajo Savings
      </Text>
      <Text style={styles.featureDescription}>
      Create daily, weekly, monthly & yearly Ajo Savings with SwiftPay. Save your money securely and make swift withdrawals
      </Text>
        <Text style={styles.featurePrice3}>{renderPrice()}</Text>
        </TouchableOpacity>
    </ImageBackground>
    
   <ImageBackground
      source={require('../../assets/images/tab1.png')}
      style={styles.featureCard}
      resizeMode="cover"  // Added this line
    >
      <TouchableOpacity onPress={() => router.push('/AjoContribution')}>
      <View style={styles.headerCard}>
        <MaterialIcons name="download" size={18} color="#0000ff" />
        <Text style={styles.featureTitle}>Ajo Contribution</Text>
      </View>
      <Text style={styles.head}>
        Ajo Contribution
      </Text>
      <Text style={styles.featureDescription}>
      Create weekly, monthly & yearly Ajo Contribution easily. Each member will get paid the total amount contributed in every round. The contribution...
      </Text>
        <Text style={styles.featurePrice5}>{renderPrice()}</Text>
        </TouchableOpacity>
    </ImageBackground >
  </View>
</View>

      {/* Currency Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity style={styles.modalBackground} onPress={() => {
        setModalVisible(false);
      }}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Currency</Text>
            <FlatList
              data={countries}
              renderItem={renderCountryItem}
              keyExtractor={(item) => item.code}
            />
          </View>
        </TouchableOpacity>
      </Modal>

        
        <Modal transparent={true} animationType="slide" visible={modalConvertVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Currency Converter</Text>

          {/* Amount Input */}
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          {/* Currency Selection */}
          <View style={styles.currencyRow}>
            <TouchableOpacity onPress={() => {
              setSelectedCurrencyType('from');
              setCurrencyModalVisible(true);
            }}>
              <Text style={styles.selectedCurrency}>{fromCurrency}</Text>
            </TouchableOpacity>
            <Text style={styles.exchangeIcon}>⇄</Text>
            <TouchableOpacity onPress={() => {
              setSelectedCurrencyType('to');
              setCurrencyModalVisible(true);
            }}>
              <Text style={styles.selectedCurrency}>{toCurrency}</Text>
            </TouchableOpacity>
          </View>

          {/* Conversion Result */}
          <Text style={styles.label}>Converted Amount</Text>
          <TextInput
            style={styles.Resultinput}
            editable={false}
            value={convertedAmount ? `${toCurrency} ${convertedAmount}` : ''}
            placeholderTextColor={'#000'}
          />

          {/* Convert Button */}
          <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
            <Text style={styles.convertButtonText}>Convert</Text>
          </TouchableOpacity>

          {/* Close Modal Button */}
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalConvertVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Currency Selection Modal */}
      <Modal transparent={true} animationType="slide" visible={currencyModalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.currencyModalContainer}>
            <Text style={styles.modalTitle}>Select Currency</Text>
            <FlatList
              data={Object.keys(exchangeRates)}
              renderItem={renderCurrencyItem}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setCurrencyModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Modal>
      </ScrollView>
      {visible && (
  <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
    <Overlay
      isVisible={visible}
      overlayStyle={styles.modalOverlay}
      onBackdropPress={closeModal}
    >
      <View style={styles.modalContent}>
        {/* Close Button */}
        <TouchableOpacity onPress={closeModal} style={{alignSelf: "flex-end"}}>
          <AntDesign name='closecircle' size={24} color='red' />
        </TouchableOpacity>

        <Image source={require('../../assets/momo.png')} style={styles.mock} />
        <Text style={styles.popUpmodalTitle}>Refer & Get paid up to <Text style={{color: '#0000ff'}}>N5000</Text> in cash</Text>
        <TouchableOpacity style={styles.modalbutton}>
          <Text style={styles.modalbuttonText}>Save Now</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  </Animated.View>
)}

{visible && (
  <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
    <Overlay
      isVisible={visible}
      overlayStyle={styles.modalOverlay}
      onBackdropPress={closeModal}
    >
      <View style={styles.modalContent}>
        {/* Close Button */}
        <TouchableOpacity onPress={closeModal} style={{alignSelf: "flex-end"}}>
          <AntDesign name='closecircle' size={24} color='red' />
        </TouchableOpacity>

        <Image source={require('../../assets/lock.png')} style={styles.mock} />
        <Text style={styles.popUpmodalTitle}>Secure Login Reminder</Text>
        <Text>Your SwiftPay account has recently been logged in on a new device iPhone 14 pro at 
          2024-08-12 21:12:32. Login from a non-authorized person may cause account fund theft, Please change your password
          or contact support to freeze your accout.
        </Text>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.resetButton}>
          <Text style={styles.resetbuttonText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reloginbutton}>
          <Text style={styles.modalbuttonText}>Re-Login</Text>
        </TouchableOpacity>
        </View>
      </View>
    </Overlay>
  </Animated.View>
)}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  balanceContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    shadowRadius: 2,
    marginBottom: -10
  },
  balanceText: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    flex: 1,
    marginRight: 10
  },
  navIconsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: -10
  },
  moneyExchangeCard: {
    width: "100%",
    height: 150,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    alignSelf: "center",
  },
  moneyExchangeCardLayer: {
  },
  moneyExchangeTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: "flex-start",
  },
  moneyExchangeSubtitle: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 10,
    alignSelf: "flex-start",

  },
  exchangeButtonsContainer: {
    flexDirection: 'row',
    alignSelf: "flex-start",
    gap: 40
  },
  exchangeButton: {
    backgroundColor: '#2E2380',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    gap: 5
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignSelf: "center"
  },
  featureCard: {
    width: '46%',
    height: 200,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    padding: 15,
    backgroundColor: '#CDD5FF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginRight: 18,
    alignItems: "center",
    justifyContent: "space-between", // Distribute space for content evenly
},
  featureTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },

  featureDescription: {
    fontSize: 10,
    color: '#333',
    marginVertical: 10,
    textAlign: 'left',
    alignSelf: "flex-start",
    flex: 1
},
  featurePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -10,
    alignSelf: "center"
  },
  featurePrice2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 18,
    alignSelf: "center"
  },
  featurePrice3: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
    alignSelf: "center"
  },
  featurePrice4: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -30,
    alignSelf: "center"
  },
  featurePrice5: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -10,
    alignSelf: "center"
  },
  backButton: {
    top: 5,
    left: 15,
    backgroundColor: '#0000ff',
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: "center",
    marginRight: 5

  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    gap: 20
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  LinkbackButton: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 100,
    
  },
  flag: {
    width: 20,
    height: 20,
  },
  currencyDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#f5f5f5',
    padding: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  btnText: {
    fontSize: 12,
    fontWeight: "500"
  },
  LinkButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  btn: {
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  countryText: {
    marginLeft: 10,
    fontSize: 16,
  },
  featuresCardContainer:{
    flexDirection: "row",
  },
  featureItem1: {
    width: '48%',
    backgroundColor: '#F5F5FF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  featureItem2: {
    width: '48%',
    backgroundColor: '#FFF4F4',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  featureItem3: {
    width: '48%',
    backgroundColor: '#FFF8EF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  featureItem4: {
    width: '48%',
    backgroundColor: '#EEFFF6',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  featureIcon: {
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: "flex-start"
  },
  featureText: {
    fontSize: 16,
    textAlign: 'left',
  },
  upgradeContainer: {
    padding: 15,
    backgroundColor: '#E0E7FF',
    borderRadius: 10,
    margin: 20,
    width: '92%',
    alignSelf: "center",
    marginTop: -12
  },
  upgradeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeTextContainer: {
    marginLeft: 10,
  },
  upgradeTextTitle: {
    fontSize: 14,
    fontFamily: 'Medium',
    marginBottom: 5,
    width: '55%'
  },
  upgradeButtonText: {
    color: '#4945FF',
    fontFamily: 'Semibold',
    fontSize: 16
  },
  rowFeatures:{
    flexDirection: "row",
    alignItems: "center"
  },
  subText:{
    color: "#555",
    fontFamily: 'Regular',
    fontSize: 13
  },
  headerCard:{
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start"
  },
  head:{
    alignSelf: "flex-start",
    fontSize: 12,
    marginBottom: -10,
    fontWeight: "700",
    marginTop: 5
  },
  cardContainer:{
    width: '95%',
    alignSelf: "center"
  },
  subtitleContainer: {
    width: '100%',  // You can adjust this to be a fixed width or percentage based on your need
    minHeight: 20,  // Set a minimum height to prevent reflow
    justifyContent: 'center',  // Center the animated text if necessary
    overflow: 'hidden',  // Hide overflow text if needed
  },
  user:{
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  convertCurrency: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
  },

  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  currencyModalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    height: '50%'
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  currencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  selectedCurrency: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  exchangeIcon: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  convertButton: {
    backgroundColor: '#0000ff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  convertButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  currencyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 100
  },
  currencyItemText: {
    fontSize: 16,
  },
  Resultinput:{
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
    color: '#000'
  },
  icon:{
    width: 25,
    height: 25,
    marginLeft: -5
  },
  // Modal Overlay
  modalOverlay: {
    width: '90%',
    backgroundColor: '#e3e9fd',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalContent: {
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    width: 220
  },
  overlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mock:{
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: 'center'
  },
  modalbutton:{
    backgroundColor: '#0000ff',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    width: 250
  },
  modalbuttonText:{
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  popUpmodalTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  kycVerification:{
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    paddingHorizontal: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  kycHeader:{
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    gap: 5
  },
  kycBtn:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    borderColor: '#ddd',
    marginBottom: 10
  },
  flex:{
    flexDirection: 'row',
    gap: 5
  },
  kycText:{
    color: '#333'
  },
  kycTitle:{
    fontSize: 15,
    fontWeight: '500',
  },
  status:{
    fontSize: 14,
    color: '#666'
  },
  userContainer: {
    position: 'relative', // Important for positioning the badge relative to the image
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    backgroundColor: 'green',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white', // Optional: matches the background
  },
  badgeText: {
    color: 'white',
    fontSize: 10, // Adjust size based on the badge size
    fontWeight: 'bold',
  },
  greeting:{
    fontSize: 20,
    fontWeight: 'bold',
    left: -15
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent:'space-around',
    marginBottom: 20,
    gap: 10,
    marginTop: 20
  },
  resetButton:{
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#0000ff',
    padding: 10,
    width: '50%',
    paddingHorizontal: 10
  },
  resetbuttonText:{
    color: '#0000ff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600'
  },
  reloginbutton:{
    backgroundColor: '#0000ff',
    padding: 10,
    width: '48%',
    borderRadius: 30,
    paddingHorizontal: 10,
    alignItems: 'center'
  }
});

export default Index;
