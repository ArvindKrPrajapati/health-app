import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import {StyleService, useStyleSheet, Layout, Text} from '@ui-kitten/components';

//import Text from "components/Text";

interface Props {
  title: string;
  gam: number;
  cals: number;
}
interface MealContentProps {
  title: string;
  data: Props[];
  style: StyleProp<ViewStyle>;
}

const MealContent = ({title, data, style}: MealContentProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={style}>
      <Text category="h6">{title}</Text>
      <View>
        {data.map((item, index) => {
          return (
            <Layout key={index} style={styles.card} level="2">
              <View>
                <Text category="s1" style={{marginBottom: 4}}>
                  {item.title}
                </Text>
                <Text category="label">{`${item.cals} CALS`}</Text>
              </View>
              <Text category="s1">{item.gam}g</Text>
            </Layout>
          );
        })}
      </View>
    </View>
  );
};

export default MealContent;

const themedStyles = StyleService.create({
  card: {
    paddingTop: 10,
    paddingBottom: 13,
    paddingLeft: 10,
    flexDirection: 'row',
    borderRadius: 8,
    marginTop: 16,
    justifyContent: 'space-between',
    paddingRight: 16,
    backgroundColor: '#2E3A59',
  },
});
