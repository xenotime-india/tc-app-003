import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import { View, List, Text } from 'native-base';
import AttendeeItem from './../../components/AttendeeItem';

import styles from './styles';

class AttendeeList extends Component {
  static propTypes = {
    Attendees: PropTypes.array,
  };

  static defaultProps = {
    Attendees: [],
  };

  _openDetail = event => () => {
    const { navigation } = this.props;
    navigation.navigate('WorkshopDetail', {
      event,
    });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#ccccce',
        }}
      />
    );
  };

  render() {
    const { Attendees } = this.props;

    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 15,
            paddingBottom: 15,
            paddingLeft: 10,
            backgroundColor: '#FAFAFB',
          }}>
          <Text style={{ fontWeight: '800' }}>ATTENDEES</Text>
        </View>
        <FlatList
          horizontal={false}
          data={Attendees}
          renderItem={({ item }) => <AttendeeItem item={item} />}
          initialNumToRender={7}
          showsVerticalScrollIndicator={false}
          keyExtractor={Attendee => Attendee.sfid}
        />
      </>
    );
  }
}

export default AttendeeList;
