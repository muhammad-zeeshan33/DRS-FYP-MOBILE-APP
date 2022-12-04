import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { Button } from '../../components';
import { Text, Card, Icon } from '@rneui/themed';

const Success = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 8, alignSelf: 'center' }} h3>
        Report Submitted
      </Text>
      <Image source={require('../../assets/success.png')} style={{ width: 200, height: 200 }} />
      <Text style={{ fontSize: 16, textAlign: 'center' }}>Your report has been submitted </Text>
      <Button
        color="default"
        style={{ borderRadius: 50, alignSelf: 'center' }}
        onPress={() => navigation.navigate('Create Report')}
      >
        Back to Home
      </Button>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
