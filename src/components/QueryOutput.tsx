import { Button, HTMLTable, Switch } from '@blueprintjs/core';
import React, { ChangeEvent } from 'react';
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
  const [useQuery, setUseQuery] = React.useState(true);

  const [view, setView] = React.useState<'json' | 'table' | 'schema'>('json');
  const [table, setTable] = React.useState<Column[] | null>(null);
  const [schema, setSchema] = React.useState<any>({});

  const input = React.useMemo(() => {
    return useQuery ? result : json;
  }, [useQuery, result, json]);

  React.useEffect(() => {
    try {
      const input = useQuery ? result : json;
      const array = Array.isArray(input) ? input : [input];
      const newTable = flattenJSON(array);

      setTable(newTable);
      setSchema(guessSchema(flattenJSON(array)));
    } catch (e) {
      setTable(null);
    }
  }, [result, json, useQuery]);

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
        {view === 'json' && input ? (
          <ReactJson
            src={input}
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
        {view === 'schema' && schema ? (
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
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            right: 10,
            zIndex: 100,
          }}
        >
          <Switch
            label={useQuery ? 'Query' : 'Original'}
            large={true}
            alignIndicator="right"
            checked={useQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUseQuery(e.target.checked)
            }
          />
        </div>
      </div>
    </section>
  );
}
