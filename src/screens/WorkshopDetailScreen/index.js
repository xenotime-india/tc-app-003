import React, { Component } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import {
  Container,
  Content,
  Header,
  Text,
  Tabs,
  Tab,
  Icon,
  Left,
  Right,
  Button,
  View,
} from 'native-base';

import HeaderDrawerButton from './../../components/AppHeader/HeaderDrawerButton';
import RNParallax from './../../components/RNParallax';
import styles from './styles';
import theme from './../../theme/variables/myexpense';
import Detail from './Detail';
import AttendeeList from './AttendeeList';

const images = {
  hp: require('./../../../assets/images/background1.png'),
  sahaj: require('./../../../assets/images/background1.png'),
};

export default class WorkshopDetailScreen extends Component {
  state = {
    enableNotification: false,
  };

  renderNavBar = () => (
    <Header transparent hasTabs>
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Icon
            style={styles.header.navigation}
            type="SimpleLineIcons"
            name="arrow-left"
          />
        </Button>
      </Left>
      <Right style={{ flex: 1 }}>
        <HeaderDrawerButton navigation={this.props.navigation} />
      </Right>
    </Header>
  );

  renderContent = () => {
    const { navigation } = this.props;
    const event = navigation.getParam('event', {});
    const allTeachers = [];
    if (event.primaryTeacher) {
      allTeachers.push({
        name: event.primaryTeacherName,
        pic: event.primaryTeacherPic ? { uri: event.primaryTeacherPic } : null,
      });
    }
    if (event.coTeacher1) {
      allTeachers.push({
        name: event.coTeacher1Name,
        pic: event.coTeacher1Pic ? { uri: event.coTeacher1Pic } : null,
      });
    }
    if (event.coTeacher2) {
      allTeachers.push({
        name: event.coTeacher2Name,
        pic: event.coTeacher2Pic ? { uri: event.coTeacher2Pic } : null,
      });
    }
    if (event.organizer) {
      allTeachers.push({
        name: event.organizerName,
        pic: event.organizerPic ? { uri: event.organizerPic } : null,
      });
    }
    return (
      <Content
        paddershowsVerticalScrollIndicator={false}
        style={styles.content}>
        <View>
          <Detail event={event} allTeachers={allTeachers} />
        </View>
        <View>
          <AttendeeList Attendees={event.attendees} />
        </View>
      </Content>
    );
  };

  render() {
    const { navigation } = this.props;
    const event = navigation.getParam('event', {});
    const bgImg =
      event.title === 'The Happiness Program' ? images.hp : images.sahaj;
    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <RNParallax
          headerMaxHeight={250}
          extraScrollHeight={20}
          navbarColor={theme.brandPrimary}
          title={event.title}
          titleStyle={styles.titleStyle}
          backgroundImage={bgImg}
          backgroundImageScale={1.2}
          renderNavBar={this.renderNavBar}
          renderContent={this.renderContent}
          containerStyle={styles.container}
          contentContainerStyle={styles.contentContainer}
          innerContainerStyle={styles.container}
        />
      </Container>
    );
  }
}
