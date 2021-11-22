import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBtcAddress } from '../../slices/balanceSlice';
import { Row, Col } from 'react-bootstrap';
import { Button, Radio, Input } from 'antd';

import 'antd/dist/antd.css';
import './balance.css';

export const Balance = (props) => {
  const btcAddress = useSelector((state) => state.balance.btcAddress);

  const { spentChecked, setSpentChecked } = props;

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
    <div className='balanceContainer'>
      <Row>
        <Col md={12}>
          <h1>Balance</h1>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Input
            placeholder='Enter Address'
            onChange={(e) => dispatch(setBtcAddress(e.target.value))}
          />
          {error && (
            <p className='errorStyle'>Please enter a valid BTC Address</p>
          )}
        </Col>
        <Col md={4}>
          <Radio.Group
            onChange={(e) => setSpentChecked(e.target.value)}
            value={spentChecked}
          >
            <Radio value={true}>Spent</Radio>
            <Radio value={false}>Unspent</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row className='buttonContainer'>
        <Col md={12}>
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
