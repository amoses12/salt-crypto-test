import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSpent, setBtcAddress } from '../../slices/balanceSlice';
import { Row, Col } from 'react-bootstrap';
import { Button, Radio, Input } from 'antd';

import 'antd/dist/antd.css';
import './balance.css';

export const Balance = (props) => {
  const balance = useSelector((state) => state.balance.balance);
  const spent = useSelector((state) => state.balance.spent);
  const btcAddress = useSelector((state) => state.balance.btcAddress);

  const dispatch = useDispatch();

  const [error, setError] = useState(false);

  const { checkBalance } = props;

  const handleSubmit = () => {
    console.log('LENGTH: ', btcAddress.length);
    if (btcAddress.length !== 34) {
      setError(true);
    } else {
      setError(false);
      checkBalance();
    }
  };

  return (
    <div className='balance-container'>
      <Row>
        <Col md={12}>
          <h1>Balance</h1>
        </Col>
      </Row>
      <Row>
        <Col md='5'>
          <Input
            placeholder='Enter Address'
            onChange={(e) => dispatch(setBtcAddress(e.target.value))}
          />
          {error && (
            <p className='errorStyle'>Please enter a valid BTC Address</p>
          )}
        </Col>
        <Col md='3'>
          <Radio.Group
            onChange={(e) => dispatch(setSpent(e.target.value))}
            value={spent}
          >
            <Radio value={true}>Spent</Radio>
            <Radio value={false}>Unspent</Radio>
          </Radio.Group>
        </Col>
        <Col md='4'>
          <Button
            type='primary'
            shape='round'
            size={'large'}
            onClick={() => handleSubmit()}
          >
            Check Balance
          </Button>
        </Col>
      </Row>
    </div>
  );
};
