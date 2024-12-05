import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';

const HardCurrencyDetails = () => {
    const candlestickData = [
        { date: 'Mon', open: 220, high: 260, low: 200, close: 250 },
        { date: 'Tue', open: 250, high: 270, low: 240, close: 260 },
        { date: 'Wed', open: 260, high: 280, low: 250, close: 270 },
        { date: 'Thu', open: 270, high: 290, low: 260, close: 280 },
        { date: 'Fri', open: 280, high: 300, low: 270, close: 290 },
        { date: 'Sat', open: 280, high: 300, low: 270, close: 290 },
        { date: 'Sun', open: 280, high: 300, low: 270, close: 290 },
      ];
      const renderCandlestick = ({ item }: { item: typeof candlestickData[number] }) => {
        const isPositive = item.close >= item.open;
        return (
          <View style={styles.candleContainer}>
            {/* High-Low Line */}
            <View
              style={[
                styles.line,
                {
                  height: item.high - item.low,
                  backgroundColor: isPositive ? 'red' : '#F44336',
                },
              ]}
            />
            {/* Open-Close Bar */}
            <View
              style={[
                styles.bar,
                {
                  height: Math.abs(item.close - item.open),
                  backgroundColor: isPositive ? '#4CAF50' : 'red',
                  marginTop: item.high - Math.max(item.open, item.close),
                },
              ]}
            />
            <Text style={styles.candleLabel}>{item.date}</Text>
          </View>
        );
      };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backArrow}>&lt;</Text>
        </TouchableOpacity>
        
      </View>

      {/* Gains Section */}
      <View style={styles.gainsContainer}>
        <View style={styles.gainBox}>
          <View style={[styles.gainCircle, { backgroundColor: 'blue' }]} />
          <View>
          <Text style={styles.gainText}>Today Gains</Text>
          <Text style={styles.gainAmount}>$1,123.02</Text>
          </View>
        </View>
        <View style={styles.gainBox}>
          <View style={[styles.gainCircle, { backgroundColor: 'red' }]} />
          <View>
          <Text style={styles.gainText}>Today Gains</Text>
          <Text style={styles.gainAmount}>$1,123.02</Text>
          </View>
        </View>
      </View>

      {/* Total Balance Section */}
      <View style={styles.balanceContainer}>
        <View>
            <Text style={styles.balanceTitle}>Total Balance</Text>
            <Text style={styles.balanceAmount}>$1,123.02</Text>
            <Text style={styles.label}>$1,123.02</Text>
        </View>
        <Text style={styles.percentage}>+2.35%</Text>
      </View>

      

      {/* Time Filters */}
      <View style={styles.filterContainer}>
        {['24H', '3D', '1W', '1M', '6M', '1Y'].map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterButton,
              filter === '1W' && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === '1W' && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={candlestickData}
        renderItem={renderCandlestick}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chartContainer}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Wallet Information */}
      <View style={styles.walletContainer}>
        <View style={styles.walletRow}>
          <View>
            <Text style={styles.walletSubAmount}>Amount Invested</Text>
            <Text style={styles.value}>₦ 1000.00</Text>
          </View>
          <View>
            <Text style={styles.walletSubAmount}>Possible Earnings</Text>
            <Text style={styles.red}>₦ 99.96</Text>
          </View>
        </View>

        <View style={styles.walletRow}>
          <View>
            <Text style={styles.walletSubAmount}>Initial Rate</Text>
            <Text style={styles.value}>1202.88 %</Text>
          </View>
          <View>
            <Text style={styles.walletSubAmount}>Current Rate</Text>
            <Text style={styles.red}>₦ 1700.88</Text>
          </View>
        </View>

        <View style={styles.walletRow}>
          <View>
            <Text style={styles.walletSubAmount}>Holding Status</Text>
            <Text style={styles.status}>active</Text>
          </View>
          <View>
            <Text style={styles.walletSubAmount}>Current Amount</Text>
            <Text style={styles.value}>₦ 545,000.00</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HardCurrencyDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF5FF',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menu: {
    fontSize: 24,
  },
  gainsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  gainBox: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10
  },
  gainCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  gainText: {
    fontSize: 14,
    color: '#666',
  },
  gainAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  balanceContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 40
  },
  balanceTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 5,
  },
  percentage: {
    fontSize: 14,
    color: '#00c851',
    fontWeight: '500'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
  },
  activeFilter: {
    backgroundColor: '#ff4444',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  activeFilterText: {
    color: '#fff',
  },
  walletContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 15

  },
  walletRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  walletSubAmount: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  red: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  status: {
    fontSize: 14,
    color: '#0074BB',
    backgroundColor: '#DFF1FC',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    textAlign: 'center',
  },
  
  chartContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 8
  },
  candleContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  line: {
    width: 2,
    borderRadius: 1,
  },
  bar: {
    width: 10,
    borderRadius: 2,
  },
  candleLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  label:{
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  }
});
