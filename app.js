const dataLoader = async()=>{
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
}

const setCategory = async()=>{
    const data = await dataLoader();
    const catContainer = document.getElementById('cat-container');
    const uniqueCategorys = [];
    for(const product of data ){
        const cat = document.createElement('li');
        cat.classList.add('py-4','w-48')
        if (uniqueCategorys.indexOf(product.category) === -1) {
            uniqueCategorys.push(product.category);
            cat.innerHTML = `
            <button>${product.category}</button>
            ` 
            catContainer.appendChild(cat)
        }
    }
}

const searchProduct = async()=>{
    const allProducts = await dataLoader();
    const searchText = document.getElementById('search-field').value;
    const searchedProdcuts = allProducts.filter(product=>product.category.includes(searchText));
    const productsContainer = document.getElementById('product-container');
    if (searchedProdcuts.length === 0) {
        console.log("not found");
    
    }else{
        // console.log(searchedProdcuts) 
        productsContainer.textContent = ''
        searchedProdcuts.forEach(product=>{
            // console.log(product);
            const {title,price,image,category,description} = product;
            const productArticle = document.createElement('div');
            productArticle.classList.add('card','bg-base-100','shadow-xl')
            productArticle.innerHTML = `
            <figure><img class="h-32" src="${image}" alt=".." /></figure>
                    <div class="card-body">
                      <span>${category}</span>
                      <h2 class="card-title">${title.length>20?title.slice(0,20)+'...':title}</h2>
                      <p>price : ${price}</p>
                      <p>${description.length>100?description.slice(0,100)+'...':description}</p>
                      <div class="card-actions justify-end">
                      </div>
                    </div>
            `
            productsContainer.appendChild(productArticle)
        })
    }


}
const searchField = document.getElementById('search-field');
searchField.addEventListener('keypress',(e)=>{
    if (e.key === "Enter") {
        searchProduct()
    }
})
document.getElementById('search-btn').addEventListener('click',()=>{
    searchProduct()
    searchField.value = ' ';
})

setCategory()
searchProduct()