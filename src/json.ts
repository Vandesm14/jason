export interface Column {
  key: string;
  values: (any | undefined)[];
}

export function flattenJSON(json: Array<Record<string, any>>): Column[] {
  const columns: { [key: string]: string[] } = {};

  json.forEach((record) => {
    const { data, ...rest } = record;
    const flattenedData = Object.keys(data).reduce((acc, key) => {
      const value = Array.isArray(data[key]) ? data[key] : data[key];
      return { ...acc, [`data.${key}`]: value };
    }, {});

    const allColumns: Record<string, any> = { ...rest, ...flattenedData };

    Object.keys(allColumns).forEach((key) => {
      if (!columns[key]) {
        columns[key] = [];
      }
      columns[key].push(allColumns[key]);
    });
  });

  return Object.keys(columns)
    .map((key) => ({ key, values: columns[key] }))
    .sort((a, b) => a.key.localeCompare(b.key));
}
