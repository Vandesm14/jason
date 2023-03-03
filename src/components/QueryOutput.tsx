import { Button, HTMLTable } from '@blueprintjs/core';
import React from 'react';
import ReactJson from 'react-json-view';
import { flex } from '../compose/styles';
import { Column, flattenJSON, guessSchema } from '../json';
import { Tooltip2 } from '@blueprintjs/popover2';
import { ColoredValue } from './ColoredValue';

export interface QueryOutputProps {
  result: any;
  json?: object;
}

export function QueryOutput({ result, json }: QueryOutputProps) {
  const [view, setView] = React.useState<'json' | 'table' | 'schema'>('json');
  const [table, setTable] = React.useState<Column[] | null>(null);
  const [schema, setSchema] = React.useState<any>({});

  React.useEffect(() => {
    try {
      let array = Array.isArray(result) ? result : [result];
      let newTable = flattenJSON(array);

      setTable(newTable);
      setSchema(guessSchema(flattenJSON(Array.isArray(json) ? json : [json])));
    } catch (e) {
      setTable(null);
    }
  }, [result, json]);

  return (
    <section
      style={{
        ...flex.col,
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          ...flex.col,
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          overflowX: 'auto',
        }}
      >
        {view === 'table' && table && table.length > 0 ? (
          <HTMLTable
            style={{
              width: 'max-content',
              fontFamily: 'monospace',
            }}
          >
            <thead
              style={{
                position: 'sticky',
                backgroundColor: '#383E47',
              }}
            >
              <tr>
                <th key={0}></th>
                {table?.map((column, i) => (
                  <th key={i + 1}>{column.key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table?.[0].values.map((_, i) => (
                <tr key={i}>
                  <td
                    style={{
                      backgroundColor: '#383E47',
                    }}
                    key={0}
                  >
                    {i + 1}
                  </td>
                  {table?.map((column, itemIndex) => (
                    <td key={itemIndex + 1}>
                      <ColoredValue value={column.values[i]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </HTMLTable>
        ) : null}
        {view === 'json' && result ? (
          <ReactJson
            src={result}
            theme="google"
            displayDataTypes={false}
            displayObjectSize={false}
            style={{
              backgroundColor: '#1C2127',
              fontFamily: 'monospace',
              padding: '0.3rem',
            }}
          />
        ) : null}
        {view === 'schema' && json ? (
          <ReactJson
            src={schema}
            theme="google"
            displayDataTypes={false}
            displayObjectSize={false}
            style={{
              backgroundColor: '#1C2127',
              fontFamily: 'monospace',
              padding: '0.3rem',
            }}
          />
        ) : null}
      </div>
      <div
        style={{
          ...flex.row,
          ...flex.center,
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'fixed',
            bottom: 10,
          }}
        >
          <Button onClick={() => setView('json')} active={view === 'json'}>
            JSON
          </Button>
          <Tooltip2
            content={
              table === null ? (
                <span>Result is not an array of objects</span>
              ) : undefined
            }
          >
            <Button
              onClick={() => setView('table')}
              active={view === 'table'}
              disabled={table === null}
            >
              Table
            </Button>
          </Tooltip2>
          <Button onClick={() => setView('schema')} active={view === 'schema'}>
            Schema
          </Button>
        </div>
      </div>
    </section>
  );
}
