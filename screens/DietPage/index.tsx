import React, {memo, useState} from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  Switch,
} from 'react-native';
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  ViewPager,
  Tab,
  TabView,
  Toggle,
  Text,
} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useLayout from '../../hooks/useLayout';

//import Text from "components/Text";
import Content from '../../components/Content';
import Container from '../../components/Container';
import NavigationAction from '../../components/NavigationAction';
import Foods from './Foods';

const DietPage = memo(({route}) => {
  const {title} = route.params;
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <Container style={styles.container}>
      <Layout level="2" style={[{paddingTop: top}]}>
        <TopNavigation
          style={{
            ...styles.topNav,
            backgroundColor: theme['background-basic-color-2'],
          }}
          accessoryLeft={<NavigationAction icon="leftArrow" />}
          title={() => (
            <Text category="h6" marginLeft={16} marginBottom={8}>
              {title}
            </Text>
          )}
        />
      </Layout>
      <View style={styles.types}>
        <View style={styles.sub_types}>
          <Switch
            trackColor={{false: '#8F9BB3', true: '#598BFF'}}
            thumbColor={checked ? '#0057C2' : '#94CBFF'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setChecked}
            value={checked}
          />
          <Text category="s2">Veg</Text>
        </View>
        <View style={styles.sub_types}>
          <Switch
            trackColor={{false: '#8F9BB3', true: '#598BFF'}}
            thumbColor={checked2 ? '#0057C2' : '#94CBFF'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setChecked2}
            value={checked2}
          />
          <Text category="s2">Non-Veg</Text>
        </View>
      </View>
      <Foods />
    </Container>
  );
});

export default DietPage;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  topNav: {
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
  types: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  sub_types: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
