import React from 'react';
import { Text, View } from 'react-native';
import { Icon, Grid, Col } from 'native-base';

import styles from './styles';

const DetailRow = ({ title, detail, icon, swap = false, action }) => {
  return (
    <View style={[styles.contact.container]}>
      <Grid>
        {icon && (
          <Col size={1} style={{ alignItems: 'center' }}>
            <Icon
              name={icon}
              type="SimpleLineIcons"
              style={[styles.contact.icon]}
              onPress={action}
            />
          </Col>
        )}
        <Col size={4}>
          <View>
            {swap && (
              <>
                <View style={styles.contact.valueColumn}>
                  {title.trim().length !== 0 && (
                    <Text style={styles.contact.valueText}>{title}</Text>
                  )}
                </View>
                <View style={styles.contact.nameColumn}>
                  <Text style={styles.contact.nameText}>{detail}</Text>
                </View>
              </>
            )}
            {!swap && (
              <>
                <View style={styles.contact.nameColumn}>
                  {title.trim().length !== 0 && (
                    <Text style={styles.contact.nameText}>{title}</Text>
                  )}
                </View>
                <View style={styles.contact.valueColumn}>
                  <Text style={styles.contact.valueText}>{detail}</Text>
                </View>
              </>
            )}
          </View>
        </Col>
      </Grid>
    </View>
  );
};

export default DetailRow;
