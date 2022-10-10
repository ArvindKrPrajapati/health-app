import React from 'react';
import { View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Icon,
  Avatar,
  Text,
} from '@ui-kitten/components';
//import Text from '../../components/Text';
import { useNavigation } from '@react-navigation/native';
import dp from '../../assets/dp.png';

interface Props {
  image: ImageSourcePropType;
  name: string;
  message: string;
}
const ClientDetails = ({ data }) => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();

  const formatDate = (d) => {
    const pd = new Date(d)
    const nd = new Date(Date.now())
    let t = Math.floor(Number(nd.getTime() - pd.getTime()) / 60000)
    let dd = nd.getDate() - pd.getDate()
    if (t === 0) {
      return "Just Now";
    }
    if (t < 60) {
      return t + " min ago";
    }
    if (t >= 60 && t < 1440) {
      return (t / 60).toString().split(".")[0] + " hour ago"
    }
    if (t >= 1440 && t < 39200) {
      return (t / 1440).toString().split(".")[0] + " days ago"
    }
    if (t > 39200 && t < 470400) {
      return (t / 39200).toString().split(".")[0] + " month ago"
    }
    if (t > 470400) {
      return (t / 470400).toString().split(".")[0] + " year ago"
    }
    return "a long ago"
  }


  return (
    <TouchableOpacity onPress={() => navigation.navigate('ChatPage', { data: data[1].userInfo })}>
      <View style={styles.container}>
        <View style={styles.main}>
          <Avatar
            source={data[1].userInfo.image ? data.image : dp}
            /* @ts-ignore */
            style={styles.image}
          />
          <View>
            <Text category="p1">{data[1].userInfo.name}</Text>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="check" style={styles.icon} />
              <Text category={data.read ? 'c1' : 'label'}>{data.message}</Text>
            </View> */}
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 11, marginVertical: 5 }}>{formatDate(data[1].date.toDate())}</Text>
          {/* {!data.read ? (
            <View>
              <View style={styles.unread}>
                <Text category="label" style={{ color: '#000' }}>
                  1
                </Text>
              </View>
            </View>
          ) : null} */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ClientDetails;

const themedStyles = StyleService.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#2E3A59',
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  main: {
    flexDirection: 'row',
  },
  unread: {
    backgroundColor: 'color-primary-100',
    borderRadius: 30,
    width: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  image: {
    marginRight: 20,
  },
  calsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  btn: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  icon: {
    width: 10,
    height: 10,
    marginRight: 8,
    tintColor: 'color-primary-100',
  },
});
