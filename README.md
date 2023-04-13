# [Course Management System](https://coursemanagementsystem.vercel.app/)
-Default password is:
username: admin
password: nimda

![dashboard](https://res.cloudinary.com/dddvtrxcz/image/upload/v1681419198/samples/ecommerce/Screen_Shot_2023-04-13_at_11.52.45_PM_etj8fu.png)

## How did I make this app?

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## How to Run it Locally
- install the dependencies 
```
npm install
```
- Create an .env file.
- Copy the enivroment varible provided in .env.example to your .evv file.
- Copy your atlas connection string to DATABASE_URL in your .env file
- remove the below line of code to enable you to go to register page
```typescript
// Located at src/pages/dashboard/register.tsx
 if (status === "unauthenticated") {
    void router.push("/dashboard/signin");
  }
```
- now visit (baseurl)/dashboard/register and register a user
