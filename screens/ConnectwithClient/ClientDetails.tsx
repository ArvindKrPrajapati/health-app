import React from 'react';
import {View, TouchableOpacity, Image, ImageSourcePropType} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Icon,
  Avatar,
  Text,
} from '@ui-kitten/components';
//import Text from '../../components/Text';
import {useNavigation} from '@react-navigation/native';

interface Props {
  image: ImageSourcePropType;
  name: string;
  message: string;
}
const ClientDetails = ({data}) => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ChatPage')}>
      <View style={styles.container}>
        <View style={styles.main}>
          <Avatar
            source={data.image}
            /* @ts-ignore */
            style={styles.image}
          />
          <View>
            <Text category="p1">{data.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="check" style={styles.icon} />
              <Text category={data.read ? 'c1' : 'label'}>{data.message}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={{fontSize: 11, marginVertical: 5}}>12:47 pm</Text>
          {!data.read ? (
            <View>
              <View style={styles.unread}>
                <Text category="label" style={{color: '#000'}}>
                  1
                </Text>
              </View>
            </View>
          ) : null}
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
