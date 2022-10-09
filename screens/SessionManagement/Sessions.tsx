import React, {memo, useState, useEffect} from 'react';
import {FlatList, ActivityIndicator, View, Text} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import useLayout from '../../hooks/useLayout';

import {Images} from '../../assets/images';
import SessionDetails from './SessionDetails';
import keyExtractor from '../../utils/keyExtractor';
import {RefreshControl} from 'react-native-web-refresh-control';
import {db} from '../../utils/firebase-config';
import {collection, getDocs, query, where} from 'firebase/firestore/lite';

const Sessions = memo(() => {
  const {height, width, top, bottom} = useLayout();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const styles = useStyleSheet(themedStyles);
  const fetchData = async () => {
    try {
      const user = collection(db, 'users');
      const filter = where('sessionStatus', '==', '');
      const snapshot = await getDocs(query(user, filter));
      setData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };
  const renderItem = React.useCallback(({item}) => {
    return <SessionDetails data={item} />;
  }, []);
  return (
    <>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={40} color="#fff" />
        </View>
      ) : (
        <>
          <FlatList
            ListHeaderComponent={() => {
              if (data.length === 0) {
                return (
                  <Text style={{color: '#fff', textAlign: 'center'}}>
                    No Data
                  </Text>
                );
              }
              return null;
            }}
            data={data}
            renderItem={renderItem}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            keyExtractor={keyExtractor}
            refreshing={refreshing}
            onRefresh={refreshData}
            contentContainerStyle={[
              styles.content,
              {paddingBottom: bottom + 32},
            ]}
          />
        </>
      )}
    </>
  );
});

export default Sessions;

const themedStyles = StyleService.create({
  content: {
    marginHorizontal: 24,
    marginTop: 10,
  },
});
// const data = [
//   {
//     id: 0,
//     image: Images.avatar0,
//     name: 'user1',
//     email: 'francisdixon@company.com',
//   },

//   {
//     id: 3,
//     image: Images.avatar1,
//     name: 'user2',
//     email: 'francisdixon@company.com',
//   },
//   {
//     id: 2,
//     image: Images.avatar2,
//     name: 'user3',
//     email: 'francisdixon@company.com',
//   },

//   {
//     id: 4,
//     image: Images.avatar3,
//     name: 'user4',
//     email: 'francisdixon@company.com',
//   },
//   {
//     id: 1,
//     image: Images.avatar4,
//     name: 'user5',
//     email: 'francisdixon@company.com',
//   },
// ];
