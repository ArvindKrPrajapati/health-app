import React, {memo} from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {useTheme, Icon, TopNavigationAction} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

import Text from './Text';

import {EvaStatus} from '@ui-kitten/components/devsupport';

interface NavigationActionProps {
  icon?: string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  backgroundColor?: string | ColorValue;
  nav?: string;
  title?: string;
  titleStatus?: EvaStatus | 'body' | 'white';
  status?: 'basic' | 'primary' | 'snow' | 'blue' | 'opacity' | 'secondary';
  size?: 'giant' | 'large' | 'medium' | 'small'; // giant-58-icon-24 large-48-icon-24  medium-40-icon-24  small-32-icon-16
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  params: any;
}

const NavigationAction = memo(
  ({
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    nav,
    icon,
    title,
    size = 'giant',
    status = 'basic',
    titleStatus,
    disabled,
    backgroundColor,
    style,
    params = {},
  }: NavigationActionProps) => {
    const themes = useTheme();

    const {goBack, navigate} = useNavigation();
    const _nav = React.useCallback(() => {
      if (nav) {
        navigate && navigate(nav, params);
      } else {
        goBack();
      }
    }, [nav, goBack]);

    const getSize = (size: 'giant' | 'large' | 'medium' | 'small'): number => {
      switch (size) {
        case 'giant':
          return 58;
        case 'large':
          return 48;
        case 'medium':
          return 40;
        case 'small':
          return 32;
        default:
          return 40;
      }
    };

    const getSizeIcon = (
      size: 'giant' | 'large' | 'medium' | 'small',
    ): number => {
      switch (size) {
        case 'giant':
          return 24;
        case 'large':
          return 20;
        case 'medium':
          return 20;
        case 'small':
          return 16;
        default:
          return 24;
      }
    };

    const getBorderRadius = (
      size: 'giant' | 'large' | 'medium' | 'small',
    ): number => {
      switch (size) {
        case 'giant':
          return 48;
        case 'large':
          return 24;
        case 'medium':
          return 24;
        case 'small':
          return 8;
        default:
          return 12;
      }
    };

    return title ? (
      <TouchableOpacity disabled={disabled} activeOpacity={0.7} onPress={_nav}>
        <Text category="body" status={titleStatus}>
          {title}
        </Text>
      </TouchableOpacity>
    ) : (
      <TopNavigationAction
        onPress={_nav}
        disabled={disabled}
        activeOpacity={0.7}
        style={[
          styles.container,
          style,
          {
            marginBottom: marginBottom,
            marginTop: marginTop,
            marginLeft: marginLeft,
            marginRight: marginRight,
            marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,
            height: getSize(size),
            width: getSize(size),
            borderRadius: getBorderRadius(size),
            backgroundColor: backgroundColor,
          },
        ]}
        icon={props => (
          <Icon
            {...props}
            pack="assets"
            name={icon || 'cancel'}
            style={[
              {
                height: getSizeIcon(size),
                width: getSizeIcon(size),
              },
              {tintColor: '#D4D4D4'},
            ]}
          />
        )}
      />
    );
  },
);

export default NavigationAction;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
