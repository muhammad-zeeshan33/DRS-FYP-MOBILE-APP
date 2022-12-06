import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import AuthContext from '../contexts/AuthContext';

import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <Block
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Block flex={0.6}>
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <Block flex style={styles.profileCard}>
            <Block style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}>
              <Block middle style={{ top: height * 0.15 }}>
                <Image source={require('../assets/avatar.png')} style={styles.avatar} />
              </Block>
              <Block style={{ top: height * 0.2 }}>
                <Block middle>
                  <Text
                    style={{
                      fontFamily: 'montserrat-bold',
                      marginBottom: theme.SIZES.BASE / 2,
                      fontWeight: '900',
                      fontSize: 26,
                    }}
                    color="#ffffff"
                  >
                    {user.name}
                  </Text>

                  <Text
                    size={16}
                    color="white"
                    style={{
                      marginTop: 5,
                      fontFamily: 'montserrat-bold',
                      lineHeight: 20,
                      fontWeight: 'bold',
                      fontSize: 18,
                      opacity: 0.8,
                    }}
                  >
                    Effectee Account
                  </Text>
                </Block>
              </Block>
            </Block>

            <Block
              middle
              row
              style={{ position: 'absolute', width: width, top: height * 0.6 - 26, zIndex: 99 }}
            ></Block>
          </Block>
        </ImageBackground>
      </Block>
      <Block />
      <Block flex={0.4} style={{ padding: theme.SIZES.BASE, marginTop: 90 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block flex style={{ marginTop: 20 }}>
            <Block middle>
              <Text
                style={{
                  color: '#2c2c2c',
                  fontWeight: 'bold',
                  fontSize: 19,
                  fontFamily: 'montserrat-bold',
                  marginTop: 15,
                  marginBottom: 30,
                  zIndex: 2,
                }}
              >
                General Information
              </Text>
              <View>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}
                >
                  <Text
                    size={16}
                    muted
                    style={{
                      textAlign: 'center',
                      fontFamily: 'montserrat-regular',
                      zIndex: 2,
                      lineHeight: 25,
                      color: '#9A9A9A',
                      paddingHorizontal: 15,
                    }}
                  >
                    Name
                  </Text>
                  <Text
                    size={16}
                    muted
                    style={{
                      textAlign: 'center',
                      fontFamily: 'montserrat-regular',
                      zIndex: 2,
                      lineHeight: 25,
                      color: '#9A9A9A',
                      paddingHorizontal: 15,
                    }}
                  >
                    {user.name}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}
                >
                  <Text
                    size={16}
                    muted
                    style={{
                      textAlign: 'center',
                      fontFamily: 'montserrat-regular',
                      zIndex: 2,
                      lineHeight: 25,
                      color: '#9A9A9A',
                      paddingHorizontal: 15,
                    }}
                  >
                    Email
                  </Text>
                  <Text
                    size={16}
                    muted
                    style={{
                      textAlign: 'center',
                      fontFamily: 'montserrat-regular',
                      zIndex: 2,
                      lineHeight: 25,
                      color: '#9A9A9A',
                      paddingHorizontal: 15,
                    }}
                  >
                    {user.email}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}
                >
                  <Text
                    size={16}
                    muted
                    style={{
                      textAlign: 'center',
                      fontFamily: 'montserrat-regular',
                      zIndex: 2,
                      lineHeight: 25,
                      color: '#9A9A9A',
                      paddingHorizontal: 15,
                    }}
                  >
                    CNIC
                  </Text>
                  <Text
                    size={16}
                    muted
                    style={{
                      textAlign: 'center',
                      fontFamily: 'montserrat-regular',
                      zIndex: 2,
                      lineHeight: 25,
                      color: '#9A9A9A',
                      paddingHorizontal: 15,
                    }}
                  >
                    {user.cnic}
                  </Text>
                </View>
              </View>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width,
    height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width,
    height: height * 0.6,
  },

  info: {
    marginTop: 30,
    paddingHorizontal: 10,
    height: height * 0.8,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80,
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  social: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5,
  },
});

export default Profile;
