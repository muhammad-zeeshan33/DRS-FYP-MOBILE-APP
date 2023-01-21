import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';
import { Video } from 'expo-av';
//galio
import Ionicons from '@expo/vector-icons/Ionicons';

import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Button, Icon, Input } from '../../components';

import Card from '../../components/BaseCard';
import { nowTheme } from '../../constants/';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class CreateReports extends React.Component {
  floods = {
    // title: 'Floods',
    image: require('../../assets/imgs/floods.jpg'),
    cta: 'Report Floods',
    horizontal: true,
  };

  earthquack = {
    // title: 'Floods',
    image: require('../../assets/imgs/earthquake.jpg'),
    cta: 'Report Earthquake',
    horizontal: true,
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Record')}>
          <View
            style={{
              backgroundColor: '#f5f5f5',
              width: width / 2.3,
              height: height / 4,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Ionicons name="rainy-outline" size={50} />
            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Floods</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Record')}>
          <View
            style={{
              backgroundColor: '#f5f5f5',
              width: width / 2.3,
              height: height / 4,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              marginLeft: 10,
            }}
          >
            <Ionicons name="earth-outline" size={50} />
            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Earthquake</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // justifyContent:
    flexDirection: 'row',
    height: height,

    paddingHorizontal: theme.SIZES.BASE,
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER,
  },
});

export default CreateReports;
