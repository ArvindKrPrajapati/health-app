import React, {memo, useState} from 'react';
import {View, Image} from 'react-native';
import {
  useStyleSheet,
  Avatar,
  TopNavigation,
  Icon,
  Layout,
  useTheme,
  StyleService,
  Button,
  Text,
} from '@ui-kitten/components';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {dataMeal, Data_Weight} from './data';
import useLayout from '../../hooks/useLayout';

//import Text from '../../components/Text';
import Content from '../../components/Content';
import Container from '../../components/Container';
import CurrencyText from '../../components/CurrencyText';
import NavigationAction from '../../components/NavigationAction';
import CardWeightChart from './Chart';

import dp from '../../assets/dp.png';

const TransferScreen = memo(({route}: any) => {
  const [user, setUser] = useState(route.params.data);

  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const {bottom} = useLayout();

  return (
    <Container>
      <TopNavigation
        style={{
          backgroundColor: theme['background-basic-color-2'],
        }}
        title={() => <Text category="h6">User Profile</Text>}
        accessoryLeft={() => <NavigationAction icon="leftArrow" />}
      />
      <Content contentContainerStyle={styles.contentContainerStyle}>
        <Image source={dp} style={styles.avatar} />
        <View style={styles.description}>
          <Text>{user.name}</Text>
          <Text category="label">{user.email}</Text>
        </View>
        <CardWeightChart
          strokeColor={theme['color-primary-100']}
          data={Data_Weight}
          style={styles.cardWeight}
          title="Booking Metric"
        />
      </Content>
    </Container>
  );
});

export default TransferScreen;

const themedStyles = StyleService.create({
  contentContainerStyle: {
    paddingTop: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  avatar: {
    alignSelf: 'center',
    borderRadius: 32,
    width: 80,
    height: 80,
  },
  boxView: {
    marginTop: 54,
  },
  box: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'color-radical-600',
  },
  iconView: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    top: -24,
    borderColor: 'background-basic-color-1',
    backgroundColor: 'color-salmon-100',
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: 'color-basic-100',
  },
  card: {
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'color-basic-1500',
    marginTop: 24,
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  note: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  text: {
    color: 'color-basic-1100',
  },
  bottom: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    paddingTop: 8,
    paddingHorizontal: 24,
  },
  description: {
    marginTop: 20,
    alignItems: 'center',
  },
  cardWeight: {
    marginVertical: 24,
  },
});
