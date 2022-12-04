import React, { useEffect } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';
import Card from '../../components/BaseCard';
import { articles, nowTheme } from '../../constants/';
import AuthContext from '../../contexts/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';

import axios from '../../axios';

class DisasterReports extends React.Component {
  static contextType = AuthContext;
  state = {
    reports: null,
    refreshing: false,
  };

  onRefresh = async () => {
    console.log('called');
    this.setState({
      refreshing: true,
    });
    this.loadData();
    this.setState({
      refreshing: false,
    });
  };

  config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.context.user.token}`,
    },
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    axios
      .get(`/api/end-users/reports/${this.context.user._id}`, this.config)
      .then((res) => {
        const transformedReports = res.data.map((report) => {
          return {
            title: report.type,
            image: require('../../assets/imgs/floods.jpg'),
            subtitle: report.province,
            description: report.address,
            horizontal: true,
            details: report.description,
            approved: report.is_approved,
            sourceURL: report.sourceURL,
          };
        });
        this.setState({
          reports: transformedReports,
        });
      })
      .catch((e) => console.log(e));
  };

  renderCards = () => {
    if (this.state.reports && this.state.reports.length > 0) {
      return (
        <Block style={styles.container}>
          {this.state.reports.map((report) => {
            const navigationData = {
              sourceURL: report.sourceURL,
              type: report.title,
              description: report.details,
              location: report.description,
              province: report.subtitle,
              approved: report.approved,
            };
            console.log(report, 'REPORT');
            return (
              <Card
                key={report._id}
                item={report}
                full
                navigateTo="Details"
                navigationData={navigationData}
              />
            );
          })}
        </Block>
      );
    } else {
      return (
        <View style={{ alignSelf: 'center' }}>
          <Ionicons
            style={{ alignSelf: 'center', marginTop: 50 }}
            name="alert-circle-outline"
            size={50}
            color="orange"
          />
          <Text style={{ textAlign: 'center' }}>No Reports Found</Text>
        </View>
      );
    }
  };

  render() {
    return (
      <Block flex>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }
        >
          {this.renderCards()}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE,
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER,
  },
});

export default DisasterReports;
