import React, {memo} from 'react';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
  Icon,
  Layout,
  useTheme,
  Text,
} from '@ui-kitten/components';

import useLayout from '../../hooks/useLayout';
import Content from '../../components/Content';
import Container from '../../components/Container';

import NavigationAction from '../../components/NavigationAction';
//import CustomSlider from './CustomSlider';
import {Images} from '../../assets/images';
import WorkoutItem from '../../components/WorkoutItem';
import {TouchableHighlight, View} from 'react-native';

const TrainingCount = memo(({route}) => {
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);
  const {title} = route.params;
  const theme = useTheme();

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
      {/* <CustomSlider
        value={duration}
        maxValue={currentTime}
        time={time}
        style={{marginTop: -width / 8.5}}
      /> */}
      <Content style={{marginTop: width / 15}}>
        {DATA.map((item, index) => {
          return <WorkoutItem data={item} key={index} />;
        })}
      </Content>
    </Container>
  );
});

export default TrainingCount;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  backgroundVideo: {
    height: 250,
    width: '100%',
  },
  content: {
    marginTop: 28,
  },
  slider: {
    marginTop: -36,
  },
  topNav: {
    paddingHorizontal: 4,
  },
  playPause: {
    opacity: 0.8,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
    left: 0,
  },
});
const DATA = [
  {
    id: 1,
    title: 'Jump Jump',

    image: Images.workList2,
  },
  {
    id: 2,
    title: 'One legs',

    image: Images.workList3,
  },
  {
    id: 3,
    title: 'Yoga Time',

    image: Images.workList4,
  },
];
