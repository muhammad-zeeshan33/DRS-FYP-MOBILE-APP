import React from 'react';
import { RefreshControl, StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Block, theme, Text, Toast } from 'galio-framework';
import { Card, Button } from '../components';
import AuthContext from '../contexts/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';

import axios from '../axios';
const { width } = Dimensions.get('screen');

class Home extends React.Component {
  static contextType = AuthContext;

  state = {
    regs: null,
    isShow: true,
    refreshing: false,
  };

  onRefresh = () => {
    this.getMyRegs();
  };

  config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.context.user.token}`,
    },
  };
  componentDidMount() {
    this.getMyRegs();
  }

  getMyRegs = async () => {
    try {
      const response = await axios.get(
        `/api/end-users/registerations/get-my-regs/${this.context.user._id}`,
        this.config
      );
      console.log(response.data);
      this.setState({
        ...this.state,
        regs: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  renderRegisterations = (registeration) => {
    return <Card key={registeration._id} item={registeration} horizontal />;
  };

  render() {
    let registerations = null;
    if (this.state.regs && this.state.regs.length > 0) {
      registerations = this.state.regs.map((r) =>
        this.renderRegisterations({ ...r, image: require('../assets/imgs/reg-img.jpg') })
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
          <Text style={{ textAlign: 'center' }}>No Registerations Found</Text>
        </View>
      );
    }

    return (
      <Block flex center style={styles.home}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }
          contentContainerStyle={styles.articles}
        >
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

export default Home;
