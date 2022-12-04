import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import Ionicons from '@expo/vector-icons/Ionicons';

import { StyleSheet, Image, TouchableWithoutFeedback, View } from 'react-native';
// import { Badge } from 'react-native-elements';

import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../constants';

class Card extends React.Component {
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

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            item.is_assigned &&
              navigation.navigate('Ticket Details', {
                regId: item._id,
              });
          }}
        >
          <Block flex style={imgContainer}>
            <Image resizeMode="cover" source={item.image} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            item.is_assigned &&
              navigation.navigate('Ticket Details', {
                regId: item._id,
              });
          }}
        >
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex>
              <Text
                style={{ fontFamily: 'montserrat-regular', ...titleStyles }}
                size={14}
                color={nowTheme.COLORS.SECONDARY}
              >
                {item.campDetails[0].name}
              </Text>

              {item.campDetails[0].city ? (
                <Block flex center>
                  <Text
                    style={{ fontFamily: 'montserrat-regular' }}
                    size={12}
                    color={nowTheme.COLORS.BLACK}
                  >
                    {item.campDetails[0].city}
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
                {item.campDetails[0].province}
              </Text>
              {item.is_approved ? (
                <Block flex>
                  <View
                    style={{
                      backgroundColor: '#4BB543',
                      width: 50,
                      padding: 5,
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ color: '#fff', fontSize: 8, textAlign: 'center' }}>
                      Approved
                    </Text>
                  </View>
                  {/* <Badge status="success" value="Approved" /> */}
                </Block>
              ) : (
                <Block>
                  <View
                    style={{
                      backgroundColor: '#ffcc00',
                      width: 50,
                      padding: 5,
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ color: 'fff', fontSize: 8, textAlign: 'center' }}>Pending</Text>
                  </View>
                </Block>
              )}

              <Block flex left>
                <Text
                  style={{ fontFamily: 'montserrat-regular' }}
                  size={8}
                  color={nowTheme.COLORS.TEXT}
                >
                  {item.campDetails[0].address}
                </Text>
                {item.is_assigned && (
                  <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                    <Ionicons
                      name="shield-checkmark-outline"
                      style={{ marginTop: 3, marginRight: 2 }}
                      size={12}
                      color={'#4BB543'}
                    />
                    <Text size={10} style={{ color: '#4BB543' }}>
                      This Registeration is allotted to camp slot, Tap for ticket information.
                    </Text>
                  </View>
                )}
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
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

Card.propTypes = {
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
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
});

export default withNavigation(Card);
