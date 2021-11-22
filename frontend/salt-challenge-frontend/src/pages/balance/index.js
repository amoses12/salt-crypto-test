import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setBalance,
  setBalanceComparison,
  setSpent,
} from '../../slices/balanceSlice';
import API from '../../utils/API';
import { Container, Row, Col } from 'react-bootstrap';
import { Balance } from '../../components/balance';
import { PieChart } from '../../components/pieChart';
import { Spend } from '../../components/spend';

import './balance.css';

const BalancePage = (props) => {
  const balanceComparison = useSelector(
    (state) => state.balance.balanceComparison
  );
  const btcAddress = useSelector((state) => state.balance.btcAddress);
  const spent = useSelector((state) => state.balance.spent);
  const dispatch = useDispatch();

  const [showPieChart, setShowPieChart] = useState(false);
  const [spentChecked, setSpentChecked] = useState(false);

  async function checkBalance() {
    const balanceResponse = await API.get(`/balance/${btcAddress}`, {
      params: {
        spent: spentChecked,
      },
    });
    const balanceComparisonResponse = await API.get(
      `/comparison/${btcAddress}`
    );
    dispatch(setBalance(balanceResponse.data));
    dispatch(setBalanceComparison(balanceComparisonResponse.data));
    dispatch(setSpent(spentChecked));
    setShowPieChart(true);
  }

  return (
    <Container className='main-container'>
      <Row className='headerContainer'>
        <Col md={12}>
          <h1 className='balance-header'>Check your Crypto Balance!</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6} className='balanceContainer'>
          <Balance
            checkBalance={checkBalance}
            spentChecked={spentChecked}
            setSpentChecked={setSpentChecked}
          />
        </Col>
        <Col md={6} className='SpendContainer'>
          <Spend setShowPieChart={setShowPieChart} />
        </Col>
      </Row>
      <Row>
        <Col md={12} className='pieChartContainer'>
          {showPieChart && <PieChart data={balanceComparison} />}
        </Col>
      </Row>
    </Container>
  );
};

export default BalancePage;
