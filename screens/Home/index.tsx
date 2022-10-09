import React, {memo} from 'react';
import {View, ScrollView} from 'react-native';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  useTheme,
  Text,
} from '@ui-kitten/components';
import useLayout from '../../hooks/useLayout';
import {useNavigation} from '@react-navigation/native';

//import Text from 'components/Text';
import Content from '../../components/Content';
import Container from '../../components/Container';
import NavigationAction from '../../components/NavigationAction';
import {dataMeal, Data_Weight} from './data';
import ItemMeal from './ItemMeal';
import {RefreshControl} from 'react-native-web-refresh-control';
import CardWeightChart from './Chart';

const Home = memo(() => {
  const {top, bottom} = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {navigate} = useNavigation();
  return (
    <Container style={styles.container}>
      <Layout style={[{paddingTop: top}, styles.nav]} level="2">
        <TopNavigation
          style={styles.topNav}
          appearance="control"
          title={() => (
            <Text category="h6" style={styles.heading}>
              Home
            </Text>
          )}
          accessoryRight={<NavigationAction icon="notification" />}
        />
      </Layout>
      <Content
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
        contentContainerStyle={[styles.content, {paddingBottom: bottom + 24}]}>
        <CardWeightChart
          strokeColor={theme['color-primary-100']}
          data={Data_Weight}
          style={styles.cardWeight}
          title="Today Booking Metric"
        />
        <CardWeightChart
          strokeColor={theme['color-primary-100']}
          data={Data_Weight}
          style={styles.cardWeight}
          haveRightArrow
          navigate="Session Management"
          title="New Booking Metric"
        />
        <CardWeightChart
          strokeColor={theme['color-primary-100']}
          data={Data_Weight}
          style={styles.cardWeight}
          title="Active and Current Booking Metric"
        />
      </Content>
    </Container>
  );
});

export default Home;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  nav: {
    paddingBottom: 0,
    paddingHorizontal: 4,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4,
  },
  content: {
    marginTop: 24,
  },
  cardWeight: {
    marginVertical: 24,
  },
  mealView: {
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 12,
  },
  heading: {
    fontFamily: 'Montserrat-Regular',
    marginLeft: 12,
  },
});
