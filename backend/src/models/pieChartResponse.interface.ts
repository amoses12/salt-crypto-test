import PieChartPoint from './pieChartPoint.interface';

export default interface PieChartResponse {
  btcAddress: string;
  percentAvailable: number;
  data: PieChartPoint[];
}
