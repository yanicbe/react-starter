import { Context } from "@/util-components/root/context";
import { useCallback, useContext } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "../utils/handle-error";

// Interface for options that can be passed to the apiRequest function
interface ApiRequestOptions {
  // Optional toast configuration
  toast?: { toastText?: string };
  // Optional body for the request
  body?: any;
  test?: boolean;
}

// Interface for the response returned by the apiRequest function
interface ApiResponse<T> {
  data: T | undefined;
  error: Error | unknown | undefined;
  status: number;
}

type ApiFileRequestOptions = {
  formdataName: string;
  customFields?: { [key: string]: string };
  toast?: {
    toastText?: string;
  };
};


// Custom hook to create an API request function
const useApiRequest = () => {
  const { setError, accessToken } = useContext(Context);
  // useCallback to memoize the apiRequest function
  const apiRequest = useCallback(
    async <T>(
      route: string, // API route
      method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", // HTTP method
      options?: ApiRequestOptions // Optional request options
    ): Promise<ApiResponse<T>> => {
      // Setting up the fetch options

      const fetchOptions: RequestInit = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${accessToken}`
        },
      };

      // If a body is provided, add it to the fetch options
      if (options?.body) {
        fetchOptions.body = JSON.stringify(options.body);
      }

      // Create a promise for the fetch response
      const responsePromise = new Promise<{ data: T; status: number }>(async (resolve, reject) => {
        try {
          const url = options?.test ? `${process.env.REACT_APP_API}/api/${route}` : `${process.env.REACT_APP_API}/v1.0/${route}`;
          // Fetching data from the API - will be replaced in the future with the api url via env variables
          const res = await fetch(url, fetchOptions);

          //console.log(res);

          // If the response is not ok, reject the promise with an error
          if (!res.ok) {
            const error = await getErrorMessage(res);
            if (setError) {
              setError(error);
            }

            reject({
              error: new Error("Request failed"),
              message: error,
              status: res.status,
            });
            return;
          }

          // Try to parse the response as JSON
          let responseData: T;
          try {
            responseData = await res.json();
          } catch {
            // If parsing fails, reject the promise with an error
            const x = "success" as unknown as T;
            resolve({ data: x, status: res.status });
            return;
          }

          // Resolve the promise with the parsed data
          resolve({
            data: responseData,
            status: res.status,
          });
        } catch (error) {
          // Log the error and reject the promise
          reject({ error, status: 500 });
        }
      });

      // If toast options are provided, display a toast notification
      if (options?.toast) {
        // toast.promise(responsePromise, {
        //   loading: "Loading...", // Message while loading
        //   success: options.toast.toastText || "Success!", // Success message
        //   error: (err) => (err instanceof Error ? err.message : "An error occurred"), // Error message
        // });
        toast.promise(responsePromise, {
          loading: "Loading...", // Message while loading
          success: options.toast.toastText || "Success!", // Success message
          error: (err) => (err instanceof Error ? err.message : "Es ist ein Fehler aufgetreten"), // Error message
        });
      }

      // Wait for the response and handle the result
      try {
        const data = await responsePromise;
        return { data: data.data, error: undefined, status: data.status }; // Return the data if successful
      } catch (errorCatched) {
        const error = errorCatched as unknown as {
          message: string;
          error: Error | unknown;
          status: number;
        };
        return { data: undefined, error: error.message, status: error.status }; // Return the error if failed
      }
    },
    [accessToken, setError]
  );

  const apiFileRequest = useCallback(
    async <T>(
      route: string,
      method: "POST" | "DELETE" | "GET" | "PUT" | "PATCH",
      file?: any,
      options?: ApiFileRequestOptions
    ): Promise<ApiResponse<T>> => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const formdata = new FormData();
      if (file) {
        if (options?.formdataName) {
          if (Array.isArray(file)) {
            file.forEach((f, i) => {
              formdata.append(options.formdataName, f, f.name);
            });
          } else {
            formdata.append(options.formdataName, file, file.name);
          }
        } else {
          formdata.append(
            Array.isArray(file) ? "files" : "file",
            Array.isArray(file) ? file[0] : file,
            file.name
          );
        }
      }
      if (options?.customFields) {
        Object.keys(options.customFields).forEach((key) => {
          formdata.append(key, options.customFields ? options.customFields[key] : "");
        });
      }

      const requestOptions: RequestInit = {
        method: method,
        headers: myHeaders,
        body: formdata,
      };

      const responsePromise = new Promise<{ data: T; status: number }>(async (resolve, reject) => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API}/v1.0/${route}`, requestOptions);

          if (!response.ok) {
            const error = await getErrorMessage(response);
            if (setError) {
              setError(error);
            }
            reject({
              error: new Error("Request failed"),
              message: error,
              status: response.status,
            });
            return;
          }

          let responseData: T;
          try {
            responseData = await response.json();
          } catch {
            reject({ error: new Error("Failed to parse JSON"), message: "Failed to parse JSON", status: response.status });
            return;
          }

          resolve({
            data: responseData,
            status: response.status,
          });
        } catch (error) {
          reject({ error, status: 500 });
        }
      });

      if (options?.toast) {
        toast.promise(responsePromise, {
          loading: "Loading...",
          success: options.toast.toastText || "Success!",
          error: (err) => (err instanceof Error ? err.message : "Es ist ein Fehler aufgetreten"),
        });
      }

      try {
        const data = await responsePromise;
        return { data: data.data, error: undefined, status: data.status };
      } catch (errorCatched) {
        const error = errorCatched as unknown as {
          message: string;
          error: Error | unknown;
          status: number;
        };
        if (error.status > 200 && error.status < 299) {
          toast.success("File erfolgreich hochgeladen");
          return { data: undefined, error: undefined, status: error.status };
        }
        toast.error("Es gab leider ein Problem. Bitte versuche es später wieder oder kontaktiere den Support");
        return { data: undefined, error: error.message, status: error.status };
      }
    },
    [accessToken, setError]
  );

  return { apiRequest, apiFileRequest }; // Return the apiRequest function
};



export default useApiRequest;
