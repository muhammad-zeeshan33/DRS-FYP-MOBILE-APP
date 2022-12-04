// import React, { useCallback, useEffect, useRef } from 'react';
// import { Animated, Image, StatusBar, StyleSheet, Text, View, Easing } from 'react-native';
// import { Video } from 'expo-av';

// import VideoModel from './videosData';
// import { WINDOW_HEIGHT, WINDOW_WIDTH } from './utils';
// import { getMusicNoteAnim } from './utils';

// export default function VideoItem({ data, isActive }) {
//   const { sourceURL, caption, channelName, musicName, likes, comments, avatarUri } = data;
//   console.log(sourceURL);
//   const discAnimatedValue = useRef(new Animated.Value(0)).current;
//   const musicNoteAnimatedValue1 = useRef(new Animated.Value(0)).current;
//   const musicNoteAnimatedValue2 = useRef(new Animated.Value(0)).current;

//   const discAnimation = {
//     transform: [
//       {
//         rotate: discAnimatedValue.interpolate({
//           inputRange: [0, 1],
//           outputRange: ['0deg', '360deg'],
//         }),
//       },
//     ],
//   };
//   const musicNoteAnimation1 = getMusicNoteAnim(musicNoteAnimatedValue1, false);
//   const musicNoteAnimation2 = getMusicNoteAnim(musicNoteAnimatedValue2, true);

//   const discAnimLoopRef = useRef();
//   const musicAnimLoopRef = useRef();

//   const triggerAnimation = useCallback(() => {
//     discAnimLoopRef.current = Animated.loop(
//       Animated.timing(discAnimatedValue, {
//         toValue: 1,
//         duration: 3000,
//         easing: Easing.linear,
//         useNativeDriver: false,
//       })
//     );
//     discAnimLoopRef.current.start();
//     musicAnimLoopRef.current = Animated.loop(
//       Animated.sequence([
//         Animated.timing(musicNoteAnimatedValue1, {
//           toValue: 1,
//           duration: 2000,
//           easing: Easing.linear,
//           useNativeDriver: false,
//         }),
//         Animated.timing(musicNoteAnimatedValue2, {
//           toValue: 1,
//           duration: 2000,
//           easing: Easing.linear,
//           useNativeDriver: false,
//         }),
//       ])
//     );
//     musicAnimLoopRef.current.start();
//   }, [discAnimatedValue, musicNoteAnimatedValue1, musicNoteAnimatedValue2]);

//   useEffect(() => {
//     if (isActive) {
//       triggerAnimation();
//     } else {
//       discAnimLoopRef.current?.stop();
//       musicAnimLoopRef.current?.stop();
//       discAnimatedValue.setValue(0);
//       musicNoteAnimatedValue1.setValue(0);
//       musicNoteAnimatedValue2.setValue(0);
//     }
//   }, [
//     isActive,
//     triggerAnimation,
//     discAnimatedValue,
//     musicNoteAnimatedValue1,
//     musicNoteAnimatedValue2,
//   ]);

//   // const bottomTabHeight = useBottomTabBarHeight();
//   const statusBarHeight = StatusBar.currentHeight || 0;
//   return (
//     <View style={[styles.container, { height: WINDOW_HEIGHT }]}>
//       <StatusBar barStyle={'light-content'} />
//       <Video
//         source={{
//           uri: sourceURL,
//         }}
//         // status={!isActive}
//         style={styles.video}
//         shouldPlay
//         resizeMode="cover"
//         // isLooping={!isActive}
//       />

