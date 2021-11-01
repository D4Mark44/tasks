import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [tasks, getTask] = useState([
    // {
    //   id: 0,
    //   task: "Minha tarefa do dia",
    //   finish: false,
    // },
    // {
    //   id: 0,
    //   task: "Minha tarefa do dia",
    //   finish: false,
    // },
  ]);
  const [modal, setModal] = useState(false);

  const saveTask = (save) => {
    //save task
    var task = document.getElementById("content-task");

    getTask([
      ...tasks,
      {
        id: new Date().getTime(),
        task: task.value,
        finish: false,
      },
    ]);

    window.localStorage.setItem(
      "newTasks",
      JSON.stringify([
        ...tasks,
        {
          id: new Date().getTime(),
          task: task.value,
          finish: false,
        },
      ])
    );

    setModal(false);
  };

  const selectFinish = (id, opt) => {
    let newTasks = tasks.filter(function (val) {
      if (val.id == id) {
        val.finish = opt;
      }
      return val;
    });

    getTask(newTasks);
    window.localStorage.setItem("newTasks", JSON.stringify(newTasks));
  };

  const openModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (window.localStorage.getItem("newTasks") != undefined) {
      getTask(JSON.parse(window.localStorage.getItem("newTasks")));
      // console.log(window.localStorage.getItem("TasksToDo"));
    }
  }, []);

  return (
    <div className="App">
      {modal ? (
        <div className="modal">
          <div className="modalContent">
            <h3>Adicionar sua Tarefa</h3>
            <input id="content-task" type="text" />
            <button onClick={() => saveTask()}>Salvar</button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div onClick={() => openModal()} className="addTask">
        +
      </div>
      <div className="container">
        <h2>Minhas tarefas do dia!</h2>
        {tasks.map((val) => {
          if (!val.finish) {
            return (
              <div className="main-task">
                <p onClick={() => selectFinish(val.id, true)}>{val.task}</p>
              </div>
            );
          } else {
            return (
              <p
                onClick={() => selectFinish(val.id, false)}
                style={{ textDecoration: "line-through" }}
              >
                {val.task}
              </p>
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
