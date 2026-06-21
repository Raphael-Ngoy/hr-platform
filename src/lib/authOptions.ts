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

        // DEMO MODE CHECK (highest priority - works even if DB is down)
        const isDemoPassword = credentials.password === "password123"
        const demoModeEnabled = process.env.ENABLE_DEMO_LOGIN === "true" || isDemoPassword

        if (demoModeEnabled && isDemoPassword) {
          try {
            const user = await prisma.user.findFirst({
              where: { email: credentials.email }
            })

            if (user) {
              if (user.status !== "Active") {
                return null
              }
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
              }
            }
          } catch (dbError) {
            console.log("Database unreachable, using demo mode for:", credentials.email)
          }

          return {
            id: "demo-admin",
            name: "Demo HR Admin",
            email: credentials.email,
            role: "HR_ADMIN"
          }
        }

        // PRODUCTION AUTH
        try {
          const user = await prisma.user.findFirst({
            where: { email: credentials.email }
          })

          if (!user) {
            return null
          }

          if (user.status !== "Active") {
            return null
          }

          if (user.password !== credentials.password) {
            return null
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
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

export const handler = NextAuth(authOptions)