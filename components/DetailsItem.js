import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Card } from 'react-native-elements';

const DetailsItem = (props) => {
  return (
    <>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{props.title}</Text>
        <Text>{props.value} </Text>
      </View>
      <Card.Divider></Card.Divider>
    </>
  );
};

export default DetailsItem;

const styles = StyleSheet.create({});
