import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground } from 'react-native';
import moment from 'moment';
import {
  Container,
  Content,
  Tabs,
  Tab,
  Text,
  Icon,
  Fab,
  Spinner,
  View,
} from 'native-base';
import _ from 'lodash';

import EventList from './EventList';
import AppHeader from './../../components/AppHeader';
import defaultConnector from './../../redux/defaultConnector';

import styles from './styles';
import theme from './../../theme/variables/myexpense';

class EventListScreen extends Component {
  static propTypes = {
    navigation: PropTypes.any,
    event: PropTypes.array,
    deleteExpense: PropTypes.func,
  };

  static defaultProps = {
    expensesLoading: false,
    expensesError: false,
  };

  state = {
    headerTitle: moment().format('dddd,'),
    headerTitleSuffix: moment().format('MMM DD'),
    events: [],
    filterText: '',
  };
  componentDidMount() {
    this.initialize();
  }

  initialize = () => {
    this.props.EventActions.getEvents();
  };

  static getDerivedStateFromProps(props, state) {
    const exclude = ['sfid'];
    if (!props.event.eventsLoading && !props.event.eventsError) {
      if (state.filterText != '') {
        const filterEvents = _.filter(
          props.event.data,
          _.flow(
            _.partial(_.omit, _, exclude),
            _.partial(
              _.some,
              _,
              _.flow(
                _.toLower,
                _.partial(_.includes, _, _.toLower(state.filterText), 0)
              )
            )
          )
        );
        return {
          events: filterEvents,
        };
      } else {
        return { events: props.event.data };
      }
    }
    return null;
  }

  doSearch = query => {
    console.log(query);
    const exclude = ['sfid'];
    this.setState({ filterText: query });
    const { events } = this.state;
    const filterEvents = _.filter(
      events,
      _.flow(
        _.partial(_.omit, _, exclude),
        _.partial(
          _.some,
          _,
          _.flow(
            _.toLower,
            _.partial(_.includes, _, _.toLower(query), 0)
          )
        )
      )
    );
    console.log(filterEvents);
    this.setState({ events: filterEvents });
  };

  render() {
    const { navigation, eventLoading } = this.props;
    const { events = [], filterText } = this.state;
    console.log(events);
    return (
      <Container>
        <View style={styles.container}>
          <AppHeader
            hasTabs
            displaySearch
            navigation={navigation}
            title="Events"
            onSearch={this.doSearch}
            filterText={filterText}
          />
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
            style={styles.content}>
            {eventLoading && (
              <View style={styles.emptyContainer}>
                <Spinner color={theme.brandPrimary} />
              </View>
            )}
            {!eventLoading && events.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyMsg}>No events found.</Text>
              </View>
            )}
            {!eventLoading && events.length > 0 && (
              <EventList events={events} navigation={navigation} />
            )}
          </Content>
        </View>
      </Container>
    );
  }
}

export default defaultConnector(EventListScreen);
