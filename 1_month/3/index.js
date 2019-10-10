const getPath = (HTMLElement) => {
    // строим путь до css элемента(массив)
    // первое значение элемента текущий html
    let path = [];
    // входной HTML код
    // console.log(HTMLElement);
    // поехале
    while (
        // чекаем на null
        (HTMLElement !== null) &&
        // чекаем на body(верхний элемент документа)
        (HTMLElement.nodeName.toLowerCase() != 'body') && 
        // пишем HTML в начало массива
        // тэг 
        path.unshift(HTMLElement.nodeName.toLowerCase() +
		    // считаем вложенность
		    (HTMLElement.childElementCount > 0 ? ':nth-child('+(Array.from(HTMLElement.parentNode.children).indexOf(HTMLElement)+1)+')' : '') + 
        // id
        (HTMLElement.id ? '#' + HTMLElement.id : '') + 
        // класс
        (HTMLElement.className ? '.' + HTMLElement.className.replace(/\s+/g, ".") : '')) &&
        // присваем родителя
        (HTMLElement = HTMLElement.parentNode)
    );
    // склеиваем массив в строку с разделителем >
    return path.join(" > ");
}
