import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Dimensions,
  ImageStyle,
} from 'react-native';
import {StyleService, useStyleSheet, Icon, Text} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

interface Props {
  image: ImageSourcePropType;
  name: string;
  quantity: number;
  gam: number;
  cals: number;
}
interface ItemProps {
  data: Props;
  noFavoritesAdd: boolean;
}

const windowWidth = Dimensions.get('window').width;

const FoodDetails = ({data, noFavoritesAdd}: ItemProps) => {
  const styles = useStyleSheet(themedStyles);
  const [selected, setSelected] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const onPress = React.useCallback(() => setSelected(!selected), [selected]);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate<string>('FoodInformation', {
            name: data.name,
            image: data.image,
          })
        }>
        <Image source={data.image} style={styles.image as ImageStyle} />
      </TouchableOpacity>
      <View>
        <Text category="s1">{data.name}</Text>
        <View style={styles.calsView}>
          <Text category="label">{data.cals} Cals</Text>
          <View style={styles.dot} />
          <Text category="label">{`${data.quantity} medium (${data.gam}g)`}</Text>
        </View>
      </View>
      <View style={styles.addbtn}>
        <TouchableOpacity
          onPress={() => setCount(prev => (prev ? prev - 1 : prev))}>
          {count ? (
            <Icon
              pack="assets"
              name="minus"
              style={{
                tintColor: '#D4D4D4',
                marginHorizontal: 5,
                width: 10,
                height: 10,
              }}
            />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCount(prev => prev + 1)}>
          <Text category="label">{count <= 0 ? 'ADD' : count}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCount(prev => prev + 1)}>
          {count ? (
            <Icon
              pack="assets"
              name="union"
              style={{
                tintColor: '#D4D4D4',
                marginHorizontal: 5,
                width: 10,
                height: 10,
              }}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FoodDetails;

const themedStyles = StyleService.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#2E3A59',
    paddingVertical: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 24,
  },
  image: {
    marginRight: 20,
  },
  calsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 99,
    backgroundColor: 'color-basic-1200',
    marginHorizontal: 8,
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
  addbtn: {
    backgroundColor: 'rgba(148, 203, 255, 0.2)',
    paddingHorizontal: 2,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    width: windowWidth / 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
