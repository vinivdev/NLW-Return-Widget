import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, } from 'react-native';
import { theme } from '../../theme';
import { Feedbacktype } from '../Widget'
import { Button } from '../Button'
import { ScreenshotButton } from '../ScreenshotButton'
import { styles } from './styles';
import { feedbackTypes } from '../../utils/feedbackTypes'
import { captureScreen } from 'react-native-view-shot'
import { api } from '../../libs/api';
import * as FileSystem from 'expo-file-system'


interface Props {
   feedbackType: Feedbacktype;
   onFeedbackCanceled: () => void;
   onFeedbackSent: () => void;
}

export function Form({feedbackType, onFeedbackCanceled, onFeedbackSent}: Props) {
   
   const [screenshot, setScreenshot] = useState<string | null>(null);
   const feedbackTypeInfo = feedbackTypes[feedbackType];
   const [isSendingFeedback, setIsSendingFeedback ] = useState(false);
   const [ comment, setComment ] = useState('');
   
   function handleScreenshot(){
      captureScreen({
         format: 'png',
         quality: 0.8
      })
      .then(uri => setScreenshot(uri))
      .catch(error => console.log(error));
   }
   function handleScreenshotRemove(){
      setScreenshot(null);
   }

   async function handleSendFeedback(){
      if(isSendingFeedback){
         return;
      }

      setIsSendingFeedback(true);

      const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' });

      try{
         await api.post('/feedbacks', {
            type: feedbackType, 
            comment,
            screenshot:`data:image/png;base64, ${screenshotBase64}`,
         });

         onFeedbackSent();

      }catch(error){
         console.log(error);
         setIsSendingFeedback(false);
      }
   }


  return (
    <View style={styles.container}>
       <View style={styles.header}>
         <TouchableOpacity onPress={onFeedbackCanceled}>
            <ArrowLeft
               size={24}
               weight="bold"
               color={theme.colors.text_secondary}
            />
         </TouchableOpacity>
         <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
               <Image source={feedbackTypeInfo.image}
               style={styles.image}
               />
               {feedbackTypeInfo.title}
            </Text>
         </View>
       </View>

       <TextInput
       multiline
       style={styles.input}
       placeholder="Algo não está funcionando bem? Queremmos corrigir. Conte com detalhes o que está acontecendo..."
       placeholderTextColor={theme.colors.text_secondary}
       autoCorrect={false}
       onChangeText={setComment}
       />
       <View style={styles.footer   }>
         <ScreenshotButton 
         OnTakeShot={handleScreenshot}
         OnRemoveShot={handleScreenshotRemove}
         screenshot={screenshot}
         />

         <Button 
         onPress={handleSendFeedback}
            isLoading={isSendingFeedback}
         />
       </View>

    </View>
  );
}