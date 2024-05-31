import { LitElement, css, html } from 'lit';
import "bootstrap/dist/css/bootstrap.min.css";

export class EficienciaElement extends LitElement {
    static properties = {
        nombreproducto: { type: String },
        productosterminado: { type: Number },
        tiempoproduccion: { type: Number },
        costooperativo: { type: Number },
        prendasdefectuosas: { type: Number },
        Productividad: { type: Number },
        costounidad: { type: Number },
        tasadefectos: { type: Number },
        produccionefectiva: { type: Number },
        eficienciaoperativa: { type: Number },
    };

    constructor() {
        super();
        this.nombreproducto = '';
        this.productosterminado = 0;
        this.tiempoproduccion = 0;
        this.costooperativo = 0;
        this.prendasdefectuosas = 0;
        this.Productividad = 0;
        this.costounidad = 0;
        this.tasadefectos = 0;
        this.produccionefectiva = 0;
        this.eficienciaoperativa = 0;
    }

    async saveToJson(data) {
        const response = await fetch('https://6658c1ab5c3617052649bc5a.mockapi.io/eficiencia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Error guardando los datos');
        }
    }

    handleInputChange(event) {
        const target = event.target;
        this[target.name] = target.type === 'number' ? Number(target.value) : target.value;
    }

    handleSubmit(event) {
        event.preventDefault();
        
        // Realizar cálculos
        this.Productividad = this.productosterminado / this.tiempoproduccion;
        this.costounidad = this.costooperativo / this.productosterminado;
        this.tasadefectos = (this.prendasdefectuosas / this.productosterminado)*100;
        this.produccionefectiva = this.productosterminado - this.prendasdefectuosas;
        this.eficienciaoperativa = this.produccionefectiva / this.costooperativo;

        const data = {
            nombreproducto: this.nombreproducto,
            productosterminado: this.productosterminado,
            tiempoproduccion: this.tiempoproduccion,
            costooperativo: this.costooperativo,
            prendasdefectuosas: this.prendasdefectuosas,
            Productividad: this.Productividad,
            costounidad: this.costounidad,
            tasadefectos: this.tasadefectos,
            produccionefectiva: this.produccionefectiva,
            eficienciaoperativa: this.eficienciaoperativa,
        };

        this.saveToJson(data)
            .then(() => alert('Datos guardados con éxito'))
            .catch(error => alert(`Error: ${error.message}`));
    }

    render() {
        return html`
            <div class="container">
                <form @submit="${this.handleSubmit}">
                    <div class="form-group">
                        <label for="nombreproducto">Nombre del producto terminado</label>
                        <input id="nombreproducto" name="nombreproducto" type="text" class="form-control" .value="${this.nombreproducto}" @input="${this.handleInputChange}" required>
                    </div>
                    <div class="form-group">
                        <label for="productosterminado">Cuantos fueron terminados</label>
                        <input id="productosterminado" name="productosterminado" type="number" class="form-control" .value="${this.productosterminado}" @input="${this.handleInputChange}" required>
                    </div>
                    <div class="form-group">
                        <label for="tiempoproduccion">Tiempo de Producción (horas)</label>
                        <input id="tiempoproduccion" name="tiempoproduccion" type="number" class="form-control" .value="${this.tiempoproduccion}" @input="${this.handleInputChange}" required>
                    </div>
                    <div class="form-group">
                        <label for="costooperativo">Costo Operativo (pesos)</label>
                        <input id="costooperativo" name="costooperativo" type="number" class="form-control" .value="${this.costooperativo}" @input="${this.handleInputChange}" required>
                    </div>
                    <div class="form-group">
                        <label for="prendasdefectuosas">Prendas Defectuosas</label>
                        <input id="prendasdefectuosas" name="prendasdefectuosas" type="number" class="form-control" .value="${this.prendasdefectuosas}" @input="${this.handleInputChange}" required>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </form>
            </div>
        `;
    }

    static get styles() {
        return css`
            .container {
                padding: 1rem;
            }
            .form-group {
                margin-bottom: 1rem;
            }
        `;
    }
}

window.customElements.define('eficiencia-element', EficienciaElement);
