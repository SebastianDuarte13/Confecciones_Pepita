import { LitElement, css, html } from 'lit';

// Importa Bootstrap JS (Necesario para el funcionamiento del modal)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export class empleados extends LitElement {
    static properties = {
        nombreempleado: { type: String },
        salariohora: { type: Number },
        horastrabajadas: { type: Number },
        beneficiosprest: { type: Number },
        otroscostos: { type: Number },
    };

    constructor() {
        super();
        this.nombreempleado = '';
        this.salariohora = 0;
        this.horastrabajadas = 0;
        this.beneficiosprest = 0;
        this.otroscostos = 0;
    }

    async saveToJson(data) {
        try {
            const response = await fetch('https://665a2bb9003609eda45d4228.mockapi.io/empleados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Error guardando los datos');
            }
            alert('¡Registro exitoso!');
            window.history.back(); // Retorna al usuario atrás
        } catch (error) {
            console.error('Error:', error);
        }
    }

    handleSubmit(event) {
        event.preventDefault(); // Evita que el formulario se envíe por defecto

        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        this.saveToJson(data);
    }

    handleInputChange(event) {
        const target = event.target;
        this[target.name] = target.type === 'number' ? Number(target.value) : target.value;
    }

    render() {
        return html`
            <div class="container">
                <form @submit="${this.handleSubmit}">
                    <div class="form-group">
                        <label for="nombreempleado">Nombre del empleado</label>
                        <input id="nombreempleado" name="nombreempleado" type="text" class="form-control" .value="${this.nombreempleado}" @input="${this.handleInputChange}" required>
                    </div>
                    <div class="form-group">
                        <label for="salariohora">Salario por hora</label>
                        <input id="salariohora" name="salariohora" type="number" class="form-control" .value="${this.salariohora}" @input="${this.handleInputChange}" required>
                    </div>
                    <div class="form-group">
                        <label for="horastrabajadas">Horas trabajadas</label>
                        <input id="horastrabajadas" name="horastrabajadas" type="number" class="form-control" .value="${this.horastrabajadas}" @input="${this.handleInputChange}" required>
                    </div>
                    <div class="form-group">
                        <label for="beneficiosprest">Beneficios/Prestaciones</label>
                        <input id="beneficiosprest" name="beneficiosprest" type="number" class="form-control" .value="${this.beneficiosprest}" @input="${this.handleInputChange}" required>
                    </div>
                    <div class="form-group">
                        <label for="otroscostos">Otros Costos</label>
                        <input id="otroscostos" name="otroscostos" type="number" class="form-control" .value="${this.otroscostos}" @input="${this.handleInputChange}" required>
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

window.customElements.define('empleados-element', empleados);
