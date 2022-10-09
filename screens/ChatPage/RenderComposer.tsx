import React from 'react';
import {View} from 'react-native';
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  Icon,
  Text,
} from '@ui-kitten/components';

//import Text from "components/Text";
import {Composer, Send} from 'react-native-gifted-chat';

const RenderComposer = (props: any) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout
      {...props}
      style={{
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 6,
      }}>
      <Composer {...props} textInputStyle={{color: '#fff'}} />
      <View
        style={{
          flexDirection: 'row',
          marginRight: 8,
          alignItems: 'center',
        }}>
        <Button
          size="small"
          accessoryRight={<Icon pack="assets" name="image" />}
          style={styles.btn}
        />
        <Button
          size="small"
          accessoryRight={
            <Icon
              pack="assets"
              name="happyFace"
              style={{tintColor: theme['text-white-color'], ...styles.btn}}
            />
          }
        />
      </View>
    </Layout>
  );
};

export default RenderComposer;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  btn: {
    marginRight: 10,
  },
});
