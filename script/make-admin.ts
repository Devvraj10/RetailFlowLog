import { db } from "../server/db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";

async function makeAdmin() {
  const email = process.argv[2];

  if (!email) {
    console.error("Usage: npx tsx script/make-admin.ts <user-email>");
    process.exit(1);
  }

  try {
    const result = await db.update(users)
      .set({ isAdmin: true })
      .where(eq(users.email, email))
      .returning();

    if (result.length > 0) {
      console.log(`Success! User ${email} is now an admin.`);
    } else {
      console.log(`User with email ${email} not found.`);
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
  process.exit(0);
}

makeAdmin();
