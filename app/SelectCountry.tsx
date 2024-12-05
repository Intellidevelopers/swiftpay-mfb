import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const countries = [
  { name: 'Nigeria (International)', flag: require('../assets/flag/nigeria.png'), route: '/SelectGiftCard' },
  { name: 'Nigeria (Local)', flag: require('../assets/flag/nigeria.png'), route: '/SelectGiftCard' },
  { name: 'Afghanistan', flag: require('../assets/flag/afghanistan.png'), route: '/SelectGiftCard' },
  { name: 'Albania', flag: require('../assets/flag/albania.png'), route: '/SelectGiftCard' },
  { name: 'Brazil', flag: require('../assets/flag/brazil.png'), route: '/SelectGiftCard' },
  { name: 'Canada', flag: require('../assets/flag/canada.png'), route: '/SelectGiftCard' },
  { name: 'United States', flag: require('../assets/flag/us.png'), route: '/SelectGiftCard' },
];

const SelectCountryScreen: React.FC = () => {
  const router = useRouter();
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
        <Text style={styles.headerText}>Buy Gift Cards</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Subheader */}
      <Text style={styles.subHeader}>Which country would you like to buy from?</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a country..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={onClear} style={styles.clearIcon}>
            <AntDesign name="closecircle" size={18} color="#888" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* List of Countries */}
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <Text style={styles.noResults}>No countries found</Text>
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
  noResults: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SelectCountryScreen;
