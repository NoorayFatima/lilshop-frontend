// app/api/categories/route.js
import { getCategories } from '@/lib/data';

export async function GET() {
    try {
        const categories = await getCategories();
        
        return Response.json({
            success: true,
            categories: categories
        }, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
            }
        });
    } catch (error) {
        return Response.json({
            success: false,
            error: error.message,
            categories: []
        }, { status: 500 });
    }
}
