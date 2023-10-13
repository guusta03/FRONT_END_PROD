'use client';

import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

type AxiosDataType<T> = {
  method: string;
  url: string;
  bodyData?: T;
};

const useAxios = <T>({ url, method, bodyData }: AxiosDataType<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios({
          method,
          url,
          data: bodyData,
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, bodyData]);

  return { data, loading, error };
};

export default useAxios;
