import { useState } from "react";
import { ENDPOINT, Todo } from "../App";
import { KeyedMutator } from "swr";

function AddTodo({ mutate }: { mutate: KeyedMutator<Todo[]> }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function createTodo() {
    const values = { title, body };

    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => r.json());

    mutate(updated);
    resetForm();
    setOpen(false);
  }

  function resetForm() {
    setTitle("");
    setBody("");
  }

  return (
    <>
      {open && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 999 }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "blue", padding: "2rem", borderRadius: "8px", maxWidth: "400px", width: "100%" }}>
            <h2>Create todo</h2>
            <form onSubmit={(e) => { e.preventDefault(); createTodo(); }}>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="title">Todo</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What do you want to do?"
                  required
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="body">Body</label>
                <textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Tell me more..."
                  required
                />
              </div>
              <button type="submit">Create todo</button>
            </form>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button style={{ width: "100%", marginBottom: "1rem" }} onClick={() => setOpen(true)}>ADD TODO</button>
      </div>
    </>
  );
}

export default AddTodo;
