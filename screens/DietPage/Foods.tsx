import React, { memo } from 'react';
import { FlatList, View } from 'react-native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import useLayout from '../../hooks/useLayout';

import { Images } from '../../assets/images';
import FoodDetails from './FoodDetails';
import keyExtractor from '../../utils/keyExtractor';
import { RefreshControl } from 'react-native-web-refresh-control';

const Foods = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const renderItem = React.useCallback(({ item }) => {
    return <FoodDetails data={item} noFavoritesAdd={false} />;
  }, []);
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        scrollEventThrottle={16}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: bottom }]}
      />
    </View>
  );
});

export default Foods;

const themedStyles = StyleService.create({
  content: {
    marginHorizontal: 24,
    marginTop: 16,
  },
});
const data = [
  {
    id: 0,
    image: Images.smallPizza,
    cals: 516,
    gam: 55,
    quantity: 1,
    name: 'Pizza',
    isVeg: true
  },
  {
    id: 1,
    image: Images.smallBurger,
    cals: 516,
    gam: 55,
    quantity: 1,
    name: 'Hamburger',
    isVeg: false
  },
  // {
  //   id: 2,
  //   image: Images.smallDonut,
  //   cals: 516,
  //   gam: 55,
  //   quantity: 1,
  //   name: 'Donut Cake',
  // isVeg:true
  // },
  // {
  //   id: 3,
  //   image: Images.rollsIcon,
  //   cals: 516,
  //   gam: 55,
  //   quantity: 1,
  //   name: 'Sushi',
  // isVeg:true
  // },
  // {
  //   id: 4,
  //   image: Images.smallPopcorn,
  //   cals: 516,
  //   gam: 55,
  //   quantity: 1,
  //   name: 'Popcorn',
  // isVeg:true
  // },
];
