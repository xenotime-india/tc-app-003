import React, { Component } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation';
import {
  Container,
  Content,
  Icon,
  Thumbnail,
  Button,
  Header,
  Left,
  Right,
} from 'native-base';
import MenuItem from './MenuItem';
import styles from './styles';
import { routes } from './config';
import defaultConnector from './../../redux/defaultConnector';
import theme from './../../theme/variables/myexpense';

const avatar = require('./../../../assets/images/avatar1.png');
class SideBar extends Component {
  state = {
    selected: '',
  };
  onPressItem = route => {
    this.setState(() => ({
      selected: route,
    }));
    this.props.navigation.navigate(route);
  };
  renderMenuItem = ({ item }) => (
    <MenuItem
      id={item.route}
      onPressItem={this.onPressItem}
      selected={this.state.selected === item.route}
      title={item.title}
      icon={item.icon}
    />
  );
  render() {
    const { navigation, profilePic } = this.props;

    return (
      <Container style={{ backgroundColor: theme.brandPrimary }}>
        <Header transparent style={styles.header.container}>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() =>
                navigation.dispatch(DrawerActions.toggleDrawer({}))
              }>
              <Icon
                type="SimpleLineIcons"
                name="arrow-right"
                style={styles.header.icon}
              />
            </Button>
          </Left>
          <Right>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end' }}
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Thumbnail
                source={profilePic || avatar}
                style={styles.header.avatar}
              />
            </TouchableOpacity>
          </Right>
        </Header>
        <Content style={styles.content}>
          <FlatList
            initialNumToRender={8}
            data={routes}
            renderItem={this.renderMenuItem}
            keyExtractor={item => item.route}
          />
        </Content>
      </Container>
    );
  }
}
export default defaultConnector(SideBar);
