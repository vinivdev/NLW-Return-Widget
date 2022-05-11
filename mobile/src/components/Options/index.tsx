import React from 'react';
import { Copyright } from '../Copyright';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { Option } from '../Option';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Feedbacktype } from '../Widget';

interface Props{
  onFeedbackTypeChanged: (feedbacktype: Feedbacktype) => void;
}


export function Options({ onFeedbackTypeChanged } : Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Deixe seu feedback
      </Text>

      <View style={styles.options}>
        {
          Object.entries(feedbackTypes).map(([key, value]) => (
            <Option
              key={key}
              title={value.title}
              image={value.image }
              onPress={() => onFeedbackTypeChanged(key as Feedbacktype)}
            />
          ))
        }
      </View>

      <Copyright />

    </View>
  );
}