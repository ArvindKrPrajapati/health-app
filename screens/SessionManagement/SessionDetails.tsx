import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Icon,
  Avatar,
  Button,
  Text,
} from '@ui-kitten/components';
//import Text from '../../components/Text';
import { db } from '../../utils/firebase-config';
import { useNavigation } from '@react-navigation/native';
import dp from '../../assets/dp.png';
interface Props {
  image: ImageSourcePropType;
  name: string;
  enail: string;
}

import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore/lite';

import { AuthContext } from '../../context/AuthContext';
import { createCombinedId } from "../../utils/api.service";
const SessionDetails = ({ data }) => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { currentUser } = useContext(AuthContext)
  const [clicked, setClicked] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setClicked(false);
  }, [data]);
  const displayMessage = msg => {
    setMessage(msg);
    setClicked(true);
  };
  const acceptSession = async () => {
    const combinedId = createCombinedId(currentUser.id, data.id);
    try {
      displayMessage('accepting....');

      const userDoc = doc(db, 'users', data.id);
      await updateDoc(userDoc, { sessionStatus: 'accepted' });
      const res = await getDoc(doc(db, "chats", combinedId))
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] })
        console.log(currentUser);

        await updateDoc(doc(db, "userChats", currentUser.id), {
          [combinedId + ".userInfo"]: {
            id: data.id,
            name: data.name,
          },
          [combinedId + ".date"]: serverTimestamp()
        })

        const checkIfUserChatExists = await getDoc(doc(db, "userChats", data.id))
        if (!checkIfUserChatExists.exists()) {
          await setDoc(doc(db, "userChats", data.id), {})
        }
        await updateDoc(doc(db, "userChats", data.id), {
          [combinedId + ".userInfo"]: {
            id: currentUser.id,
            name: currentUser.name,
          },
          [combinedId + ".date"]: serverTimestamp()
        })
      }
      displayMessage('Session has been accepted');
    } catch (error) {
      console.log(error)
    }

  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserProfile', { data: data })}>
          <Avatar
            source={dp}
            /* @ts-ignore */
            style={styles.image}
          />
        </TouchableOpacity>
        <View>
          <Text category="p1">{data.name}</Text>
          <Text category="label">{data.email}</Text>
        </View>
      </View>
      {clicked ? (
        <View style={styles.message_}>
          <Text style={styles.message}>{message}</Text>
        </View>
      ) : (
        <View style={styles.btnGroup}>
          <View style={styles.btn}>
            <Button
              onPress={acceptSession}
              style={styles.button}
              appearance="outline"
              status="success"
              size="small">
              Accept
            </Button>
          </View>
          <View style={styles.btn}>
            <Button
              onPress={() => displayMessage('Session has been Rejected')}
              style={styles.button}
              appearance="outline"
              status="danger"
              size="small">
              Reject
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default SessionDetails;

const themedStyles = StyleService.create({
  container: {
    flexDirection: 'column',
    borderRadius: 8,
    backgroundColor: '#2E3A59',
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  main: {
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  calsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  btn: {
    marginHorizontal: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'color-primary-100',
  },
  message_: {
    alignItems: 'center',
    marginTop: 5,
  },
  message: {
    textAling: 'center',
    fontSize: 12,
  },
});
