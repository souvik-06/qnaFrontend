import React, { useCallback, useState } from "react";

export const useFetchMaster = () => {
  const [masterData, setmasterData] =
    useState<React.SetStateAction<any>>();
  const [loading, setLoading] = useState(false);

  const kFetch = useCallback(async (_url: any) => {
    setLoading(true);
    try {
      const response = await fetch(_url);

      if (!response) {
        console.log("error");
      }
      const data = await response.json();
      
      setmasterData(data.Items);
    } catch (err) {
      console.log("error", err);
    }
    setLoading(false);
  }, []);
  return { masterData, loading, kFetch, setmasterData };
};
