class MiFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 17/diciembre/2021
        Luis Fernando Jasso Tovar Arkness.
        
      </p>`;
  }
}

customElements.define("mi-footer", MiFooter);
