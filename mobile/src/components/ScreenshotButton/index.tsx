import { Camera, Trash } from 'phosphor-react-native';
import React from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../../theme';

import { styles } from './styles';

interface Props {
   screenshot: string | null;
   OnTakeShot: () => void;
   OnRemoveShot: () => void;
}

export function ScreenshotButton({ screenshot, OnTakeShot, OnRemoveShot } : Props) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={ screenshot ? OnRemoveShot : OnTakeShot}
    >
       {
          screenshot 
          ?
          <View>
            <Image 
              style={styles.image}
              source={{uri: screenshot}}
            />

            <Trash
              size={22}
              color={theme.colors.text_secondary}
              weight="fill"
              style={styles.removeIcon}
            />
          </View>
         :
         <Camera
            size={24}
            color={theme.colors.text_secondary}
            weight="bold"
         />
       }
    </TouchableOpacity>
  );
}  