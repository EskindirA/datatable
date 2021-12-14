import { Box, styled } from "@mui/system";
import { device } from "./util/device";
export const Container = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* margin: 2rem 2rem 2rem 2rem; */
  /* overflow: hidden; */
`;

export const TableContainer = styled(Box)`
  width: 100%;
  overflow: auto;
`;

export const SearchBox = styled("input")`
  width: 15rem;
`;
export const EskindirTable = styled("table")`
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  table-layout: auto;
  /* max-width: 200px; */
  /* overflow: scroll; */

  tr {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: 0.35em;
  }

  th,
  td {
    padding: 0.625em;
    text-align: center;
  }

  th {
    font-size: 0.85em;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  @media screen and (max-width: 600px) {
    border: 0;

    thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    tr {
      border-bottom: 3px solid #ddd;
      display: block;
      margin-bottom: 0.625em;
    }

    td {
      border-bottom: 1px solid #ddd;
      display: block;
      font-size: 0.8em;
      text-align: right;
    }

    td::before {
      /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }

    td:last-child {
      border-bottom: 0;
    }
  }
`;
