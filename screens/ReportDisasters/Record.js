import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from '../../components';
import { Video } from 'expo-av';
const WINDOW_HEIGHT = Dimensions.get('window').height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);
export default function App({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [videoSource, setVideoSource] = useState(null);
  const [pictureSource, setPictureSource] = useState(null);
  const cameraRef = useRef();
  useEffect(() => {
    (async () => {
      const { camStatus } = await Camera.requestCameraPermissionsAsync();
      const { micStatus } = await Camera.requestMicrophonePermissionsAsync();
      setHasPermission(true);
    })();
  }, []);
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        setPictureSource(source);
        console.log('picture source', source);
      }
    }
  };
  const recordVideo = async () => {
    if (cameraRef.current) {
      const options = {
        maxDuration: 15,
      };
      try {
        const videoRecordPromise = cameraRef.current.recordAsync(options);
        if (videoRecordPromise) {
          setIsVideoRecording(true);
          const data = await videoRecordPromise;
          const source = data.uri;
          if (source) {
            setIsPreview(true);
            console.log('video source', source);
            setVideoSource(source);
          }
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };
  const stopVideoRecording = () => {
    if (cameraRef.current) {
      setIsPreview(false);
      setIsVideoRecording(false);
      cameraRef.current.stopRecording();
    }
  };
  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
    setVideoSource(null);
  };
  const renderCancelPreviewButton = () => (
    <View style={styles.proceedBtn}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button small center color="default" onPress={cancelPreview}>
          Discard
        </Button>
        <Button
          small
          color="success"
          onPress={() =>
            navigation.navigate('Floods', {
              video: videoSource ? videoSource : pictureSource ? pictureSource : null,
              formTitle: 'Flood Report Form',
              type: 'flood',
            })
          }
        >
          Proceed
        </Button>
      </View>
    </View>
  );

  const renderVideoPlayer = () => (
    <Video
      source={{ uri: videoSource }}
      resizeMode={'cover'}
      shouldPlay={true}
      style={styles.media}
      // isLooping
      // useNativeControls
    />
  );
  const renderVideoRecordIndicator = () => (
    <View style={styles.recordIndicatorContainer}>
      <View style={styles.recordDot} />
      <Text style={styles.recordTitle}>{'Recording...'}</Text>
    </View>
  );
  const renderCaptureControl = () => (
    <View style={styles.control}>
      <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
        <Text style={styles.text}>{'Flip'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!isCameraReady}
        onLongPress={recordVideo}
        onPressOut={stopVideoRecording}
        onPress={takePicture}
        style={styles.capture}
      />
    </View>
  );
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        // flashMode={Camera.Constants.FlashMode.on}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log('cammera error', error);
        }}
      />
      <View style={styles.container}>
        {isVideoRecording && renderVideoRecordIndicator()}
        {videoSource && renderVideoPlayer()}
        {isPreview && renderCancelPreviewButton()}
        {!videoSource && !isPreview && renderCaptureControl()}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    // position: 'absolute',
    // top: 35,
    // left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4c5c4',
    opacity: 0.7,
    // zIndex: 2,
  },
  proceedBtn: {
    position: 'absolute',
    bottom: '10%',
    left: '25%',
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#c4c5c4',
    zIndex: 2,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: '68%',
    height: 1,
    backgroundColor: 'black',
  },
  control: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 38,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  capture: {
    backgroundColor: '#f5f6f5',
    borderRadius: 5,
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  recordIndicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: '#red',
    marginHorizontal: 5,
  },
  text: {
    color: '#fff',
  },
});
