import { LitElement, css, html } from 'lit'
import "bootstrap/dist/css/bootstrap.min.css"

export class MateriaPrima extends LitElement {
    static get properties() {
        return {
        name: { type: String },
        email: { type: String },
        };
    }
    
    constructor() {
        super();
        this.name = '';
        this.email = '';
    }
    
    handleInputChange(event) {
        const { name, value } = event.target;
        this[name] = value;
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const data = { name: this.name, email: this.email };
    
        try {
            const response = await fetch('/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    
        if (response.ok) {
            console.log('Data saved successfully');
        } else {
            console.error('Failed to save data');
        }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    render() {
        return html`
        
        <form @submit="${this.handleSubmit}">
            <div class="form-group">
            <label for="name">Name</label>
            <input 
                type="text" 
                id="name" 
                name="name" 
                class="form-control" 
                .value="${this.name}" 
                @input="${this.handleInputChange}" 
                required 
            />
            </div>
            <div class="form-group">
            <label for="email">Email</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                class="form-control" 
                .value="${this.email}" 
                @input="${this.handleInputChange}" 
                required 
            />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        
        `;
    }
    
    static get styles() {
        return css`
        .form-group {
            margin-bottom: 1rem;
        }
        .form-control {
            display: block;
            width: 100%;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        .btn {
            display: inline-block;
            font-weight: 400;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            user-select: none;
            border: 1px solid transparent;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: 0.25rem;
            color: #fff;
            background-color: #007bff;
            border-color: #007bff;
            cursor: pointer;
        }
        `;
    }
    }
    
window.customElements.define('materia-prima', MateriaPrima)