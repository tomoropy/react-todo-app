import { Button, Grid, List, ListItem, TextField } from "@mui/material"
import { useState } from "react"
import { ItemList } from "./ItemList"

export const TodoList = () => {
  const [todoList, setTodoList] = useState([])
  const [todo, setTodo] = useState({ id: 0, body: "", isCompleted: false })
  const [editedTodo, setEditedTodo] = useState({ id: 0, body: "", isCompleted: false })

  const allTaskCount = () => todoList.length

  const inCompletedCount = () => todoList.filter(todo => !(todo.isCompleted)).length

  const completedCount = () => todoList.filter(todo => todo.isCompleted).length

  const handleNewTodo = e => setTodo({ ...todo, body: e.target.value })

  const HandleSubmit = e => {
    e.preventDefault()
    if (todo.body === "") return
    setTodoList([...todoList, todo])
    setTodo({id: todo.id + 1, body: "", isCompleted: false})
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
            value={todo.body}
            onChange={handleNewTodo}
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
        {todoList.map(todo => (
          <ItemList
            key={todo.id}
            todo={todo}
            todoList={todoList}
            setTodoList={setTodoList}
            setTodo={setTodo}
            editedTodo={editedTodo}
            setEditedTodo={setEditedTodo}
            handleNewTodo={handleNewTodo}
          />
        ))}
      </Grid>
    </>
  )
}
