import { LitElement, css, html } from 'lit';
import "bootstrap/dist/css/bootstrap.min.css";

export class Costos extends LitElement {
    static properties = {
        alquiler_local: { type: Number },
        servicios_publicos: { type: Number },
        mantenimiento_maquinaria: { type: Number },
        equipo_de_proteccion_personal: { type: Number },
        formacion_y_capacitacion: { type: Number },
        seguros: { type: Number },
        gastos_oficina: { type: Number },
        transporte_y_logistica: { type: Number },
        licencias_y_permisos: { type: Number },
        servicios_de_limpieza: { type: Number },
    };

    constructor() {
        super();
        this.resetForm();
        this.editMode = false;
    }

    async handleSubmit(e) {
        e.preventDefault();
        const data = {
            alquiler_local: this.alquiler_local,
            servicios_publicos: this.servicios_publicos,
            mantenimiento_maquinaria: this.mantenimiento_maquinaria,
            equipo_de_proteccion_personal: this.equipo_de_proteccion_personal,
            formacion_y_capacitacion: this.formacion_y_capacitacion,
            seguros: this.seguros,
            gastos_oficina: this.gastos_oficina,
            transporte_y_logistica: this.transporte_y_logistica,
            licencias_y_permisos: this.licencias_y_permisos,
            servicios_de_limpieza: this.servicios_de_limpieza,
        };

        try {
            if (this.editMode) {
                // Implementa la actualización
                alert('Los costos fueron actualizados exitosamente!');
            } else {
                await this.saveToJson(data);
                alert('Los costos fueron guardados exitosamente!');
            }
            this.resetForm();
        } catch (error) {
            alert('Error guardando los datos: ' + error.message);
        }
    }

    async saveToJson(data) {
        const response = await fetch('https://665a86c6003609eda45e20f0.mockapi.io/costosindirectos', {
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

    resetForm() {
        this.alquiler_local = 0;     
        this.servicios_publicos = 0;
        this.mantenimiento_maquinaria = 0;
        this.equipo_de_proteccion_personal = 0;
        this.formacion_y_capacitacion = 0;
        this.seguros = 0;
        this.gastos_oficina = 0;
        this.transporte_y_logistica = 0;
        this.licencias_y_permisos = 0;
        this.servicios_de_limpieza = 0;
    }

    render() {
        return html`
            <div class="container">
                <h2>${this.editMode ? 'Editar' : 'Ingresar'}</h2>
                <form @submit="${this.handleSubmit}">
                    <div class="form-group">
                        <label for="alquiler_local">Alquiler local</label>
                        <input type="text" id="alquiler_local" .value="${this.alquiler_local}" @input="${e => this.alquiler_local = e.target.value}" class="form-control" required ?disabled="${this.editMode}">
                    </div>
                    <div class="form-group">
                        <label for="servicios_publicos">Servicios públicos</label>
                        <input type="text" id="servicios_publicos" .value="${this.servicios_publicos}" @input="${e => this.servicios_publicos = e.target.value}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="mantenimiento_maquinaria">Mantenimiento de maquinaria</label>
                        <input type="text" id="mantenimiento_maquinaria" .value="${this.mantenimiento_maquinaria}" @input="${e => this.mantenimiento_maquinaria = e.target.value}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="equipo_de_proteccion_personal">Equipo de protección personal</label>
                        <input type="text" id="equipo_de_proteccion_personal" .value="${this.equipo_de_proteccion_personal}" @input="${e => this.equipo_de_proteccion_personal = e.target.value}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="formacion_y_capacitacion">Formación y capacitación</label>
                        <input type="number" id="formacion_y_capacitacion" .value="${this.formacion_y_capacitacion}" @input="${e => this.formacion_y_capacitacion = e.target.value}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="seguros">Seguros</label>
                        <input type="text" id="seguros" .value="${this.seguros}" @input="${e => this.seguros = e.target.value}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="gastos_oficina">Gastos de oficina</label>
                        <input type="number" id="gastos_oficina" .value="${this.gastos_oficina}" @input="${e => this.gastos_oficina = e.target.value}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="transporte_y_logistica">Transporte y logística</label>
                        <input type="text" id="transporte_y_logistica" .value="${this.transporte_y_logistica}" @input="${e => this.transporte_y_logistica = e.target.value}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="licencias_y_permisos">Licencias y permisos</label>
                        <input type="text" id="licencias_y_permisos" .value="${this.licencias_y_permisos}" @input="${e => this.licencias_y_permisos = e.target.value}" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="servicios_de_limpieza">Servicios de limpieza</label>
                        <input type="text" id="servicios_de_limpieza" .value="${this.servicios_de_limpieza}" @input="${e => this.servicios_de_limpieza = e.target.value}" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn-primary">${this.editMode ? 'Actualizar' : 'Guardar'}</button>
                </form>
            </div>
        `;
    }

    static get styles() {
        return css`
            .container {
                padding: 1rem;
            }
        `;
    }
}

window.customElements.define('costos-indirectos', Costos);
