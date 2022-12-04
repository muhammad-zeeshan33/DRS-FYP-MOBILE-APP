import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import AuthContext from '../contexts/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native';
// import { Badge } from 'react-native-elements';
import axios from '../axios';
import { Block, Text, theme } from 'galio-framework';
import { Button } from './';
import { Overlay } from 'react-native-elements';

import { nowTheme } from '../constants';

export class CampCard extends React.Component {
  static contextType = AuthContext;
  state = {
    visible: false,
    loading: false,
  };
  toggleOverlay = () => {
    this.setState({
      ...this.state,
      visible: !this.state.visible,
    });
  };

  config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.context.user.token}`,
    },
  };
  handleConfirm = async (campid, userid) => {
    const data = {
      camp_id: campid,
      user_id: userid,
    };
    this.setState({
      ...this.state,
      loading: true,
    });
    try {
      const response = await axios.post(
        '/api/end-users/registerations/register',
        data,
        this.config
      );
      if (response.data.hasOwnProperty('registeration')) {
        this.props.navigation.navigate('Home');
        ToastAndroid.show('Successfully Registered', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
      this.setState({
        ...this.state,
        loading: false,
      });
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      this.setState({
        ...this.state,
        loading: false,
      });
    }
  };

  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle,
    } = this.props;

    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
    ];

    let modalContent = (
      <>
        <Button
          color={'primary'}
          onPress={() => this.handleConfirm(item._id, this.context.user._id)}
          round
          style={{ ...styles.createButton, alignSelf: 'center', height: 40 }}
        >
          <Text style={{ color: '#fff' }}>Confirm</Text>
        </Button>
        <Button
          color={'secondary'}
          onPress={this.toggleOverlay}
          round
          style={{ ...styles.createButton, alignSelf: 'center', marginTop: 20, height: 40 }}
        >
          <Text style={{ color: '#fff' }}>Cancel</Text>
        </Button>
      </>
    );
    if (this.state.loading) {
      modalContent = (
        <ActivityIndicator
          size="large"
          // color={colors.secondary}
        ></ActivityIndicator>
      );
    }

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <Block flex style={imgContainer}>
          <Image resizeMode="cover" source={item.image} style={imageStyles} />
        </Block>
        <TouchableWithoutFeedback onPress={() => {}}>
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex>
              <Text
                style={{ fontFamily: 'montserrat-regular', ...titleStyles }}
                size={14}
                color={nowTheme.COLORS.SECONDARY}
              >
                {item.name}
              </Text>

              {item.city ? (
                <Block flex center>
                  <Text
                    style={{ fontFamily: 'montserrat-regular' }}
                    size={12}
                    color={nowTheme.COLORS.BLACK}
                  >
                    {item.city}
                  </Text>
                </Block>
              ) : (
                <Block />
              )}
              <Text
                style={{ fontFamily: 'montserrat-regular', ...titleStyles }}
                size={14}
                color={nowTheme.COLORS.SECONDARY}
              >
                {item.province}
              </Text>
              {item.allowed_registerations ? (
                <Block flex>
                  <View
                    style={{
                      backgroundColor: '#4BB543',
                      width: 100,
                      padding: 5,
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ color: '#fff', fontSize: 8, textAlign: 'center' }}>
                      Registerations Allowed
                    </Text>
                  </View>
                  {/* <Badge status="success" value="Approved" /> */}
                </Block>
              ) : (
                <Block>
                  <View
                    style={{
                      backgroundColor: '#ffcc00',
                      width: 100,
                      padding: 5,
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ color: '#333', fontSize: 8, textAlign: 'center' }}>
                      Regiserations Disabled
                    </Text>
                  </View>
                </Block>
              )}

              <Block flex left>
                <Text
                  style={{ fontFamily: 'montserrat-regular' }}
                  size={8}
                  color={nowTheme.COLORS.TEXT}
                >
                  {item.address}
                </Text>
              </Block>
            </Block>
            <Block right={ctaRight ? true : false}>
              <Text
                style={styles.articleButton}
                size={12}
                muted={!ctaColor}
                color={ctaColor || nowTheme.COLORS.ACTIVE}
                bold
              >
                {item.cta}
              </Text>
            </Block>

            <Block flex>
              <Button
                color={item.allowed_registerations ? 'secondary' : 'light'}
                disabled={!item.allowed_registerations}
                onPress={this.toggleOverlay}
                round
                style={styles.createButton}
              >
                <Text style={{ color: '#fff' }}>Register</Text>
              </Button>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
        <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}>
          <View style={{ padding: 30, margin: 10 }}>
            <Ionicons
              style={{ alignSelf: 'center' }}
              name="help-circle-outline"
              size={50}
              color="orange"
            />
            <Text
              style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}
            >
              Confirm{' '}
            </Text>
            <Text style={{ color: '#777', marginBottom: 30, textAlign: 'center' }}>
              Are you sure you want to register in this camp
            </Text>
            {/* <View style={{ display: 'flex', flexDirection: 'row' }}> */}
            {modalContent}
          </View>
          {/* </View> */}
        </Overlay>
      </Block>
    );
  }
}

CampCard.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 215,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  createButton: {
    height: 24,
    marginTop: 2,
    marginBottom: 2,
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
});

export default withNavigation(CampCard);
