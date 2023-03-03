import { HTMLTable } from '@blueprintjs/core';
import { Column } from '../../json';
import { ColoredValue } from '../ColoredValue';

export function TableView({ table }: { table: Column[] }) {
  return (
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
  );
}
