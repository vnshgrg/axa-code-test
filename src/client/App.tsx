import * as React from "react";
import { useMessage } from "./hooks";

/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {
  const {
    loading,
    error,
    result,
    username,
    message,
    sendMessage,
    onTextChange,
  } = useMessage();

  return (
    <>
      <header>
        <h1>A letter to Santa</h1>
      </header>

      <main>
        <p className="bold">Ho ho ho, what you want for Christmas?</p>
        who are you?
        <input
          name="userid"
          value={username}
          placeholder="charlie.brown"
          onChange={(event) => {
            onTextChange("username", event.target.value);
          }}
          disabled={loading}
        />
        <form onSubmit={sendMessage}>
          what do you want for christmas?
          <textarea
            value={message}
            name="wish"
            rows={10}
            cols={45}
            maxLength={100}
            placeholder="Gifts!"
            onChange={(event) => {
              onTextChange("message", event.target.value);
            }}
            disabled={loading}
          />
          <br />
          <button type="submit" id="submit-letter" disabled={loading}>
            Send
          </button>
        </form>
      </main>

      <p>
        Username: {username}
        <br />
        Message: {message}
        <br />
        <br />
        Error: {error}
        <br />
        Result: {result}
      </p>

      <footer>Made with &heart; in Tokyo</footer>
    </>
  );
};

interface AppProps {}
export default App;
