import {
  Checkbox,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ArrowDropUp, Delete, Edit, Save } from "@mui/icons-material";
import { useState } from "react";

export const ItemList = (props) => {
  const { task, id, todos, setTodos } = props;
  const [editFlag, setEditFlag] = useState(true);
  const [editedTask, setEditedTask] = useState("");

  const handleRemoveTask = (id) => {
    const newTodos = [...todos];
    newTodos.splice(id, 1);
    setTodos(newTodos);
  };

  const handleUpdateTask = () => {
    let newTodos = todos.map((todo, todoIndex) => {
      if (todoIndex === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const changeEditFlag = () => {
    setEditFlag(!editFlag);
  };

  const handleEditTask = (e) => {
    setEditedTask(e.target.value);
  };

  const saveTask = () => {
    if (editedTask === "") return;
    let newTodos = todos.map((todo, todoIndex) => {
      if (todoIndex === id) {
        todo.task = editedTask;
      }
      return todo;
    });
    setTodos(newTodos);
    setEditFlag(true);
  };

  const upperTask = () => {
    const newTodos = [...todos];
    const targetTask = newTodos[id];
    newTodos[id] = newTodos[id - 1];
    newTodos[id - 1] = targetTask;

    setTodos(newTodos);
  };

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Checkbox
              onClick={() => handleUpdateTask(id)}
              checked={todos[id].isCompleted}
            />
          </ListItemIcon>
          {editFlag ? (
            <ListItemText primary={task} />
          ) : (
            <Input onChange={handleEditTask} autoFocus={true} />
          )}
        </ListItemButton>

        {editFlag ? (
          <>
            <IconButton onClick={upperTask} disabled={id < 1}>
              <ArrowDropUp />
            </IconButton>

            <IconButton onClick={() => changeEditFlag()}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleRemoveTask(id)}>
              <Delete />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={saveTask}>
            <Save />
          </IconButton>
        )}
      </ListItem>
    </List>
  );
};
