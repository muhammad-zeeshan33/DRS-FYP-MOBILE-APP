import { StyleSheet, Text, View, ScrollView, Dimensions, RefreshControl } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from '../../axios';

import AuthContext from '../../contexts/AuthContext';

const { width } = Dimensions.get('screen');

const Alerts = () => {
  //fetch data from api/end-users/alerts/view
  const [alerts, setAlerts] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AuthContext);
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    (async () => {
      try {
        const response = await axios.get('/api/end-users/alerts/view', config);
        console.log(response.data);
        setAlerts(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {alerts &&
        alerts.map((alert) => (
          <View style={styles.alertItem}>
            <View>
              <Ionicons name="notifications-outline" size={35} color="orange"></Ionicons>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemText}>
                <Text style={styles.majorTxt}> {alert.severity} </Text> Alert of{' '}
                <Text style={{ ...styles.majorTxt, color: 'orange' }}>{alert.type}</Text> in{' '}
                <Text style={styles.majorTxt}>{alert.city}</Text> and nearby areas
              </Text>
            </View>
          </View>
        ))}
    </ScrollView>
  );
};

export default Alerts;

const styles = StyleSheet.create({
  container: {
    width: width,
    padding: 20,
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  itemContent: {
    width: width * 0.7,
  },
  alertItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemText: {
    marginLeft: 20,
    color: 'black',
  },
  majorTxt: {
    fontWeight: 'bold',
  },
});
