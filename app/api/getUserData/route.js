import { db } from '@/utils';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm'; // Ensure these imports match your ORM version
import { authenticate } from '@/lib/jwtMiddleware';
import { USER} from '@/utils/schema';
import { decryptText } from '@/utils/encryption';

export async function GET(req) {
    const authResult = await authenticate(req);
    if (!authResult.authenticated) {
        return authResult.response;
    }
    const userData = authResult.decoded_Data;
    
    const userId = userData.userId;
    
    try {
        const [user] = await db
            .select()
            .from(USER)
            .where(eq(USER.id, userId));
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 } // Not Found
            );
        }
        // Decrypt fields only if they exist
        try {
            if (user.password) {
                user.password = decryptText(user.password);
            }
        } catch (decryptError) {
            console.error("Error decrypting user data", decryptError);
            return NextResponse.json({ message: 'Error decrypting user data' }, { status: 500 });
        }
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error("Error fetching user data", error);
        return NextResponse.json({ message: 'Error fetching user data' }, { status: 500 });
    }
}