import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import axios from '../../axios';
import AuthContext from '../../contexts/AuthContext';
import Card from '../../components/BaseCard';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Block, theme } from 'galio-framework';

const { width } = Dimensions.get('screen');

const DamageReports = () => {
  const [reports, setReports] = useState(null);

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
        const res = await axios.get('/api/end-users/damage-reports/get/' + user._id, config);
        console.log(res.data);
        if (res.data.reports) {
          const transformed = res.data.reports.map((report) => {
            return {
              image: require('../../assets/imgs/reg-img.jpg'),
              title: report.title,
              subtitle: 'Pkr ' + report.expectedDamageCost,
              description: report.asset,
              horizontal: true,
              // details: report.description,
              approved: report.is_approved,
              // sourceURL: report.sourceURL,
              key: report._id,
            };
          });
          setReports(transformed);
        } else {
          setReports(null);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  let content = null;
  if (reports && reports.length > 0) {
    content = reports.map((r) => <Card key={r.key} item={r} horizontal />);
  } else {
    content = (
      <View style={{ alignSelf: 'center' }}>
        <Ionicons
          style={{ alignSelf: 'center', marginTop: 50 }}
          name="alert-circle-outline"
          size={50}
          color="orange"
        />
        <Text style={{ textAlign: 'center' }}>You did not created any reports yet</Text>
      </View>
    );
  }
  return (
    <Block style={styles.container}>
      <ScrollView style={styles.reports}>
        {reports &&
          reports.map((r) => {
            return;
          })}
      </ScrollView>
    </Block>
  );
};

export default DamageReports;

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#fff',
  },
  reports: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
});
