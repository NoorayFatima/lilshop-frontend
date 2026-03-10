import Medusa from "@medusajs/medusa-js";

const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "https://noorayfatima-lilshop.hf.space";

const medusa = new Medusa({ baseUrl, maxRetries: 3 });

export default medusa;
