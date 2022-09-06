import {
  Checkbox,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { ArrowDropUp, Delete, Edit, Save } from "@mui/icons-material"
import { useState } from "react"

export const ItemList = (props) => {
  const { todo, todoList, setTodoList, editedTodo, setEditedTodo} = props
  const [editFlag, setEditFlag] = useState(true)

  const handleRemoveTodo = id => {
    const newTodoList = [...todoList]
    setTodoList(newTodoList.filter(todo => !(todo.id === id)))
  }

  const handleUpdateTask = id => {
    const updateTodoList = todoList.map((todo) => {
      if(todo.id === id) todo.isCompleted = !todo.isCompleted 
      return todo
    })
    setTodoList(updateTodoList)
  }

  const onSelectEditTodo = id => {
    setEditedTodo({ ...editedTodo, id})
    setEditFlag(false)
}

  const handleEditTodo = e => {
    setEditedTodo({...editedTodo, body: e.target.value})
  }

  const saveTask = () => {
    if (editedTodo === "") return
    const newTodoList = todoList.map(todo => {
      if(todo.id === editedTodo.id) todo.body = editedTodo.body
      return todo
    })
    setTodoList(newTodoList)
    setEditFlag(true)
  }

  const upTodo = id => {
    const newTodoList = [...todoList]
    if(id < 1) return
    newTodoList.splice(id - 1, 2, newTodoList[id], newTodoList[id - 1])
    setTodoList(newTodoList)
  }

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
  )
}
