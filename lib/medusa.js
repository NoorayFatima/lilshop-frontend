// lib/medusa.js
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

export const medusaClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY;

export async function getProducts({ limit = 20, offset = 0 } = {}) {
  try {
    const res = await fetch(
      `${MEDUSA_URL}/store/products?limit=${limit}&offset=${offset}&fields=*variants.prices,*variants.calculated_price,*images`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": PUBLISHABLE_KEY || "",
        },
        next: { revalidate: 0 } 
      }
    );

    if (!res.ok) return { products: [], count: 0 };
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Store Fetch Error:", error);
    return { products: [], count: 0 };
  }
}

export async function getProductByHandle(handle) {
  // Medusa often uses 'id' or 'handle' depending on configuration.
  const res = await medusaClient.get(`/store/products/{id_or_handle}`.replace("{id_or_handle}", handle));
  return res.data;
}

export async function getCollections() {
  const res = await medusaClient.get(`/store/collections`);
  return res.data;
}
