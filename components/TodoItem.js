import React from 'react';
import {StyleSheet, View, Text, Image, Button, TouchableOpacity} from 'react-native';

export default class TodoItem extends React.Component{

    constructor(props)
    {
         super(props);
         this.state={
            markComplete : true
         }
    }

    render(){
            const todoItem = this.props.todoItem;

            return[
                <TouchableOpacity
                    style={styles.todoItem}
                    onPress = {() => this.props.toggleDone()}>

                    <Text
                        style={(todoItem.done) ? {color: '#AAAAAA'}:{color: '#313131'}}>
                        {todoItem.title}
                    </Text>


                </TouchableOpacity>,


                     <View style={styles.emailButton}>
                           <Button
                                style={styles.emailButton}
                                title = "@"
                                onPress={()=>this.props.sendEmail()}
                           />

                           <Button
                            style = {styles.email}
                            title = "SNAP"
                            onPress={()=>this.props.takePic()}
                           />

                           <Button
                               style = {styles.removeButton}
                               title="Remove"
                               color = {(todoItem.done) ? 'rgba(200,0,0,0.5)' : 'rgba(255,0,0,1)'}
                               onPress = {() => this.props.removeTodo()}
                           />

                     </View>,



            ];

        }

}

const styles = StyleSheet.create({
    todoItem: {
        width: '70%',
        height: 40,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15
    },
    email:{

        flexDirection:'row',
        flex: 1,
        backgroundColor:"#ff4500",
        justifyContent: 'space-between',

      },

    emailButton:
    {
        flexDirection:'row',
        flex: 1,
        color:"#ff4500",
        justifyContent: 'space-between',

    },

    removeButton:
    {
        width : '30%',
        flex: 1,
        justifyContent : 'flex-end',
    }


})