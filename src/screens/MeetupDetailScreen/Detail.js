import React, { Component } from 'react';
import { View } from 'native-base';
import openMap from 'react-native-open-maps';

import styles from './styles';
import DetailRow from './../WorkshopDetailScreen/DetailRow';
import TeachersList from './../../components/TeachersList';

const openMapAction = ({ latitude, longitude }) => () => {
  openMap({ latitude, longitude });
};

const Detail = ({ event, allTeachers }) => {
  let status = 'Active';
  if (event.maxAttendees && event.maxAttendees <= event.validRegistration) {
    status = 'Full';
  }
  return (
    <View style={styles.container}>
      <TeachersList allTeachers={allTeachers} />
      <View style={styles.separator} />
      <DetailRow
        swap={true}
        icon="calendar"
        title={'Thu, June 6, 2019'}
        detail={'7:00PM - 8:00PM EDT'}
      />
      <View style={styles.separator} />
      <DetailRow
        action={openMapAction({
          latitude: event.meetupGeoLat,
          longitude: event.meetupGeoLon,
        })}
        swap={true}
        icon="location-pin"
        title={`${event.city} ${event.state}`}
        detail={event.addressShort}
      />
      <View style={styles.separator} />
      <DetailRow title={'Meetup Status'} detail={status} />
      <View style={styles.separator} />
      <DetailRow
        title={'Maximum Attendees'}
        detail={event.maxAttendees || 'Not Defined'}
      />
      <View style={styles.separator} />
      <DetailRow title={"RSVP's"} detail={event.validRegistration} />
      <View style={styles.separator} />
    </View>
  );
};

export default Detail;
