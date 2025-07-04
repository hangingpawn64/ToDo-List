import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header"
import Time from "./components/time";
import { Mic, SquarePen, Trash2 } from "lucide-react";

import { v4 as uuidv4 } from "uuid";
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [listening, setListening] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);


  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
   
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  const handleAdd = () => {
    if (todo.trim() === "") {
      return;
    }
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");

  };

  const handleDelete = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    console.log(newTodos);

  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);

  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    console.log(newTodos);

  };

  // speech
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  const startListening = () => {
    setListening(true);
    recognition.start();
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("Heard:", transcript);
    setTodo(transcript); // Autofill input with voice
    setListening(false);
  };

  recognition.onerror = (event) => {
    console.error("Speech Recognition Error:", event.error);
    setListening(false);
  };

  return (
    <>
      {<Header />}
      {
        <div className="container flex flex-col items-center justify-center min-h-screen w-[90vw] max-w-[90vw] sm:w-full mx-auto sm:p-6 md:p-8 lg:p-10 bg-transparent">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 text-center">You Got This</div>

          <div className="relative group flex flex-col items-center w-full max-w-full">
            {/* Hide blur/hover on mobile */}
            <div className="hidden sm:block absolute -inset-0.5 rounded-3xl bg-blue-700/0 group-hover:bg-blue-700/20 blur-md transition-all duration-300 -z-10"></div>
            <div className="addTodo flex flex-col sm:flex-row items-center w-full max-w-2xs sm:max-w-lg md:max-w-xl mx-auto mb-4 gap-2 sm:gap-0">
              <div className="relative w-full max-w-full">
                <input
                  onChange={handleChange}
                  value={todo}
                  className="commit px-4 py-3 sm:py-4 rounded-3xl border-transparent focus:border-gray-300 focus:border transition-all duration-100 text-white w-full bg-[#2b6894] text-base sm:text-lg md:text-xl placeholder:text-gray-200"
                  type="text"
                  placeholder="Commit a task..."
                />
                {/* speech */}
                <button
                  onClick={startListening}
                  className={`micButton absolute right-3 top-1/2 -translate-y-1/2 text-white px-2 py-2 rounded-full bg-blue-700/80 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-100 ${listening ? "opacity-50" : ""}`}
                  disabled={listening}
                  tabIndex={-1}
                  style={{ zIndex: 10 }}
                >
                  <Mic className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 cursor-pointer" />
                  {listening ? "..." : ""}
                </button>
                {/* /speech */}
              </div>
              <button
                onClick={handleAdd}
                className="addButton bg-blue-700 text-white py-3 sm:py-4 rounded-3xl mt-2 sm:mt-0 sm:ml-2 border border-white focus:border-white focus:border transition-all duration-100 cursor-pointer text-base sm:text-lg md:text-xl min-w-full sm:min-w-[8rem] md:min-w-[10rem]"
              >
                I Got This!
              </button>
            </div>
          </div>
          <div className="time text-white flex justify-center p-2 sm:p-3 text-base sm:text-lg md:text-xl">
            <Time />
          </div>
          <div className="todos flex flex-col rounded-3xl w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-[#2b6894] mt-2 sm:mt-4 p-2 sm:p-4">
            {todos.length === 0 && (
              <div className="notodos m-5 w-full text-center text-base sm:text-lg md:text-xl font-extralight opacity-70">
                Add Shit to do!
              </div>
            )}
            {todos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="todo flex items-center justify-between p-2 sm:p-3 text-white text-base sm:text-lg md:text-2xl my-1 sm:my-2 border-b border-[#0d2e3f] last:border-b-0"
                >
                  <input
                    className="checkbox w-6 h-6 sm:w-7 sm:h-7 ml-2 mr-2 sm:ml-4 sm:mr-4 cursor-pointer bg-[#0d2e3f] border-2 border-[#3A6073] rounded-full appearance-none checked:bg-[#0d2e3f] checked:border-[#3A6073] relative"
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    id=""
                  />
                  <div className={item.isCompleted ? "line-through opacity-50 flex-1" : "flex-1"}>
                    {item.todo}
                  </div>
                  <div className="flex buttons h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="editbtn p-2 py-1 text-xs sm:text-sm font-bold text-white rounded-md mx-1 cursor-pointer bg-[#133045dd]"
                    >
                      <SquarePen />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="dltbtn p-2 py-1 text-xs sm:text-sm font-bold text-white rounded-md mx-1 cursor-pointer bg-[#133045dd]"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      }
    </>
  );
}

export default App;
