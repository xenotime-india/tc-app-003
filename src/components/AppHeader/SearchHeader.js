import React from 'react';
import PropTypes from 'prop-types';
import { Button, View, Item, Icon, Input } from 'native-base';
import { Formik } from 'formik';

import styles from './styles';

class SearchHeader extends React.Component {
  onSearchAction = values => {
    console.log(values);
    const { onSearch } = this.props;
    onSearch(values.query);
  };

  handleChange = query => {
    this.setState({ query });
  };

  render() {
    return (
      <View style={styles.searchHeader.container}>
        <Formik
          initialValues={{ query: this.props.filterText || '' }}
          onSubmit={values => this.onSearchAction(values)}>
          {props => (
            <Item style={styles.searchHeader.content}>
              <Input
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                style={styles.searchHeader.input}
                placeholder="Search"
                onChangeText={props.handleChange('query')}
                value={props.values.query}
              />
              <Button transparent onPress={props.handleSubmit}>
                <Icon style={styles.searchHeader.btnIcon} name="search" />
              </Button>
            </Item>
          )}
        </Formik>
      </View>
    );
  }
}

SearchHeader.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchHeader;
