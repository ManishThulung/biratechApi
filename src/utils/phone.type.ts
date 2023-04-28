export type QueryValidate = {
  phoneOne: string;
  phoneTwo: string;
};

export type FilterQueryValidate = {
  company?: string;
  name?: string;
  storage?: string;
  ram?: string;
  battery?: string;
  camera?: string;
  price?: [number, number];
};
