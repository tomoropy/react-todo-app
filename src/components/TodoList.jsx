import { Button, Grid, List, ListItem, TextField } from "@mui/material";
import { useState } from "react";
import { ItemList } from "./ItemList";

export const TodoList = () => {

  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const allTaskCount = () => {
    return todos.length;
  };

  const inCompletedCount = () => {
    let i = 0;
    todos.forEach((todo) => {
      if (!todo.isCompleted) i++;
    });
    return i;
  };

  const completedCount = () => {
    let i = 0;
    todos.forEach((todo) => {
      if (todo.isCompleted) i++;
    });
    return i;
  };

  const handleNewTask = (event) => {
    setTask(event.target.value);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (task === "") return;
    setTodos((todos) => [...todos, { task, isCompleted: false }]);
    setTask("");
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <h1>To do App</h1>
        <Grid sx={{ my: 2 }}>
          <TextField
            id="outlined-basic"
            label="タスクを入力"
            variant="outlined"
            size="small"
            sx={{ mr: 3 }}
            value={task}
            onChange={handleNewTask}
          />
          <Button variant="contained" onClick={HandleSubmit}>
            追加
          </Button>
        </Grid>
        <List sx={{ display: "flex", color: "info.main", width: 0.25 }}>
          <ListItem>全て: {allTaskCount()}</ListItem>
          <ListItem>未完了: {inCompletedCount()}</ListItem>
          <ListItem>完了: {completedCount()}</ListItem>
        </List>
        {todos.map((todo, index) => (
          <ItemList
            key={index}
            id={index}
            task={todo.task}
            todos={todos}
            setTodos={setTodos}
            handleNewTask={handleNewTask}
          />
        ))}
      </Grid>
    </>
  );
};
