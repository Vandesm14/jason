import { createRoot } from 'react-dom/client';
import React from 'react';
import { JSONModal } from './components/JSONModal';
import { QueryInput } from './components/QueryInput';
import { R } from './vendor/deno.land/x/ahh@v0.11.0/mod';

function App() {
  const [json, setJson] = React.useState<object>();
  const [result, setResult] = React.useState<object>();

  const handleJSONChange = (json: string) => {
    const parsed = R.fn(() => JSON.parse(json));
    if (R.isErr(parsed)) {
      console.error(parsed);
      return;
    }

    setJson(parsed);
  };

  return (
    <>
      <JSONModal onChange={handleJSONChange} />
      <QueryInput json={json} onChange={(json) => setResult(json)} />
      <textarea readOnly value={JSON.stringify(result)} />
    </>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
