// app/products/page.jsx
import { getProducts } from "../../lib/medusa";
import ProductCard from "../../components/ProductCard";

export default async function ProductsPage() {
  // server-side fetch
  const data = await getProducts({ limit: 24 });
  const products = data?.products || data?.items || [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shop</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id || p.handle} product={p} />
        ))}
      </div>
    </div>
  );
}


