import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Complaint = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complaint</Text>
      <Text style={styles.subtitle}>This is the complaint screen placeholder.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#102A43'
  },
  subtitle: {
    marginTop: 8,
    color: '#6B7280'
  }
})

export default Complaint
