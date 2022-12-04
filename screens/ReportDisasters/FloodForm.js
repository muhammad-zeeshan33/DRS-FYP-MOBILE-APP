import { StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Icon, Input } from '../../components';
import { LinearProgress } from 'react-native-elements';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { firebase } from '../../firebase/firebase';
import AuthContext from '../../contexts/AuthContext';
import GetLocation from 'react-native-get-location';
import RadioButtonRN from 'radio-buttons-react-native';
// import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import * as Location from 'expo-location';
import axios from 'axios';
import app_axios from '../../axios';

const FloodForm = (props) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState();
  const [severity, setSeverity] = useState('');
  const [province, setProvince] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { type, formTitle, video } = props.route.params;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        console.log(status);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});

      try {
        const res = await axios.get(
          `https://us1.locationiq.com/v1/reverse?key=pk.56b24c30545e1e1035695c8f0ede356d&lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&format=json`
        );
        setProvince(res.data.address.state);
        setAddress(res.data.display_name);
      } catch (error) {
        console.log(error);
      }

      setLocation(loc);
    })();
  }, []);
  const { user } = useContext(AuthContext);

  const uploadHandler = async () => {
    const storage = firebase.storage();
    setLoading(true);
    const filename = video.substring(video.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `floods/${filename}`);

    const response = await fetch(video);
    const blob = await response.blob();
    const uploadTask = uploadBytesResumable(storageRef, blob);
    const sourceURL = '';
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // setProgress(prog);
      },
      (error) => {
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // console.log(downloadURL);
          // sourceURL = downloadURL;
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          };
          try {
            const reqData = {
              type,
              province,
              address,
              severity,
              sourceURL: downloadURL,
              description,
              coordinates: [location.coords.latitude, location.coords.longitude],
              uid: user._id,
            };

            const res = await app_axios.post('/api/end-users/reports/create', reqData, config);
            console.log(res.data);
            setLoading(false);
            props.navigation.navigate('Success');
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        });
      }
    );
  };

  const radioButtons = [
    {
      label: 'Minor',
    },
    {
      label: 'Slightly Severe',
    },
    {
      label: 'Severe',
    },
    {
      label: 'Very Severe',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }}>
          {formTitle}
        </Text>
        <Text>Severance Level</Text>
        <RadioButtonRN data={radioButtons} selectedBtn={(e) => setSeverity(e.label)} />
        <View style={{ ...styles.inputs, marginTop: 10 }}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={{ padding: 10 }}
            onChangeText={(text) => setDescription(text)}
            placeholder="Description"
            value={description}
          />
        </View>

        {loading ? (
          <>
            {/* <ActivityIndicator size="large" /> */}
            <Text style={{ textAlign: 'center' }}>Uploading Video...</Text>
            <LinearProgress color="primary" style={{ marginTop: 10 }} />
          </>
        ) : (
          description !== '' &&
          severity != ' ' && (
            <Button
              color="primary"
              style={{ borderRadius: 50, alignSelf: 'center' }}
              onPress={uploadHandler}
            >
              Submit
            </Button>
          )
        )}
      </View>
    </View>
  );
};

export default FloodForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    height: '90%',
    width: 320,
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 20,
    borderColor: '#ddd',
    display: 'flex',
    flexDirection: 'column',
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
  },
});
