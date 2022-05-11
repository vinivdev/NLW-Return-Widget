import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import sucessImg from '../../assets/success.png';
import { Copyright } from '../Copyright';

interface Props{
  onSendAnoherFeedback: () => void;
}

export function Success({ onSendAnoherFeedback } : Props) {
  return (
    <View style={styles.container}>
       <Image 
         source={sucessImg}
         style={styles.image}
       />

       <Text style={styles.title}>
          Agradecemos o feedback
       </Text>
       <TouchableOpacity style={styles.button} onPress={onSendAnoherFeedback}>
         <Text style={styles.buttonTitle}>
           Quero enviar outro
         </Text>
       </TouchableOpacity>

       <Copyright />
    </View>
  );
}