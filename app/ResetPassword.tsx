import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground, 
  Modal,
  Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const ResetPassword: React.FC = () => {
  const navigation = useNavigation();
  const [packageModalVisible, setPackageModalVisible] = useState(false);
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Image source={require('../assets/logos/swiftpaylogo.png')} style={styles.image} />


      {/* Header Text */}
      <Text style={styles.headerText}>Create New Password</Text>

      {/* Description */}
      <Text style={styles.descriptionText}>
        Create new password password
      </Text>

      <Text style={styles.label}>Enter new password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="********"
          keyboardType="default"
        />
      </View>

      <Text style={styles.label}>Confirm password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="********"
          keyboardType="default"
        />
      </View>

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.saveButton} onPress={() => setPackageModalVisible(true)}>
        <AntDesign name='check' size={20} color={'#fff'}/>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

      <Modal visible={packageModalVisible}  transparent={true} animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setPackageModalVisible(false)} >
          <View style={styles.modalContainer}>
            <Image source={require('../assets/icons/locker.png')} style={styles.logo}/>
            <Text style={styles.title}>Pasword changed</Text>
            <Text style={styles.subTitle}>Your password has been successfully changed, don't forget this next time you log in.</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
              <Text style={styles.btnText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    padding: 10,
    width: 45
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000',
  },
  descriptionText: {
    fontSize: 14,
    color: '#7E7E7E',
    marginBottom: 40,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#0000FF', // Blue color for the button
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "center",
    gap: 20
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  successBottomSheetHeader:{
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5
  },
  logo:{
    width: 80,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },  
  icon: {
    alignSelf: 'flex-end',
  },
  desc: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
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
  tagBg:{
    width: 420,
    alignSelf: "center",
    top: -20,
    borderRadius: 30,
    marginBottom: 40,
    resizeMode: "cover",
    borderTopLeftRadius: 30
  },
  modalOverlay: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  modalContainer: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 20, 
    width: '80%',
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50
  },
  title:{
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20
  },
  subTitle:{
    textAlign: "center",
    color: "#666",
    marginBottom: 10
  },
  button:{
    backgroundColor: "#0000FF",
    padding: 15,
    borderRadius: 30,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  btnText:{
    color: "#fff"
  },
  image: {
    width: 117,
    height: 52,
    left: -15
  },
  label:{
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
    color: '#000',
  }
});
