import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const InvestDetails = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AntDesign name="left" size={24} color="black" />
        <Text style={styles.headerTitle}>Bitcoin <Text style={{color: "#aaa"}}>(BTC)</Text></Text>
        <View style={styles.placeholder}></View>
      </View>

      {/* Price and percentage */}
     <ScrollView showsVerticalScrollIndicator={false}>
     <View style={styles.priceContainer}>
        <View style={styles.priceRow}>
          <Image source={require('../assets/icons/pounds.png')} style={styles.icon} />
          <Text style={styles.priceText}>$2,300.87</Text>
        </View>
        <View style={styles.percentageRow}>
          <AntDesign name="caretup" size={16} color="green" />
          <Text style={styles.percentageText}>0.5%</Text>
        </View>
      </View>

      {/* Chart */}

      <View style={styles.price}>
        <Text style={styles.amount}>$3,560</Text>
      </View>
      <LineChart
        data={{
          labels: ['1m', '15m', '30m', '45m', '1hr', '1year'],
          datasets: [
            {
              data: [2800, 2900, 3200, 3500, 3560, 2300],
            },
          ],
        }}
        width={320} // from react-native
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(34, 128, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#000",
          },
        }}
        style={styles.chart}
      />

      {/* Wallet Data */}
      <View style={styles.walletContainer}>
          <View style={styles.walletRow}>
            <View>
              <Text style={styles.walletSubAmount}>Amount Invested</Text>
              <Text style={styles.label}>₦ 1000.00</Text>
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
              <Text style={styles.red}>1202.88</Text>
            </View>
          </View>

          <View style={styles.walletRow}>
            <View>
              <Text style={styles.walletSubAmount}>Holding Status</Text>
              <Text style={styles.status}>active</Text>
            </View>
            <View>
              <Text style={styles.walletSubAmount}>Asset Invested</Text>
              <Text style={styles.value}>0.08 (CAD)</Text>
            </View>
          </View>
          <View style={{alignItems: 'flex-start', marginBottom: 10}}>
            <Text style={styles.walletSubAmount}>End Date</Text>
            <Text style={styles.date}>28 Nov 2024</Text>
          </View>
      </View>
     </ScrollView>
    </View>
  );
};

export default InvestDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: "center"
  },
  priceContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: "flex-start",
    marginTop: 30
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  priceText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  percentageRow: {
    flexDirection: 'row',
    backgroundColor: '#d9fdf0',
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6
  },
  percentageText: {
    fontSize: 16,
    color: '#0cbc8b',
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
    alignSelf: "center",
  },

  walletTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: "#666"
  },
  walletPriceContainer: {
    alignItems: 'flex-end',
  },
  walletPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  walletPercentage: {
    color: 'green',
  },
  placeholder: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  price:{
    borderWidth: 1,
    padding: 10,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#ddd",
    marginVertical: 20,
    left: 200,
    marginBottom: -10
  },
  amount:{
    color: '#0000ff',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: "center"
  },
  walletContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#ECF6FF',
    borderRadius: 10,
    marginBottom: 20
  },
  walletRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  walletSubAmount: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,

  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'right'
  },
  red: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'right'

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
  label:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  date:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  }

});
