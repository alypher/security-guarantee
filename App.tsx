import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import moment from "moment"

export default function App() {
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
    date:  moment.duration().add({
      days:0,
      hours:0,
      minutes:0,
      seconds:10
    }),
    status: 'inProgress' 
  })

  const countdown = () => {
    const timer = setInterval(() => {
      setState(state => {
        let { date } = state

        if(date.valueOf() <= 0){
          clearInterval(timer)
          alert('Message sent!')
          return {...state, status: 'done'}
        } else {
          date = date.subtract(1,"s")
          
          const days = date.days()
          const hours = date.hours()
          const mins = date.minutes()
          const secs = date.seconds()
    
          return({
            days,
            hours,
            mins,
            secs,
            date
          })
        }
      })
    },1000)
  }

  useEffect(() => {
    countdown()
  }, [])

  return (
    <View style={styles.container}>
      <Text>SECURITY GUARANTEE</Text>
      <Text>{`${state?.days} : ${state?.hours} : ${state?.mins} : ${state?.secs}`}</Text>

      <View id="config" style={styles.configMenu}>
        <Button title="CFG" onPress={() => alert('Config')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  configMenu: {
    display: 'flex',
    position: 'absolute',
    bottom: 20,
    left: 20
  },
  sendButton: {
    display: 'flex',
    position: 'absolute',
    bottom: 20,
    right: 20
  }
});
