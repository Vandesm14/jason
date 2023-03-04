import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useDebounce } from '../../hooks/debounce';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  maintainAspectRatio: false,
};

type DataPoint = { x: number; y: number; group?: string };

const colors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
];

export function ChartView({
  data,
  height,
}: {
  data: DataPoint[];
  height: number;
}) {
  const chartRef = React.useRef<ChartJS>(null);
  const chartHeight = useDebounce(height, 20);
  const [datasets, setDatasets] = React.useState<any>([]);

  React.useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) {
      return;
    }

    const datasetGroups: Record<string, Pick<DataPoint, 'x' | 'y'>[]> = {};

    data.forEach((point) => {
      if (point.group) {
        if (!datasetGroups[point.group]) {
          datasetGroups[point.group] = [];
        }
        datasetGroups[point.group].push(point);
      } else {
        if (!datasetGroups['default']) {
          datasetGroups['default'] = [];
        }
        datasetGroups['default'].push(point);
      }
    });

    const newDataSets = Object.entries(datasetGroups).map(
      ([group, points], i) => ({
        label: group,
        data: points,
        backgroundColor: colors[i % colors.length],
      })
    );

    setDatasets(newDataSets);
  }, [data]);

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
      <Chart
        type="scatter"
        options={options}
        data={{
          datasets,
        }}
        ref={chartRef}
      />
    </div>
  );
}
