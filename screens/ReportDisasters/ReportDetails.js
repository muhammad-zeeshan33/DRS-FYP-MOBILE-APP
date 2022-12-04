import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { Block } from 'galio-framework';
import { Video } from 'expo-av';
const ReportDetails = (props) => {
  const { sourceURL, type, location, province, description, approved } = props.route.params;
  console.log(approved);
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>REPORT DETAILS</Card.Title>
        <Card.Divider />
        <Video
          source={{ uri: sourceURL }}
          isLooping
          useNativeControls
          resizeMode="contain"
          style={{ width: 300, height: 300 }}
        />
        <Card.Divider />

        <View style={styles.detailsItem}>
          <Text style={{ fontWeight: 'bold' }}>Type</Text>
          <Text>{type}</Text>
        </View>
        <Card.Divider />

        <View style={styles.detailsItem}>
          <Text style={{ fontWeight: 'bold' }}>Province</Text>
          <Text>{province}</Text>
        </View>
        <Card.Divider />

        <View style={styles.detailsItem}>
          <Text style={{ fontWeight: 'bold' }}>Status</Text>
          {approved ? (
            <Block>
              <View
                style={{
                  backgroundColor: '#4BB543',
                  width: 50,
                  padding: 5,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 8, textAlign: 'center' }}>Approved</Text>
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
                <Text style={{ color: '#fff', fontSize: 8, textAlign: 'center' }}>Pending</Text>
              </View>
            </Block>
          )}
        </View>
        <Card.Divider />

        <View style={styles.detailsItem}>
          <Text>{location}</Text>
        </View>
        <Card.Divider />

        <View style={styles.detailsItem}>
          <Text>{description}</Text>
        </View>
      </Card>
    </View>
  );
};

export default ReportDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  detailsItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
