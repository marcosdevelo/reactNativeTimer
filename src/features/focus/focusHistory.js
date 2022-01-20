import * as React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';
// or any pure javascript modules available in npm
import { colors } from '../../utils/colors';


const HistoryItem=({item,index})=>{
return(
  <Text style={styles.historyItem(item.status)}>
  {item.subject}
  </Text>
)
}
 export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };
  return(
    <>
    <SafeAreaView style={{flex:1 , alignItems:'center'}}>

    {!!focusHistory.length && (
       <>
    <Text style={styles.title}>
    Things we've focused on
    </Text>
    <FlatList style={{ flex: 1}} contentContainerStyle={{flex:1, alignItems:'center'}}
    data={focusHistory}
    renderItem={HistoryItem}
     />
     
    <View style={styles.clearContainer}>
    <RoundedButton size={75} title="Clear" onPress={()=> onClear()} />
    </View>
    </> 
    )}
    </SafeAreaView>
    </>
  )
};

const styles = StyleSheet.create({
historyItem: (status) => ({
  color: status > 1 ? 'red':'green',
  fontSize:fontSizes.md
}),
title:{
  color:'white',
  fontSize:fontSizes.lg
},
clearContainer:{
  alignItems: 'center',

}
});
