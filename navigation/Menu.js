import { Block, Text, theme } from 'galio-framework';
import { Dimensions, Image, Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerItem as DrawerCustomItem, Icon } from '../components';

import Images from '../constants/Images';
import React from 'react';
import nowTheme from '../constants/Theme';
import { useSafeArea } from 'react-native-safe-area-context';

const { width } = Dimensions.get('screen');

function CustomDrawerContent({ drawerPosition, navigation, profile, focused, state, ...rest }) {
  const insets = useSafeArea();
  const screens = ['Home', 'Damage Reports', 'Disaster Reports', 'Profile', 'Alerts'];
  return (
    <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <Block style={styles.header}>
        <Image style={styles.logo} source={Images.Logo} />
        <Block right style={styles.headerIcon}>
          <Icon name="align-left-22x" family="NowExtra" size={15} color={'black'} />
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          <DrawerCustomItem title="LOGOUT" navigation={navigation} />
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center',
  },
  headerIcon: {
    marginTop: -20,
  },
  logo: {
    height: 40,
    width: 37,
    tintColor: 'black',
  },
});

export default CustomDrawerContent;
