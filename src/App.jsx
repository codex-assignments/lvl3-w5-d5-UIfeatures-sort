import ItemCard from "./components/ItemCard";
import { useEffect, useState } from "react";
import "./App.css";
import Cart from "./components/Cart";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryTerm, setCategoryTerm] = useState("");
  const [sortTerm, setSortTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredItems = items.filter((item) => {
    const matchedSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchedCategory =
      categoryTerm === "" || categoryTerm === item.category;

    return matchedSearch && matchedCategory;
  });

  // [1, 2, 5, 200, 4]

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortTerm === "price-low-to-high") {
      return a.price - b.price;
    }
    if (sortTerm === "price-high-to-low") {
      return b.price - a.price;
    }
    if (sortTerm === "rating") {
      return a.rating - b.rating;
    }
    if (sortTerm === "stock") {
      return a.stock - b.stock;
    }
    if (sortTerm === "name") {
      return a.title.localeCompare(b.title);
    }
  });

  useEffect(() => {
    async function getData() {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setItems(data.products);
    }

    getData();

    async function getCategories() {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      setCategories(data.slice(0, 4));
    }

    getCategories();
  }, []);

  return (
    <div className="container">
      <div className="title-section">
        <div>
          <h1>Ecommerce Demo</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ipsa
            aliquam hic, dolorem sapiente autem dicta molestias quam alias
            porro, eligendi eveniet perferendis eius deleniti illo tempore enim,
            inventore fugiat!
          </p>
        </div>
        <div>
          <button onClick={() => setIsCartOpen(!isCartOpen)} id="cart-button">
            🛒{cartItems.length}
          </button>
        </div>
        {isCartOpen && (
          <Cart cartItems={cartItems} setIsCartOpen={setIsCartOpen} />
        )}
      </div>
      <input
        id="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="categories">
        {categories.map((cat) => {
          return (
            <label className={`label-radio ${cat.slug}`} key={cat.slug}>
              {cat.name}
              <input
                type="radio"
                name="category"
                value={cat.slug}
                checked={categoryTerm === cat.slug}
                onChange={(e) => setCategoryTerm(e.target.value)}
              />
            </label>
          );
        })}
      </div>

      <select value={sortTerm} onChange={(e) => setSortTerm(e.target.value)}>
        <option value="">Sort by</option>
        <option value="price-low-to-high">Price: low to high</option>
        <option value="price-high-to-low">Price: high to low</option>
        <option value="rating">Rating</option>
        <option value="stock">Stock</option>
        <option value="name">Name</option>
      </select>

      <button
        onClick={() => {
          setCategoryTerm("");
          setSearchTerm("");
          setSortTerm("");
        }}
      >
        Clear All
      </button>

      <div className="items">
        {sortedItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
