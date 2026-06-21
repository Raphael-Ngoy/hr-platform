import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "HR Portal",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: { email?: string; password?: string } | undefined) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Rule 1: Check if user exists in database
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email
            }
          })

          if (user) {
            // Rule 4: Disabled users cannot log in
            if (user.status !== "Active") {
              return null
            }

            // Rule 5: Verify password for database users
            // In production, use bcrypt.compare(credentials.password, user.password)
            if (user.password !== credentials.password) {
              return null
            }

            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          }

          // Rule 2: Demo mode - if user does NOT exist in database
          // Allow any email with password "password123"
          if (credentials.password === "password123") {
            return {
              id: "demo-admin",
              name: "Demo HR Admin",
              email: credentials.email,
              role: "HR_ADMIN"
            }
          }

          // Rule 3: Wrong password for non-existent user
          return null
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt"
  } as any,
  secret: process.env.NEXTAUTH_SECRET || "nexus-hr-app-secret-key-2026"
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }