import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import Dialog from 'react-native-dialog';
import Task from './components/Task';

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = (task) => {
    Keyboard.dismiss();
    if (task !== undefined && task != null) {
      setTaskItems([...taskItems, task]);
      setTask(null);
    } else {
      console.log("Error");
      showErrorAdd();
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  {/*Menu despegable*/ }
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const clearTasks = () => {
    setTaskItems([]);
    hideMenu();
  };

  {/*Dialogo de error (addTasks)*/}
  const showErrorAdd = () => {
    return Alert.alert(
      "Error adding the task!",
      "Try typing something on the text field.",
      [
        {
          text: "Ok",
        }
      ]
    );
  };

  {/*Dialogo de confirmacion (clearTasks)*/}
  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to clear all tasks?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            clearTasks()
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <Menu visible={visible} anchor={<Text style={styles.menuText} onPress={showMenu}>...</Text>} onRequestClose={hideMenu}>
            <MenuItem onPress={showConfirmDialog}>Clear tasks</MenuItem>    
            <MenuItem onPress={hideMenu}>Close menu</MenuItem>
          </Menu>
        </View>


        <View style={styles.items}>
          {/* //This is where the tasks will go */}
          {
            taskItems.map((item, index) => {
              return <TouchableOpacity key={index} onPress={() => completeTask()}>
                <Task text={item} />
              </TouchableOpacity>
            })
          }
        </View>

      </View>

      {/* Escribir una tarea */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask(task)}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
        <Menu visible={visible} anchor={<Text style={styles.menuText} onPress={showMenu}>...</Text>} onRequestClose={hideMenu}>
          <MenuItem onPress={showConfirmDialog}>Clear tasks</MenuItem>    
          <MenuItem onPress={hideMenu}>Close menu</MenuItem>
        </Menu>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 60,
    width: 270,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
  menu: {
    paddingTop: 60,
    paddingLeft: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  menuText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
});
