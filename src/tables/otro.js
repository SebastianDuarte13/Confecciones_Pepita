import { LitElement, css, html } from 'lit';
import "bootstrap/dist/css/bootstrap.min.css";
import "../moduls/empleados"

export class otro extends LitElement {
    static get properties() {
        return {
            data: { type: Array } 
        };
    }

    constructor() {
        super();
        this.data = []; 
        this.fetchData();
    }

    async fetchData() {
        try {
            const response = await fetch('https://6658c1ab5c3617052649bc5a.mockapi.io/eficiencia');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.data = data; 
        } catch (error) {
            console.error('There was a problem fetching the data:', error);
        }
    }

    render() {
        return html`
            <table class="table-table-dark-table-borderless">
                <thead>
                    <tr>
                        <th>Nombre del producto</th>
                        <th>productividad</th>
                        <th>Costo Operativo por Unidad</th>
                        <th>Tasa de Defectos</th>
                        <th>Produccion efectiva </th>
                        <th>Eficiencia operativa</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.data.map(item => html`
                        <tr>
                            <td>${item.nombreproducto}</td>
                            <td>${item.Productividad}</td>
                            <td>${item.costounidad}</td>
                            <td>${item.tasadefectos}</td>
                            <td>${item.produccionefectiva}</td>
                            <td>${item.eficienciaoperativa}</td>
                        </tr>
                    `)}
                </tbody>
            </table>
        `;
    }

    static get styles() {
        return css`
        .table-table-dark-table-borderless {
            
            z-index:4;
            background-color: black; /* Color de fondo */
            color: black; /* Color del texto */
            padding: 10px; /* Espaciado interno */
            border: 1px solid black; /* Borde */
            border-radius: 20px; /* Curvatura del borde */
            border-collapse: separate;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
            z-index:4;
        }
        td, th {
            border: 1px solid #ccc;
            padding: 8px;
            background-color: white;
            z-index:4;
        }
        `;
    }
}

window.customElements.define('table-otro', otro);