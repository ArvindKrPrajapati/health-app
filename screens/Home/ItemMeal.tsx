import React from 'react';
import {View, Image, ImageSourcePropType, Text} from 'react-native';
import {StyleService, useStyleSheet, Button} from '@ui-kitten/components';
import useLayout from '../../hooks/useLayout';
//import Text from "components/Text";

interface Props {
  id: number;
  image: ImageSourcePropType;
  title: string;
  calsUnder?: number;
  cals: number;
  recommended?: number;
}
interface ItemProps {
  data: Props;
  onPress?(): void;
}

const ItemMeal = ({data, onPress}: ItemProps) => {
  const {height, width} = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={[styles.container, {width: (width - 55) / 2}]}>
      <Image
        source={data.image}
        /* @ts-ignore */
        style={styles.image}
      />
      <Text>{data.title}</Text>
      <Text>{`${data.cals} Cals`}</Text>
      {data.calsUnder ? (
        <Text>{`${data.calsUnder} Cals Under`}</Text>
      ) : (
        <Text>{`${data.recommended} Recommended`}</Text>
      )}
      <Button onPress={onPress} status="primary-blue" children="ADD" />
    </View>
  );
};

export default ItemMeal;

const themedStyles = StyleService.create({
  container: {
    borderWidth: 1,
    borderColor: 'background-basic-color-7',
    borderRadius: 8,
    marginRight: 12,
    padding: 16,
  },
  image: {
    marginBottom: 8,
  },
});
