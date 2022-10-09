//import Text from './Text';
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Text,
  StyleProp,
  ColorValue,
} from 'react-native';
import {Button, Layout, useTheme} from '@ui-kitten/components';
import {EvaSize} from '@ui-kitten/components/devsupport';

interface Props {
  tabs?: string[];
  style?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  backgroundTab?: string | ColorValue;
  backgroundTabActive?: string | ColorValue;
  onChangeTab: (index: number) => void;
  tabActive: number;
  uppercase?: boolean;
  capitalize?: boolean;
  status?: Array<string>;
  size?: EvaSize;
  unreadData?: string;

  category?:
    | 'header'
    | 'title1'
    | 'title2'
    | 'title3'
    | 'title4'
    | 'body'
    | 'call-out'
    | 'subhead'
    | 'caption1'
    | 'caption2'
    | 'label';
}
const TabBar = ({
  tabs,
  onChangeTab,
  style,
  tabStyle,
  size,
  capitalize,
  uppercase,
  backgroundTab,
  tabActive,
  status = ['blue', 'placeholder'],
  backgroundTabActive,
  category = 'body',
  unreadData,
}: Props) => {
  const theme = useTheme();
  const _onChangeTab = React.useCallback(
    (number: number) => {
      onChangeTab(number);
    },
    [onChangeTab],
  );

  return (
    <View style={[styles.container, style, {backgroundColor: backgroundTab}]}>
      {tabs?.map((item, index) => {
        const backgroundColor = {
          backgroundColor:
            tabActive === index ? backgroundTabActive : undefined,
        };
        const tintColor = tabActive === index ? status[0] : status[1];
        return (
          <Button
            onPress={() => _onChangeTab(index)}
            key={index}
            style={[styles.tabStyle, backgroundColor, tabStyle]}
            size={size}
            children={props => {
              return <Text style={styles.tabText}>{item}</Text>;
            }}
          />
        );
      })}
      {unreadData ? (
        <View
          style={[
            styles.noti,
            {
              backgroundColor: theme['background-basic-color-5'],
            },
          ]}>
          <Text />
        </View>
      ) : null}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 24,
    marginTop: 32,
  },
  tabStyle: {
    marginLeft: 10,
    borderRadius: 24,
    justifyContent: 'center',
    flex: 1,
  },
  noti: {
    position: 'absolute',
    right: 9,
    top: 9,
    borderRadius: 50,
  },
  tabText: {
    fontFamily: 'System',
    fontSize: 14,
    marginHorizontal: 10,
  },
});
