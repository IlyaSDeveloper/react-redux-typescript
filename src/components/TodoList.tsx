import React, {useEffect} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const TodoList: React.FC = () => {
    const {page, error, loading, todos, limit, pageCount} = useTypedSelector(state => state.todo);
    const {fetchTodos, setTodoPage} = useActions();
    let pages:number[] = [];

    useEffect(() => {
        fetchTodos(page, limit)
    }, [page])

    if (loading) {
        return <h1>Идет загрузка...</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }

    if (todos.length > 0) {
        pages = []
        for (let i = 1; i <= Math.ceil(pageCount/10); i++) {
            pages = pages.concat(i)            
        };
    }

    return (
        <div>
            {todos.map(todo =>
                <div key={todo.id}>{todo.id} - {todo.title}</div>
            )}
            <div style={{display: "flex"}}>
                {pages.map(p =>
                    <div
                        key = {Date.now()+p}
                        onClick={() => setTodoPage(p)}
                        style={{border:p === page ? '2px solid green' : '1px solid gray', padding: 10}}
                    >
                        {p}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoList;
