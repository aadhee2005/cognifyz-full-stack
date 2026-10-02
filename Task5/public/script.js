const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const refreshButton = document.getElementById("refreshButton");


// Fetch and display all products
async function loadProducts() {
    productList.innerHTML = '<p class="loading">Loading products...</p>';

    try {
        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();

        displayProducts(products);

    } catch (error) {
        productList.innerHTML = `
            <p class="empty">
                ❌ Unable to load products.
            </p>
        `;

        console.error(error);
    }
}


// Display products in the page
function displayProducts(products) {

    if (products.length === 0) {
        productList.innerHTML = `
            <p class="empty">
                No products available.
            </p>
        `;
        return;
    }

    productList.innerHTML = products.map(product => `
        <div class="product">

            <h3>${escapeHTML(product.name)}</h3>

            <p>
                <strong>Price:</strong>
                ₹${Number(product.price).toLocaleString("en-IN")}
            </p>

            <p>
                <strong>Category:</strong>
                ${escapeHTML(product.category)}
            </p>

            <div class="product-actions">

                <button onclick="editProduct(${product.id})">
                    ✏️ Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteProduct(${product.id})"
                >
                    🗑️ Delete
                </button>

            </div>

        </div>
    `).join("");
}


// Add a new product
productForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value.trim();

    try {

        const response = await fetch("/api/products", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                price,
                category
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Unable to add product");
            return;
        }

        alert("✅ Product added successfully!");

        productForm.reset();

        loadProducts();

    } catch (error) {
        console.error(error);
        alert("❌ Server error. Please try again.");
    }
});


// Edit a product
async function editProduct(id) {

    try {

        const response = await fetch(`/api/products/${id}`);

        const product = await response.json();

        if (!response.ok) {
            alert(product.message);
            return;
        }

        const name = prompt("Enter product name:", product.name);

        if (name === null) {
            return;
        }

        const price = prompt("Enter product price:", product.price);

        if (price === null) {
            return;
        }

        const category = prompt(
            "Enter product category:",
            product.category
        );

        if (category === null) {
            return;
        }

        const updateResponse = await fetch(`/api/products/${id}`, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name.trim(),
                price,
                category: category.trim()
            })
        });

        const data = await updateResponse.json();

        if (!updateResponse.ok) {
            alert(data.message || "Unable to update product");
            return;
        }

        alert("✅ Product updated successfully!");

        loadProducts();

    } catch (error) {
        console.error(error);
        alert("❌ Server error. Please try again.");
    }
}


// Delete a product
async function deleteProduct(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(`/api/products/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Unable to delete product");
            return;
        }

        alert("🗑️ Product deleted successfully!");

        loadProducts();

    } catch (error) {
        console.error(error);
        alert("❌ Server error. Please try again.");
    }
}


// Refresh products
refreshButton.addEventListener("click", loadProducts);


// Basic HTML escaping
function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

loadProducts();