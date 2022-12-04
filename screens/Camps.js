import React from 'react';
import { StyleSheet, Dimensions, ScrollView, ToastAndroid, View } from 'react-native';
import { Block, theme, Text, Toast } from 'galio-framework';
import Ionicons from '@expo/vector-icons/Ionicons';

import CampCard from '../components/CampCard';
import AuthContext from '../contexts/AuthContext';

import axios from '../axios';
const { width } = Dimensions.get('screen');

class Camps extends React.Component {
  static contextType = AuthContext;

  state = {
    camps: null,
    isShow: true,
  };

  config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.context.user.token}`,
    },
  };
  componentDidMount() {
    const getMycamps = async () => {
      try {
        const res = await axios.get('/api/end-users/emergency-camps/view', this.config);
        this.setState({
          ...this.state,
          camps: res.data,
        });
      } catch (error) {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
    };

    getMycamps();
  }

  renderRegisterations = (registeration) => {
    return <CampCard item={registeration} key={registeration._id} horizontal />;
  };

  render() {
    let registerations = null;
    if (this.state.camps && this.state.camps.length > 0) {
      registerations = this.state.camps.map((r) =>
        this.renderRegisterations({ ...r, image: require('../assets/imgs/camp.jpg') })
      );
    } else {
      registerations = (
        <View style={{ alignSelf: 'center' }}>
          <Ionicons
            style={{ alignSelf: 'center', marginTop: 50 }}
            name="alert-circle-outline"
            size={50}
            color="orange"
          />
          <Text style={{ textAlign: 'center' }}>No Camps Found</Text>
        </View>
      );
    }

    return (
      <Block flex center style={styles.home}>
        <Toast isShow={this.state.isShow} positionIndicator="center" color="success"></Toast>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
          <Block flex>{registerations}</Block>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
});

export default Camps;
