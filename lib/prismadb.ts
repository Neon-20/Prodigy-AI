// Prisma starter pack download
// npm i -D prisma
// npx prisma init (To initialise the prisma)
// npm i @prisma/client

import { PrismaClient } from "@prisma/client";

// adding prisma variable to global variable
declare global{
    var prisma:PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV!== "production") globalThis.prisma = prismadb;

export default prismadb;