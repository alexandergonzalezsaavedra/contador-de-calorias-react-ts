import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categorias"
import { Actividad } from "../types"
import { ActivityActions, ActivityState } from '../reducers/activity-reducer';
type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState

}
const initialState: Actividad = {
    id: uuidv4(),
    categoria: 1,
    nombre: "",
    calorias: 0,
}
const Form = ({ dispatch, state }: FormProps) => {

    const [actividad, setActividad] = useState<Actividad>(initialState)

    useEffect(() => {
        if (state.activeId) {
            console.log(state.activeId)
            const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActividad(selectActivity)
        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['categoria', 'calorias'].includes(e.target.id)
        setActividad({
            ...actividad,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }
    const isValidActivity = () => {
        const { nombre, calorias } = actividad
        return nombre.trim() !== '' && calorias > 0
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'save-activity', payload: { newActivity: actividad } })
        setActividad({
            ...initialState,
            id: uuidv4()
        })
    }
    return (
        <form
            className="space-y-5 bg-white shadow-sm p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="categoria" className="font-bold">Categoría</label>
                <select
                    className="border border-slate-300 px-5 py-2 rounded-full w-full bg-white"
                    name="categoria"
                    id="categoria"
                    value={actividad.categoria}
                    onChange={handleChange}
                >
                    <option value="">Seleccione una categoría</option>
                    {
                        categories.map(categoria => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="nombre" className="font-bold">Actividad</label>
                <input
                    className="border border-slate-300 px-5 py-2 rounded-full w-full bg-white"
                    type="text"
                    placeholder="Ej. Comida, jugo de naranja, ensalada, ejercicio, pesas, bicicleta"
                    name="nombre"
                    id="nombre"
                    value={actividad.nombre}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calorias" className="font-bold">Calorias</label>
                <input
                    className="border border-slate-300 px-5 py-2 rounded-full w-full bg-white"
                    type="number"
                    placeholder="Calorias. Ej. 300 o 500"
                    name="calorias"
                    id="calorias"
                    value={actividad.calorias}
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase cursor-pointer text-white rounded-full disabled:opacity-10"
                value={actividad.categoria === 1 ? 'Guardar comida' : 'Guardar ejercicio'}
                disabled={!isValidActivity()}
            />
        </form>
    )
}
export default Form