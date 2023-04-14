const colors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
];

type ObjectData = { x: number; y: number; group?: string };
type PrimiviteData = { group: string; data: any };

export type DataSets = {
  data: any[];
  labels: string[];
};

export function transformObjectData(data: ObjectData[]): DataSets {
  const datasetGroups: Record<string, Pick<ObjectData, 'x' | 'y'>[]> = {};
  const xEnum: any[] = [];
  const yEnum: any[] = [];

  data.forEach((point) => {
    const group = point?.group ?? 'default';

    const newPoint = { ...point };

    if (typeof point.x !== 'number') {
      if (!xEnum.includes(point.x)) {
        xEnum.push(point.x);
      }
      newPoint.x = xEnum.indexOf(point.x);
    }

    if (typeof point.y !== 'number') {
      if (!yEnum.includes(point.y)) {
        yEnum.push(point.y);
      }
      newPoint.y = yEnum.indexOf(point.y);
    }

    if (!datasetGroups[group]) {
      datasetGroups[group] = [];
    }
    datasetGroups[group].push(newPoint);
  });

  const newDataSets = Object.entries(datasetGroups).map(
    ([group, points], i) => ({
      label: group,
      data: points,
      backgroundColor: colors[i % colors.length],
    })
  );

  return {
    labels: Object.keys(datasetGroups),
    data: newDataSets,
  };
}

export function transformPrimitiveData(
  data: PrimiviteData[],
  aggregate = 'sum'
): DataSets {
  const dataEnum: any[] = [];
  const datasetGroups: Record<string, number> = {};

  data.forEach((point) => {
    const group = point.group ?? 'default';

    const newPoint = { ...point };

    if (typeof point.data !== 'number') {
      if (!dataEnum.includes(point.data)) {
        dataEnum.push(point.data);
      }
      newPoint.data = dataEnum.indexOf(point.data);
    }

    if (!datasetGroups[group]) {
      datasetGroups[group] = 0;
    }

    if (aggregate === 'sum') {
      datasetGroups[group] += newPoint.data;
    }
  });

  const newDataSets = [
    {
      label: 'default',
      backgroundColor: Object.values(datasetGroups)
        .flat()
        .map((_, i) => colors[i % colors.length]),
      data: Object.values(datasetGroups).flat(),
    },
  ];

  console.log({
    dataEnum,
    datasetGroups,
    newDataSets,
  });

  return {
    labels: Object.keys(datasetGroups),
    data: newDataSets,
  };
}
