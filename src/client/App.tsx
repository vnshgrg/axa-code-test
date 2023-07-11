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
    <div id="container">
      <header>
        <h1>A letter to Santa</h1>
        <p>Ho ho ho, what you want for Christmas?</p>
      </header>

      <main>
        {error && <div className="error">{error}</div>}
        {result && <div className="result">{result}</div>}
        <form onSubmit={sendMessage}>
          <div className="formField">
            <p>
              <label htmlFor="userid">who are you?</label>
            </p>
            <input
              id="userid"
              name="userid"
              value={username}
              placeholder="charlie.brown"
              onChange={(event) => {
                onTextChange("username", event.target.value);
              }}
              disabled={loading}
            />
          </div>
          <div className="formField">
            <p>
              <label htmlFor="wish">what do you want for christmas?</label>
            </p>
            <textarea
              value={message}
              id="wish"
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
          </div>
          <div className="formField">
            <button type="submit" id="submit-letter" disabled={loading}>
              {loading ? "Sending your wish to Santa..." : "Send to Santa"}
            </button>
          </div>
        </form>
      </main>
      <footer>Made with &hearts; in Tokyo</footer>
    </div>
  );
};

interface AppProps {}
export default App;
