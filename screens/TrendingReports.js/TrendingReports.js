// import React, { useEffect, useState, useContext } from 'react';
// import { FlatList, Image, StyleSheet } from 'react-native';

// import VideoItem from './VideoPlayer';
// import videosData from './videosData';
// import { WINDOW_HEIGHT } from './utils';
// import axios from '../../axios';
// import AuthContext from '../../contexts/AuthContext';
// const TrendingReports = () => {
//   const [activeVideoIndex, setActiveVideoIndex] = useState(0);
//   const [videos, setVideos] = useState(null);
//   //   const bottomTabHeight = useBottomTabBarHeight();

//   const { user } = useContext(AuthContext);
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${user.token}`,
//     },
//   };
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get('/api/end-users/reports/all', config);
//         console.log(res.data);
//         setVideos(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     })();
//   }, []);

//   return (
//     <>
//       {videos && (
//         <FlatList
//           data={videos}
//           pagingEnabled
//           renderItem={({ item, index }) => (
//             <VideoItem data={item} isActive={activeVideoIndex === index} />
//           )}
//           onScroll={(e) => {
//             const index = Math.round(e.nativeEvent.contentOffset.y / WINDOW_HEIGHT);
//             console.log(index);
//             setActiveVideoIndex(index);
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default TrendingReports;

// const styles = StyleSheet.create({});

import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import VideoPlayer from './VideoPlayer';
import Constants from 'expo-constants';
import axios from '../../axios';
import AuthContext from '../../contexts/AuthContext';

export default function TrendingReports() {
  const [videos, setVideos] = useState(null);
  const [data, setData] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);
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
        const res = await axios.get('/api/end-users/reports/all', config);
        console.log(res.data);
        setVideos(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const renderItem = ({ item, index }) => {
    if (index > 0) {
      return <VideoPlayer item={item} />;
    } else {
      return (
        <View
          style={{
            height: 100,
            backgroundColor: '#336699',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>{index}</Text>
        </View>
      );
    }
  };
  const keyExtractor = (item, index) => `${index}`;

  return (
    <View style={styles.container}>
      <FlatList data={videos} renderItem={renderItem} keyExtractor={keyExtractor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
