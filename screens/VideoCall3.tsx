import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Pressable, StyleSheet, View } from 'react-native';
import InCallManager from 'react-native-incall-manager';
import LinearGradient from 'react-native-linear-gradient';
import Peer from 'react-native-peerjs';
import { mediaDevices, RTCView } from 'react-native-webrtc';
import { io } from 'socket.io-client';
import { Icon, useTheme, Text } from '@ui-kitten/components';
import commonStyles from '../assets/commonStyles';
import { MEET_API_URL, PeerServerConfig } from '../constants/Config';
import { AuthContext } from '../context/AuthContext';

const Header = ({ handleGoBack }) => {
  const [speakerOn, setSpeakerOn] = useState(true);
  const theme = useTheme();

  const handleToggleSpeaker = () => {
    setSpeakerOn(currentState => {
      InCallManager.setForceSpeakerphoneOn(!currentState);
      return !currentState;
    });
  };

  return (
    <View style={styles.header}>
      <View style={commonStyles.flexDirectionRow}>
        <Pressable onPress={handleGoBack}>
          <Icon name="leftArrow" />
        </Pressable>
        {/* <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.meetCode}>naw-fhrg-qqh</Text>
          <AntDesign name="caretright" size={9} color="white" />
        </Pressable> */}
      </View>
      <View style={commonStyles.flexDirectionRow}>
        {/* <MaterialIcons
          style={{paddingHorizontal: 20}}
          name="flip-camera-android"
          size={24}
          color="white"
        /> */}
        <Pressable onPress={handleToggleSpeaker}>
          {speakerOn ? (
            <Icon
              name="headphone"
              style={styles.volumeIcon}
              color={theme['color-basic-100']}
            />
          ) : (
            <Icon
              name="time"
              style={styles.volumeIcon}
              color={theme['color-basic-100']}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};

const ButtonsTab = ({
  mic: audio,
  video,
  toggleMic,
  toggleVideo,
  handleLeave,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.btnContainer}>
      <Pressable onPress={handleLeave} style={styles.endCallBtn}>
        <Icon name="phoneCall1" color={theme['color-basic-100']} />
      </Pressable>
      <Pressable
        onPress={toggleVideo}
        style={[
          styles.videoBtn,
          !video ? { backgroundColor: theme['color-basic-400'] } : {},
        ]}>
        {video ? (
          <Icon name="eye" color={theme['color-basic-100']} />
        ) : (
          <Icon name="eyeHide" color="#616165" />
        )}
      </Pressable>
      <Pressable
        onPress={toggleMic}
        style={[
          styles.videoBtn,
          !audio ? { backgroundColor: theme['color-basic-400'] } : {},
        ]}>
        {audio ? (
          <Icon name="headphone" color={theme['color-basic-100']} />
        ) : (
          <Icon name="time" color="#616165" />
        )}
      </Pressable>
      {/* <Pressable style={styles.videoBtn}>
        <Feather name="more-vertical" size={24} color="white" />
      </Pressable> */}
    </View>
  );
};

const Stream = ({ stream, audio, video, user, iconSize }) => {
  const [_stream, setStream] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    setStream(stream);
  }, [stream]);

  return (
    <View>
      {!audio && (
        <View style={streamStyle.wrap}>
          <Icon name="time" color={theme['color-basic-100']} />
        </View>
      )}
      {stream && video ? (
        <RTCView
          streamURL={(_stream as any)?.toURL() as any}
          style={streamStyle.video}
          zOrder={1}
        />
      ) : (
        <View style={streamStyle.container}>
          <Icon
            name="user"
            style={[streamStyle.image, { padding: iconSize }]}
            color={theme['color-basic-100']}
          />
          <Text>{user.name}</Text>
        </View>
      )}
    </View>
    // <View style={streamStyle.container}>
    //   {!audio && (
    //     <View style={streamStyle.wrap}>
    //       <Icon name="time" color={theme['color-basic-100']} />
    //     </View>
    //   )}
    //   {stream && video ? (
    //     <RTCView
    //       streamURL={(_stream as any)?.toURL() as any}
    //       style={streamStyle.video}
    //       zOrder={1}
    //     />
    //   ) : (
    //     <Icon
    //       name="user"
    //       style={streamStyle.image}
    //       color={theme['color-basic-100']}
    //     />
    //   )}
    //   {/* <View style={their.credits}>
    //     <Text style={their.text}>Ajay</Text>
    //     <Feather name="more-vertical" size={23} color="white" />
    //   </View> */}
    // </View>
  );
};
const streamStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: "49%",

  },
  image: {
    borderRadius: 100,
    marginBottom: 5,
    backgroundColor: '#707578',
    // resizeMode : 'contain'
  },
  video: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  credits: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrap: {
    position: 'absolute',
    width: 32,
    height: 32,
    backgroundColor: '#707578',
    borderRadius: 100,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    top: 10,
    right: 10,
  },
});

