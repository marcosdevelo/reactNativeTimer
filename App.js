import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/focusHistory';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';
import { Timer } from './src/features/timer/Timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
// or any pure javascript modules available in npm
const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { key: String(focusHistory.length + 1),subject, status }]);
  };
const onClear =() =>{
  setFocusHistory([]);
}
const saveFocusHistory=async ()=>{
  try{
    AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
  }catch(e){
    console.log(e)
  }
}
const loadFocusHistory = async ()=>{
  try{
const history = await AsyncStorage.getItem("focusHistory");
if(history && JSON.parse(history).length){
  setFocusHistory(JSON.parse(history));
}
  }catch(e){
    console.log(e)
  }
}

useEffect(()=>{
  loadFocusHistory();
},[]);

  useEffect(() => {
    if (focusHistory) {
      saveFocusHistory();
    }
  }, [focusSubject]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
        <Focus addSubject={setFocusSubject} />
        <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
