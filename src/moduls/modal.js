import { LitElement, css, html } from 'lit'
import "bootstrap/dist/css/bootstrap.min.css";
import "./materias-primas.js";
import "./eficiencia.js"

export class MyElement extends LitElement {
  static get properties() {
    return {

    }
  }

  constructor() {
    super()
  
  }

  render() {
    return html`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vite + Lit</title>
        <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="./src/index.css">
        <script type="module" src="/app.js"></script>
        <!-- Agrega el script de Bootstrap desde un CDN -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>

        <button id="openAddModalBtn" class="btn btn-primary">Agregar Materia Prima</button>
        <button id="openEditModalBtn" class="btn btn-secondary">Editar Materia Prima</button>
        <button id="deleteBtn" class="btn btn-danger">Eliminar Materia Prima</button>

        <!-- Modal para agregar materia prima -->
        <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addModalLabel"> Materia Prima</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <materia-prima></materia-prima>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal para editar materia prima -->
        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel"> Materia Prima</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <materia-prima></materia-prima>
                    </div>
                </div>
            </div>
        </div>

        <script>
            document.addEventListener("DOMContentLoaded", function() {
                console.log("dasdadasdadasd")
                const openAddModalBtn = document.getElementById('openAddModalBtn');
                const addModal = new bootstrap.Modal(document.getElementById('addModal'));
                openAddModalBtn.addEventListener('click', () => {
                    const addMateriaPrima = document.querySelector('#addModal materia-prima');
                    addMateriaPrima.resetForm();
                    addModal.show();
                });

                const openEditModalBtn = document.getElementById('openEditModalBtn');
                const editModal = new bootstrap.Modal(document.getElementById('editModal'));
                openEditModalBtn.addEventListener('click', async () => {
                    console.log("dasdadasdadasd")
                    const editMateriaPrima = document.querySelector('#editModal materia-prima');
                    await editMateriaPrima.handleEdit();
                    if (editMateriaPrima.editMode) {
                        editModal.show();
                    }
                });

                const deleteBtn = document.getElementById('deleteBtn');
                deleteBtn.addEventListener('click', async () => {
                    const deleteMateriaPrima = document.querySelector('#editModal materia-prima');
                    await deleteMateriaPrima.handleDelete();
                });
            });
        </script>
    </body>
    </html>
    
    `
  }

  _onClick() {
    this.count++
  }

  static get styles() {
    return css`
    
  
    `
  }
}

window.customElements.define('mi-element', MyElement)
