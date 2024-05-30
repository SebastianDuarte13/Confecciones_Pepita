import { LitElement, css, html } from 'lit'
import "bootstrap/dist/css/bootstrap.min.css"


export class MateriaPrima extends LitElement {
    static get properties() {
      
    }
  
    constructor() {
      super()
      this.docsHint = ""
      this.count = 0
    }
  
    render() {
      return html`
      <form>
      hola
      
    </form>
    
      `
    }
  
    static get styles() {
      return css`
        
      `
    }
  }
  
  window.customElements.define('materia-prima', MateriaPrima)