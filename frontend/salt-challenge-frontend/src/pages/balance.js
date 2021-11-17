import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Input, Button, Radio } from 'antd';

const Balance = (props) => {
  const [spent, setSpent] = useState(true);
  const [btcAddress, setBtcAddress] = useState('');
  function checkBalance() {
    //call endpoint with address and spent
  }
  return (
    <Container class='balance-container'>
      <Row>
        <h1 class='balance-header'>Check your Crypto Balance!</h1>
      </Row>
      <Row>
        <Col md='5'>
          <Input
            placeholder='Enter Address'
            onChange={(e) => setBtcAddress(e.target.value)}
          />
        </Col>
        <Col md='3'>
          <Radio.Group onChange={(e) => setSpent(e.target.value)} value={spent}>
            <Radio value={true}>Spent</Radio>
            <Radio value={false}>Unspent</Radio>
          </Radio.Group>
        </Col>
        <Col md='4'>
          <Button
            type='primary'
            shape='round'
            size={'large'}
            onClick={() => checkBalance()}
          >
            Check Balance
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Balance;
