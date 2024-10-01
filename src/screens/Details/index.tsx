import React from 'react';
import {FlatList, Image, ScrollView, StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import { colors } from '../../../assets/styles/Colors';
import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';
import { Gs } from '../../../assets/styles/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';

function Details(): JSX.Element {
  const navigation = useNavigation();

  const slider = [
    require('../../../assets/images/item_2_a.png'),
    require('../../../assets/images/item_2_b.png'),
    require('../../../assets/images/item_2_c.png')
  ]

  const renderSlider = () => {
    return (
      <FlatList 
        data={slider} 
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => <SliderItem image={item}/>}
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.sliderContainer}
      />
    );
  };

  const renderTitle = () => {
    return(
      <View style={styles.titleContainer}>
        <View>
          <Text style={[Gs.h1, Gs.textBlack]}>Homemade Office</Text>
          <Text style={Gs.textGrey}>Jalan Angsa Putih No. 2</Text>
        </View>
        <View style={Gs.flexRow}>
          <Image source={require('../../../assets/icons/star_yellow.png')}/>
          <Text style={[Gs.textBlack, Gs.h3]}>4.5/5</Text>
        </View>
      </View>
    );
  };

  const renderDescription = () => {
    return(
      <View style={styles.descriptionContainer}>
        <Text style={[Gs.h3, Gs.textBlack, styles.title]}>About</Text>
        <Text style={Gs.textGrey}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book. 
        </Text>
      </View>
    );
  };

  const renderOwner = () => {
    return(
      <View style={styles.ownerContainer}>
        <Text style={[Gs.h3, Gs.textBlack, styles.title]}>Space Owner</Text>
        <View style={[Gs.flexRow, Gs.itemsCenter]}>
          <Image 
            source={require('../../../assets/images/profile_2.png')} 
            style={styles.ownerImage} 
          />
          <View>
            <View style={Gs.flexRow}>
              <Text>Junubug</Text>
              <Image 
                source={require('../../../assets/icons/verified_orange.png')} 
                style={styles.icon}
              />
            </View>
            <Text style={[Gs.font700, Gs.textBlack]}>@junubug</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderBookingButton = () => {
    return(
      <View style={styles.bookingButtonContainer}>
        <View>
          <Text style={[Gs.textPrimary, Gs.h1]}>$5,899</Text>
          <Text style={Gs.textGrey}>/day</Text>
        </View>
        <View>
        <TouchableOpacity 
            style={styles.button} 
            onPress={async () => {
              navigation.navigate('Booking');
              await analytics().logEvent('button_booking');
            }}>
              <Text style={[Gs.textWhite, Gs.h3]}>Start Booking</Text>
              <Image  
                source={require('../../../assets/icons/arrow_right_white.png')}
                style={styles.icon}  
              />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}> 
      <Header 
        title="Office Details" 
        subtitle="Space available for today" 
        showRightButton
      />
      <ScrollView>
        {renderSlider()}
        {renderTitle()}
        {renderDescription()}
        {renderOwner()}
      </ScrollView>
      {renderBookingButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  sliderContainer:{
    paddingHorizontal: 24,
  },
  titleContainer: {
    ...Gs.flexRow,
    ...Gs.itemsCenter,
    ...Gs.justifyBetween,
    marginTop: 24,
    paddingHorizontal: 24,
  },
  title: {
    marginBottom: 10,
  },
  descriptionContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  ownerContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  ownerImage: {
    marginRight: 12,
  },
  icon: {
    marginLeft: 4,
  },
  bookingButtonContainer: {
    ...Gs.flexRow,
    ...Gs.justifyBetween,
    padding: 24,
  },
  button:{
    ...Gs.flexRow,
    ...Gs.cornerMD,
    paddingHorizontal: 22,
    paddingVertical: 14,
    backgroundColor: colors.primary,
  }
});

export default Details;
