import axios from "axios";
import { SearchLocation } from "../interfaces/responses/searchLocation";

const useSearchCity = () => {

  const getLocation = async (searchTerm: string): Promise<SearchLocation> => {
    const { data } = await axios.get(`${import.meta.env.VITE_OPENCAGE_API_URL}`, {
      params: {
        q: searchTerm,
        key: import.meta.env.VITE_OPENCAGE_API_KEY,
        language: "en",
        pretty: 1
      }
    });
    return data;
  }

  return { getLocation }
}

export default useSearchCity