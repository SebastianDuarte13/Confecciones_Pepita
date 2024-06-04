import { LitElement, css, html } from 'lit';
import "bootstrap/dist/css/bootstrap.min.css";
import "../moduls/lote"

export class table extends LitElement {
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
            const response = await fetch('https://665a2bb9003609eda45d4228.mockapi.io/lote');
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
            <table class="table table-dark table-borderless">
                <thead>
                    <tr>
                        <th>Nombre del lote</th>
                        <th>costo materia prima por lote </th>
                        <th>costo mano de obra por lote </th>
                        <th>Tasa asignación cosos indirectos</th>
                        <th>Costo indirecto asignado</th>
                        <th>Costo total de producción</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.data.map(item => html`
                        <tr>
                            <td>${item.nombrelote}</td>
                            <td>${item.costomplote}</td>
                            <td>${item.costomolote}</td>
                            <td>${item.tasaasignacioncososindirectos}</td>
                            <td>${item.costoindiasigcostoindirectos}</td>
                            <td>${item.costototaldeproduccion}</td>
                        </tr>
                    `)}
                </tbody>
            </table>
        `;
    }

    static get styles() {
        return css`
        
    ` }
}
