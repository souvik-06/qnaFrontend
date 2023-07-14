import React, { useCallback, useState } from "react";

export const useFetchData = () => {
  const [transformedData, setTransformedData] =
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

      setTransformedData(
        data.Items.sort((a: any, b: any) => {
          let aDateArray = a.dateLog.split(",");
        let aDate=Date.parse(aDateArray[aDateArray.length-1]);
        let bDateArray = b.dateLog.split(",");
        let bDate=Date.parse(bDateArray[bDateArray.length-1]);
          return aDate > bDate ? -1 : 1;
        })
      );
    } catch (err) {
      console.log("error", err);
    }
    setLoading(false);
  }, []);
  return { transformedData, loading, kFetch, setTransformedData };
};
