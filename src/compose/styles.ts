const flexCol: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const flexRow: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
};

const flexCenter: React.CSSProperties = {
  justifyContent: 'center',
  alignItems: 'center',
};

export const flex = {
  col: flexCol,
  row: flexRow,
  center: flexCenter,
};

export interface StyledComponentProps {
  className?: string;
  style?: React.CSSProperties;
}
