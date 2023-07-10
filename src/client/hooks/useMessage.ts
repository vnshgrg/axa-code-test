import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import { environment } from "../../server/utils";

interface ApiResponse {
  result: boolean;
  message: string;
  error?: string;
}

export const useMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (
        !message ||
        !username ||
        message.trim() === "" ||
        username.trim() === ""
      ) {
        setError("Please provide both username and message.");
        return;
      }

      setLoading(true);
      setError(null);

      console.log(message, username);

      const apiUrl = `https://${environment.app_name}.glitch.me/api/message`;

      console.log(apiUrl);
      const { data } = await axios.post<ApiResponse>(apiUrl, {
        username,
        message,
      });
      if (!data.result) {
        setError(data.message);
      }
      setResult(data.message);
      setMessage("");
      setUsername("");
    } catch (err) {
      const error = err as AxiosError<ApiResponse>;
      setError(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const onTextChange = (key: "message" | "username", value: string) => {
    switch (key) {
      case "message":
        setMessage(value);
        break;
      case "username":
        setUsername(value);
        break;
      default:
        return;
    }
  };
  return {
    loading,
    error,
    message,
    username,
    result,
    sendMessage,
    onTextChange,
  };
};
