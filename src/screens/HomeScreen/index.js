import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { Container, Content, Text, View, Spinner, Icon } from 'native-base';
import defaultConnector from './../../redux/defaultConnector';

import AppHeader from './../../components/AppHeader';
import UpCommingEvents from './UpcommingEvents';
import Category from './Category';
import UpcommingEventsLoader from './UpcommingEventsLoader';

import styles from './styles';
import theme from './../../theme/variables/myexpense';

class HomeScreen extends Component {
  state = {
    events: [],
    selected: 'key0',
  };
  static propTypes = {
    navigation: PropTypes.any,
  };

  static defaultProps = {};

  componentDidMount() {
    this.initialize();
  }

  initialize = () => {
    this.props.EventActions.getEvents();
  };

  static getDerivedStateFromProps(props) {
    if (!props.event.eventsLoading && !props.event.eventsError) {
      const eventTransform = props.event.data.map(obj => {
        return {
          ...obj,
          amount: 200,
        };
      });

      return {
        events: eventTransform,
      };
    }
    return null;
  }

  onValueChange = value => {
    this.setState({
      selected: value,
    });
  };

  showPopover = () => {
    this.setState({ isVisible: true });
  };

  closePopover = () => {
    this.setState({ isVisible: false });
  };

  render() {
    const {
      navigation,
      categoriesLoading,
      profilePic,
      event,
      profile,
    } = this.props;
    const { eventsLoading } = event || {};
    const { events } = this.state;
    const {
      totalFundAccumulated,
      next3MonthWorkshopCount,
      next3MonthMeetupCount,
      LastDayRegistrationCount,
      LastDayRSVPCount,
    } = profile || {};
    console.log(events);
    const categories = [
      {
        id: '1',
        name: 'Meetup fund',
        iconName: 'dollar',
        iconType: 'FontAwesome',
        percent: 70,
        subTitle: 'Total Accured',
        subIcon: 'calendar',
        count: '$' + totalFundAccumulated,
      },
      {
        id: '2',
        name: 'Workshops',
        iconName: 'sun-o',
        iconType: 'FontAwesome',
        percent: 50,
        subTitle: 'Next 3 Months',
        subIcon: 'calendar',
        count: next3MonthWorkshopCount,
      },
      {
        id: '3',
        name: 'Meetups',
        iconName: 'meetup',
        iconType: 'FontAwesome',
        percent: 25,
        subTitle: 'Next 3 Months',
        subIcon: 'calendar',
        count: next3MonthMeetupCount,
      },
      {
        id: '4',
        name: 'Registration',
        iconName: 'user-follow',
        percent: 3,
        subTitle: 'Last day',
        subIcon: 'clock',
        count: LastDayRegistrationCount,
      },
      {
        id: '10',
        name: 'RSVPs',
        iconName: 'user-follow',
        percent: 22,
        subTitle: 'Last day',
        subIcon: 'clock',
        count: LastDayRSVPCount,
      },
    ];
    return (
      <Container>
        <View style={styles.background}>
          <AppHeader
            hasTabs
            navigation={navigation}
            title="Dashboard"
            profilePic={profilePic}
          />
          <Content showsVerticalScrollIndicator={false} style={styles.content}>
            {categoriesLoading && (
              <View style={styles.emptyContainer}>
                <Spinner color={theme.brandPrimary} />
              </View>
            )}
            {!categoriesLoading && categories.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyMsg}>No categories found</Text>
              </View>
            )}
            {!categoriesLoading && categories.length > 0 && (
              <FlatList
                horizontal={false}
                numColumns={2}
                data={categories}
                renderItem={({ ...props }) => (
                  <Category navigation={navigation} {...props} />
                )}
                keyExtractor={category => category.id}
                initialNumToRender={5}
              />
            )}

            <View
              style={{
                backgroundColor: '#FAFAFB',
                marginTop: 20,
                borderColor: '#EDEDED',
                borderWidth: 0,
                borderTopWidth: 0.8,
                borderBottomWidth: 0.8,
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  padding: 5,
                  paddingRight: 10,
                }}>
                <Icon
                  name="filter"
                  type="Foundation"
                  style={{
                    color: theme.brandPrimary,
                  }}
                />
                {/*<Form style={{ flex: 1, alignItems: 'flex-start' }}>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      headerStyle={{ backgroundColor: theme.brandPrimary }}
                      headerBackButtonTextStyle={{ color: '#fff' }}
                      headerTitleStyle={{ color: '#fff' }}
                      selectedValue={this.state.selected}
                      onValueChange={this.onValueChange}
                      style={{ width: 100, opacity: 0.4 }}>
                      <Picker.Item label="Show All" value="key0" />
                      <Picker.Item label="Meetups" value="key1" />
                      <Picker.Item label="Workshops" value="key2" />
                    </Picker>
                  </Item>
            </Form>*/}
              </View>
              <View style={{ backgroundColor: '#ffffff' }}>
                <UpcommingEventsLoader isReady={!eventsLoading}>
                  <UpCommingEvents navigation={navigation} events={events} />
                </UpcommingEventsLoader>
              </View>
            </View>
            <View style={{ height: 85 }} />
          </Content>
        </View>
      </Container>
    );
  }
}

export default defaultConnector(HomeScreen);
