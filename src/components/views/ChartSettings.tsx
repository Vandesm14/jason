import { HTMLSelect } from '@blueprintjs/core';
import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { Column, Flex } from '../../compose/Flex';
import { applyPartial } from '../../partial';
import { RecursivePartial } from '../../types';

type Aggregate = 'sum' | false;

type Options = {
  type: string;
  title: string;
  axis: {
    x: {
      label: string;
      path: string;
      aggregate: Aggregate;
    };
    y: {
      label: string;
      path: string;
      aggregate: Aggregate;
    };
  };
};

export function transformData(data: any[], options: Options) {
  const { type, axis } = options;
  const { x, y } = axis;

  if (type === 'scatter') {
    return {
      labels: data.map((d) => d[x.path]),
      datasets: [
        {
          data: data.map((d) => d[y.path]),
        },
      ],
    };
  }

  return {
    labels: data.map((d) => d[x.path]),
    datasets: [
      {
        data: data.map((d) => d[x.path]),
      },
    ],
  };
}

export function ChartSettings({ keys }: { keys: string[] }) {
  const [options, setOptions] = useLocalStorageState<Options>('chart-options', {
    defaultValue: {
      type: 'line',
      title: '',
      axis: {
        x: {
          label: '',
          path: '',
          aggregate: false,
        },
        y: {
          label: '',
          path: '',
          aggregate: false,
        },
      },
    },
  });

  const setShallowOptions = (newOptions: RecursivePartial<Options>) =>
    setOptions((options) => applyPartial(options, newOptions));

  return (
    <Flex
      style={{
        gap: 10,
      }}
      direction="col"
    >
      <Flex
        style={{
          alignItems: 'center',
        }}
      >
        <span>Type:</span>
        <HTMLSelect
          options={['line', 'bar', 'scatter']}
          onChange={(e) => setOptions({ ...options, type: e.target.value })}
        />
      </Flex>
      <Flex>
        <Flex
          style={{
            alignItems: 'center',
          }}
        >
          <span>X:</span>
          <HTMLSelect
            options={keys}
            onChange={(e) =>
              setShallowOptions({
                axis: {
                  x: {
                    path: e.target.value,
                  },
                },
              })
            }
          />
        </Flex>
        {options.type === 'scatter' ? (
          <Flex center>
            <span>Y:</span>
            <HTMLSelect
              options={keys}
              onChange={(e) =>
                setShallowOptions({
                  axis: {
                    y: {
                      path: e.target.value,
                    },
                  },
                })
              }
            />
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
}
