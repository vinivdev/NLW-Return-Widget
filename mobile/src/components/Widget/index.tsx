import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { theme } from '../../theme';
import { styles } from './styles';
import BottomSheet from '@gorhom/bottom-sheet';
import { Options } from '../Options';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Form } from '../Form';
import { Success } from '../Success';

export type Feedbacktype = keyof typeof feedbackTypes;

function Widget() {
   
   const [feedbackType, setFeedbackType] = useState<Feedbacktype | null>(null);
   const [feedbackSent, setFeedbackSent] = useState(false);

   const BottomSheetRef = useRef<BottomSheet>(null);
  
  function handleOpen(){
     BottomSheetRef.current?.expand();
  }

  function handleRestartFeedback(){
     setFeedbackType(null);
     setFeedbackSent(false);
  }

  function handleFeedbackSent(){
     setFeedbackSent(true);
  }

   return (
    <>
      <TouchableOpacity 
         style={styles.button}
         onPress={handleOpen}
      >
         <ChatTeardropDots 
            size={24}
            color={theme.colors.text_on_brand_color}
            weight="bold"
         />
      </TouchableOpacity>

      <BottomSheet
      ref={BottomSheetRef}
      snapPoints={[1, 280]}
      backgroundStyle={styles.modal}
      handleIndicatorStyle={styles.indicator}
      >
         {
            feedbackSent ?
            <Success onSendAnoherFeedback={handleRestartFeedback}/>
            :
            <>{
               feedbackType ?
               <Form
                  feedbackType={feedbackType }
                  onFeedbackCanceled={handleRestartFeedback}
                  onFeedbackSent={handleFeedbackSent}
               />
               :
               <Options onFeedbackTypeChanged={setFeedbackType} />

            }</>
         }
      </BottomSheet>

    </>
  );
}

export default gestureHandlerRootHOC(Widget);