import { useMemo } from "react"
import { Actividad } from "../types"
import CalorieDisplay from "./CalorieDisplay"
type CalorieTrackerProps = {
    activities: Actividad[]
}
const CalorieTracker = ({ activities }: CalorieTrackerProps) => {
    //contadores
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.categoria === 1 ? total + activity.calorias : total, 0), [activities])
    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.categoria === 2 ? total + activity.calorias : total, 0), [activities])
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesConsumed, caloriesBurned])
    return (
        <>
            <h2 className="text-4xl text-center text-white">
                Resumen de calorias
            </h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap -5 mt-10">
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                    color="text-orange-400"
                />

                <CalorieDisplay
                    calories={caloriesBurned}
                    text="Ejercicio"
                    color="text-indigo-300"
                />

                <CalorieDisplay
                    calories={netCalories}
                    text={netCalories <= 0 ? 'Debes ganar calorias' : 'Debes perder calorias'}
                    color={netCalories <= 0 ? 'text-white' : 'text-red-500'}
                />
            </div>
        </>
    )
}
export default CalorieTracker