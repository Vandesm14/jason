import { flex, StyledComponentPropsWithChildren } from './styles';

export function Flex({
  style,
  children,
  center,
  direction,
}: StyledComponentPropsWithChildren & {
  center?: boolean;
  direction?: 'row' | 'col';
}) {
  return (
    <div
      style={{
        ...flex[direction ?? 'row'],
        ...(center ? flex.center : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
