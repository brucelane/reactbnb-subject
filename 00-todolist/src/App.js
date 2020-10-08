import React from "react";
import "./App.css";
//map
//form submit
//accolades
//filteredTodoList autochangé car liste en stata
//warning

const TODO_LIST = [
  { value: "react", isDone: false },
  { value: "react2", isDone: false },
  { value: "react3", isDone: true },
  { value: "react4", isDone: false }
];

const Item = ({ todo, onCheckedChange }) => {
  return (
    <tr>
      <td>
        <label>{todo.value}</label>
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => {
            onCheckedChange(todo);
          }}
        />
      </td>
    </tr>
  );
};

const List = ({ todos, ...others }) => {
  //const rows = todos.map((toDo) => <Item todo={toDo} /> );

  return (
    <table>
      <thead>
        <tr>
          <th>Liste </th>
        </tr>
      </thead>
      <tbody>
        {todos.map((toDo) => (
          <Item key={toDo.value} todo={toDo} {...others} />
        ))}
      </tbody>
    </table>
  );
};

const Search = ({ ...props }) => {
  return (
    <input
      value={props.inputValue}
      onChange={(e) => {
        props.onInputChange(e.target.value);
      }}
      type="text"
      placeholder="Rechercher ..."
    />
  );
};

const AddToDo = ({ onValidate }) => {
  const [newTodo, setTodoText] = React.useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onValidate(newTodo);
        setTodoText("");
      }}
    >
      <input
        value={newTodo}
        onChange={(e) => {
          setTodoText(e.target.value);
        }}
        type="text"
        placeholder="Ajouter ..."
      />
      <button> Ajouter </button>
    </form>
  );
};

const AddToDo2 = ({ onValidate }) => {
  const [newTodo, setTodoText] = React.useState("");

  return (
    <div>
      <input
        value={newTodo}
        onChange={(e) => {
          setTodoText(e.target.value);
        }}
        type="text"
        placeholder="Ajouter ..."
      />

      <button
        onClick={(e) => {
          onValidate(newTodo);
          setTodoText("");
        }}
      />
    </div>
  );
};

const App = () => {
  const [filterText, setFilterText] = React.useState("");
  const [liste, setList] = React.useState(TODO_LIST);

  let filteredTodoList = liste.filter((todo) => {
    return todo.value.toLowerCase().includes(filterText);
  });
  function addNewTodo(newTodoIt) {
    let list = [...liste];
    list.push({ value: newTodoIt, isDone: false });
    setList(list);
  }
  function setChecked(todo) {
    const list = [...liste];
    let itemId = list.findIndex((element) => element.value === todo.value);
    list[itemId].isDone = !list[itemId].isDone;

    setList(list);
  }

  return (
    <div>
      <Search
        inputValue={filterText}
        onInputChange={(value) => {
          setFilterText(value);
        }}
      />
      <List todos={filteredTodoList} onCheckedChange={setChecked} />
      <AddToDo
        onValidate={(newTodo) => {
          addNewTodo(newTodo);
        }}
      />
    </div>
  );
};

export default App;


/*import React from 'react';
import Todolist from './Todolist';
import './App.css';

function App() {
  const iItems = [
    { value: "reac", isDone: false },
  { value: "react", isDone: true },
  { value: "rn", isDone: false }];
  return (
    <Todolist items={iItems} />
  );
}

export default App;*/
