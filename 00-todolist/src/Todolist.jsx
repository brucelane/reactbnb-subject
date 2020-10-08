import React, { useState } from 'react';
const Item = ({ todo, onCheckedChange }) => (
    <tr>
        <td>
            <label>{todo.value}</label>
        </td>
        <td>
            <input
             type="checkbox" 
            checked={todo.isDone} 
                onChange= {onCheckedChange}
            />
        </td>
    </tr>
)

const AddTodo = ({ onValidate }) => {
    const [newTodo, setTodo] = useState("");
    return (
        
        <form 
        onSubmit={(e)=>{
            e.preventDefault();
            onValidate(newTodo);
            }}>
                <input onChange={(e) =>{setTodo(e.target.value)}} />
                <button> Ajouter </button>
            </form>
    );
}

const List = ({ todos, onCheckedChange }) => {
    return (
        <table>
            <tbody>{todos.map(item => <Item key={item.value} onCheckedChange={onCheckedChange} todo={item} />)}</tbody>
        </table>

    )

}
const Search = ({ ...props }) => {
    return (
        <input
            value={props.inputValue}
            onChange={(e) => {
                props.onInputChange(e.target.value)
            }}
            type="text"
            placeholder="Rechercher"
        />
    )
}

const Todolist = ({ items }) => {
    const [filterText, setFilterText] = useState("hi")
    const [liste, setListe] = useState(items)
    
    const addNewTodo = (todo) => {
        const list = [...liste];
        list.push({ value: todo, isDone: false });
        setListe(list);
    };
    const setChecked = (todo ) => {
        const list = [...liste];
        let itemId = list.findIndex(el => el.value === todo.value);
        list[itemId].isDone = !list[itemId].isDone;
        setListe(list);
    }

    return (
        <div className="todo">
            <Search 
                inputValue={filterText}
                onInputChange={(value) => {
                    setFilterText(value)
                }}
            />
            <List todos={items} onCheckedChange={setChecked} />
            <AddTodo onValidate={(newTodo) => { addNewTodo(newTodo) }} />
            
        </div>
    );
}

export default Todolist;