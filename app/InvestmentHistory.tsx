import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons or any other icon set

const data = [
  {
    id: '1',
    title: 'NVIDIA Corp',
    type: 'stock',
    amountInvested: '₦1.00',
    assetInvested: '0.80%',
    amountReturned: '₦1.01',
    profitLoss: '₦0.01',
    dateCompleted: '28 Oct 2024',
    icon: require('../assets/icons/silver.png'),
  },
  {
    id: '2',
    title: 'Lumen Technologies Inc',
    type: 'stock',
    amountInvested: '₦1,000,000.00',
    assetInvested: '611.62 (USD)',
    amountReturned: '₦1,000,232.42',
    profitLoss: '₦232.42',
    dateCompleted: '17 Oct 2024',
    icon: require('../assets/icons/enjin.png'),
  },
  {
    id: '3',
    title: 'Intel Corp',
    type: 'stock',
    amountInvested: '₦1,000,000.00',
    assetInvested: '611.62 (USD)',
    amountReturned: '₦1,000,232.42',
    profitLoss: '₦232.42',
    dateCompleted: '17 Oct 2024',
    icon: require('../assets/icons/litecoin.png'),
  },
  {
    id: '4',
    title: 'Lumen Technologies Inc',
    type: 'stock',
    amountInvested: '₦1,000,000.00',
    assetInvested: '611.62 (USD)',
    amountReturned: '₦1,000,232.42',
    profitLoss: '₦232.42',
    dateCompleted: '17 Oct 2024',
    icon: require('../assets/icons/tether.png'),
  },
  {
    id: '5',
    title: 'Lumen Technologies Inc',
    type: 'stock',
    amountInvested: '₦1,000,000.00',
    assetInvested: '611.62 (USD)',
    amountReturned: '₦1,000,232.42',
    profitLoss: '₦232.42',
    dateCompleted: '17 Oct 2024',
    icon: require('../assets/icons/ethereum.png'),
  },
  {
    id: '6',
    title: 'Lumen Technologies Inc',
    type: 'stock',
    amountInvested: '₦1,000,000.00',
    assetInvested: '611.62 (USD)',
    amountReturned: '₦1,000,232.42',
    profitLoss: '₦232.42',
    dateCompleted: '17 Oct 2024',
    icon: require('../assets/icons/gold.png'),
  },
];

const InvestmentHistory = () => {
  const [activeId, setActiveId] = useState<string | null>(null); // Set state type explicitly

  const toggleCollapse = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  const renderCard = ({ item }: { item: typeof data[number] }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => toggleCollapse(item.id)}
      >
        <Image source={item.icon} style={styles.icon}/>
        <View style={styles.cardHeaderText}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardType}>{item.type}</Text>
        </View>
        <Icon
          name={activeId === item.id ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="#757575"
        />
      </TouchableOpacity>
      <Collapsible collapsed={activeId !== item.id}>
        <View style={styles.cardBody}>
          <View style={styles.flex}>
            <View style={styles.bodyText}>
                <Text style={styles.label}>Amount Invested</Text>
                <Text style={styles.value}>{item.amountInvested}</Text>
            </View>

            <View style={styles.bodyText}>
                <Text style={styles.label}>Final Percentage Change</Text>
                <Text style={styles.value}>{item.assetInvested}</Text>
            </View>
          </View>

          <View style={styles.flex}>
            <View style={styles.bodyText}>
                <Text style={styles.label}>Amount Returned</Text>
                <Text style={styles.value}>{item.amountReturned}</Text>
            </View>
            <View style={styles.bodyText}>
                <Text style={styles.label}>Profit/Loss</Text>
                <Text style={styles.value}>{item.profitLoss}</Text>
            </View>
          </View>

          <View style={styles.bodyText}>
            <Text style={styles.label}>Date Completed</Text>
            <Text style={styles.value}>{item.dateCompleted}</Text>
          </View>
        </View>
      </Collapsible>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Investment history</Text>
      <FlatList
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default InvestmentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardType: {
    fontSize: 14,
    color: '#757575',
  },
  cardBody: {
    padding: 16,
  },
  bodyText: {
    fontSize: 14,
    marginBottom: 8,
    flexDirection: 'column',
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  flex:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 8,
    paddingVertical: 8,
  },
  value: {
    fontWeight: '900',
    fontSize: 18,
    color: '#000000',
  },
  icon:{
    height: 30,
    width: 30,
    marginRight: 5
  }
});
