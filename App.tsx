import React, {type PropsWithChildren} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {SafeAreaView, Text, View} from 'react-native';
import * as eva from '@eva-design/eva';

//Magic
import {Magic} from '@magic-sdk/react-native';

//Icons
import AssetIconsPack from './assets/AssetIconsPack';

//Navigation
import AppContainer from './navigation/AppContainer';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

const App = () => {
  // const magic = new Magic('pk_live_78A5F0904067F808');
  return (
    <SafeAreaProvider>
      {/* <magic.Relayer /> */}
      <IconRegistry icons={[AssetIconsPack]} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <SafeAreaProvider>
          <AppContainer />
        </SafeAreaProvider>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
};

export default App;
