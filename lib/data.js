// lib/data.js (REVISED FIX)

import Medusa from "@medusajs/medusa-js";
const TARGET_CURRENCY = 'PKR';
const DEFAULT_REGION_ID = 'reg_01KGFD6NQY7Q47WE8H22CEW8KY';

const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY;
const FEATURED_COLLECTION_ID = "pcol_01KGFDAR0DG6Y5KFTR9F0H6PD9"; 

// 1. Centralized Client Initialization Function
function getMedusaClient() {
    // Read variables fresh inside this function scope (more robust than module scope)
    const MEDUSA_BACKEND_URL_LOCAL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
    const PUBLISHABLE_KEY_LOCAL = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY;

    if (!MEDUSA_BACKEND_URL_LOCAL || !PUBLISHABLE_KEY_LOCAL) {
        console.error("FATAL CONFIG ERROR: Medusa URL or Publishable Key is missing.");
        throw new Error("Medusa environment configuration is incomplete.");
    }

    // Note: We intentionally DO NOT inject region_id here, as it failed to force prices.
    return new Medusa({
        baseUrl: MEDUSA_BACKEND_URL_LOCAL,
        maxRetries: 3,
        publishableApiKey: PUBLISHABLE_KEY_LOCAL,
    });
}
/**
 * Fetches products from Medusa with necessary expansions.
 * @param {object} query - Medusa product list query parameters (e.g., limit, offset, collection_id, handle).
 * @returns {Promise<Array>} List of products.
 */
/* export async function getProducts(query = {}) {
  try {
    const { products } = await medusaClient.products.list({
      // Always expand these fields for a professional product display
      expand: "variants,images,options",
      ...query,
    });
    return products;
  } catch (error) {
    console.error("Error fetching products from Medusa:", error);
    return []; // Return an empty array on failure
  }
}*/

// lib/medusa.js

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

export async function getProducts({ limit = 20, offset = 0, category_id = null } = {}) {
  try {
    // V2 requires the Publishable Key to know which Sales Channel to show
    const params = new URLSearchParams({
      limit: limit,
      offset: offset,
      fields: "*variants.prices,*variants.calculated_price,*images"
    });

    // Add category_id filter if provided
    if (category_id && Array.isArray(category_id) && category_id.length > 0) {
      category_id.forEach(catId => {
        params.append('category_id[]', catId);
      });
    }

    const response = await fetch(
      `${MEDUSA_URL}/store/products?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": PUBLISHABLE_KEY, 
        },
        next: { revalidate: 0 } // Ensures fresh data for your project
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Medusa API Error:", errorText);
      return { products: [], count: 0 };
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Network Error:", error);
    return { products: [], count: 0 };
  }
}
/**
 * Fetches a single product by handle.
 */
export async function getProductByHandle(handle) {
    // Medusa V2: we filter the products list by handle to get the specific item
    const params = new URLSearchParams({
        handle: handle,
        fields: "*images,*variants,*variants.prices,*variants.calculated_price,*categories"
    });

    const url = `${MEDUSA_BACKEND_URL}/store/products?${params.toString()}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "x-publishable-api-key": PUBLISHABLE_KEY,
                "Content-Type": "application/json",
            },
            next: { revalidate: 0 }
        });

        if (!response.ok) throw new Error(`Product fetch failed: ${response.status}`);
        
        const data = await response.json();
        // Medusa returns an array for the list endpoint even when filtering by handle
        return data.products?.[0] || null;
    } catch (error) {
        console.error(`Error fetching product ${handle}:`, error.message);
        return null;
    }
}

/**
 * Custom logic to determine display price and check for 'Contact for Price' paintings.
 */
// lib/data.js (REVISED FIX for getDisplayPrice - Case-Tolerant Match)

// lib/data.js (FINAL PRICE FIX - Direct Currency Code Match)
// region-id:  reg_01KAK5VDQPXVYN25H758MY18DB
export async function getFeaturedProducts() {
  const queryParams = new URLSearchParams({
    collection_id: FEATURED_COLLECTION_ID,
    limit: 8,
    // Medusa V2 Syntax: Use '*' to include relations
    fields: "*images,*variants,*variants.prices,*variants.calculated_price", 
    region_id: DEFAULT_REGION_ID,
  }).toString();

  const url = `${MEDUSA_BACKEND_URL}/store/products?${queryParams}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-publishable-api-key": PUBLISHABLE_KEY,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 }, 
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Fetch failed (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Data Fetch Error:", error.message);
    return [];
  }
}

export function getDisplayPrice(product) {
  const variant = product.variants?.[0];
  if (!variant) return "Price Unavailable";

  /**
   * ACCORDING TO DEBUG LOGS:
   * Your server provides 'calculated_amount' as a whole number (e.g., 300).
   * We do NOT divide by 100.
   */
  const calculated = variant.calculated_price;
  
  if (calculated && typeof calculated.calculated_amount === 'number') {
    return formatPKR(calculated.calculated_amount);
  }

  // Fallback to the prices array
  const pkrPrice = variant.prices?.find(
    (p) => p.currency_code?.toLowerCase() === "pkr"
  );

  if (pkrPrice && typeof pkrPrice.amount === 'number') {
    return formatPKR(pkrPrice.amount);
  }

  return "Price Unavailable";
}

function formatPKR(amount) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount); // No division by 100 based on your debug logs
}

/**
 * Fetches all product categories from Medusa and organizes them hierarchically.
 * Automatically handles parent/child relationships.
 * @returns {Promise<Array>} Array of categories with subcategories.
 */
export async function getCategories() {
  try {
    const params = new URLSearchParams({
      limit: 100,
      fields: "*parent_category"
    }).toString();

    const url = `${MEDUSA_BACKEND_URL}/store/product-categories?${params}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": PUBLISHABLE_KEY,
      },
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      return [];
    }

    const responseText = await response.text();
    let data = {};
    
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      return [];
    }
    
    const allCategories = data.product_categories || [];

    // Build hierarchy: separate root categories from subcategories
    const rootCategories = allCategories.filter(cat => !cat.parent_category_id);
    
    // Map each root category to include its children
    const categoriesWithChildren = rootCategories.map(rootCat => ({
      id: rootCat.id,
      title: rootCat.name,
      subcategories: allCategories
        .filter(cat => cat.parent_category_id === rootCat.id)
        .map(subCat => ({
          id: subCat.id,
          title: subCat.name
        }))
    }));

    // Add "All Products" at the beginning
    return [
      { title: "All Products", id: "", subcategories: [] },
      ...categoriesWithChildren
    ];
  } catch (error) {
    return [];
  }
}

