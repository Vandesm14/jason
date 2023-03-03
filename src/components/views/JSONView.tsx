import ReactJson from 'react-json-view';

export function JSONView({ json }: { json: any }) {
  return (
    <ReactJson
      src={json}
      theme="google"
      displayDataTypes={false}
      displayObjectSize={false}
      style={{
        backgroundColor: '#1C2127',
        fontFamily: 'monospace',
        padding: '0.3rem',
      }}
    />
  );
}
