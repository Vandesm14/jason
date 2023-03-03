export interface Column {
  key: string;
  values: (any | undefined)[];
}

export function flattenJSON(
  json: Record<string, any>[]
): { key: string; values: string[] }[] {
  const columns: { [key: string]: any[] } = {};

  function flattenObject(obj: Record<string, any>, prefix = ''): void {
    Object.entries(obj).forEach(([key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value)
      ) {
        flattenObject(value, fullKey);
        // } else {
        // const stringValue = Array.isArray(value)
        //   ? JSON.stringify(value)
        //   : value?.toString();
        // if (!columns[fullKey]) {
        //   columns[fullKey] = [];
        // }
        // columns[fullKey].push(stringValue);
      } else if (Array.isArray(value)) {
        if (!columns[fullKey]) columns[fullKey] = [];
        columns[fullKey].push(value);
      } else {
        if (!columns[fullKey]) columns[fullKey] = [];
        columns[fullKey].push(value);
      }
    });
  }

  json.forEach((record) => {
    flattenObject(record);
  });

  return Object.keys(columns).map((key) => ({ key, values: columns[key] }));
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
      return `Array<${guessType(value)}>`;
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
