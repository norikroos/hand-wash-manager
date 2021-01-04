import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
} from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SignIn = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');

  const handleChange = (e, setState) => {
    console.log(e);
    setState(e.currentValue);
  };

  const handleSubmit = e => {
    console.log(e);
  };

  return (
    <Container>
      <Content padder>
        <Form>
          <Item stackedLabel>
            <Label>ユーザー名</Label>
            <Input
              placeholder="名前を入力"
              value={username}
              onChangeText={e => handleChange(e, setUserName)}
            />
          </Item>
          <Item stackedLabel>
            <Label>メールアドレス</Label>
            <Input
              placeholder="例) user@gmail.com"
              value={email}
              onChangeText={e => handleChange(e, setEmail)}
            />
          </Item>
          <Item stackedLabel>
            <Label>パスワード</Label>
            <Input
              secureTextEntry
              placeholder="例) Pass1234"
              value={password}
              onChangeText={e => handleChange(e, setPassWord)}
            />
          </Item>
          <Button
            style={{ margin: 20 }}
            block
            primary
            onPress={e => handleSubmit(e)}
          >
            <Text>ログイン</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
