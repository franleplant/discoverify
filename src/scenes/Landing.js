// @flow
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Container, Grid, Row, Col, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';

type Props = {
  router: {
    navigator: any,
    routes: any,
  },
}

export default class Landing extends Component {
  props: Props;
  render() {
    return (
      <Container>
        <Header>
          <Title>Header</Title>
        </Header>

        <Content contentContainerStyle={{flex: 1}}>
          <Grid>

            <Row></Row>
            <Row style={{alignItems: 'center', justifyContent: 'center'}}>
              <Col></Col>
              <Col>
                <Button success block onPress={() => {}}>
                  <Text>Login with Spotify</Text>
                  {/*
                  <Icon name='login' />
                  */}
                </Button>
              </Col>
              <Col></Col>
            </Row>
            <Row></Row>
          </Grid>
        </Content>

        <Footer>
          <FooterTab>
            <Button transparent onPress={() => this.props.router.navigator.push(this.props.router.routes('Main'))}>
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
