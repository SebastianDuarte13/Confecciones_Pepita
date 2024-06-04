import { LitElement, css, html } from 'lit';
import "bootstrap/dist/css/bootstrap.min.css";

export class Costos extends LitElement {
    static properties = {
        nombrelote: { type: String },
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
        costostotales: { type: Number },
        //----------------------------------
        cantidadproductos: { type: Number },
        cantidadmaterip: { type: Number },
        valorpormaeria: { type: Number },
        horasmanoobreadrirecta: { type: Number },
        salariohora: { type: Number },
        baseasignacion: { type: Number },
        costomplote: { type: Number },
        costomolote: { type: Number },
        tasaasignacioncososindirectos: { type: Number },
        costoindiasigcostoindirectos: { type: Number },
        costototaldeproduccion: { type: Number },
    };

    constructor() {
        super();
        this.resetForm();
        this.editMode = false;
    }

    async handleSubmit(e) {
        e.preventDefault();
        // Convertir todas las propiedades a números
        this.alquiler_local = Number(this.alquiler_local);
        this.servicios_publicos = Number(this.servicios_publicos);
        this.mantenimiento_maquinaria = Number(this.mantenimiento_maquinaria);
        this.equipo_de_proteccion_personal = Number(this.equipo_de_proteccion_personal);
        this.formacion_y_capacitacion = Number(this.formacion_y_capacitacion);
        this.seguros = Number(this.seguros);
        this.gastos_oficina = Number(this.gastos_oficina);
        this.transporte_y_logistica = Number(this.transporte_y_logistica);
        this.licencias_y_permisos = Number(this.licencias_y_permisos);
        this.servicios_de_limpieza = Number(this.servicios_de_limpieza);

        // Sumar todos los costos
        this.costostotales = this.alquiler_local +
                             this.servicios_publicos +
                             this.mantenimiento_maquinaria +
                             this.equipo_de_proteccion_personal +
                             this.formacion_y_capacitacion +
                             this.seguros +
                             this.gastos_oficina +
                             this.transporte_y_logistica +
                             this.licencias_y_permisos +
                             this.servicios_de_limpieza;

        const data = {
            nombrelote: this.nombrelote,
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
            costostotales: this.costostotales, // Enviar el valor actualizado de costostotales
            //---------------------------------
            cantidadproductos: this.cantidadproductos,
            cantidadmaterip: this.cantidadmaterip,
            valorpormaeria: this.valorpormaeria,
            horasmanoobreadrirecta: this.horasmanoobreadrirecta,
            salariohora: this.salariohora,
            baseasignacion: this.baseasignacion,
            costomplote: this.costomplote,
            costomolote: this.costomolote,
            tasaasignacioncososindirectos: this.tasaasignacioncososindirectos,
            costoindiasigcostoindirectos: this.costoindiasigcostoindirectos,
            costototaldeproduccion: this.costototaldeproduccion,
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
        const response = await fetch('https://665a2bb9003609eda45d4228.mockapi.io/lote', {
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
        this.nombrelote = '';
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
        //-------------------------
        this.costostotales = 0;
        this.cantidadproductos = 0;
        this.cantidadmaterip = 0;
        this.valorpormaeria = 0;
        this.horasmanoobreadrirecta = 0;
        this.salariohora = 0;
        this.baseasignacion = 0;
        this.costomplote = 0;
        this.costomolote = 0;
        this.tasaasignacioncososindirectos = 0;
        this.costoindiasigcostoindirectos = 0;
        this.costototaldeproduccion = 0;
    }

    render() {
        return html`
            <div class="container">
                <h2>${this.editMode ? 'Editar' : 'Ingresar'}</h2>
                <form @submit="${this.handleSubmit}">
                    <div class="form-group">
                        <label for="nombre_lote">Nombre del lote</label>
                        <input type="text" id="nombre_lote" .value="${this.nombrelote}" @input="${e => this.nombrelote= e.target.value}" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="alquiler_local">Alquiler local</label>
                            <input type="number" id="alquiler_local" .value="${this.alquiler_local}" @input="${e => this.alquiler_local = e.target.value}" class="form-control" required ?disabled="${this.editMode}">
                        </div>
                        <div class="form-group">
                            <label for="servicios_publicos">Servicios públicos</label>
                            <input type="number" id="servicios_publicos" .value="${this.servicios_publicos}" @input="${e => this.servicios_publicos = e.target.value}" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="mantenimiento_maquinaria">Mantenimiento de maquinaria</label>
                            <input type="number" id="mantenimiento_maquinaria" .value="${this.mantenimiento_maquinaria}" @input="${e => this.mantenimiento_maquinaria = e.target.value}" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="equipo_de_proteccion_personal">Equipo de protección personal</label>
                            <input type="number" id="equipo_de_proteccion_personal" .value="${this.equipo_de_proteccion_personal}" @input="${e => this.equipo_de_proteccion_personal = e.target.value}" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="formacion_y_capacitacion">Formación y capacitación</label>
                            <input type="number" id="formacion_y_capacitacion" .value="${this.formacion_y_capacitacion}" @input="${e => this.formacion_y_capacitacion = e.target.value}" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="seguros">Seguros</label>
                            <input type="number" id="seguros" .value="${this.seguros}" @input="${e => this.seguros = e.target.value}" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="gastos_oficina">Gastos de oficina</label>
                            <input type="number" id="gastos_oficina" .value="${this.gastos_oficina}" @input="${e => this.gastos_oficina = e.target.value}" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="transporte_y_logistica">Transporte y logística</label>
                            <input type="number" id="transporte_y_logistica" .value="${this.transporte_y_logistica}" @input="${e => this.transporte_y_logistica = e.target.value}" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="licencias_y_permisos">Licencias y permisos</label>
                            <input type="number" id="licencias_y_permisos" .value="${this.licencias_y_permisos}" @input="${e => this.licencias_y_permisos = e.target.value}" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="servicios_de_limpieza">Servicios de limpieza</label>
                            <input type="number" id="servicios_de_limpieza" .value="${this.servicios_de_limpieza}" @input="${e => this.servicios_de_limpieza = e.target.value}" class="form-control" required>
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
    
