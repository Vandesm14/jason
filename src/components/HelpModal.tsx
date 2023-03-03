// TODO: Extract all JSON state using Jotai or Zustand so this component can give personalized examples using the schema

import { Dialog, DialogBody } from '@blueprintjs/core';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Help" icon="help">
      <DialogBody>
        <h1
          style={{
            marginTop: 0,
          }}
        >
          About
        </h1>
        <p>
          <b>Jason</b> is a JSON query visualization tool. Queries are built
          using <a href="https://jmespath.org/tutorial.html">JMESPath</a> to
          search through JSON data. We support almost any schema, such as an
          array of objects, a single object, or even a single value.
        </p>
        <h2>Query Examples</h2>
        <p>
          TODO: Add examples here. We can use the schema to generate examples.
        </p>
        <h2>Visualizing your Queries</h2>
        <p>
          We have a few different ways to visualize your queries. You can view
          your queries as a JSON tree, as a table, or view the schema of the
          query results.
        </p>
      </DialogBody>
    </Dialog>
  );
}
