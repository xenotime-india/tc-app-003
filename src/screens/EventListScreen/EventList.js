import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import moment from 'moment';

import { View, Button, Icon, SwipeRow } from 'native-base';

import EventItem from './../../components/EventItem';
import categoryColors from './../../theme/categoryColors';

import styles from './styles';

class EventList extends Component {
  static propTypes = {
    expensesList: PropTypes.array,
    handleDelete: PropTypes.func,
  };

  static defaultProps = {
    expensesList: [],
  };

  _openDetail = event => () => {
    const { navigation } = this.props;
    navigation.navigate('QRScan', {
      event,
    });
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0.8,
          backgroundColor: '#EDEDED',
        }}
      />
    );
  };

  render() {
    const { events } = this.props;
    return (
      <View
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#ccccce' }}>
        <FlatList
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={events}
          initialNumToRender={7}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <EventItem pressAction={this._openDetail(item)} item={item} />
          )}
          keyExtractor={item => item.sfid}
        />
      </View>
    );
  }
}

export default EventList;
