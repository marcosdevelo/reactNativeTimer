import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
// import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
// import { colors } from '../../utils/colors';
// import { spacing } from '../../utils/sizes';
// import { ProgressBar } from 'react-native-paper';

export const Timing = ({onChangeTime})=>{
  return(
    <>
    <View style={styles.timingButton}>
    <RoundedButton size={75} title="10" onPress={()=>onChangeTime(10)} />
    </View>
    <View style={styles.timingButton}>
    <RoundedButton size={75} title="15" onPress={()=>onChangeTime(15)} />
    </View>
        <View style={styles.timingButton}>
    <RoundedButton size={75} title="20" onPress={()=>onChangeTime(20)} />
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: 'center',
  }
})