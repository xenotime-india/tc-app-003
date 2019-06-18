import React from 'react';
import { StatusBar, ImageBackground } from 'react-native';
import { Container, Spinner } from 'native-base';
import { NavigationActions } from 'react-navigation';

import defaultConnector from './../../redux/defaultConnector';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    this.props.userActions.verifyLogin(
      () => {
        this.props.navigation.dispatch(
          NavigationActions.navigate({ routeName: 'App' })
        );
      },
      () => {
        this.props.navigation.dispatch(
          NavigationActions.navigate({ routeName: 'Auth' })
        );
      }
    );
  };

  // Render any loading content that you like here
  render() {
    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <ImageBackground
          source={require('./../../../assets/images/background1.png')}
          resizeMode="cover"
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Spinner color="#fff" />
        </ImageBackground>
      </Container>
    );
  }
}

export default defaultConnector(AuthLoadingScreen);
