import { LitElement, css, html } from 'lit';
import "bootstrap/dist/css/bootstrap.min.css";

export class MateriaPrima extends LitElement {
    static properties = {
        nombre: { type: String },
        descripcion: { type: String },
        categoria: { type: String },
        proveedor: { type: String },
        costounidad: { type: Number },
        unidadmedida: { type: String },
        cantidadstock: { type: Number },
        fechaadquisicion: { type: String },
        fechavencimiento: { type: String },
        ubicacionalmacen: { type: String },
        notas: { type: String }
    };

    constructor() {
        super();
        this.resetForm();
    }

    async handleSubmit(e) {
        e.preventDefault();
        const materiaPrima = {
            nombre: this.nombre,
            descripcion: this.descripcion,
            categoria: this.categoria,
            proveedor: this.proveedor,
            costounidad: this.costounidad,
            unidadmedida: this.unidadmedida,
            cantidadstock: this.cantidadstock,
            fechaadquisicion: this.fechaadquisicion,
            fechavencimiento: this.fechavencimiento,
            ubicacionalmacen: this.ubicacionalmacen,
            notas: this.notas,
        };
        try {
            await this.saveToJson(materiaPrima);
            alert('Materia Prima guardada exitosamente!');
            this.resetForm();
        } catch (error) {
            alert('Error guardando los datos: ' + error.message);
        }
    }

    async saveToJson(data) {
        const response = await fetch('https://6658c1ab5c3617052649bc5a.mockapi.io/materias-primas', {
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
        this.nombre = '';
        this.descripcion = '';
        this.categoria = '';
        this.proveedor = '';
        this.costounidad = 0;
        this.unidadmedida = '';
        this.cantidadstock = 0;
        this.fechaadquisicion = '';
        this.fechavencimiento = '';
        this.ubicacionalmacen = '';
        this.notas = '';
    }

    render() {
        return html`
            <div class="container">
                <h2>Ingresar Materia Prima</h2>
                <form @submit="${this.handleSubmit}">
                    <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <input type="text" id="nombre" .value="${this.nombre}" @input="${e => this.nombre = e.target.value}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="descripcion">Descripción</label>
                        <input type="text" id="descripcion" .value="${this.descripcion}" @input="${e => this.descripcion = e.target.value}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="categoria">Categoría</label>
                        <input type="text" id="categoria" .value="${this.categoria}" @input="${e => this.categoria = e.target.value}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="proveedor">Proveedor</label>
                        <input type="text" id="proveedor" .value="${this.proveedor}" @input="${e => this.proveedor = e.target.value}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="costounidad">Costo Unidad</label>
                        <input type="number" id="costounidad" .value="${this.costounidad}" @input="${e => this.costounidad = e.target.value}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="unidadmedida">Unidad Medida</label>
                        <input type="text" id="unidadmedida" .value="${this.unidadmedida}" @input="${e => this.unidadmedida = e.target.value}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="cantidadstock">Cantidad Stock</label>
                        <input type="number" id="cantidadstock" .value="${this.cantidadstock}" @input="${e => this.cantidadstock = e.target.value}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="fechaadquisicion">Fecha Adquisición</label>
                        <input type="date" id="fechaadquisicion" .value="${this.fechaadquisicion}" @input="${e => this.fechaadquisicion = e.target.value}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="fechavencimiento">Fecha Vencimiento</label>
                        <input type="date" id="fechavencimiento" .value="${this.fechavencimiento}" @input="${e => this.fechavencimiento = e.target.value}" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="ubicacionalmacen">Ubicación Almacén</label>
                        <input type="text" id="ubicacionalmacen" .value="${this.ubicacionalmacen}" @input="${e => this.ubicacionalmacen = e.target.value}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="notas">Notas</label>
                        <textarea id="notas" .value="${this.notas}" @input="${e => this.notas = e.target.value}" class="form-control"></textarea>
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
        `;
    }
}

window.customElements.define('materia-prima', MateriaPrima);
