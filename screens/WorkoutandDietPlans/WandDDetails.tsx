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
import dp from '../../assets/dp.png';

import {useNavigation} from '@react-navigation/native';

interface Props {
  image: ImageSourcePropType;
  name: string;
  enail: string;
}

const WandDDetails = ({data}) => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('WandDProfile', {data: data})}>
      <View style={styles.container}>
        <Avatar
          source={dp}
          /* @ts-ignore */
          style={styles.image}
        />
        <View>
          <Text category="p1">{data.name}</Text>
          <Text category="label">{data.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WandDDetails;

const themedStyles = StyleService.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#2E3A59',
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 10,
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
    width: 24,
    height: 24,
    tintColor: 'color-primary-100',
  },
});
