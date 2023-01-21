import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import Input from '../../components/Input';
import DropDownPicker from 'react-native-dropdown-picker';
import { firebase } from '../../firebase/firebase';
import Button from '../../components/Button';
import ToastManager, { Toast } from 'toastify-react-native';

import * as DocumentPicker from 'expo-document-picker';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { Overlay } from 'react-native-elements';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';
import axios from '../../axios';
import AuthContext from '../../contexts/AuthContext';
const { width, height } = Dimensions.get('screen');
const Create = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [disasterPickerOpen, setDisasterPickerOpen] = useState(false);
  const [assetTypeOpen, setassetTypeOpen] = useState(false);

  const [disaster, setDisaster] = useState(null);
  const [expectedDamage, setExpectedDamage] = useState(null);
  const [reqTitle, setReqTitle] = useState(null);
  const [assetType, setassetType] = useState(null);
  const [file, setFile] = useState(null);
  const [ownseShipFile, setOwnseShipFile] = useState(null);
  const [ownseShipFileURL, setOwnseShipFileURL] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  //   const [assetType, setassetType] = useState('');
  const [floods, setFloods] = useState([
    { label: 'Sindh Floods', value: 'Sindh Floods' },
    { label: 'Kpk Floods', value: 'Kpk Floods' },
    { label: 'Balochistan Floods', value: 'Balochistan Floods' },
  ]);
  const [assetTypes, setassetTypes] = useState([
    { label: 'Vehicle', value: 'Vehicle' },
    { label: 'Building', value: 'Building' },
    { label: 'Gadgets', value: 'Gadgets' },
  ]);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({});
      const storage = firebase.storage();
      const storageRef = ref(storage, `damageReportImages/${response.name}`);
      const res = await fetch(response.uri);
      const blob = await res.blob();
      setFile(response);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      setUploading(true);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          // setProgress(prog);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL);
            setImageURL(downloadURL);
            setUploading(false);
          });
        }
      );
    } catch (err) {
      console.warn(err);
    }
  });

  const handleOwnershipProofSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({});
      const storage = firebase.storage();
      const storageRef = ref(storage, `OwnershipDocuments/${response.name}`);
      const res = await fetch(response.uri);
      const blob = await res.blob();
      setOwnseShipFile(response);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      setUploading(true);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          // setProgress(prog);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL);
            setOwnseShipFileURL(downloadURL);
            setUploading(false);
          });
        }
      );
    } catch (err) {
      console.warn(err);
    }
  });

  const handleSubmit = async () => {
    setLoading(true);
    let { token: _, ...rest } = user;
    try {
      const res = await axios.post(
        '/api/end-users/damage-reports/create',
        {
          title: reqTitle,
          user: rest,
          asset: assetType,
          disaster,
          assetImg: imageURL,
          ownerShipProofDoc: ownseShipFileURL,
          expectedDamage,
        },
        config
      );
      console.log(res.data);
      //   setVisible(true);
      setLoading(false);
      Toast.success('Submitted');
      setTimeout(() => {
        navigation.navigate('Home');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = () => {
    setVisible(false);
    navigation.navigate('Home');
  };
  return (
    <>
      <ToastManager />
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>Fill in the below form</Text>
          <Block flex={1} middle space="between">
            <Block center flex={0.9}>
              <Block flex space="between">
                <Block>
                  <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                    <Text style={{ marginBottom: 0, color: '#999', marginTop: 10 }}>
                      Request Title
                    </Text>
                    <Input
                      placeholder="Request Title"
                      style={styles.inputs}
                      onChangeText={(val) => setReqTitle(val)}
                    />
                  </Block>
                  <Block width={width * 0.8}>
                    <Text style={{ marginBottom: 5, color: '#999' }}>Asset</Text>

                    <DropDownPicker
                      placeholder="Select Asset Type"
                      open={assetTypeOpen}
                      value={assetType}
                      items={assetTypes}
                      setOpen={setassetTypeOpen}
                      setValue={setassetType}
                      setItems={setassetTypes}
                      style={{ borderColor: '#ddd' }}
                      placeholderStyle={{
                        color: '#888',
                        fontWeight: 'bold',
                      }}
                    />
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                    <Text style={{ marginBottom: 0, color: '#999', marginTop: 10 }}>
                      Expected Damage
                    </Text>
                    <Input
                      placeholder="Expected Damage in PKR"
                      style={styles.inputs}
                      keyboardType="numeric"
                      onChangeText={(val) => setExpectedDamage(val)}
                    />
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                    <Text style={{ marginBottom: 5, color: '#999' }}>Disaster</Text>
                    <DropDownPicker
                      placeholder="Select a disaster"
                      open={disasterPickerOpen}
                      value={disaster}
                      items={floods}
                      setOpen={setDisasterPickerOpen}
                      setValue={setDisaster}
                      setItems={setFloods}
                      style={{ borderColor: '#ddd' }}
                      placeholderStyle={{
                        color: '#888',
                        fontWeight: 'bold',
                      }}
                    />
                  </Block>

                  <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                    <Text style={{ marginBottom: 5, color: '#999', marginTop: 10 }}>Image</Text>
                    <TouchableOpacity style={styles.button} onPress={handleDocumentSelection}>
                      <Text>Choose Image</Text>
                    </TouchableOpacity>
                    <Text>{file && file.name}</Text>
                  </Block>

                  <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                    <Text style={{ marginBottom: 5, color: '#999', marginTop: 5 }}>
                      Ownership Proof
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={handleOwnershipProofSelection}>
                      <Text>Choose file</Text>
                    </TouchableOpacity>
                    <Text>{ownseShipFile && ownseShipFile.name}</Text>
                  </Block>
                  {uploading && (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: 'green' }}>Uploading Images...</Text>
                    </View>
                  )}
                  {assetType &&
                    imageURL &&
                    disaster &&
                    reqTitle &&
                    (expectedDamage != null || expectedDamage != '') &&
                    ownseShipFileURL && (
                      <Button
                        color="secondary"
                        style={{ borderRadius: 50, alignSelf: 'center', width: width * 0.8 }}
                        onPress={handleSubmit}
                        //   onPress={() => navigation.navigate('Home')}
                      >
                        {loading ? (
                          <ActivityIndicator size="small" color="#fff"></ActivityIndicator>
                        ) : (
                          'SUBMIT'
                        )}
                      </Button>
                    )}
                </Block>
                <Overlay isVisible={visible} onBackdropPress={() => {}}>
                  <View style={{ padding: 30, margin: 10, textAlign: 'center' }}>
                    <Image
                      source={require('../../assets/success.png')}
                      style={{ width: 100, height: 100, alignSelf: 'center' }}
                    />
                    <Text style={{ alignSelf: 'center' }}>Report Created</Text>
                    <Button
                      color="secondary"
                      style={{ borderRadius: 50, alignSelf: 'center' }}
                      // onPress={() => navigation.navigate('Damage Reports')}
                      // onPress={() => setVisible(false)}
                      onPress={handleModal}
                    >
                      OK
                    </Button>
                  </View>
                </Overlay>
              </Block>
            </Block>
          </Block>
        </View>
      </View>
    </>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  },
  formContainer: {
    padding: 20,
    marginTop: 10,
    backgroundColor: '#fff',
    width: width * 0.9,
    height: height * 0.8,
    borderRadius: 10,
    shadowColor: '#666',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 10,
  },
});
