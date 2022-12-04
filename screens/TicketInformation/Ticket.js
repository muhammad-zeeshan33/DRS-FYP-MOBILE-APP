import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from 'react-native-elements';
import axios from '../../axios';
import AuthContext from '../../contexts/AuthContext';
import DetailsItem from '../../components/DetailsItem';
import { LinearProgress } from 'react-native-elements';
const Ticket = (props) => {
  const [ticket, setTicket] = useState(null);
  const [details, setDetails] = useState(null);

  const { regId } = props.route.params;
  const { user } = useContext(AuthContext);
  // console.log(user);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    const url = `/api/effecteee-camp/get-ticket/${regId}`;
    (async () => {
      try {
        const res = await axios.get(url, config);
        console.log(res.data);
        setDetails(res.data);
        const keys = Object.keys(res.data);

        const transformed = keys.map((key) => {
          if (key == 'ticket_no') {
            return {
              title: 'Ticket #',
              value: '#' + res.data[key],
            };
          } else if (key == 'arrival_on') {
            return {
              title: 'Arrival Date',
              value: res.data[key],
            };
          } else if (key == 'camp') {
            return {
              title: 'Tent No',
              value:
                res.data[key][0].camp_no < 10
                  ? '00' + res.data[key][0].camp_no
                  : res.data[key][0].camp_no < 100 && res.data[key][0].camp_no > 10
                  ? '0' + res.data[key][0].camp_no
                  : res.data[key][0].camp_no,
            };
          } else if (key == 'emergencyCamp') {
            return {
              title: 'Refugee Camp',
              value: res.data[key][0].name,
            };
          } else {
            return {
              title: '',
              value: '',
            };
          }
        });
        setTicket(transformed);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../assets/success.png')}
            style={{ width: 100, height: 100 }}
          ></Image>
          <Text style={{ fontSize: 14, color: '#44B000' }}>
            Your ticket number is {details && details.ticket_no}
          </Text>
        </View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }}>
          Ticket Details
        </Text>
        <Card.Divider></Card.Divider>
        {ticket ? (
          ticket.map((item) => {
            if (item.title != '') {
              return <DetailsItem key={item.title} title={item.title} value={item.value} />;
            }
          })
        ) : (
          <LinearProgress color="primary" style={{ marginTop: 10 }}></LinearProgress>
        )}
      </View>
    </View>
  );
};

export default Ticket;

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
