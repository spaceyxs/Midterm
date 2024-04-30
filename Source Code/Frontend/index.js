document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5500/getProduct')
    .then(response => response.json())
    .then(data => getCategory(data['data']));
});
function getCategory(data){
    let index = 0;
    console.log(document.querySelector('.carousel-inner'));

    const inner = document.querySelector(".carousel-inner");
    if (!inner) {
        console.error("Carousel inner container not found.");
        return;
    }

    const divsToRemove = inner.querySelectorAll('div');
    divsToRemove.forEach(div => div.remove());

    inner.innerHTML = "";

    let row, item;

    data.forEach(function({product_id, name, category, picture, stock, price, discount}){
        if (index % 4 == 0) {
            row = document.createElement("div");
            row.classList.add('row');  
            item = document.createElement("div");
            item.classList.add('carousel-item');
            if (index === 0) {
                item.classList.add('active');
            }
        }

        const col = document.createElement("div");
        col.classList.add('col-sm-3');
        const thumb = document.createElement("div");
        thumb.classList.add('thumb-wrapper');
        const img_box = document.createElement("div");
        img_box.classList.add('img-box');
        const imgElement = document.createElement('img');
        imgElement.src = picture;
        imgElement.alt = name;
        imgElement.id = product_id;
        const thumb_cont = document.createElement("div");
        thumb_cont.classList.add('thumb-content');
        const h4Element = document.createElement("h4");
        h4Element.className = "custom-font";
        h4Element.textContent = name;
        
        var pElement = document.createElement("p");
        pElement.className = "item-price";

        var strikeElement = document.createElement("strike");
        strikeElement.textContent = price+"TL";

        if(discount !== 0) {
            var spanElement = document.createElement("span");
            spanElement.textContent = discount+"TL";
            pElement.appendChild(strikeElement);
            pElement.appendChild(spanElement);
        } else {
            pElement.appendChild(strikeElement);
        }

        thumb_cont.appendChild(h4Element);
        thumb_cont.appendChild(pElement);
        img_box.appendChild(imgElement);
        thumb.appendChild(img_box);
        thumb.appendChild(thumb_cont);
        col.appendChild(thumb);
        row.appendChild(col);
        index++;
        if ((index % 4 == 0) || (index === data.length)) {
            item.appendChild(row);
            inner.appendChild(item);
        }
    });
    
}


