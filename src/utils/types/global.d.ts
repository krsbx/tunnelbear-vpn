declare type FCWithChild<T = unknown> = T & {
  children?: React.ReactNode;
};

declare type AnyRecord = {
  [key: string | number | symbol]: unknown;
};

declare type VPNConfig = {
  name: string;
  path: string;
};

declare interface Event {
  detail: AnyRecord;
}
