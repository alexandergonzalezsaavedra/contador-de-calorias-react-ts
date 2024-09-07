import { useMemo, Dispatch } from 'react';
import { Actividad } from '../types/index';
import { categories } from '../data/categorias';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from '../reducers/activity-reducer';
type ListadoActividadesProps = {
    actividad: Actividad[]
    dispatch: Dispatch<ActivityActions>
}
const ListaActividades = ({ actividad, dispatch }: ListadoActividadesProps) => {
    const nombreCategoria = useMemo(() => (category: Actividad['categoria']) => categories.map(cat => cat.id === category ? cat.name : '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [actividad])
    const isEmptyActivities = useMemo(() => actividad.length === 0, [actividad])
    return (
        <div>
            <h2 className="text-4xl font-bold text-slate-600 text-center my-10">
                Comida y actividades
            </h2>
            {
                isEmptyActivities ? (
                    <p className='text-center'>
                        No hay actividades aún...
                    </p>
                )
                    :
                    actividad.map(item => (
                        <div key={item.id} className='px-5 py-10 bg-white mt-5 flex justify-between'>
                            <div className='space-y-2 relative'>
                                <p className={`absolute -top-8 -left-8 px-10 py-2 uppercase text-white font-bold ${item.categoria === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                                    {nombreCategoria(item.categoria)}
                                </p>
                                <p className='text-2xl font-bold pt-5'>
                                    {item.nombre}
                                </p>
                                <p className='font-black text-4xl text-blue-500'>
                                    {item.calorias} {''}
                                    <span>Calorias</span>
                                </p>
                            </div>
                            <div>
                                <div className="flex gap-5 items-center">
                                    <button
                                        onClick={() => dispatch({ type: "set-activity", payload: { id: item.id } })}
                                    >
                                        <PencilSquareIcon
                                            className='h-8 w-8 text-gray-500'
                                        />
                                    </button>
                                    <button
                                        onClick={() => dispatch({ type: "delete-activity", payload: { id: item.id } })}
                                    >
                                        <TrashIcon
                                            className='h-8 w-8 text-red-500'
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
            }
        </div>
    )
}
export default ListaActividades