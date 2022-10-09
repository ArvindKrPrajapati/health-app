import React, {memo} from 'react';
import {
  StyleService,
  useStyleSheet,
  Layout,
  Text,
  Button,
  TopNavigation,
} from '@ui-kitten/components';
import useLayout from '../../hooks/useLayout';

//import Text from "../../components/Text";
import Content from '../../components/Content';
import Container from '../../components/Container';
import NavigationAction from '../../components/NavigationAction';
import {Images} from '../../assets/images';
import FoodInfoItem from './FoodInfoItem';
import MealContent from './MealContent';
import Nutrition from './Nutrition';

const FoodInformation = memo(({route}) => {
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const {image, name} = route.params;
  return (
    <Container style={styles.container}>
      <Layout level="1" style={[{paddingTop: top}, styles.topNav]}>
        <TopNavigation
          style={styles.topNav}
          accessoryLeft={<NavigationAction icon="leftArrow" />}
          title={() => (
            <Text category="h6" marginLeft={16} marginBottom={8}>
              Food Information
            </Text>
          )}
        />
        <NavigationAction icon="menu" />
      </Layout>
      <Content
        contentContainerStyle={[styles.content, {paddingBottom: bottom + 32}]}>
        <FoodInfoItem image={image} title={name} mililit={600} />
        <MealContent
          data={DATA_Meal}
          title="Meal Content"
          style={styles.mealContent}
        />
        <Nutrition
          data={DATA_Nutrition}
          title="Nutrition"
          style={styles.nutrition}
        />
      </Content>
    </Container>
  );
});

export default FoodInformation;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  nutrition: {
    marginTop: 32,
  },
  mealContent: {
    marginTop: 24,
  },
  buttonBottom: {
    marginHorizontal: 24,
    marginTop: 8,
  },
});
const DATA_Meal = [
  {
    id: 0,
    title: 'Salad',
    cals: 135,
    gam: 15,
  },
  {
    id: 1,
    title: 'Eggs',
    cals: 135,
    gam: 24,
  },
];
const DATA_Nutrition = {
  cals: 523,
  protein: 13.2,
  carb: 46.2,
  fat: 6.8,
};
