import React from 'react';
import {Image, ScrollView, StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import { colors } from '../../../assets/styles/Colors';
import { Gs } from '../../../assets/styles/GlobalStyle';
import CardDetails from '../../components/CardDetails';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';

function Checkout(): JSX.Element {

  const navigation = useNavigation();

  const checoutData = [
    {
      label: 'Price per day',
      value: '$500',
      isBold: true,
    },
    {
      label: 'Total day',
      value: '18 day',
      isBold: false,
    },
    {
      label: 'Date',
      value: '22 Januari 2023',
      isBold: false,
    },
    {
      label: 'End',
      value: '2 Februari 2023',
      isBold: false,
    },
    {
      label: 'Tax 15%',
      value: '$890',
      isBold: true,
    },
    {
      label: 'Insurance',
      value: '$20,000',
      isBold: true,
    },
    {
      label: 'Grand total ',
      value: '$2,899,000',
      isBold: true,
      isPrimary: true,
    },
  ]

  const borderBottom = {
    borderBottomWidth: 1,
    borderColor: colors.greyContainer,
  }

  const renderCheckoutDetail = () => {
    return(
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Space</Text>
        <CardDetails />
      </View>
    );
  }

  const renderCheckoutData = () => {
    return(
      <View style={styles.section}>
        {checoutData.map((val, idx) =>{
            const isLast = idx === checoutData?.length - 1;
            return(
              <View key={idx} style={[styles.checkoutItem, !isLast && borderBottom]}>
                <Text style={Gs.textBlack}>{val.label}</Text>
                <Text 
                  style={[
                    Gs.textBlack, 
                    val.isBold && Gs.font700, 
                    val.isPrimary && Gs.textPrimary
                  ]}>
                  {val.value}
                </Text>
              </View> 
            )
        })}
      </View>
    );
  }

  const renderPaymentMethod = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment</Text>
        <View style={styles.paymentContainer}>
          <TouchableOpacity style={styles.paymentButtom}>
            <Image source={require('../../../assets/icons/wallet.png')}/>
            <Text style={[Gs.h5, Gs.textBlack]}>MyWallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentButtom}>
            <Image source={require('../../../assets/icons/mastercard.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const renderPayNoq = () => {
    return(
      <View style={styles.section}>
        <TouchableOpacity   
          style={styles.proceedButton} 
          onPress={ async() => {
            navigation.navigate('Success');
            await analytics().logEvent('button_payNow');
          }}>
          <Text style={[Gs.h4, Gs.textWhite]}>Pay Now</Text>
          <Image 
            source={require('../../../assets/icons/pay.png')}
            style={styles.icon}
            />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}> 
      <Header 
        title="Checkout"
        subtitle="Ready to start working"
      />
      <View style={styles.content}>
        <ScrollView>
          {renderCheckoutDetail()}
          {renderCheckoutData()}
          {renderPaymentMethod()}
        </ScrollView>
        {renderPayNoq()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content:{
    flex: 1,
    ...Gs.justifyBetween,
  },
  section:{
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle:{
    ...Gs.h3,
    ...Gs.textBlack,
    marginBottom: 12,
  },
  checkoutItem:{
    ...Gs.flexRow,
    ...Gs.justifyBetween,
    paddingVertical: 14,
  },
  paymentContainer:{
    ...Gs.flexRow,
    marginHorizontal: -10,
    marginBottom: 30,
  },
  paymentButtom:{
    ...Gs.justifyCenter,
    ...Gs.itemsCenter,
    ...Gs.cornerLG,
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 52,
    borderWidth: 1,
    borderColor: colors.greyContainer,
    marginHorizontal: 14, 
  },
  proceedButton:{
    ...Gs.flexRow,
    ...Gs.itemsCenter,
    ...Gs.justifyCenter,
    ...Gs.cornerMD,
    backgroundColor: colors.primary,
    padding:14,
  },
  icon:{
    marginLeft: 4,
  }, 
});

export default Checkout;
