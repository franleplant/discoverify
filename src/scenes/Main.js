// @flow
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';

export default class Main extends Component {
  render() {
    return (
      <Container>
          <Header>
              <Title>MAIN MOFO</Title>
          </Header>

          <Content>
            <Text>
              // Your main content goes here
            </Text>
          </Content>

          <Footer>
              <FooterTab>
                  <Button transparent>
                      <Icon name='ios-call' />
                  </Button>
              </FooterTab>
          </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
