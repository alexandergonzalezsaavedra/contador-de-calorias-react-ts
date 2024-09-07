import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ListaActividades from "./components/ListaActividades"
import CalorieTracker from "./components/CalorieTracker"
function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState)
  useEffect(() => {
    localStorage.setItem('actividades', JSON.stringify(state.activities))
  }, [state.activities])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const restarApp = () => useMemo(() => state.activities.length
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [state.activities])
  return (
    <>
      <header className="bg-blue-800 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de calorias
          </h1>
          <button
            className="bg-gray-900 text-white cursor-pointer font-bold uppercase disabled:opacity-10 py-3 px-5 rounded-full"
            disabled={!restarApp()}
            onClick={() => dispatch({ type: 'restar-app' })}
          >
            Reiniciar App
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
      <section className="bg-slate-800 p-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker
            activities={state.activities}
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