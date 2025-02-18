import express from 'express';
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
import { UserRouter } from './routers/user';
import { ContentRouter } from './routers/content';

const app = express();
app.use(cors());

const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', UserRouter);
app.use('/content', ContentRouter);

const server = app.listen(8000, () => {
    console.log('Blog API is running at port 8000...');
});


const gracefulShutdown = async () => {
    await prisma.$disconnect();
    server.close(() => {
        console.log("Blog API closed.");
        process.exit(0);
    });
}

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);