const initialState = {
  mySocketId: null,
  myPeerId: null,
  myStream: null,
  peers: new Map(),
  roomId: null,
  mic: true,
  video: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setMySocketId':
      state.mySocketId = action.payload;
      return state;
    case 'addPeer':
      return {
        ...state,
        peers: new Map(
          state.peers.set(action.payload.peerId, {
            ...action.payload,
            audio: true,
            video: true,
          }),
        ),
      };
    case 'setMyStream':
      return { ...state, myStream: action.payload };
    case 'setMyPeerId':
      state.myPeerId = action.payload;
      return state;
    case 'addStreamToAPeer':
      return {
        ...state,
        peers: new Map(
          state.peers.set(action.payload.peerId, {
            ...(state.peers.get(action.payload.peerId) ?? {}),
            stream: action.payload.stream,
          }),
        ),
      };
    case 'removePeer':
      state.peers.delete(action.payload);
      return { ...state, peers: new Map(state.peers) };
    case 'setRoomId':
      state.roomId = action.payload;
      return state;
    case 'changePeerMediaEnabled':
      return {
        ...state,
        peers: new Map(
          state.peers.set(action.payload.peerId, {
            ...state.peers.get(action.payload.peerId),
            [action.payload.kind]: action.payload.value,
          }),
        ),
      };
    case 'toggleMediaFulfilled':
      state.myStream.getTracks()?.forEach(function (track) {
        if (track.kind === action.payload.kind) {
          track.enabled = action.payload.value;
        }
      });
      return {
        ...state,
        [action.payload.kind === 'audio' ? 'mic' : 'video']:
          action.payload.value,
      };
    case 'resetState':
      return {
        ...state,
        peers: new Map(),
        myStream: null,
        mic: true,
        video: true,
      };

    default:
      break;
  }
};

const action = (type, payload: any = null) => ({ type, payload });

