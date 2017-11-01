import React, { Component } from 'react';
import {
  Container, 
  Content, 
  Header,
  Tabs,
  Tab,
  Body,
  Title,
  List,
  ListItem,
  Left,
  Right,
  Thumbnail,
  Text,
  Spinner
} from 'native-base';

export default class App extends Component {

  state = {
    repos: [],
    users: [],
    loading: true,

  }
  
  async componentDidMount() {
    const baseUrl = 'https://api.github.com';
    const organization = 'facebook'
    const options = {
      header: {
        'User-Agent': 'githubNative',
      },
    };

    const reposResponse = await fetch(`${baseUrl}/orgs/${organization}/repos`, options)
    const usersResponse = await fetch(`${baseUrl}/orgs/${organization}/members`, options)
  
    this.setState({
      repos: await reposResponse.json(),
      users: await usersResponse.json(),
    });

    this.state.repos.length && this.state.users.length && 
      this.setState({loading: false})
  }
  
  render() {

    return (
      <Container>
        <Header hasTabs>
          <Body>
            <Title>Github</Title>
          </Body>
        </Header>
        <Tabs>
          <Tab heading="Repositórios">
            <Content>
              { this.state.loading && 
                <Container style={{ justifyContent: 'center'}}>
                  <Spinner color="blue" />
                </Container>
              }
              <List>
                { this.state.repos.map(repo => (
                  <ListItem key={repo.id}>
                    <Body>
                      <Text>{repo.name}</Text>
                      <Text note>{repo.html_url}</Text>
                    </Body>
                  </ListItem>
                ))}
              </List>
            </Content>
          </Tab>
          <Tab heading="Usuários">
            <Content>
              { this.state.loading && 
                <Container style={{ justifyContent: 'center'}}>
                  <Spinner color="blue" />
                </Container>
              }
              <List>
                { this.state.users.map(user => (
                  <ListItem avatar key={user.id}>
                  <Left>
                    <Thumbnail small source={{uri: user.avatar_url}} />
                  </Left>
                  <Body>
                    <Text>{user.login}</Text>
                    <Text note>{user.html_url}</Text>
                  </Body>
                </ListItem>
                ))}
              </List>
            </Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}