//       <View style={styles.bottomSection}>
//         <View style={styles.bottomLeftSection}>
//           <Text style={styles.channelName}>{channelName}</Text>
//           <Text style={styles.caption}>{caption}</Text>
//           <View style={styles.musicNameContainer}>
//             <Image
//               source={require('./assets/images/music-note.png')}
//               style={styles.musicNameIcon}
//             />
//             <Text style={styles.musicName}>{musicName}</Text>
//           </View>
//         </View>
//         <View style={styles.bottomRightSection}>
//           {/* <Animated.Image
//             source={require('./assets/images/floating-music-note.png')}
//             style={[styles.floatingMusicNote, musicNoteAnimation1]}
//           /> */}
//           {/* <Animated.Image
//             source={require('./assets/images/floating-music-note.png')}
//             style={[styles.floatingMusicNote, musicNoteAnimation2]}
//           />
//           <Animated.Image
//             source={require('./assets/images/disc.png')}
//             style={[styles.musicDisc, discAnimation]}
//           /> */}
//         </View>
//       </View>

//       {/* <View style={styles.verticalBar}>
//         <View style={[styles.verticalBarItem, styles.avatarContainer]}>
//           <Image style={styles.avatar} source={{ uri: avatarUri }} />
//           <View style={styles.followButton}>
//             <Image source={require('./assets/images/plus-button.png')} style={styles.followIcon} />
//           </View>
//         </View>
//         <View style={styles.verticalBarItem}>
//           <Image style={styles.verticalBarIcon} source={require('./assets/images/heart.png')} />
//           <Text style={styles.verticalBarText}>{likes}</Text>
//         </View>
//         <View style={styles.verticalBarItem}>
//           <Image
//             style={styles.verticalBarIcon}
//             source={require('./assets/images/message-circle.png')}
//           />
//           <Text style={styles.verticalBarText}>{comments}</Text>
//         </View>
//         <View style={styles.verticalBarItem}>
//           <Image style={styles.verticalBarIcon} source={require('./assets/images/reply.png')} />
//           <Text style={styles.verticalBarText}>Share</Text>
//         </View>
//       </View> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: WINDOW_WIDTH,
//   },
//   video: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },
//   bottomSection: {
//     position: 'absolute',
//     bottom: 0,
//     flexDirection: 'row',
//     width: '100%',
//     paddingHorizontal: 8,
//     paddingBottom: 16,
//   },
//   bottomLeftSection: {
//     flex: 4,
//   },
//   bottomRightSection: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
//   },
//   channelName: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   caption: {
//     color: 'white',
//     marginVertical: 8,
//   },
//   musicNameContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   musicNameIcon: {
//     width: 12,
//     height: 12,
//     marginRight: 8,
//   },
//   musicName: {
//     color: 'white',
//   },
//   musicDisc: {
//     width: 40,
//     height: 40,
//   },
//   verticalBar: {
//     position: 'absolute',
//     right: 8,
//     bottom: 72,
//   },
//   verticalBarItem: {
//     marginBottom: 24,
//     alignItems: 'center',
//   },
//   verticalBarIcon: {
//     width: 32,
//     height: 32,
//   },
//   verticalBarText: {
//     color: 'white',
//     marginTop: 4,
//   },
//   avatarContainer: {
//     marginBottom: 48,
//   },
//   avatar: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//   },
//   followButton: {
//     position: 'absolute',
//     bottom: -8,
//   },
//   followIcon: {
//     width: 21,
//     height: 21,
//   },
//   floatingMusicNote: {
//     position: 'absolute',
//     right: 40,
//     bottom: 16,
//     width: 16,
//     height: 16,
//     tintColor: 'white',
//   },
// });

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
// importing the dependency didn't work in the snack so I just copied the file and accessed it manually
import InViewPort from './InViewPort';

export default class VideoPlayer extends React.Component {
  pauseVideo = () => {
    if (this.video) {
      this.video.pauseAsync();
    }
  };

  playVideo = () => {
    if (this.video) {
      this.video.playAsync();
    }
  };

  handlePlaying = (isVisible) => {
    isVisible ? this.playVideo() : this.pauseVideo();
  };

  render() {
    return (
      <View style={styles.container}>
        <InViewPort onChange={this.handlePlaying}>
          <Video
            ref={(ref) => {
              this.video = ref;
            }}
            source={{ uri: this.props.item.sourceURL }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{ width: 300, height: 400 }}
          />
        </InViewPort>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
