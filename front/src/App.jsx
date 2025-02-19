import { useState,useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts, addProduct, deleteProduct } from "./slice";
const URL = "http://localhost:8007/home";
function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
let [showForm,setShowForm]=useState(false)

const [newProduct, setNewProduct] = useState({ title: "", description: "", price: "" });

useEffect(()=>{
  axios.get(URL).then((response)=>dispatch(setProducts(response.data)))
  .catch((error) => console.error("Error fetching products:", error));
}, [dispatch]);

const handleChange = (e) => {
  setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
};
const addNewProduct=(e)=>{
  e.preventDefault();
  const productToAdd = {
    title: newProduct.title,
    description: newProduct.description,
    price:newProduct.price,
  };
  axios.post(URL,productToAdd).then
  (response=>{
    dispatch(addProduct(response.data.products))
    setShowForm(false);
    setNewProduct({title:"",description: "", price: "" })
  }) .catch((error) => console.error("Error adding product:", error));
};

const handleDelete = (id) => {
  axios.patch(`${API_URL}/${id}`, { isDeleted: true }) // 🔹 تحديث الحقل بدلاً من الحذف
    .then(() => {
      dispatch(deleteProduct(id)); 
    })
    .catch((error) => console.error("Error deleting product:", error));
};


return (
  <div className="min-h-screen flex flex-col">
    {/* ✅ Navbar */}
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Store</h1>
        <button onClick={() => setShowForm(true)} className="bg-white text-blue-600 px-4 py-2 rounded-md">
          Add Product
        </button>
      </div>
    </nav>

    {/* ✅ Form for adding new product */}
    {showForm && (
      <div className="container mx-auto p-6">
        <form onSubmit={addNewProduct} className="bg-white shadow-lg p-6 rounded-lg max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <input
            type="text"
            name="title"
            value={newProduct.title}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-2 border rounded-md mb-2"
            required
          />
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="w-full p-2 border rounded-md mb-2"
            required
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            placeholder="Product Price"
            className="w-full p-2 border rounded-md mb-2"
            required
          />
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Add</button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
          </div>
        </form>
      </div>
    )}

    {/* ✅ Product List */}
    <main className="container mx-auto p-6 flex-grow">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products
  .filter((product) => !product.isDeleted) // ✅ إخفاء المنتجات المحذوفة
  .map((product) => (
    <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-green-600 font-semibold mt-2">${product.price}</p>
      <button
        onClick={() => handleDelete(product.id)}
        className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Delete
      </button>
          </div>
        ))}
      </div>
    </main>

    {/* ✅ Footer */}
    <footer className="bg-gray-800 text-white text-center p-4 mt-6">
      <p>© 2025 Product Store - All Rights Reserved</p>
    </footer>
  </div>
);
}

export default App
