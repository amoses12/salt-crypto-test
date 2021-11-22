import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setBalance,
  setBalanceComparison,
  setSpent,
  setBtcAddress,
} from '../../slices/balanceSlice';
import { Row, Col } from 'react-bootstrap';
import { Form, Button, Input, Checkbox } from 'antd';
import API from '../../utils/API';

import './spend.css';

export const Spend = (props) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [amountToSpend, setAmountToSpend] = useState(0);
  const [spendBtcAddress, setSpendBtcAddress] = useState('');
  const [balanceError, setBalanceError] = useState('');

  const { setShowPieChart } = props;

  const handleCheckbox = (checked) => {
    if (checked) {
      setAmountToSpend(0);
    }
    setChecked(checked);
  };

  const handleSubmit = async () => {
    const spendResponse = await API.post(`/spend/${spendBtcAddress}`, {
      amount: amountToSpend,
      fullAmount: checked,
    });
    console.log('SPEND RESPONSE: ', spendResponse);
    if (spendResponse.data.error) {
      setBalanceError(spendResponse.data.error);
    } else {
      dispatch(setBalance(spendResponse.data.balance));
      dispatch(setBalanceComparison(spendResponse.data.pieChartResponse));
      dispatch(setSpent(false));
      dispatch(setBtcAddress(spendResponse.data.balance.btcAddress));
      setShowPieChart(true);
    }
  };

  return (
    <div className='balance-container'>
      <Row>
        <Col md={12}>
          <h1>Spend</h1>
        </Col>
      </Row>
      <Row>
        <Col md='5'>
          <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete='off'
          >
            <Form.Item
              label='BTC Address'
              name='btcAddress'
              rules={[
                {
                  required: true,
                  message: 'Please input a valid BTC Address!',
                },
              ]}
            >
              <Input onChange={(e) => setSpendBtcAddress(e.target.value)} />
            </Form.Item>

            <Form.Item
              label='Amount'
              name='amount'
              rules={[
                { required: true, message: 'Please input a valid amount!' },
              ]}
            >
              <Input onChange={(e) => setAmountToSpend(e.target.value)} />
            </Form.Item>

            <Form.Item
              name='Full Amount'
              valuePropName='checked'
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox onChange={(e) => handleCheckbox(e.target.checked)}>
                Full Amount
              </Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type='primary'
                shape='round'
                size={'large'}
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        {balanceError !== '' && (
          <Col md='4'>
            <p className='balanceError'>{balanceError}</p>
          </Col>
        )}
      </Row>
    </div>
  );
};
