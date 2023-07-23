import React, { useCallback, useState } from "react";

export const useFetchResults = () => {
  const [results, setResults] = useState<React.SetStateAction<any>>();
  const [loading, setLoading] = useState(false);

  const kFetch = useCallback(async (_url: any) => {
    setLoading(true);
    try {
      const response = await fetch(_url);

      if (!response) {
        console.log("error");
      }
      const dataAll = await response.json();
      const data = dataAll.question;

      setResults(data.Items);
    } catch (err) {
      console.log("error", err);
    }
    setLoading(false);
  }, []);
  return { results, loading, kFetch, setResults };
};
