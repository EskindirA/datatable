import axios from "axios";

export const fetchRandomUsers = (url: string) =>
  axios.get(url).then(({ data }) => data);