export default function VirtualMeeting({ route }) {
  let name = 'User';
  const { currentUser } = useContext(AuthContext)
  const [pushed, setPushed] = useState(false);
  const [socketIdSet, setSocketIdSet] = useState(false);
  const [peerIdSet, setPeerIdSet] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const topValue = useRef(new Animated.Value(0)).current;
  const bottomValue = useRef(new Animated.Value(0)).current;
  const myStreamBottomValue = useRef(new Animated.Value(110)).current;

  const [state, dispatch] = useReducer(reducer, initialState);

  const navigation = useNavigation();

  const socket = useMemo(() => {
    const _socket = io(MEET_API_URL, { forceNew: true });

    _socket.on('store-id', socketId => {
      dispatch(action('setMySocketId', socketId));
      setSocketIdSet(true);
    });

    return _socket;
  }, []);
  const peerServer = useMemo(() => {
    const peer = new Peer(undefined, PeerServerConfig);

    peer.on('error', function (err) {
      console.log(err);
    });
    peer.on('open', peerId => {
      dispatch(action('setMyPeerId', peerId));
      setPeerIdSet(true);
    });

    return peer;
  }, []);

  useEffect(() => {
    if (!state.myStream && socketIdSet && peerIdSet) {
      let isFront = true;
      mediaDevices.enumerateDevices().then(sourceInfos => {
        let videoSourceId;
        for (let i = 0; i < (sourceInfos as any[]).length; i++) {
          const sourceInfo = (sourceInfos as any[])[i];
          if (
            sourceInfo.kind === 'videoinput' &&
            sourceInfo.facing === (isFront ? 'front' : 'environment')
          ) {
            videoSourceId = sourceInfo.deviceId;
          }
        }
        mediaDevices
          .getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
            },
            video: {
              width: 640,
              height: 480,
              frameRate: 30,
              facingMode: isFront ? 'user' : 'environment',
              deviceId: videoSourceId,
              noiseSuppression: true,
            },
          })
          .then(stream => {
            joinRoom({ room: route.params?.roomId, stream });
          })
          .catch(console.error);
      });
    }
  }, [route, socketIdSet, peerIdSet]);

  const handleLeave = () => {
    leaveRoom({
      callback: () => {
        navigation.dispatch({
          ...StackActions.replace('ChatPage', { data: route.params?.data, id: route.params.id }),
          source: route.key,
          target: navigation.getState().key,
        });
      },
    });
  };

  const toggleMic = () => {
    InCallManager.setMicrophoneMute(state.mic);
    toggleMedia({ kind: 'audio', value: !state.mic });
  };

  const toggleVideo = () => {
    toggleMedia({ kind: 'video', value: !state.video });
  };

  const joinRoom = ({ stream: myStream, room }) => {
    const get = what => state[what];

    dispatch(action('resetState'));
    dispatch(action('setMyStream', myStream));
    dispatch(action('setRoomId', room));

    socket.on('someone-joined', newParticipant => {
      dispatch(action('addPeer', newParticipant));

      socket.emit('introducing-myself', {
        socketId: get('mySocketId'),
        peerId: get('myPeerId'),
        to: newParticipant.socketId,
      });

      const mediaConn = peerServer.call(newParticipant.peerId, myStream);
      mediaConn.on('stream', stream => {
        dispatch(
          action('addStreamToAPeer', {
            peerId: newParticipant.peerId,
            stream,
          }),
        );
      });
    });
    socket.on('someone-introducing', thatSomeone => {
      dispatch(action('addPeer', thatSomeone));
    });
    socket.on('someone-left', ({ peerId: _peerId, name: _name }) => {
      dispatch(action('removePeer', _peerId));
    });
    socket.on('someone-toggled-their-media', toggleData => {
      dispatch(action('changePeerMediaEnabled', toggleData));
    });

    peerServer.on('call', call => {
      call.answer(myStream);
      call.on('stream', stream => {
        dispatch(action('addStreamToAPeer', { peerId: call.peer, stream }));
      });
    });

    socket.emit('join', {
      room,
      peerId: get('myPeerId'),
      socketId: get('mySocketId'),
      name,
    });

    InCallManager.start({ media: 'audio/video' });
    InCallManager.setSpeakerphoneOn(false);
    InCallManager.setForceSpeakerphoneOn(true);
    InCallManager.setMicrophoneMute(false);
  };

  const leaveRoom = ({ callback }) => {
    const get = what => state[what];

    socket.disconnect();
    peerServer.destroy();

    get('myStream')
      ?.getTracks()
      ?.forEach(function (track) {
        if (track.readyState === 'live') {
          track.stop();
        }
      });

    InCallManager.setForceSpeakerphoneOn(false);
    InCallManager.stop();
    callback?.();
  };

  const toggleMedia = ({ value, kind }) => {
    const get = what => state[what];
    socket.emit('toggle-media', {
      value,
      peerId: get('myPeerId'),
      room: get('roomId'),
      kind,
    });
    dispatch(action('toggleMediaFulfilled', { value, kind }));
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();

    Animated.timing(topValue, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();

    Animated.timing(bottomValue, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();

    Animated.timing(myStreamBottomValue, {
      toValue: 110,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();

    Animated.timing(topValue, {
      toValue: -100,
      duration: 400,
      useNativeDriver: false,
    }).start();

    Animated.timing(bottomValue, {
      toValue: -100,
      duration: 400,
      useNativeDriver: false,
    }).start();

    Animated.timing(myStreamBottomValue, {
      toValue: 20,
      duration: 300,
      delay: 200,
      useNativeDriver: false,
    }).start();
  };

  const pressing = () => {
    if (pushed) {
      fadeIn();
      setPushed(false);
    } else {
      fadeOut();
      setPushed(true);
    }
  };



  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerContainer, { top: topValue }]}>
        <LinearGradient
          style={styles.background}
          colors={['rgba(2,3,2,0.6)', 'rgba(15,17,19,0.2)', 'rgba(255,255,255,0)']}
        />
        <Header handleGoBack={handleLeave} />
      </Animated.View>

      <Pressable onPress={pressing} style={pushed ? styles.fullPlayArea : styles.playarea}>
        <RenderStreams
          streams={[
            { stream: state.myStream, audio: state.mic, video: state.video },
            ...([...(state?.peers ?? [])].map(([_, peer]) => ({
              stream: peer.stream,
              audio: peer.audio,
              video: peer.video,
            })) ?? []),
          ]}
          user={route.params?.data}
          currentUser={currentUser}
        />
      </Pressable>
      <Animated.View style={[styles.bottomContainer, { bottom: bottomValue }]}>
        <ButtonsTab
          mic={state.mic}
          video={state.video}
          {...{ toggleMic, toggleVideo, handleLeave }}
        />
        <LinearGradient
          style={[styles.background, styles.bottomGradient]}
          colors={['rgba(2,3,2,0.6)', 'rgba(15,17,19,0.2)', 'rgba(255,255,255,0)']}
        />
      </Animated.View>
    </View>
  );
}

