import React from 'react';
import {View, Image, ImageSourcePropType} from 'react-native';
import {StyleService, useStyleSheet, Text} from '@ui-kitten/components';

//import Text from 'components/Text';

interface Props {
  title: string;
  mililit: number;
  image: ImageSourcePropType;
}

const FoodInfoItem = ({title, image, mililit}: Props) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <View style={styles.foodView}>
        <Image
          source={image}
          /* @ts-ignore */
          style={styles.image}
        />
      </View>
      <View>
        <Text
          category="label"
          style={{marginTop: 14, marginBottom: 8, fontSize: 16}}>
          {title}
        </Text>
        <Text category="c1">{`${mililit}ml`}</Text>
      </View>
    </View>
  );
};

export default FoodInfoItem;

const themedStyles = StyleService.create({
  container: {
    flexDirection: 'row',
  },
  foodView: {
    borderWidth: 1,
    borderColor: 'background-basic-color-2',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 88,
    height: 88,
    marginRight: 20,
  },
  image: {
    alignSelf: 'center',
    width: 54,
    height: 41,
  },
});
