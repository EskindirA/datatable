export enum SortDirection {
  UNSORTED = "UNSORTED",
  ASCENDING = "ASCENDING",
  DESCENDING = "DESCENDING",
}

export type SortType = {
  [key: string]: string;
};

const extractHeaders = (object: any): string[] => {
  let objectKeys: string[] = [];
  object &&
    Object.keys(object).forEach((objectKey) => {
      const value = object[objectKey];
      if (typeof value !== "object") {
        objectKeys.push(objectKey);
      } else {
        objectKeys = [...objectKeys, ...extractHeaders(value)];
      }
    });
  return objectKeys;
};

export const getData = (list: any[]) => {
  const values: any[] = [];
  const columns = extractHeaders(list[0]);

  for (const item of list) {
    const rowData = flattenData(item);
    values.push(rowData);
  }

  return { headers: columns, values };
};

const flattenData = (tuple: any) => {
  let data: { [key: string]: string } = {};
  tuple &&
    Object.keys(tuple).forEach((objectKey) => {
      const value = tuple[objectKey];
      if (typeof value !== "object") {
        data[objectKey] = value;
      } else {
        data = { ...data, ...flattenData(value) };
      }
    });

  return data;
};

export const sortData = (
  data: any,
  sortKey: string,
  sortingDirection: string
) => {
  data.sort((a: any, b: any): number => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];
    if (
      sortingDirection === SortDirection.UNSORTED ||
      sortingDirection === SortDirection.DESCENDING
    ) {
      if (valueA > valueB) return 1;
      if (valueA < valueB) return -1;
      return 0;
    } else {
      if (valueA > valueB) return -1;
      if (valueA < valueB) return 1;
      return 0;
    }
  });
};

export const updateSortingDirection = (currentDirection: string) => {
  if (
    currentDirection === SortDirection.UNSORTED ||
    currentDirection === SortDirection.DESCENDING
  ) {
    return SortDirection.ASCENDING;
  } else {
    return SortDirection.DESCENDING;
  }
};

export const filterData = (data: any, searchKey: string) => {
  let copy = data && { ...data, values: [...data.values] };
  const columns = data.headers;
  const filteredValues = data
    ? data.values.filter((obj: any): any => checkData(columns, obj, searchKey))
    : data;

  copy = data && { ...data, values: [...filteredValues] };
  return copy;
};

const checkData = (columns: string[], obj: any, searchKey: string) => {
  let found: any;
  for (let col of columns) {
    try {
      if (obj[col] && typeof obj[col] === "string") {
        found = obj[col].includes(searchKey);
      }
      if (obj[col] && typeof obj[col] === "number") {
        found = obj[col].toString().includes(searchKey);
      }
      if (found) {
        break;
      }
    } catch (err) {
      console.log(err);
    }
  }
  return found;
};
