import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Text,
  Layout,
} from '@ui-kitten/components';
import useLayout from '../../hooks/useLayout';
// import Text from "components/Text";
import NavigationAction from '../../components/NavigationAction';
import {
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory-native';

interface Props {
  x: number;
  y: number;
  date?: string;
}
interface ItemProps {
  data: Props[];
  haveRightArrow?: boolean;
  style?: StyleProp<ViewStyle>;
  title: string;
  strokeColor: string;
}

const Chart = ({
  data,
  style,
  haveRightArrow,
  title,
  strokeColor,
}: ItemProps) => {
  const {height, width, top, bottom} = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={[styles.container, style]} level="2">
      <Layout
        level="2"
        style={
          haveRightArrow ? styles.topCardHasBtn : styles.topCardNotHasButton
        }>
        <Text style={{color: '#fff'}}>{title}</Text>
        {haveRightArrow ? <NavigationAction icon="arrowRightCircle" /> : null}
      </Layout>

      <VictoryChart
        maxDomain={{y: 150}}
        width={width - 48}
        height={120 * (812 / height)}
        padding={{left: -1, bottom: 0, right: 0, top: 0}}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({datum}) => `${datum.step}`}
            labelComponent={
              <VictoryTooltip
                activateData={true}
                renderInPortal={false}
                flyoutWidth={56}
                flyoutHeight={32}
                cornerRadius={4}
                pointerLength={6}
                flyoutStyle={{
                  strokeWidth: 0,
                  fill: '#FFFFFF',
                }}
                style={{
                  fill: '#1A051D',
                  fontSize: 14,
                  fontWeight: '400',
                  lineHeight: 17,
                }}
                dy={-10}
                constrainToVisibleArea
                dx={3}
              />
            }
          />
        }>
        <VictoryLine
          y0={() => 40}
          animate={{
            duration: 2000,
            onLoad: {duration: 1000},
          }}
          interpolation={'catmullRom'}
          style={{
            data: {
              stroke: strokeColor,
              strokeWidth: 4,
            },
          }}
          data={data}
        />
      </VictoryChart>
      <Layout style={styles.label} level="2">
        <Text category="c2">S</Text>
        <Text category="c2">M</Text>
        <Text category="c2">T</Text>
        <Text category="c2">W</Text>
        <Text category="c2">T</Text>
        <Text category="c2">F</Text>
        <Text category="c2">S</Text>
      </Layout>
    </Layout>
  );
};

export default Chart;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 8,
    marginHorizontal: 24,
  },
  topCardHasBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 16,
  },
  topCardNotHasButton: {
    marginLeft: 16,
    marginTop: 17,
    marginBottom: 20,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    marginTop: -1,
    paddingTop: 21,
    paddingBottom: 16,
    borderRadius: 8,
  },
});
