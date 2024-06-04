import { LitElement, css, html } from 'lit';

export class LoteElement extends LitElement {
    static properties = {
        nombreLote: { type: String },
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
        this.nombreLote = '';
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
        this.handleEdit();
    }

    async handleEdit() {
        const nombre = prompt('Ingrese el nombre del lote:');
        if (!nombre) {
            alert('Debe ingresar un nombre.');
            return;
        }
        try {
            const lotes = await this.fetchLotes();
            const lote = lotes.find(l => l.nombrelote === nombre);
            if (!lote) {
                alert('El lote no existe.');
                window.history.back(); 
                return;
            }
            this.nombreLote = nombre;
            this.cantidadproductos = lote.cantidadproductos;
            this.cantidadmaterip = lote.cantidadmaterip;
            this.valorpormaeria = lote.valorpormaeria;
            this.horasmanoobreadrirecta = lote.horasmanoobreadrirecta;
            this.salariohora = lote.salariohora;
            this.baseasignacion = lote.baseasignacion;
            this.costomplote = lote.costomplote;
            this.costomolote = lote.costomolote;
            this.tasaasignacioncososindirectos = lote.tasaasignacioncososindirectos;
            this.costoindiasigcostoindirectos = lote.costoindiasigcostoindirectos;
            this.costototaldeproduccion = lote.costototaldeproduccion;
            this.mostrarFormulario();
        } catch (error) {
            alert('Error obteniendo los datos: ' + error.message);
        }
    }

    async fetchLotes() {
        const response = await fetch('https://665a2bb9003609eda45d4228.mockapi.io/lote');
        if (!response.ok) {
            throw new Error('Error obteniendo los datos');
        }
        const data = await response.json();
        return data;
    }

    mostrarFormulario() {
        console.log('Mostrando formulario...');
    }

    async saveToJson(data) {
        const lotes = await this.fetchLotes();
        const loteExistente = lotes.find(l => l.nombrelote === this.nombreLote);
        if (!loteExistente) {
            throw new Error('El lote no existe.');
        }
        const response = await fetch(`https://665a2bb9003609eda45d4228.mockapi.io/lote/${loteExistente.id}`, {
            method: 'PUT',
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
        this.costomplote = this.cantidadmaterip * this.valorpormaeria;
        this.costomolote = this.horasmanoobreadrirecta * this.salariohora;
        this.tasaasignacioncososindirectos = this.costototaldeproduccion / this.baseasignacion;
        this.costoindiasigcostoindirectos = this.tasaasignacioncososindirectos * this.cantidadproductos;
        this.costototaldeproduccion = this.costomplote + this.costomolote + this.costoindiasigcostoindirectos;
        const data = {
            cantidadproductos: Number(this.cantidadproductos),
            cantidadmaterip: Number(this.cantidadmaterip),
            valorpormaeria: Number(this.valorpormaeria),
            horasmanoobreadrirecta: Number(this.horasmanoobreadrirecta),
            salariohora: Number(this.salariohora),
            baseasignacion: Number(this.baseasignacion),
            costomplote: Number(this.costomplote),
            costomolote: Number(this.costomolote),
            tasaasignacioncososindirectos: Number(this.tasaasignacioncososindirectos),
            costoindiasigcostoindirectos: Number(this.costoindiasigcostoindirectos),
            costototaldeproduccion: Number(this.costototaldeproduccion),
        };
        this.saveToJson(data)
            .then(() => alert('Datos actualizados con éxito'))
            .catch(error => alert(`Error: ${error.message}`));
    }
    

    render() {
        return html`
            <div class="container">
                <form @submit="${this.handleSubmit}">
                    <div class="form-group">
                        <label for="Cantidadproductos">Cantidad productos terminado</label>
                        <input id="Cantidadproductos" name="cantidadproductos" type="number" class="form-control" .value="${this.cantidadproductos}" @input="${this.handleInputChange}" required>
                    </div>
                    <div class="form-group">
                    <label for="Cantidadmateriaprima">Cantidad materia prima</label>
                    <input id="Cantidadmateriaprima" name="cantidadmaterip" type="number" class="form-control" .value="${this.cantidadmaterip}" @input="${this.handleInputChange}" required>
                    </div>
                    <div class="form-group">
                        <label for="CostoPorunidadmateriaprima">Tiempo de Producción (horas)</label>
                        <input id="CostoPorunidadmateriaprima" name="valorpormaeria" type="number" class="form-control" .value="${this.valorpormaeria}" @input="${this.handleInputChange}" required>
                    </div>
                    <div class="form-group">
                        <label for="HorasdeManodeobra directa">Costo Operativo (pesos)</label>
                        <input id="HorasdeManodeobradirecta" name="horasmanoobreadrirecta" type="number" class="form-control" .value="${this.horasmanoobreadrirecta}" @input="${this.handleInputChange}" required>
                    </div>
                    <div class="form-group">
                        <label for="Salarioporhora">Salario por horas</label>
                        <input id="Salarioporhora" name="salariohora" type="number" class="form-control" .value="${this.salariohora}" @input="${this.handleInputChange}" required>
                    </div>
                    <div class="form-group">
                        <label for="Basedeasignacion">Base de asignacion</label>
                        <input id="Basedeasignacion" name="baseasignacion" type="number" class="form-control" .value="${this.baseasignacion}" @input="${this.handleInputChange}" required>
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

window.customElements.define('lote-element', LoteElement);

