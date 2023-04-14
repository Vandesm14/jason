import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  ArcElement,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useDebounce } from '../../hooks/debounce';
import { ChartSettings } from './ChartSettings';
import { getAllKeys } from '../../json';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  ArcElement
);

// const chartTypes = [
//   'bar',
//   'line',
//   'scatter',
//   'bubble',
//   'pie',
//   'doughnut',
//   'polarArea',
//   'radar',
// ];

export function ChartView({ data, height }: { data: any[]; height: number }) {
  const chartRef = React.useRef<ChartJS>(null);
  const chartHeight = useDebounce(height, 20);
  // const [datasets, setDatasets] = React.useState<DataSets>({
  //   data: [],
  //   labels: [],
  // });

  // React.useEffect(() => {
  //   if (!Array.isArray(data) || data.length === 0) return;
  //   let newDataSets: DataSets;

  //   setDatasets(newDataSets);
  // }, [data]);

  React.useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      // @ts-expect-error: testing for now
      chart.canvas.parentNode.style.height = `${chartHeight}px`;
    }
  }, [chartHeight, chartRef]);

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
        }}
      >
        <ChartSettings keys={getAllKeys(data)} />
      </div>
      {/* <Chart
        // We have to cast to any because ChartJS doesn't export their types
        type={chartType as any}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          maintainAspectRatio: false,
        }}
        data={{
          labels: datasets.labels,
          datasets: datasets.data,
        }}
        ref={chartRef}
      /> */}
    </div>
  );
}
