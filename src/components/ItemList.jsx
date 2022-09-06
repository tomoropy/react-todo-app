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
  const { todo, setTodo, todoList, setTodoList, editedTodo, setEditedTodo} = props;
  const [editFlag, setEditFlag] = useState(true);

  const handleRemoveTodo = id => {
    const newTodoList = [...todoList]
    setTodoList(newTodoList.filter(todo => !(todo.id === id)))
  }

  const handleUpdateTask = (id) => {
    const updateTodoList = todoList.map((todo) => {
      if(todo.id === id) todo.isCompleted = !todo.isCompleted 
      return todo
    })
    setTodoList(updateTodoList)
  }

  const onSelectEditTodo = id => {
    setEditedTodo({ ...editedTodo, id})
    console.log(editedTodo)
    setEditFlag(false)
}

  const handleEditTodo = e => {
    setEditedTodo({...editedTodo, body: e.target.value})
    console.log(editedTodo)
  }

  const saveTask = () => {
    if (editedTodo === "") return;
    const newTodoList = todoList.map(todo => {
      if(todo.id === editedTodo.id) todo.body = editedTodo.body
      return todo
    })
    setTodoList(newTodoList);
    setEditFlag(true);
  };

  const upTodo = (id) => {
    let index = todoList.indexOf(todo)
    if (index === 0) return 
    const newTodoList = [...todoList]

    newTodoList.splice(index - 1, 2, newTodoList[index], newTodoList[index - 1])
    setTodoList(newTodoList)
  };

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem disablePadding >
        <ListItemButton>
          <ListItemIcon>
            <Checkbox
              onClick={() => handleUpdateTask(todo.id)}
              checked={todo.isCompleted}
            />
          </ListItemIcon>
          {editFlag ? (
            <ListItemText primary={todo.body} />
          ) : (
            <Input onChange={handleEditTodo} autoFocus />
          )}
        </ListItemButton>

        {editFlag ? (
          <>
            <IconButton onClick={() => upTodo(todo.id)} >
              <ArrowDropUp />
            </IconButton>

            <IconButton onClick={() => onSelectEditTodo(todo.id)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleRemoveTodo(todo.id)}>
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
