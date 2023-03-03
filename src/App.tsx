import { createRoot } from 'react-dom/client';
import React from 'react';
import { JSONInput } from './components/JSONInput';
import { QueryInput } from './components/QueryInput';
import { R } from './vendor/deno.land/x/ahh@v0.11.0/mod';
import { flex } from './compose/styles';
import { QueryOutput } from './components/QueryOutput';
import Split from 'react-split';
import { Button, Navbar } from '@blueprintjs/core';

function App() {
  const [json, setJson] = React.useState<object>();
  const [result, setResult] = React.useState({});
  const [nav, setNav] = React.useState<'input' | 'output'>('input');

  const handleJSONChange = (json: string) => {
    const parsed = R.fn(() => JSON.parse(json));
    if (R.isErr(parsed)) {
      console.error(parsed);
      return;
    }

    setJson(parsed);
  };

  return (
    <main
      style={{
        ...flex.col,
      }}
    >
      <Navbar>
        <Navbar.Group>
          <Navbar.Heading>JSON Query</Navbar.Heading>
          <Navbar.Divider />
          <Button
            icon="code"
            active={nav === 'input'}
            onClick={() => setNav('input')}
          >
            Input
          </Button>
          <Button
            icon="console"
            active={nav === 'output'}
            onClick={() => {
              setNav('output');
            }}
          >
            Output
          </Button>
        </Navbar.Group>
      </Navbar>
      {nav === 'input' && (
        <JSONInput
          onChange={handleJSONChange}
          onSubmit={() => setNav('output')}
        />
      )}
      {nav === 'output' && (
        <Split
          direction="vertical"
          cursor="row-resize"
          style={{
            ...flex.col,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <QueryInput json={json} onChange={(json) => setResult(json)} />
          <QueryOutput result={result} json={json} />
        </Split>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
