import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { useApiRequest } from "./useApiRequest";

type Resource<T> = {
  url: string;
  status: "loading" | "success" | "missing" | "error";
  data: T | null;
};

/** Keep the previous route's response from appearing while a new item loads. */
export function usePublicResource<T>(url: string) {
  const { request } = useApiRequest<T>();
  const [attempt, setAttempt] = useState(0);
  const [resource, setResource] = useState<Resource<T>>({
    url,
    status: "loading",
    data: null,
  });
  useEffect(() => {
    let active = true;
    setResource({ url, status: "loading", data: null });
    void request({ method: "GET", url }).then(
      (data) => {
        if (active)
          setResource({
            url,
            status: data ? "success" : "missing",
            data: data || null,
          });
      },
      (error) => {
        if (active)
          setResource({
            url,
            status:
              isAxiosError(error) && error.response?.status === 404
                ? "missing"
                : "error",
            data: null,
          });
      },
    );
    return () => {
      active = false;
    };
  }, [url, attempt, request]);
  return {
    data: resource.url === url ? resource.data : null,
    status: resource.url === url ? resource.status : ("loading" as const),
    retry: () => setAttempt((value) => value + 1),
  };
}
