import { useEffect, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ListaActividades from "./components/ListaActividades"
function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState)
  useEffect(() => {
    localStorage.setItem('actividades', JSON.stringify(state.activities))
  }, [state.activities])
  return (
    <>
      <header className="bg-blue-800 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de calorias
          </h1>
          <button>
            Reiniciar
          </button>
        </div>
      </header>
      <section className="bg-blue-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ListaActividades
          actividad={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}
export default App