import React, { memo, useState } from 'react';
import { View, Dimensions, Text, Pressable, Alert } from 'react-native';
import {
    useTheme,
    StyleService,
    useStyleSheet,
    Layout,
    Input,
    Icon,
    Button,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import Container from '../components/Container';
import useLayout from '../hooks/useLayout';
// import { db } from '../utils/firebase-config';
// import { push, ref } from 'firebase/database';s
import { _signup } from "../utils/api.service"



const initialLayout = { width: Dimensions.get('window').width };

const Signup = memo(() => {
    const navigation = useNavigation();

    const { height, width, top, bottom } = useLayout();
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);

    const SignInTab = React.useCallback(() => {
        const [email, setEmail] = useState('');
        const [name, setName] = useState('');
        const [mobile, setMobile] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);
        const handleSignup = async () => {
            if (!loading) {
                const isValidEmail = /\S+@\S+\.\S+/.test(email);
                const isValidMobile = mobile.length === 10
                const isValidPassword = password.length >= 8;
                if (isValidEmail && name !== '' && isValidMobile && isValidPassword) {
                    setLoading(true);
                    try {
                        // await push(ref(db, '/coach'), { name, email, mobile });
                        const res = await _signup(name, password, email, mobile)
                        if (res?.signup) {
                            setEmail('');
                            setName('');
                            setMobile('');
                            setPassword('')
                            navigation.reset({
                                index: 1,
                                routes: [{ name: 'Tab' }],
                            })
                        } else {
                            Alert.alert("Error", "Signup Error")
                        }
                        setLoading(false);
                    } catch (error) {
                        console.log(error);

                    }
                } else {
                    Alert.alert("Error", "something went wrong");
                }
            }
        }
        return (
            <View style={styles.layout}>
                <Input
                    placeholder="Your Name"
                    onChangeText={e => setName(e)}
                    value={name}
                    style={styles.input}
                    accessoryLeft={props => (
                        <Icon
                            {...props}
                            style={[styles.icon, { tintColor: '#fff' }]}
                            pack="assets"
                            name={'user'}
                        />
                    )}
                />
                <Input
                    placeholder="Your Email"
                    onChangeText={e => setEmail(e)}
                    value={email}
                    style={styles.input}
                    accessoryLeft={props => (
                        <Icon
                            {...props}
                            style={[styles.icon, { tintColor: '#fff' }]}
                            pack="assets"
                            name={'email'}
                        />
                    )}
                />
                <Input
                    placeholder="Mobile No."
                    onChangeText={e => setMobile(e)}
                    value={mobile}
                    maxLength={10}
                    style={styles.input}
                    keyboardType='number-pad'
                    accessoryLeft={props => (
                        <Icon
                            {...props}
                            style={[styles.icon, { tintColor: '#fff' }]}
                            pack="assets"
                            name={'smartphone'}
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
                    secureTextEntry={true}
                />
                <Button disabled={(!name || !email || !password || !mobile)} onPress={handleSignup} children={loading ? 'Signing Up....' : 'Signup with Web3'} style={styles.button} />
                <Pressable onPress={() => { navigation.navigate('Auth', {}) }} style={{ padding: 10, marginBottom: 10 }}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Login</Text>
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

export default Signup;

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
        width: 22,
        height: 22,
        marginLeft: 8,
        tintColor: 'icon-input-basic-color',
    },
    bottom: {
        marginLeft: 16,
    },
});
