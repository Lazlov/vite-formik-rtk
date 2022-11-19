import { useEffect, useState } from "react";

export const ProductsLayout = () => {
  const [products, setProducts] = useState<any>(null);

  type items = {
    title: string;
    price: string;
    img?: string;
    _id: string;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:4000/api/items");

      const json = await response.json();

      if (response.ok) {
        setProducts(json);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div>
        {products &&
          products.map((item: items) => <div key={item._id}>{item.title}</div>)}
      </div>
    </div>
  );
};
