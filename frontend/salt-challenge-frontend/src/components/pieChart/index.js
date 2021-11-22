import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Descriptions } from 'antd';
import { ResponsivePie } from '@nivo/pie';

import './pieChart.css';

export const PieChart = (props) => {
  const balanceComparison = useSelector(
    (state) => state.balance.balanceComparison
  );
  const balance = useSelector((state) => state.balance.balance);
  const spent = useSelector((state) => state.balance.spent);
  console.log('PIE DATA: ', balanceComparison);

  const getSpentLabel = () => {
    const spentLabel = spent ? 'Spent' : 'Unspent';
    return spentLabel;
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <h1 className='mainLabel'>Balance Info</h1>
        </Col>
      </Row>
      <Row className='infoContainer'>
        <Col md={12}>
          <Descriptions bordered title='Balance Info' size='default'>
            <Descriptions.Item label='BTC Address'>
              {balance.btcAddress}
            </Descriptions.Item>
            <Descriptions.Item label={getSpentLabel()}>
              {balance.amount}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      <Row className='pieChartContainer'>
        <ResponsivePie
          data={balanceComparison.data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor='#333333'
          arcLinkLabelsThickness={2}
          colors={['#f47560', '#61cdbb']}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLinkLabelsDiagonalLength={10}
          arcLinkLabelsStraightLength={10}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                  },
                },
              ],
            },
          ]}
        />
        <div className='overlay'>
          <span>{balanceComparison.percentAvailable.toFixed(1)}%</span>
          <span className='percentLabel'>available</span>
        </div>
      </Row>
    </>
  );
};
