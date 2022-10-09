import React, {memo} from 'react';
import {StyleSheet, useWindowDimensions, View, Image} from 'react-native';
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  ViewPager,
  Text,
} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useLayout from '../../hooks/useLayout';

//import Text from '../../components/Text';
import Content from '../../components/Content';
import Container from '../../components/Container';
import NavigationAction from '../../components/NavigationAction';
import WandD from './WandD';

const WorkoutandDietPlans = memo(() => {
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <Container style={styles.container}>
      <Layout style={[{paddingTop: top}, styles.nav]} level="2">
        <TopNavigation
          style={styles.topNav}
          appearance="control"
          title={() => (
            <Text category="h6" style={styles.heading}>
              Workout and Diet Plans
            </Text>
          )}
          accessoryRight={<NavigationAction icon="search" />}
        />
      </Layout>
      <WandD />
    </Container>
  );
});

export default WorkoutandDietPlans;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  nav: {
    paddingBottom: 8,
    paddingHorizontal: 4,
  },
  content: {
    marginTop: 16,
  },
  tabBar: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 8,
  },
  viewPage: {
    flex: 1,
  },
  heading: {
    fontFamily: 'Montserrat-Regular',
    marginLeft: 12,
  },
});
