import { PrismaClient } from '@prisma/client'
import { UserSeeder } from './UserSeeder';
import { PostSeeder } from './PostSeeder';
import { CommentSeeder } from './CommentSeeder';
import { LikeSeeder } from './LikeSeeder';

const prisma = new PrismaClient();

async function main() {
    try {
        await UserSeeder();
        await PostSeeder();
        await CommentSeeder();
        await LikeSeeder();
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect();
    }
}

main();