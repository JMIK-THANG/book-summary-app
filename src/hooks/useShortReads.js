import { useCallback, useEffect, useState } from "react";

const useShortReads = (backendUrl) => {
  const [shortReads, setShortReads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getShortReads = useCallback(async () => {
    if (!backendUrl) {
      setError("The backend URL is not configured.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/short-reads`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load Short Reads.");
      }

      setShortReads(Array.isArray(data.data) ? data.data : []);
      setError("");
    } catch (requestError) {
      console.error("Get Short Reads error:", requestError.message);
      setError("Short Reads are temporarily unavailable.");
    } finally {
      setIsLoading(false);
    }
  }, [backendUrl]);

  useEffect(() => {
    getShortReads();
  }, [getShortReads]);

  const sendRequest = async (path, options) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return { success: false, message: "Please log in again." };
    }

    try {
      const response = await fetch(`${backendUrl}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Unable to save the Short Read.",
        };
      }

      return { success: true, data: data.data };
    } catch (requestError) {
      console.error("Short Read request error:", requestError.message);
      return {
        success: false,
        message: "Could not connect to the server.",
      };
    }
  };

  const addShortRead = async (formData) => {
    const result = await sendRequest("/short-reads", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (result.success) {
      setShortReads((current) => [result.data, ...current]);
    }

    return result;
  };

  const editShortRead = async (id, formData) => {
    const result = await sendRequest(`/short-reads/${id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    });

    if (result.success) {
      setShortReads((current) =>
        current.map((item) =>
          Number(item.id) === Number(id) ? result.data : item,
        ),
      );
    }

    return result;
  };

  const deleteShortRead = async (id) => {
    const result = await sendRequest(`/short-reads/${id}`, {
      method: "DELETE",
    });

    if (result.success) {
      setShortReads((current) =>
        current.filter((item) => Number(item.id) !== Number(id)),
      );
    }

    return result;
  };

  return {
    shortReads,
    shortReadsLoading: isLoading,
    shortReadsError: error,
    addShortRead,
    editShortRead,
    deleteShortRead,
  };
};

export default useShortReads;
