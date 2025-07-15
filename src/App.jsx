import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Time from "./components/time";
import { Mic, SquarePen, Trash2 } from "lucide-react";

import { v4 as uuidv4 } from "uuid";
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [listening, setListening] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const [addClicked, setAddClicked] = useState(false);

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

  const handleAdd = () => {
    if (todo.trim() === "") {
      return;
    }
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    setAddClicked(true);
    setTimeout(() => setAddClicked(false), 200);
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

  const visibleTodos = todos.filter(
    (item) => showCompleted || !item.isCompleted
  );

  return (
    <>
      {<Header />}
      {
        <div className="container flex flex-col items-center justify-start min-h-screen w-full max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 bg-transparent overflow-x-hidden">
          <div className="title text-3xl pb-4 sm:pb-6 md:pb-8 sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 md:mb-6 text-center">
            You Got This
          </div>

          <div className="relative group flex flex-col items-center w-full max-w-full">
            <div className="addTodo flex flex-col sm:flex-row items-center w-full max-w-[95%] sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto mb-4 gap-2 sm:gap-0">
              <div className="relative w-full max-w-full">
                <input
                  onChange={handleChange}
                  value={todo}
                  className="commit px-3 py-2 sm:py-3 md:py-4 rounded-3xl border-transparent focus:border-gray-300 focus:border transition-all duration-100 text-white w-full bg-[#2b6894] text-sm sm:text-base md:text-lg lg:text-xl placeholder:text-gray-200"
                  type="text"
                  placeholder="Commit a task..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAdd();
                  }}
                />
                {/* speech */}
                <button
                  onClick={startListening}
                  className={`micButton absolute right-8 top-1/2 -translate-y-1/2 text-white px-1 sm:px-2 py-1 sm:py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-100 ${
                    listening ? "opacity-50" : ""
                  }`}
                  disabled={listening}
                  tabIndex={-1}
                  style={{ zIndex: 10 }}
                >
                  <Mic className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 cursor-pointer" />
                  {listening ? "..." : ""}
                </button>
                {/* /speech */}
              </div>
              <button
                onClick={handleAdd}
                className={`addButton bg-blue-700 text-white py-2 sm:py-3 md:py-4 rounded-3xl mt-2 sm:mt-0 sm:ml-2 border border-white focus:border-white focus:border transition-all duration-100 cursor-pointer text-sm sm:text-base md:text-lg lg:text-xl min-w-full sm:min-w-[6rem] md:min-w-[8rem] lg:min-w-[10rem] ${addClicked ? 'ring-1 ring-blue-950 scale-103' : ''}`}
              >
                I Got This!
              </button>
            </div>
          </div>
          <div className="time w-full flex flex-col sm:flex-row items-center justify-center sm:gap-6 md:gap-8 lg:gap-12 text-white p-2 sm:p-3 text-xs sm:text-sm md:text-base lg:text-lg">
            <Time />
            <label className="showCompleted flex items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base cursor-pointer select-none pl-2 sm:pl-3 my-2 sm:my-0">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={() => setShowCompleted((prev) => !prev)}
                className="checkbox mr-1 sm:mr-2"
              />
              Show Completed
            </label>
            <button
              onClick={() => setTodos([])}
              className="clearbtn text-white text-xs sm:text-sm md:text-base font-semibold transition-all duration-100 my-2 sm:my-0"
            >
              Clear All
            </button>
          </div>
          <div className="todos flex flex-col rounded-3xl w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-[#2b6894] mt-2 sm:mt-4 p-2 sm:p-3 md:p-4">
            {visibleTodos.length === 0 && (
              <div className="notodos m-3 sm:m-4 md:m-5 w-full text-center text-sm sm:text-base md:text-lg lg:text-xl font-extralight opacity-70">
                Add Shit to do!
              </div>
            )}
            {visibleTodos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="todo flex items-center justify-between p-1 sm:p-2 md:p-3 text-white text-xs sm:text-sm md:text-base lg:text-lg my-1 sm:my-2 border-b border-[#0d2e3f] last:border-b-0"
                >
                  <input
                    className="checkbox w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 ml-1 mr-1 sm:ml-2 sm:mr-2 md:ml-3 md:mr-3 cursor-pointer bg-[#0d2e3f] border-2 border-[#3A6073] rounded-full appearance-none checked:bg-[#0d2e3f] checked:border-[#3A6073] relative"
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    id=""
                  />
                  <div
                    className={`${item.isCompleted ? "line-through opacity-50 flex-1" : "flex-1"} break-words overflow-hidden`}
                  >
                    {item.todo}
                  </div>
                  <div className="flex buttons h-full ml-2">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="editbtn p-1 sm:p-1.5 md:p-2 text-xs sm:text-sm font-bold text-white rounded-md mx-0.5 sm:mx-1 cursor-pointer bg-[#133045dd]"
                    >
                      <SquarePen className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="dltbtn p-1 sm:p-1.5 md:p-2 text-xs sm:text-sm font-bold text-white rounded-md mx-0.5 sm:mx-1 cursor-pointer bg-[#133045dd]"
                    >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
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
