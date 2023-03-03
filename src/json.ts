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

//                          path  , type
export type Schema = Record<string, string>;

export function guessSchema(columns: Column[]): Schema {
  const schema: Schema = {};

  columns.forEach((column) => {
    const { key, values } = column;

    const type = guessType(values);

    schema[key] = type;
  });

  return schema;
}

export function guessType(values: (any | undefined)[]): string {
  const types = values.map((value) => {
    if (value === undefined || value === null) {
      return 'null';
    }
    if (typeof value === 'string') {
      return 'string';
    }
    if (typeof value === 'number') {
      return 'number';
    }
    if (typeof value === 'boolean') {
      return 'boolean';
    }
    if (Array.isArray(value)) {
      return 'array';
    }
    if (typeof value === 'object') {
      return 'object';
    }
    return 'object';
  });

  const uniqueTypes = new Set(types);

  if (uniqueTypes.size === 1) {
    return types[0];
  }

  if (uniqueTypes.has('null')) {
    uniqueTypes.delete('null');
  }

  if (uniqueTypes.size === 1) {
    return `${types[0]} | null`;
  }

  return 'any';
}
