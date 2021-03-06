import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';
import {
  TouchableHighlight,
  Modal,
  TextInput,
  Dimensions,
  ScrollView,
  Animated,
  Easing,
  View,
  Image,
  Text,
  Alert
} from 'react-native';

import LocationSelector from '../../common/LocationSelector/index.js';
import ImageCropper from '../../common/ImageCropper/index.js';
import ImagePicker from 'react-native-image-picker';
import PhotoPicker from '../../common/PhotoPicker/index.js';




import Styles from './styles';
import CommonStyles from '../../common/CommonStyle';

const windowWidth = Dimensions.get('window').width;

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}
export default class AddMomentView extends Component {

  static navigatorStyle = {
        tabBarHidden: true,
        navBarHidden:true
  };
  state = {
    bioCharacters:"0/200 characters",
    bioHeight:50
  };

  pickAvatar()  {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const avatarSource = { uri: response.uri, width: response.width, height: response.height };
        this.setState({
          avatarSource,
          openCorpModal: true
        });
      }
    });
  };


  render() {
    var offset = 0;
    return (
      <View style={{flex:1}}>
          <View style={{flex:1}}>
            <ScrollView>
                <View>
                  <Text style={{color:'rgb(106,100,100)',fontSize:18,width:windowWidth,textAlign:'center',marginTop:15}}>Create New Moment</Text>
                  <TouchableHighlight style={Styles.imgTopLeft} activeOpacity={0.6} underlayColor={'rgba(255,255,255,0.1)'}
                    onPress={()=>
                        this.props.navigator.pop()
                      }>
                      <Image resizeMode={Image.resizeMode.stretch} source={require('../../common/Images/backIcon@2x.png')} style={{width:10,height:20}}/>
                  </TouchableHighlight>
                </View>
                <View style={{marginTop:10,height:1,backgroundColor:'rgb(217,217,217)'}}/>
                <View style={{flexDirection:'row',margin:10}}>
                  <View style={{flex:1}}>
                    <TextInput underlineColorAndroid='transparent' selectionColor='rgb(243,145,28)' style={{ paddingBottom:0,borderBottomWidth:1,borderColor: 'rgb(184,184,184)',color:'rgb(184,184,184)',fontSize:20,fontWeight:'bold'}} placeholder='Title (Optional)' placeholderTextColor='rgb(184,184,184)'></TextInput>
                  </View>
                </View>

                <View style={{margin:10}}>
                    <TextInput underlineColorAndroid='transparent' selectionColor='rgb(243,145,28)' style={{height: Math.max(35, this.state.bioHeight),flex:1,paddingBottom:0,borderBottomWidth:1,fontSize:14,borderColor: 'rgb(184,184,184)',color:'rgb(184,184,184)'}} placeholderTextColor='rgb(184,184,184)' placeholder='Tell your story here' maxLength = {200} multiline = {true}
                    onChange={(event) => {
                      this.state.bioCharacters = event.nativeEvent.text.length + "/200 characters";
                      this.setState({
                        bioCharacters:this.state.bioCharacters,
                        bioHeight: event.nativeEvent.contentSize.height,
                      });

                    }
                  }></TextInput>
                </View>
                <PhotoPicker/>

            </ScrollView>
            <View style={{flexDirection:'row',bottom:10,marginLeft:10,marginRight:10,position:'absolute'}}>
              <TouchableHighlight style={{flex:1}} activeOpacity={0.6} underlayColor={'white'}
                  onPress={this.pickAvatar}>
                  <View style={[Styles.btnFullYellow,{height:50}]}>
                    <Text style={{color:'white'}}>Create a Moment</Text>
                  </View>
              </TouchableHighlight>
            </View>
          </View>
      </View>
    );
  }
}
AppRegistry.registerComponent('MomentView', () => MomentView);
