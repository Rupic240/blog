import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export async function CommentSeeder() {
    try {
        const data: { content: string, userId: number, postId: number }[] = [];

        for (let i = 0; i < 40; i++) {
            const content = faker.lorem.paragraph();
            const userId = faker.number.int({ min: 1, max: 10 });
            const postId = faker.number.int({ min: 1, max: 20 });

            data.push({ content, userId, postId });
        }

        console.log('Comments seeding...');
        await prisma.comment.createMany({ data })
        console.log('Comment seeded successfully.');
        
        
    } catch (e) {
        console.error(e)
    }   
}