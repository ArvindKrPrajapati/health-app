import React, {useState} from 'react';
import {View, Image, ImageSourcePropType, TouchableOpacity} from 'react-native';
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Text,
  Icon,
} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import useLayout from '../hooks/useLayout';

//import Text from "components/Text";

interface Props {
  id: number;
  title: string;
  image: ImageSourcePropType;
  times: number;
  rep: number;
}
interface DataProps {
  data: Props;
  onPress?(): void;
}
const WorkoutItem = ({data, onPress}: DataProps) => {
  const styles = useStyleSheet(themedStyles);
  const [times, setTimes] = useState(25);
  const [rep, setRep] = useState(3);

  return (
    <Layout level="2" style={styles.item}>
      <Image
        source={data.image}
        /* @ts-ignore */
        style={styles.img}
      />
      <View>
        <Text style={{marginLeft: 24}} category="s1">
          {data.title}
        </Text>
        <View style={styles.times}>
          <TouchableOpacity
            onPress={() => setTimes(prev => (prev ? prev - 1 : prev))}
            activeOpacity={0.7}>
            <Icon
              pack="assets"
              name="upArr"
              style={{tintColor: '#D4D4D4', marginHorizontal: 5}}
            />
          </TouchableOpacity>
          <Text
            category="label"
            children={`${times} times`}
            appearance="hint"
          />
          <TouchableOpacity
            onPress={() => setTimes(prev => prev + 1)}
            activeOpacity={0.7}>
            <Icon
              pack="assets"
              name="downArr"
              style={{tintColor: '#D4D4D4', marginHorizontal: 5}}
            />
          </TouchableOpacity>
          <Layout style={styles.dot} />
          <TouchableOpacity
            onPress={() => setRep(prev => (prev ? prev - 1 : prev))}
            activeOpacity={0.7}>
            <Icon
              pack="assets"
              name="upArr"
              style={{tintColor: '#D4D4D4', marginHorizontal: 5}}
            />
          </TouchableOpacity>
          <Text category="label" children={`${rep} reps`} appearance="hint" />
          <TouchableOpacity
            onPress={() => setRep(prev => prev + 1)}
            activeOpacity={0.7}>
            <Icon
              pack="assets"
              name="downArr"
              style={{tintColor: '#D4D4D4', marginHorizontal: 5}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default WorkoutItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  times: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 24,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 55,
    backgroundColor: 'color-basic-1200',
    marginHorizontal: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 24,
    borderRadius: 12,
  },
  img: {
    borderRadius: 12,
  },
});
