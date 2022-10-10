import React, { memo, useState, useEffect, useContext } from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import useLayout from '../../hooks/useLayout';

import { Images } from '../../assets/images';
import ClientDetails from './ClientDetails';
import keyExtractor from '../../utils/keyExtractor';
import { RefreshControl } from 'react-native-web-refresh-control';
import { db } from '../../utils/firebase-config';
import { collection, getDoc, doc, query, where } from 'firebase/firestore/lite';
import { AuthContext } from '../../context/AuthContext'
const Clients = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const { currentUser } = useContext(AuthContext)
  const styles = useStyleSheet(themedStyles);
  const [chats, setChats] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchMessage = async () => {
    try {
      if (currentUser?.id) {
        const snapshot = await getDoc(doc(db, "userChats", currentUser.id));
        setChats(snapshot.data())
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchMessage()
    setRefreshing(false)
  }

  useEffect(() => {
    fetchMessage()
  }, [currentUser.id]);

  const renderItem = React.useCallback(({ item }) => {
    return <ClientDetails data={item} noFavoritesAdd={true} />;
  }, []);
  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={40} color="#fff" />
        </View>
      ) : (
        <>
          <FlatList
            ListHeaderComponent={() => {
              if (Object.entries(chats).length === 0) {
                return (
                  <Text style={{ color: '#fff', textAlign: 'center' }}>
                    No Data
                  </Text>
                );
              }
              return null;
            }}
            data={Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date)}
            renderItem={renderItem}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            keyExtractor={keyExtractor}
            refreshing={refreshing}
            onRefresh={onRefresh}
            contentContainerStyle={[styles.content, { paddingBottom: bottom + 32 }]}
          />
        </>
      )}
    </>
  );
});

export default Clients;

const themedStyles = StyleService.create({
  content: {
    marginHorizontal: 24,
    marginTop: 16,
  },
});
const data = [
  {
    id: 0,
    image: Images.avatar0,
    name: 'user1',
    message: 'Hey there.....',
    read: true,
  },

  {
    id: 3,
    image: Images.avatar1,
    name: 'user2',
    message: 'Hi....',
    read: true,
  },
  {
    id: 2,
    image: Images.avatar2,
    name: 'user3',
    message: 'goood bye....',
    read: false,
  },

  {
    id: 4,
    image: Images.avatar3,
    name: 'user4',
    message: 'Hey',
    read: false,
  },
  {
    id: 1,
    image: Images.avatar4,
    name: 'user5',
    message: 'Hello',
    read: true,
  },
];
