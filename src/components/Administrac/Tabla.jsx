// src/components/Administrac/Tabla.js
import React from 'react';
import { useParams, Link } from 'react-router-dom'; 
import swal from 'sweetalert';
import NavAdmi from './NavAdmi';
import { FiPlusCircle } from 'react-icons/fi';

const Tabla = () => {
    const { tipo } = useParams();

    const headers = {
        ambulancia: ["AmbulanciaID", "PatenteID", "Inventario", "VTV", "Seguro", "Paramedico", "Chofer"],
        reporte: ["ReporteID", "AccidenteID"],
        chofer: ["ChoferID", "Nombre Completo", "DNI"],
        paramedico: ["ParamedicoID", "Nombre Completo", "DNI"]
    };

    // Datos de ejemplo
    const data = {
        ambulancia: [
            { ambulanciaID: 1, patente: "ABC123", inventario: true, vtv: true, seguro: true, paramedico: "Juan Pérez", chofer: "Carlos López" },
        ],
        reporte: [
            { reporteID: 1, accidenteID: "A001" },
        ],
        chofer: [
            { choferID: 1, nombreCompleto: "Carlos López", dni: "12345678" },
        ],
        paramedico: [
            { paramedicoID: 1, nombreCompleto: "Juan Pérez", dni: "87654321" },
        ],
    };

    const handleOnClick = () => {
        swal({
            title: '¿Está seguro que desea eliminarlo?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                swal('Se ha eliminado de manera correcta', {
                    icon: 'success',
                });
            } else {
                swal('Operación cancelada');
            }
        });
    };

    const renderTable = (data, headers) => (
        <table className="min-w-full divide-y divide-gray-500">
            <thead className="bg-gray-50">
                <tr className="h-8">
                    {headers.map((header, index) => (
                        <th key={index} className="text-center text-sm font-medium tracking-wider text-gray-500">
                            {header}
                        </th>
                    ))}
                    <th className="text-center text-sm font-medium tracking-wider text-gray-500">Acciones</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((item, rowIndex) => (
                    <tr key={rowIndex} className="h-12">
                        {Object.keys(item).map((key, index) => (
                            <td key={index} className="text-center text-sm text-gray-500">
                                {typeof item[key] === 'boolean' ? (item[key] ? 'TRUE' : 'FALSE') : item[key]}
                            </td>
                        ))}
                        <td className="text-center">
                            <button onClick={handleOnClick} className="mr-4 text-red-600 hover:text-red-900">Eliminar</button>
                            <button className="mr-4 text-red-600 hover:text-red-900">Modificar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    // Definir la ruta del botón según el tipo
    const altaRoute = () => {
        switch (tipo) {
            case 'ambulancia':
                return '/alta';
            case 'reporte':
                return '/alta-reporte';
            case 'chofer':
                return '/alta-chofer';
            case 'paramedico':
                return '/alta-paramedico';
            default:
                return '/'; // Ruta por defecto si no coincide con ningún tipo
        }
    };

    return (
        <div>
            <NavAdmi />

            <div>
                <div className="m-8 flex justify-end">
                    <Link to={altaRoute()}>
                        <FiPlusCircle color="red" size="40" />
                    </Link>
                </div>
                <h2 className="m-10 text-2xl">Gestión de Datos</h2>
                <div className="m-8 border-4 border-red-600">
                    {renderTable(data[tipo], headers[tipo])}
                </div>
            </div>
        </div>
    );
};

export default Tabla;
