import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new  PrismaClient();

export async function PostSeeder() {
    try {
        const data: {content: string, userId: number}[] = [];

        for (let i = 0; i < 20; i++) {
            const content = faker.lorem.paragraph();
            const userId = faker.number.int({ min: 1, max: 10 });

            data.push({ content, userId });
        }

        console.log('Seeding posts...');
        await prisma.post.createMany({ data })
        console.log('Posts seeded successfully!');
    
    } catch (e) {
        console.error(e)
    }
}