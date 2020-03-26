/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * TUTORIAL LINK : https://www.youtube.com/watch?v=NuZOwsmzcro

 * FOLLOWED THESE LINKS :
 *  LINK 1: https://stackoverflow.com/questions/58048465/camera-takepictureasyncoptions-is-not-a-function-in-react-native-camera
 * LINK 2: https://github.com/react-native-community/react-native-camera/issues/1373
 * LINK FOR REFERENCE : https://blog.pusher.com/getting-started-react-native-part-3/
 * LINK 3: https://reactnativeforyou.com/how-to-show-photos-of-your-device-as-a-gallery-in-react-native/
 * LINK 4: https://stackoverflow.com/questions/48151242/how-to-save-a-picture-to-a-specific-folder-from-react-native-camera-roll?rq=1
 * LINK 5: https://stackoverflow.com/questions/53831838/react-native-and-rn-fetch-blob-move-captured-image-from-pictures-to-custom-folde
 * LINK 6: https://github.com/joltup/rn-fetch-blob/issues/177
 */

import React from 'react';
import { SafeAreaView,StyleSheet,ScrollView,TouchableOpacity,View,Text,Button, StatusBar,FlatList} from 'react-native';


import email from 'react-native-email';
import Header from './components/Header.js';
import InputBar from './components/InputBar.js';
import TodoItem from './components/TodoItem.js';
import {RNCamera} from 'react-native-camera';
import RNFetchBlob from 'rn-fetch-blob';
import * as RNFS from 'react-native-fs';
import * as RNFU from 'react-native-file-utils';
import {dirPictures} from './components/dirStorage.js';
const moment = require('moment');




const pictureFolder = RNFetchBlob.fs.dirs.SDCardDir+'/todoApp/';

const moveAttachment = async (filePath, newFilepath) => {

    return new Promise((resolve,reject)=>{
        console.log("moveAttachment: " , dirPictures);
        RNFS.mkdir(dirPictures)
        .then(()=>{
            RNFS.moveFile(filePath, newFilepath)
        })
        .then(() => {
           console.log('FILE MOVED', filePath, newFilepath);
           //resolve(true);
        })
        .catch(err=>{
           console.log('mkdir error', err);
         })
         .catch(error=>{
                console.log('moveFile error', error);
                //reject(error);
         });

    });

};


export default class App extends React.Component{

 constructor(props)
 {
    super(props);
    this.state =
    {
        todoInput : '',
        isCameraVisible : false,
        todos :[
            {id:0, title:'Find a job', done: false},
            {id:1, title:'House Insurance', done: false}

        ]
    }
 }



SendEmail(item) {

let todos = this.state.todos;

const to = ['robogeekster@gmail.com'];

todos = todos.map((todo) => {
            if(todo.id == item.id){
                email(to,{
                        subject: 'Tasks from TodoApp',
                        body: `${todo.title}`
                        }).catch(console.error);
            }


});



}





 addNewTodo() {
    console.log("Add New Todo Test");

    let todos = this.state.todos;
    todos.unshift({
        id: todos.length+1,
        title: this.state.todoInput,
        done: false

    });

    this.setState({
        todos,
        todoInput : ' '

    });

    console.log("Add New Todo Set State");
 }

 toggleDone(item){
    let todos = this.state.todos;
        todos = todos.map((todo) => {
            if(todo.id == item.id){
                todo.done = !todo.done;
            }

            return todo

        })
            this.setState({todos});
 }

 removeTodo(item)
 {
    let todos = this.state.todos;

    todos = todos.filter((todo) => todo.id !== item.id);

    this.setState({todos});


 }

 handleState (){
    console.log("Before"+this.state.isCameraVisible);
    this.setState({isCameraVisible: true});


 }

