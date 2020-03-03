import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
} from 'react-native';

import font from '../Fonts';
import styles from './Style';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RadioButtonRN from 'radio-buttons-react-native';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const studentHome = props => {
  const dummy = {name: 'Rian Tosm', email: 'riantosm@gmail.com'};
  const [modalDelete, modal] = useState(false);
  const email = useSelector(state => state.user.email);
  const name = useSelector(state => state.user.name);
  const phone = useSelector(state => state.user.phone);
  const address = useSelector(state => state.user.address);
  const gender = useSelector(state => state.user.gender);
  const [xEmail, setEmail] = useState(email);
  const [xName, setName] = useState(name);
  const [xPhone, setPhone] = useState(phone);
  const [xAddress, setAddress] = useState(address);
  const [xGender, setGender] = useState(gender);
  const logout = async () => {
    AsyncStorage.removeItem('token');
    props.navigation.navigate('login-student');
  };
  const handleClickEdit = async () => {
    console.log(xEmail, xName, xPhone, xAddress, xGender);

    const formData = new FormData();
    formData.append('name', xName);
    formData.append('email', xEmail);
    formData.append('phone', xPhone);
    formData.append('address', xAddress);
    formData.append('password', '123');
    formData.append('gender', xGender);
    // formData.append('image', {
    //   uri: 'xxx',
    //   type: 'xxx',
    //   name: 'xxx',
    // });
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    const decoded = jwtDecode(token);
    console.log(decoded);
    axios
      .put('http://3.85.4.188:3333/api/admin/17', formData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <KeyboardAvoidingView style={styles.containerView}>
      {/* <ScrollView style={{height: '100%'}}>
        <View style={[styles.boxWrapp, styles.shadow]}>
          <View style={[styles.box, styles.bgGreen, styles.shadow]}>
            <Text
              style={[
                font.Aquawax,
                {
                  color: '#060709',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontSize: 20,
                },
              ]}>
              Input Code
            </Text>
            <TextInput
              placeholder="ex: 42315"
              style={[styles.inputText, {marginTop: 10}]}></TextInput>
            <TouchableOpacity onPress={() => modal(true)}>
              <View
                style={[
                  styles.submit,
                  styles.shadow,
                  styles.bgBlack,
                  {marginTop: 20},
                ]}>
                <Text style={[font.Aquawax, {color: '#00f28e'}]}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('student-statistic')}>
            <View style={[styles.box, styles.shadow, styles.bgPurle]}>
              <Text
                style={[
                  font.Aquawax,
                  {
                    color: '#fff',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 20,
                  },
                ]}>
                Score Terakhir
              </Text>
              <Text style={{fontSize: 60, marginTop: 25, color: '#fff'}}>
                87
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('login-student')}
            style={{marginTop: 130}}>
            <View style={[styles.boxSm, styles.bgBlack, styles.shadow]}>
              <Text
                style={[
                  font.Aquawax,
                  {
                    color: '#fff',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 14,
                  },
                ]}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView> */}
      <View style={[styles.MainContainer]}>
        <ScrollView style={{width: '100%'}}>
          <View>
            <Text
              style={[
                font.Aquawax,
                {fontSize: 40, padding: 20, paddingBottom: 10},
              ]}>
              Profile{' '}
              <Text style={styles.textGreen}>{dummy.name.split(' ')[0]}</Text>.
            </Text>
            <View
              style={{
                width: 50,
                marginHorizontal: 20,
                borderColor: '#0FB63F',
                borderWidth: 1,
              }}
            />
          </View>
          <View style={[styles.boxWrapp, styles.shadow]}>
            {/* <Text style={{fontWeight:'700'}}>Data</Text> */}
            <Image
              style={styles.profileImage}
              source={require('../../../assets/img/profile.jpg')}
            />
            <Text style={{textAlign: 'center', marginTop: 20}}>
              {dummy.name}
            </Text>
            <Text style={{textAlign: 'center'}}>{dummy.email}</Text>
            <TouchableOpacity
              onPress={() => {
                modal(true);
              }}>
              <View
                style={[
                  styles.submit,
                  styles.bgGreen,
                  {marginTop: 20, width: 'auto', alignSelf: 'center'},
                ]}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  Edit Profile
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => logout()}>
            <View
              style={[
                styles.submit,
                styles.bgPurle,
                {marginTop: 20, width: 'auto', alignSelf: 'center'},
              ]}>
              <Text style={{color: '#fff', textAlign: 'center'}}>Logout</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.bottomView}>
          {/* list murid */}
          <TouchableOpacity
            style={{
              width: '40%',
              height: '100%',
            }}
            onPress={() => props.navigation.navigate('teacher-home')}>
            <View>
              <Text style={styles.textStyle}>
                <Icon name="street-view" size={23} style={styles.textBlack} />
              </Text>
            </View>
          </TouchableOpacity>
          {/* list murid */}
          {/* add assessment */}
          <TouchableOpacity
            style={[styles.btnCircle, styles.bgBlack, styles.shadow]}>
            <View style={styles.circleIcon}>
              <Text style={{color: '#fff'}}>
                <Icon name="book-reader" size={30} style={styles.textWhite} />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '20%',
              height: '100%',
            }}
            onPress={() => props.navigation.navigate('teacher-home')}>
            {/* hanya sepasi */}
          </TouchableOpacity>
          {/* add assessment */}
          {/* profile teacher */}
          <TouchableOpacity
            style={{
              width: '40%',
              height: '100%',
            }}
            onPress={() => props.navigation.navigate('teacher-profile')}>
            <View>
              <Text style={styles.textStyle}>
                <Icon name="child" size={23} style={styles.textBlack} />
              </Text>
            </View>
          </TouchableOpacity>
          {/* profile teacher */}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalDelete}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={[styles.wrapp, styles.containerView]}>
          <ScrollView style={{height: '85%'}}>
            <TouchableOpacity style={{margin: 20}}>
              <Image
                style={styles.profileImage}
                source={require('../../../assets/img/profile.jpg')}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 18}}>Nama Lengkap</Text>
            <TextInput
              style={[styles.inputText]}
              placeholder="Masukan nama lengkap"
              onChange={e => setName(e.nativeEvent.text)}
            />
            <Text style={{fontSize: 18}}>Email</Text>
            <TextInput
              style={[styles.inputText]}
              placeholder="Masukan email"
              onChange={e => setEmail(e.nativeEvent.text)}
            />
            <Text style={{fontSize: 18}}>Alamat</Text>
            <TextInput
              style={[styles.inputText]}
              placeholder="Masukan alamat"
              onChange={e => setAddress(e.nativeEvent.text)}
            />
            <Text style={{fontSize: 18}}>No. Telepon</Text>
            <TextInput
              style={[styles.inputText]}
              placeholder="Masukan no. telp"
              onChange={e => setPhone(e.nativeEvent.text)}
            />
            <Text style={{fontSize: 18, paddingBottom: 20}}>Jenis Kelamin</Text>
            <RadioButtonRN
              data={[{label: 'Pria', value: 0}, {label: 'Wanita', value: 1}]}
              box={false}
              initial={gender + 1}
              textStyle={{fontSize: 16, marginLeft: -10}}
              circleSize={12}
              activeColor="green"
              deactiveColor="grey"
            />
            {/* <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={value => setAnswer(value)}
              buttonColor={'#0FB63F'}
              borderColor={'#0FB63F'}
              innerColor={'#0FB63F'}
            /> */}
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              modal(false);
            }}>
            <View
              style={[
                styles.boxSm,
                styles.bgGreen,
                styles.shadow,
                {marginTop: 20},
              ]}>
              <Text
                style={[
                  font.Aquawax,
                  {
                    color: '#fff',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 14,
                  },
                ]}
                onPress={() => handleClickEdit()}>
                Simpan
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => modal(false)}>
            <View
              style={[
                styles.boxSm,
                styles.bgPurle,
                styles.shadow,
                {marginTop: 20},
              ]}>
              <Text
                style={[
                  font.Aquawax,
                  {
                    color: '#fff',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 14,
                  },
                ]}>
                Kembali
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default studentHome;