const RenderStreams = ({ streams, currentUser, user }) => {
  const render = ({ item: stream }) => <Stream {...stream} />;

  return (
    <>
      <View style={styles.me}>
        <Stream {...streams[1]} user={user} iconSize={30} />
      </View>
      <View style={styles.you}>
        <Stream {...streams[0]} user={currentUser} iconSize={15} />
      </View>
    </>
    // <FlatList
    //   style={styles.streamList}
    //   data={streams}
    //   renderItem={render}
    //   numColumns={2}
    //   keyExtractor={(_, idx) => idx.toString()}
    // />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212125',
  },
  headerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 100,
  },
  streamList: {
    flex: 1,
    paddingHorizontal: 5,
  },
  bottomContainer: {
    height: 130,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 100,
  },
  bottomGradient: {
    height: 130,
    bottom: 0,
    transform: [{ rotate: '180deg' }],
  },
  btnContainer: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    // backgroundColor: 'lightgrey',
    width: '100%',
    // paddingHorizontal : 60 ,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    zIndex: 2,
  },
  endCallBtn: {
    backgroundColor: '#ea4137',
    height: 48,
    width: 48,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  videoBtn: {
    backgroundColor: '#303035',
    height: 48,
    width: 48,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  playarea: {
    // height: Dimensions.get("window").height - 200,
    // marginTop: 90,
    // marginHorizontal: 12
    height: "100%"
  },
  fullPlayArea: {
    height: '100%',
  },
  header: {
    zIndex: 3,
    paddingVertical: 18,
    paddingHorizontal: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meetCode: {
    marginRight: 6,
    color: 'white',
    marginLeft: 40,
    fontSize: 17.8,
  },
  background: {
    width: '100%',
    height: 95,
    // zIndex : 1 ,
    position: 'absolute',
    top: 0,
  },
  box: {
    top: -300,
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  volumeIcon: { paddingHorizontal: 4 },
  me: {
    flex: 1,
    backgroundColor: "#101010",
  },
  you: {
    position: "absolute",
    width: 140,
    height: 180,
    backgroundColor: "black",
    bottom: 10,
    right: 10,
    borderRadius: 5,
    overflow: "hidden",

  }
});