 PendingView = () => {
    <View
        style={{flex:1,
                backgroundColor: 'lightgreen',
                justifyContent: 'center',
                alignItems: 'center'}}
    >
        <Text>Waiting</Text>
    </View>
 };

takePicture = async(props) =>{




//                            this.camera
//                            .capture()
//                            .then(data => this.saveImage(data.path))
//                            .catch(err=> console.error('capture picture error', err));
                         if(this.camera)
                         {
                             const options = {quality: 0.5, base64: true};
                             const data = await this.camera.takePictureAsync(options);
                             {console.log("takePicture: " , data.uri)}
                             this.saveImage(data.uri)
                         }
//                             RNFU.getPathFromURI(data.uri)
//                             .then(data=> {
//                               RNFS.eadFile(path,'base64').then(imageBase64=>
//                               console.log("Base64: ", imageBase64))

//                             })
//                             .catch
//                             {
//                                console.log("Filepath error");
//                             }

                             //{console.log(data.uri)};



  };

saveImage = async (filePath) => {
    try
    {
        {console.log("saveImage: ", filePath)};
        const newImageName = `${moment().format('DDMMYY_HHmmSSS')}.jpg`;
        const newFilepath = `${dirPictures}/${newImageName}`;
        {console.log("newFilepath: ", newFilepath)};
        const imageMoved=await moveAttachment(filePath, newFilepath);
        console.log('image moved', imageMoved);
    }
    catch(error)
    {
    console.log(error);
    }

};









displayCamera = () => {

return(
<View style={styles.rcontainer}>
                <RNCamera
                            ref={cam=>(this.camera=cam)}
                            style={styles.preview}
                            type={RNCamera.Constants.Type.back}
                            androidCameraPermissionOptions={{
                            title: 'Permission to use Camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'OK',
                            buttonNegative: 'Cancel',
                            }}
                            androidAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your microphone',
                            buttonPositive: 'OK',
                            buttonNegative: 'Cancel'
                            }}
                 />
                            {console.log("RNCamera")}


                            <View style={{flex:0, flexDirection:'row',justifyContent:'center'}}>

                                  <TouchableOpacity onPress={()=>this.takePicture()} style={styles.capture}>
                                          <Text style={{fontSize: 14}}> Capture </Text>
                                  </TouchableOpacity>
                            </View>





   </View>
  );


  };





 render()
 {



    return(

            <View style={styles.container}>
                <Header title="Todo App"/>
                    <InputBar
                        SendEmail={() => this.SendEmail()}
                        addNewTodo={ () => this.addNewTodo()}
                        textChange={todoInput =>
                        this.setState({todoInput:todoInput})}
                        todoInput={this.state.todoInput}
                    />

            {/** Documentation : https://react-native-community.github.io/react-native-camera/docs/rncamera**/}

                     <FlatList
                        data= {this.state.todos}
                         extraData={this.state}
                         keyExtractor = {(item,index) => index.toString()}
                         renderItem = { ({item,index}) =>{


                        return(
                            <TodoItem todoItem={item}
                                toggleDone={() =>this.toggleDone(item)}
                                sendEmail = {() => this.SendEmail(item)}
                                takePic = {() => this.handleState()}
                                removeTodo = {() => this.removeTodo(item)}/>
                            )

                        }}

                     />

               <View style={styles.cameraView}>

                 {/*   <TouchableOpacity onPress = {this.handleState.bind(this)} style={styles.capture}>
                                  <Text style={{fontSize : 14}}> SNAP </Text>

                    </TouchableOpacity> */}



                    <View >
                        <Text>  {console.log(this.state.isCameraVisible)} </Text>
                        {this.state.isCameraVisible ? this.displayCamera() : null }
                     </View>
                </View>


            </View>

    );

  }

} //End of Class

const styles = StyleSheet.create({
  container:{
    flex : 1,
    backgroundColor: '#fff',

  },

  rcontainer:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },

  subContainer:{
    flex: 1,
    backgroundColor: '#0000ff',
  },

  bar:{
    backgroundColor:"#FFCE00",
    height:20
  },

 cameraView:{
    flex : 9,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center'
},

capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20

},


preview:{
    flex: 1,
    justifyContent:'flex-end',
    alignItems: 'center',


}




});


