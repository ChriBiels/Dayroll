import axios from "axios";
import { useState, useEffect } from "react";

const URI = 'http://localhost:8200/stats'

const MostrarStats = () =>{
    const [stats, setStats] = useState([])
    useEffect( () =>{
        getStats()
    }, [])

    //mostrar todas las estadísticas
    const getStats = async  () => {
       const res = await axios.get(URI)
       setStats(res.data)
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col"></div>
                <table className='table'>
                    <thead className="table-primary">
                        <tr>
                            <th>Genero</th>
                            <th>Estado</th>
                            <th>Peso</th>
                            <th>Altura</th>
                            <th>Intolerancia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map ( (estadisticas) => (
                            <tr key={estadisticas.id}>
                                <td>{ estadisticas.genero }</td>
                                <td>{ estadisticas.estado }</td>
                                <td>{ estadisticas.peso }</td>
                                <td>{ estadisticas.altura }</td>
                                <td>{ estadisticas.intolerancia }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MostrarStats