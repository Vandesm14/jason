import { Button, HTMLTable } from '@blueprintjs/core';
import React from 'react';
import ReactJson from 'react-json-view';
import { flex } from '../compose/styles';
import { Column, flattenJSON } from '../json';
import { Tooltip2 } from '@blueprintjs/popover2';

export interface QueryOutputProps {
  result: any;
}

export function QueryOutput({ result }: QueryOutputProps) {
  const buttonRef = React.useRef<HTMLDivElement>(null);
  const [isTable, setIsTable] = React.useState(false);
  const [table, setTable] = React.useState<Column[] | null>(null);

  const buttonHeight = buttonRef.current?.clientHeight ?? 0;

  React.useEffect(() => {
    try {
      if (!Array.isArray(result)) throw new Error('Not an array');

      let newTable = flattenJSON(result);
      setTable(newTable);
    } catch {
      setTable(null);
    }
  }, [result]);

  return (
    <>
      {isTable ? (
        <HTMLTable>
          <thead
            style={{
              position: 'sticky',
              backgroundColor: '#383E47',
            }}
          >
            <th
              style={{
                width: 'min-content',
              }}
            ></th>
            {table?.map((column) => (
              <th key={column.key}>{column.key}</th>
            ))}
          </thead>
          <tbody>
            {table?.[0].values.map((_, i) => (
              <tr>
                <td
                  style={{
                    backgroundColor: '#383E47',
                  }}
                  key={0}
                >
                  {i + 1}
                </td>
                {table?.map((column, i) => (
                  <td key={i + 1}>{column.values[i]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </HTMLTable>
      ) : (
        <ReactJson
          src={result}
          theme="google"
          displayDataTypes={false}
          displayObjectSize={false}
        />
      )}
      <div
        style={{
          position: 'relative',
        }}
      >
        <div
          style={{
            ...flex.row,
            ...flex.center,
            position: 'absolute',
            width: '100%',
            top: isTable ? 0 : -buttonHeight - 10,
          }}
        >
          <div ref={buttonRef}>
            <Button onClick={() => setIsTable(false)} active={isTable}>
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
                onClick={() => setIsTable(true)}
                active={!isTable}
                disabled={table === null}
              >
                Table
              </Button>
            </Tooltip2>
          </div>
        </div>
      </div>
    </>
  );
}
