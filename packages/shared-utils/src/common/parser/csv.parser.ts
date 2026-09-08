export const parseCSV = (csv: string, delimiter: string = ','): string[][] => {
  return csv.split('\n').map((row) => row.split(delimiter));
};

export const stringifyCSV = (data: unknown[][], delimiter: string = ','): string => {
  return data.map((row) => row.join(delimiter)).join('\n');
};
