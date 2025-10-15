import { clerkClient } from "@clerk/nextjs/server"

const authAdmin = async (userId) => {
  try {
    if (!userId) return false

    const user = await clerkClient.users.getUser(userId)
    const adminEmails = process.env.ADMIN_EMAIL.split(",").map(e => e.trim())

    return adminEmails.includes(user.emailAddresses[0].emailAddress)
  } catch (error) {
    console.error("Auth admin error:", error)
    return false
  }
}

export default authAdmin
