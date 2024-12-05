import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Clipboard, Alert, ScrollView, Image } from 'react-native';

const Affiliate = () => {
  const referralCode = 'HDBMD';

  const copyToClipboard = () => {
    Clipboard.setString(referralCode);
    Alert.alert('Copied to Clipboard', 'Referral code copied to clipboard!');
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backbutton} onPress={() => router.back()}>
            <AntDesign name='left' size={20}/>
        </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.introContainer}>
      <Image source={require('../assets/ref.png')} style={styles.ref}/>
      <Text style={styles.descriptionText}>
        Share Your Referral Code And Get $5 When Whoever You Refer Signs Up And Receives Over $500 Via Their Foreign Account.
      </Text>
      
      <View style={styles.referralSection}>
        <View>
          <Text style={styles.referralLabel}>Referral Code</Text>
          <TouchableOpacity style={styles.referralCodeContainer} onPress={copyToClipboard}>
            <Text style={styles.referralCode}>{referralCode}</Text>
            <Text style={styles.copyText}>📋</Text>
          </TouchableOpacity>
        </View>
        <Image source={require('../assets/medal.png')} style={styles.medal}/>

      </View>
      </View>

      <View style={styles.earningsContainer}>
        <View style={styles.iconContainer}>
        <Image source={require('../assets/hand.png')} style={styles.icon}/>
        </View>
        <View>
        <Text style={styles.earningsLabel}>Total Earnings</Text>
        <Text style={styles.earningsValue}>$0.00</Text>
        </View>
      </View>

      <View style={styles.referralsContainer}>
        <Text style={styles.referralsText}>My Referrals</Text>
        <ScrollView style={styles.noReferrals} showsVerticalScrollIndicator={false}>
          <Image source={require('../assets/users.png')} style={styles.referrals}/>
          <Text style={styles.noReferralsText}>You Have No Referrals Yet</Text>
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Share Link</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Affiliate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 10,
  },
  descriptionText: {
    fontSize: 14,
    textAlign: 'left',
    color: '#333',
  },
  referralSection: {
    alignItems: 'center',
    marginVertical: 20,
    alignSelf: 'flex-start',
    flexDirection: 'row'
  },
  referralLabel: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
    fontWeight: '600'
  },
  referralCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0000ff',
    padding: 10,
    borderRadius: 5,
  },
  referralCode: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
  },
  copyText: {
    color: '#FFF',
    fontSize: 18,
  },
  earningsContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15
  },
  earningsLabel: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600'
  },
  earningsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0000ff',
    marginTop: 5,
  },
  referralsContainer: {
    marginVertical: 20,
  },
  referralsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'left'
  },
  noReferrals: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 30,
    borderRadius: 5,
    width: '100%'
  },
  noReferralsText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
  shareButton: {
    backgroundColor: '#0000ff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  shareButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  introContainer:{
    backgroundColor: '#FFF',
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
  },
  backbutton:{
    padding: 13,
  },
  ref:{
    width: 260,
    height: 100,
    resizeMode: 'contain',
    marginTop: 5,
  },
  medal:{
    width: 280,
    height: 120,
    resizeMode: 'contain',
    marginTop: 5,
  },
  icon:{
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  iconContainer:{
    backgroundColor: "#DFF1FC",
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  referrals:{
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 10,
    alignSelf: 'center'
  }
});
