// компонент потомка
customElements.define('my-leaf',
    class extends HTMLElement {
        constructor() {
            super()
        }
        // рендер
        connectedCallback() {
            this.innerHTML = `${this.dataset.id} level<br>`
            if(this.dataset.leaf){
                const leaf = JSON.parse(this.dataset.leaf);
                this.drawfunc(leaf)
            }    
        }
        // функция отрисовки потомков 
        drawfunc(leaf) {
            console.log((leaf))
            leaf.items ?
                this.innerHTML += `<my-leaf data-id=${leaf.id} data-leaf=${JSON.stringify(leaf.items[0])}></my-leaf>` :
                this.innerHTML += `<my-leaf data-id=${leaf.id} ></my-leaf>`
        }    
    }
);
// родительский компонент
customElements.define('my-tree',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
        }
        // рендер
        connectedCallback() {
            this.drawfunc(JSON.parse('{"id": 1,"items": [{"id": 2,"items": [{ "id": 3, "items": [{ "id": 4}]}]}]}'))
        }
        // чекаем обьект на id, затем рекурсивно вызываем класс потомка
        drawfunc(data) {
            console.log(data)
            if (data.id) {
                // пробрасываем первый уровень
                this.shadowRoot.innerHTML = `<my-leaf data-id=${data.id} data-leaf=${JSON.stringify(data.items[0])}></my-leaf>`
            }    
        }
    }
);