import React, {Component} from 'react';
import{
    StyleSheet,
    View,
    StatusBar,
    Dimensions,
    TouchableOpacity,
}from 'react-native';
import RNCamera from 'react-native-camera';




let{height,width} = Dimensions.get('window');
let orientation = height > width ? 'Portrait' : 'Landscape';


class Camera extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            orientation
        };
    }

    componentWillMount(){
        Dimensions.addEventListener('change',this.handleOrientationChange);
    }

    componentWillUnmount(){
        Dimensions.removeEventListener('change', this.handleOrientationChange)
    }

    handleOrientationChange = dimensions => {
        ({height,width} = dimensions.window);
        orientation= height > width ? 'Portrait' : 'Landscape';
        this.setState({orientation});
    };



    render() {
        return(
            <View style={{flex: 1}}>
                <StatusBar barStyle="light-content" translucent/>

                <RNCamera
                                       style = {styles.preview}
                                       ref = {ref => {this.camera = ref; }}
                                       type = {RNCamera.Constants.Type.back}
                                       flashMode = {RNCamera.Constants.FlashMode.on}
                                       androidCameraPermissionOptions={{title: 'Permission to use camera',
                                       message: 'We need your permission to use your camera', buttonPositive: 'OK', buttonNegative:'Cancel',}}
                                       androidRecordAudioPermissionOptions={{title: 'Permission to use Audio',
                                          message: 'We need your permission to use your audio', buttonPositive: 'OK', buttonNegative:'Cancel',}}
                                       onGoogleVisionBarcodesDetected={({barcodes}) => {
                                          console.log(barcodes);
                                       }}
                                />



             </View>

        );


    }
 }

    const styles = StyleSheet.create({
        cameraContainer:{
            flex : 1
        },
        buttonContainerPortrait:{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.9)'
        },
        buttonContainerLandscape:{
            position: 'absolute',
            bottom:0,
            top:0,
            right:0,
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0.5)'
        },
        buttonPortrait:{
            backgroundColor: 'transparent',
            padding: 5,
            marginHorizontal: 20
        },
        buttonContainerLandscape:{
            backgroundColor: 'transparent',
            padding: 5,
            marginVertical: 20

        },

        cameraView:{
            flex : 0,
            flexDirection: 'row',
            justifyContent: 'center'
        },

        preview:{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',

        }


    });

    export default Camera;

