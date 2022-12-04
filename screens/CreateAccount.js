import React, { useContext } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import Container, { Toast } from 'toastify-react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';
import axios from '../axios';
import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import AuthContext from '../contexts/AuthContext';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class CreateAccount extends React.Component {
  state = {
    credentials: {
      email: '',
      password: '',
      cnic: '',
      phone: '',
      name: '',
    },
  };

  static contextType = AuthContext;

  registerHandler = async () => {
    if (
      this.state.credentials.email == '' ||
      this.state.credentials.password == '' ||
      this.state.credentials.cnic == '' ||
      this.state.credentials.phone == '' ||
      this.state.credentials.name == ''
    ) {
      Toast.error('Some fields are missing');
      //   ToastAndroid.show('Some fields are missing', ToastAndroid.SHORT);
    } else {
      try {
        const res = await axios.post('/api/end-users/', { ...this.state.credentials });
        this.context.login(res.data);
        this.props.navigation.navigate('App');
      } catch (e) {
        console.log(e);
        ToastAndroid.show('Account Creation Failed', ToastAndroid.SHORT);
      }
    }
  };
  render() {
    return (
      <>
        <Container position="top"></Container>
        <DismissKeyboard>
          <Block flex middle>
            <ImageBackground
              source={Images.RegisterBackground}
              style={styles.imageBackgroundContainer}
              imageStyle={styles.imageBackground}
            >
              <Block flex middle>
                <Block style={styles.registerContainer}>
                  <Block flex space="evenly">
                    <Block flex={0.4} middle style={styles.socialConnect}>
                      <Block flex={0.5} middle>
                        <Text
                          style={{
                            fontFamily: 'montserrat-regular',
                            textAlign: 'center',
                          }}
                          color="#333"
                          size={24}
                        >
                          CREATE ACCOUNT
                        </Text>
                      </Block>
                    </Block>
                    <Block flex={1} middle space="between">
                      <Block center flex={0.9}>
                        <Block flex space="between">
                          <Block>
                            <Block width={width * 0.8}>
                              <Input
                                placeholder="Email"
                                style={styles.inputs}
                                onChangeText={(val) => {
                                  this.setState({
                                    ...this.state,
                                    credentials: {
                                      ...this.state.credentials,
                                      email: val,
                                    },
                                  });
                                }}
                                iconContent={
                                  <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    name="email-852x"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                  />
                                }
                              />
                            </Block>
                            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                              <Input
                                placeholder="Password"
                                password
                                viewPass
                                style={styles.inputs}
                                onChangeText={(val) => {
                                  this.setState({
                                    ...this.state,
                                    credentials: {
                                      ...this.state.credentials,
                                      password: val,
                                    },
                                  });
                                }}
                                iconContent={
                                  <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    name="profile-circle"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                  />
                                }
                              />
                            </Block>
                            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                              <Input
                                placeholder="Name"
                                style={styles.inputs}
                                onChangeText={(val) => {
                                  this.setState({
                                    ...this.state,
                                    credentials: {
                                      ...this.state.credentials,
                                      name: val,
                                    },
                                  });
                                }}
                                iconContent={
                                  <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    name="profile-circle"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                  />
                                }
                              />
                            </Block>
                            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                              <Input
                                placeholder="Phone"
                                style={styles.inputs}
                                onChangeText={(val) => {
                                  this.setState({
                                    ...this.state,
                                    credentials: {
                                      ...this.state.credentials,
                                      phone: val,
                                    },
                                  });
                                }}
                                iconContent={
                                  <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    name="profile-circle"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                  />
                                }
                              />
                            </Block>
                            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                              <Input
                                placeholder="Cnic"
                                style={styles.inputs}
                                onChangeText={(val) => {
                                  this.setState({
                                    ...this.state,
                                    credentials: {
                                      ...this.state.credentials,
                                      cnic: val,
                                    },
                                  });
                                }}
                                iconContent={
                                  <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    name="profile-circle"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                  />
                                }
                              />
                            </Block>
                          </Block>
                          <Block center>
                            <Button
                              color="primary"
                              onPress={this.registerHandler}
                              round
                              style={styles.createButton}
                            >
                              <Text
                                style={{ fontFamily: 'montserrat-bold' }}
                                size={14}
                                color={nowTheme.COLORS.WHITE}
                              >
                                Register
                              </Text>
                            </Button>
                            <Text>
                              Already have account ?{' '}
                              <TouchableWithoutFeedback
                                onPress={() => this.props.navigation.navigate('Login')}
                              >
                                <Text style={{ color: 'orange' }}>Login</Text>
                              </TouchableWithoutFeedback>
                            </Text>
                          </Block>
                          <Block></Block>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ImageBackground>
          </Block>
        </DismissKeyboard>
      </>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});

export default CreateAccount;
