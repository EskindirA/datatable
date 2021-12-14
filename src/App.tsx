import { FC, useEffect, useState, useRef } from "react";
import { fetchRandomUsers } from "./api/Location";
import {
  Container,
  EskindirTable,
  SearchBox,
  TableContainer,
} from "./App.styled";
import {
  filterData,
  getData,
  sortData,
  SortDirection,
  SortType,
  updateSortingDirection,
} from "./util/tableutil";

type AppProps = {
  url?: string;
};

const fetchData = (url: string) => {
  return fetchRandomUsers(url).then((data) => {
    const { results } = data;
    return results;
  });
};

const App: FC<AppProps> = ({
  url = "https://randomuser.me/api?results=20",
}: AppProps) => {
  const [data, setData] = useState<{
    headers: string[];
    values: any[];
  }>();

  const [filteredData, setFilteredData] = useState(data);

  const [sortingDirection, setSortingDirection] = useState<SortType>({});
  const search = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchData(url).then((data) => {
      const flattenedData = getData(data);
      setData(flattenedData);
      setFilteredData(flattenedData);
    });
  }, [url]);

  const handleSort = (sortKey: string) => {
    const dataCopy = filteredData && {
      ...filteredData,
      values: [...filteredData.values],
    };
    const currentdirection = sortingDirection[sortKey]
      ? sortingDirection[sortKey]
      : SortDirection.ASCENDING;
    sortData(dataCopy?.values, sortKey, currentdirection);
    setFilteredData(dataCopy);

    const nextSortValue = sortingDirection;
    nextSortValue[sortKey] = updateSortingDirection(currentdirection);
    setSortingDirection({ ...sortingDirection, ...nextSortValue });
  };

  const handleSearch = () => {
    const searchKey = search.current?.value;
    if (searchKey && searchKey !== "") {
      const filteredData = filterData(data, searchKey);
      filteredData && setFilteredData(filteredData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <Container>
      <SearchBox
        type="text"
        name="search"
        ref={search}
        onChange={handleSearch}
      />
      <TableContainer>
        <EskindirTable>
          <thead>
            <tr>
              {data &&
                data.headers.map((column: string, columnIdx: number) => (
                  <th
                    scope="col"
                    key={columnIdx}
                    onClick={() => handleSort(column)}
                  >
                    {column}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData.values.map((rowData, rowIdx: number) => (
                <tr key={rowIdx}>
                  {filteredData.headers.map(
                    (column: string, columnIdx: number) => (
                      <td data-label={column} key={columnIdx}>
                        {rowData[column] ? rowData[column] : "-"}
                      </td>
                    )
                  )}
                </tr>
              ))}
          </tbody>
        </EskindirTable>
      </TableContainer>
    </Container>
  );
};

export default App;
