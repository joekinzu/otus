// Root Element
customElements.define('my-tree',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
        }
        // Render
        connectedCallback() {
            this.drawfunc(JSON.parse(this.dataset.leaf))
        }
        drawfunc(data) {
            console.log('given tree:',data)
            if (data.id) {
                this.shadowRoot.innerHTML = `<my-leaf data-id=${data.id} data-leaf=${JSON.stringify(data.items)}></my-leaf>`
            }    
        }
    }
);
// Child Element
customElements.define('my-leaf',
    class extends HTMLElement {
        constructor() {
            super()
        }
        // Insert  Child into DOM
        connectedCallback() {
            this.innerHTML = `${this.dataset.id} level<br>`
            this.dataset.leaf ?
                Object.values(JSON.parse(this.dataset.leaf)).forEach(e => {
                    if(e){
                        const leaf = e
                        this.drawfunc(leaf)
                    } 
                } 
            ):
            console.log('end')    
        }
        // Renderind child 
        drawfunc(leaf) {
            console.log((leaf))
            leaf.items ?
                this.innerHTML += `<my-leaf data-id=${leaf.id} data-leaf=${JSON.stringify(leaf.items)}></my-leaf>` :
                this.innerHTML += `<my-leaf data-id=${leaf.id} ></my-leaf>`
        }    
    }
);

