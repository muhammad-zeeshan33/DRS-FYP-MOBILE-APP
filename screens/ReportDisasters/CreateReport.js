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

  renderCards = () => {
    return (
      <Block style={styles.container}>
        <Block flex row>
          <Card item={this.floods} style={{ marginRight: theme.SIZES.BASE }} navigateTo="Record" />
          <Card item={this.earthquack} navigateTo="Record" />
        </Block>
      </Block>
    );
  };
  render() {
    return (
      <Block flex>
        <ScrollView showsVerticalScrollIndicator={false}>{this.renderCards()}</ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
