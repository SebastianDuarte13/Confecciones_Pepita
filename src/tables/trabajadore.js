import { LitElement, css, html } from 'lit';
import "bootstrap/dist/css/bootstrap.min.css";
import "../moduls/empleados"

export class tableempleados extends LitElement {
    static get properties() {
        return {
            data: { type: Array } // Propiedad para almacenar los datos de la API
        };
    }

    constructor() {
        super();
        this.data = []; // Inicializa la propiedad de datos como un array vacío
        this.fetchData(); // Llama a la función para obtener los datos de la API cuando se crea la instancia de la clase
    }

    async fetchData() {
        try {
            const response = await fetch('https://665a2bb9003609eda45d4228.mockapi.io/empleados');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.data = data; // Asigna los datos obtenidos de la API a la propiedad 'data'
        } catch (error) {
            console.error('There was a problem fetching the data:', error);
        }
    }

    render() {
        return html`
            <table class="table-table-dark-table-borderless">
                <thead>
                    <tr>
                        <th>Nombre del empleado</th>
                        <th>salario por horas </th>
                        <th>total </th>
                    </tr>
                </thead>
                <tbody>
                    ${this.data.map(item => html`
                        <tr>
                            <td>${item.nombreempleado}</td>
                            <td>${item.salariohora}</td>
                            <td>${item.total}</td>
                        </tr>
                    `)}
                </tbody>
            </table>
        `;
    }

    static get styles() {
        return css`
        .table-table-dark-table-borderless {
            background-color: black; /* Color de fondo */
            color: black; /* Color del texto */
            padding: 10px; /* Espaciado interno */
            border: 1px solid black; /* Borde */
            border-radius: 20px; /* Curvatura del borde */
            border-collapse: separate;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        td, th {
            border: 1px solid #ccc;
            padding: 8px;
            background-color: white;
        }
        `;
    }
}

window.customElements.define('table-empleados', tableempleados);

