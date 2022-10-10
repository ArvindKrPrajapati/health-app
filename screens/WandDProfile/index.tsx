import React, { memo, useState } from 'react';
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  useStyleSheet,
  Avatar,
  TopNavigation,
  Icon,
  Layout,
  StyleService,
  Button,
  Text,
  useTheme,
  Drawer,
  DrawerGroup,
  DrawerItem,
} from '@ui-kitten/components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import useLayout from '../../hooks/useLayout';

//import Text from '../../components/Text';
import Content from '../../components/Content';
import Container from '../../components/Container';
import CurrencyText from '../../components/CurrencyText';
import NavigationAction from '../../components/NavigationAction';

import { Images } from '../../assets/images';
import dp from '../../assets/dp.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WandDProfile = memo(({ route }: any) => {
  const [user, setUser] = useState(route.params.data);

  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigation = useNavigation();

  const { height, width, top, bottom } = useLayout();

  const StarIcon = props => <Icon {...props} name="star" />;

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={() => <Text category="h6">User Profile</Text>}
        accessoryLeft={() => <NavigationAction icon="leftArrow" />}
        style={{
          backgroundColor: theme['background-basic-color-2'],
        }}
      />
      <View contentContainerStyle={styles.contentContainerStyle}>
        <Image
          source={dp}
          //@ts-ignore
          style={styles.avatar}
        />
        <View style={styles.description}>
          <Text categry="s1">{user.name}</Text>
          <Text category="label">{user.email}</Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.options}>
          <Drawer
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            <DrawerGroup
              title="Diet Plans"
              accessoryLeft={() => (
                <Avatar source={Images.food} style={{ marginLeft: 10 }} />
              )}>
              <DrawerItem
                onPress={() =>
                  navigation.navigate('DietPage', { title: 'Breakfast' })
                }
                title="BreakFast"
                accessoryLeft={() => (
                  <Avatar source={Images.coffee} style={{ marginLeft: 10 }} />
                )}
              />
              <DrawerItem
                onPress={() =>
                  navigation.navigate('DietPage', { title: 'Lunch' })
                }
                title="Lunch"
                accessoryLeft={() => (
                  <Avatar source={Images.hotdog} style={{ marginLeft: 10 }} />
                )}
              />
              <DrawerItem
                title="Snacks"
                onPress={() =>
                  navigation.navigate('DietPage', { title: 'Snacks' })
                }
                accessoryLeft={() => (
                  <Avatar source={Images.popcorn} style={{ marginLeft: 10 }} />
                )}
              />
              <DrawerItem
                title="Dinner"
                onPress={() =>
                  navigation.navigate('DietPage', { title: 'Dinner' })
                }
                accessoryLeft={() => (
                  <Avatar source={Images.ramen} style={{ marginLeft: 10 }} />
                )}
              />
            </DrawerGroup>
            <DrawerGroup
              title="Workout Plans"
              accessoryLeft={() => (
                <Avatar source={Images.target} style={{ marginLeft: 10 }} />
              )}>
              <DrawerItem
                title="Daily"
                onPress={() =>
                  navigation.navigate('WorkoutPage', { title: 'Daily Workout' })
                }
                accessoryLeft={() => (
                  <Avatar source={Images.saly22} style={{ marginLeft: 10 }} />
                )}
              />
              <DrawerItem
                title="Weekly"
                onPress={() =>
                  navigation.navigate('WorkoutPage', { title: 'Weekly Workout' })
                }
                accessoryLeft={() => (
                  <Avatar source={Images.saly21} style={{ marginLeft: 10 }} />
                )}
              />
              <DrawerItem
                title="Monthly"
                onPress={() =>
                  navigation.navigate('WorkoutPage', { title: 'Monthly Workout' })
                }
                accessoryLeft={() => (
                  <Avatar source={Images.saly35} style={{ marginLeft: 10 }} />
                )}
              />
            </DrawerGroup>
          </Drawer>
        </View>
      </ScrollView>
    </Container>
  );
});

export default WandDProfile;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  contentContainerStyle: {
    paddingTop: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  avatar: {
    alignSelf: 'center',
    borderRadius: 32,
    marginTop: 30,
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
  description: {
    marginTop: 20,
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: windowHeight / 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: windowWidth / 2.5,
    height: windowHeight / 8,
    backgroundColor: '#2E3A59',
  },
  btn_text: {
    marginLeft: 15,
  },
  nav: {
    paddingBottom: 8,
    paddingHorizontal: 4,
  },
  options: {
    marginTop: 20,
  },
  msgBtn: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
});
