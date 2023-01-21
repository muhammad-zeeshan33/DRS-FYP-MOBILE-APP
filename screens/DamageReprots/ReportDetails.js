import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from 'react-native-elements';
import axios from '../../axios';
import AuthContext from '../../contexts/AuthContext';
import DetailsItem from '../../components/DetailsItem';
import { LinearProgress } from 'react-native-elements';

const ReportDetails = ({ navigation, route }) => {
  const [fundDetails, setFundDetails] = useState(null);
  const [details, setDetails] = useState(null);

  const { user } = useContext(AuthContext);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/end-users/funds/' + route.params.id, config);
        console.log(res.data, 'Res data');
        setDetails(res.data);
        if (res.data.length > 0) {
          const transformed = Object.keys(res.data[0]).map((key) => {
            if (key == 'user') {
              return {
                title: 'Effectee Name',
                value: res.data[0][key].name,
              };
            } else if (key == 'createdAt') {
              return {
                title: 'Release Date',
                value: res.data[0][key].split('T')[0],
              };
            } else if (key == 'expectedDamageCost') {
              return {
                title: 'Expected Damage Cost',
                value: 'PKR ' + res.data[0][key],
              };
            } else if (key == 'alottedFund') {
              return {
                title: 'Alloted Fund',
                value: 'PKR ' + res.data[0][key],
              };
            } else {
              return {
                title: '',
                value: '',
              };
            }
          });
          setFundDetails(transformed);
        } else {
          setFundDetails([]);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  let content = <LinearProgress color="primary" style={{ marginTop: 10 }}></LinearProgress>;
  if (fundDetails && fundDetails.length > 0) {
    content = (
      <View style={styles.box}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../assets/success.png')}
            style={{ width: 100, height: 100 }}
          ></Image>
          <Text style={{ fontSize: 14, color: '#44B000' }}>Fund is Allotted to you</Text>
        </View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }}>
          Fund Alottment Details
        </Text>
        <Card.Divider></Card.Divider>
        {fundDetails.map((item) => {
          if (item.title != '') {
            return <DetailsItem key={item.title} title={item.title} value={item.value} />;
          }
        })}
      </View>
    );
  } else {
    content = (
      <View style={{ alignSelf: 'center' }}>
        <Ionicons
          style={{ alignSelf: 'center', marginTop: 50 }}
          name="alert-circle-outline"
          size={50}
          color="orange"
        />
        <Text style={{ textAlign: 'center' }}>No Funds Information Found</Text>
      </View>
    );
  }
  return <View style={styles.container}>{content}</View>;
};

export default ReportDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    alignItems: 'center',
  },
  box: {
    padding: 20,
    marginTop: 10,
    width: 300,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
