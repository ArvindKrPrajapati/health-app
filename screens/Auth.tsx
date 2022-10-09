import React, { memo, useState } from 'react';
import { View, Image, Dimensions, Text, Pressable, Alert } from 'react-native';
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Input,
  Icon,
  Button,
  CheckBox,
} from '@ui-kitten/components';

//import Text from '../components/Text';
import Container from '../components/Container';
import { Images } from '../assets/images';
import TabBar from '../components/TabBar';
import { SceneMap, TabView } from 'react-native-tab-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useLayout from '../hooks/useLayout';
import { useNavigation } from '@react-navigation/native';
import { _login } from "../utils/api.service"
const initialLayout = { width: Dimensions.get('window').width };

const Auth = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);


  const SignInTab = React.useCallback(() => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
      if (!loading) {
        const isValidEmail = /\S+@\S+\.\S+/.test(email);
        if (isValidEmail && password) {
          setLoading(true);
          try {
            const res = await _login(email, password)
            if (res?.login) {
              navigation.reset({
                index: 1,
                routes: [{ name: 'Tab' }],
              })
            } else {
              Alert.alert("Error", "Wrong Credentials")
            }
            setEmail('');
            setPassword('')
            setLoading(false);
          } catch (error) {
            console.log(error);

          }
        } else {
          Alert.alert("Error", "Enter Valid Name or Email or Mobile No.");
        }
      }
    }

    return (
      <View style={styles.layout}>
        <Input
          placeholder="Your email"
          onChangeText={e => setEmail(e)}
          value={email}
          style={styles.input}
          accessoryLeft={props => (
            <Icon
              {...props}
              style={styles.icon}
              pack="assets"
              name={'email'}
              style={{
                tintColor: '#fff',
              }}
            />
          )}
        />
        <Input
          placeholder="Password"
          onChangeText={e => setPassword(e)}
          value={password}
          style={styles.input}
          accessoryLeft={props => (
            <Icon
              {...props}
              style={[styles.icon, { tintColor: '#fff' }]}
              pack="assets"
              name={'padLock'}
            />
          )}
        />
        <Button disabled={(!email || !password)} children={loading ? "Signing in ....." : "Sign In with Web3"} style={styles.button} onPress={handleLogin} />
        <Pressable onPress={() => { navigation.navigate("Signup") }} style={{ padding: 10, marginBottom: 10 }}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>Signup</Text>
        </Pressable>
      </View>
    );
  }, []);

  return (
    <Container style={styles.container}>
      <Layout level="2">
        <SignInTab />
      </Layout>
    </Container>
  );
});

export default Auth;

const themedStyles = StyleService.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    width: 48,
    height: 48,
  },
  button: {
    marginTop: 32,
    marginBottom: 24,
  },
  layout: {
    marginTop: 32,
    marginHorizontal: 24,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  input: {
    marginTop: 24,
    borderBottomColor: '#fff',
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  icon: {
    width: 16,
    height: 16,
    marginLeft: 8,
    tintColor: 'icon-input-basic-color',
  },
  bottom: {
    marginLeft: 16,
  },
});
