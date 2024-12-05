import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

const countries = [
  { name: '1-800-petsupplies', flag: require('../assets/cards/1.png'), route: '/CardScreen' },
  { name: 'Adidas US', flag: require('../assets/cards/2.png'), route: '/CardScreen' },
  { name: 'Airbnb US', flag: require('../assets/cards/3.png'), route: '/CardScreen' },
  { name: 'Amazon US', flag: require('../assets/cards/4.png'), route: '/CardScreen' },
  { name: 'App Store & iTunes US', flag: require('../assets/cards/5.png'), route: '/CardScreen' },
  { name: 'Best Buy US', flag: require('../assets/cards/6.png'), route: '/CardScreen' },
];

const SelectGifCard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter countries based on the search query
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onClear = () => {
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Select Gift Cards</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Subheader */}
      <Text style={styles.subHeader}>Which country will you like to buy from?</Text>

      {/* Search Bar */}
      

      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
        style={styles.searchInput}
        placeholder="Search for a gift card..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
        {searchQuery ? (
          <TouchableOpacity onPress={onClear} style={styles.clearIcon}>
            <AntDesign name="closecircle" size={18} color="#888" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* List of Countries (Filtered) */}
      <ScrollView>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => router.push(country.route as any)}
            >
              <Image source={country.flag} style={styles.icon} />
              <Text style={styles.cardText}>{country.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noResults}>No gift cards found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: '600',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  cardText: {
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
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
  noResults: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  clearIcon: {
    paddingLeft: 10,
  },
});

export default SelectGifCard;
