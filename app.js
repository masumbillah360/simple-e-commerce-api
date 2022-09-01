const dataLoader = async()=>{
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
}

// dataLoader();

const setCategory = async()=>{
    const data = await dataLoader();
    const catContainer = document.getElementById('cat-container');
    const uniqueCategorys = [];
    for(const product of data ){
        const cat = document.createElement('li');
        if (uniqueCategorys.indexOf(product.category) === -1) {
            uniqueCategorys.push(product.category);
            cat.innerHTML = `
            <a href="#">${product.category}</a>
            ` 
            catContainer.appendChild(cat)
        }
    }
    // console.log(uniqueCategorys)
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
            const {title,price,image,category} = product;
            const productArticle = document.createElement('article');
            productArticle.innerHTML = `
            <h1>${title}</h1>
            <h1>${price}</h1>
            <img src="${image}" style= "width: 150px; height: 200px">
            <h1>${category}</h1>
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
    searchField.value = ''
})
document.getElementById('search-btn').addEventListener('click',()=>{
    searchProduct()
    searchField.value = ' ';
})



setCategory()
searchProduct()