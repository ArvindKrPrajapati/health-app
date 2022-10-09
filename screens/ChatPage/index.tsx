import React, { memo, useState } from 'react';
import { useWindowDimensions, View, Linking } from 'react-native';
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Avatar,
  Icon,
  Button,
  Text,
  Input,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//import Text from 'components/Text';
import Container from '../../components/Container';
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
  Message,
  MessageText,
  Time,
  Send,
} from 'react-native-gifted-chat';
import { Images } from '../../assets/images';
import NavigationAction from '../../components/NavigationAction';
import RenderComposer from './RenderComposer';
import dp from '../../assets/dp.png';
import { db } from '../../utils/firebase-config';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore/lite';
const msgRef = collection(db, 'messages');

const Conversation = memo(({ route }: any) => {
  const [user, setUser] = useState(route.params.data);

  const { goBack } = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [messages, setMessages] = React.useState<IMessage[]>();
  const roomId = '048d3f70-5dd6-4298-a1f5-cc0a1d580cca';

  const fetchMessage = async () => {

    try {
      const filter = where('to', '==', user.id);
      const snapshot = await getDocs(query(msgRef, filter));
      setMessages(snapshot.docs.map(doc => ({ ...doc.data(), _id: doc.id })));

    } catch (error) {
      console.log(error);

    }
  }

  React.useEffect(() => {
    fetchMessage()
  }, []);
  const onSend = React.useCallback(
    (messages: IMessage[] = []) => {
      const msg = {
        from: 1,
        to: user.id,
        text: messages[0].text,
        createdAt: messages[0].createdAt,
        user: {
          _id: user.id,
          name: user.name,
        }
      }
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      addDoc(msgRef, msg)
    },
    [messages],
  );
  const renderInputToolbar = React.useCallback(props => {
    return (
      <InputToolbar
        {...props}
        renderSend={() => null}
        containerStyle={styles.containerStyle}
      />
    );
  }, []);
  const renderBubble = React.useCallback(props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: styles.wrapperLeftStyle,
          right: styles.wrapperRightStyle,
        }}
        textStyle={{
          left: styles.textStyle,
          right: styles.textStyle,
        }}
      />
    );
  }, []);
  const renderMessage = React.useCallback(props => {
    return (
      <View style={{ paddingBottom: 24 }}>
        <Message
          {...props}
          renderAvatar={() => null}
          containerStyle={{
            left: { marginLeft: 16 },
            right: { marginRight: 24 },
          }}
        />
      </View>
    );
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={{
          backgroundColor: theme['background-basic-color-2'],
          paddingTop: top,
        }}
        title={() => (
          <>
            <Avatar
              source={dp}
              size="medium"
              style={{
                marginTop: top,
                borderColor: theme['text-primary-color'],
                borderWidth: 1,
              }}
            />
            <Text category="h6" style={{ marginLeft: 20, alignSelf: 'center' }}>
              {user.name}
            </Text>
          </>
        )}
        accessoryLeft={<NavigationAction icon="leftArrow" marginLeft={4} />}
        accessoryRight={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <NavigationAction
              icon="video"
              marginRight={4}
              nav="VideoCall"
              params={{ roomId }}
            />
            <NavigationAction
              icon="phoneCall"
              size="large"
              marginRight={4}
              nav="AudioCall"
              params={{ roomId }}
            />
          </View>
        }
      />
      <GiftedChat
        user={{ _id: user.id }}
        scrollToBottom
        messages={messages}
        onSend={message => onSend(message)}
        renderBubble={props => renderBubble(props)}
        renderAvatar={() => null}
        renderSend={() => null}
        renderMessage={props => renderMessage(props)}
        timeFormat={'MM/DD/YYYY  HH:MM'}
        imageStyle={{ marginHorizontal: -12 }}
        renderComposer={props => {
          return <RenderComposer {...props} />;
        }}
        timeTextStyle={{
          right: styles.timeTextStyle,
          left: styles.timeTextStyle,
        }}
        infiniteScroll
      />
    </Container>
  );
});

export default Conversation;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  containerStyle: {
    flex: 1,
  },
  nav: {
    paddingBottom: 0,
    paddingHorizontal: 4,
  },
  topHeader: {
    paddingLeft: 16,
  },
  textStyle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: 'Overpass-Regular',
  },
  timeTextStyle: {
    color: 'text-basic-color',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    fontFamily: 'Overpass-Regular',
  },
  wrapperLeftStyle: {
    backgroundColor: 'background-basic-color-4',
    borderTopLeftRadius: 0,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  wrapperRightStyle: {
    borderBottomRightRadius: 0,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: 'background-basic-color-2',
  },
});
const audioMess =
  'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3';
const imageMess =
  'https://s3-alpha-sig.figma.com/img/adc7/17ea/4385c876b632daf90987923f3d4b0715?Expires=1632700800&Signature=dKxgdp2cslKCF85BD1iMC~YzPGCTG6oAscWDDJonzqil1Hze0acBM3Xg4ltSAj0BHqX50uDIx~EWQIC5JEIOHBbRAjhiMp3Wo0PPy0YkQc5de8l24Vh180u5pr5HNfFm9jdWkoX3u99xHNPX~ZCEwcN7~0JnqoeZmzhbD3KHGHQrpRwPyOx-Yhq57R3V98Rtv3A~1sWCzg9d~vyIPUuTUmOsAPzukQpxo1KsfCm3RIAlalDLMlhvEs2s4f1dX9Lw4En~f6a7cHmrXfBElvE3AghM2aLdrbQEqHDKJ6Z~ehPNn88jBzw~qQEwZMnzGfGt2fEbJyQcf8LP4CjUE2d2Jw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';
