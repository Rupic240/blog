import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function LikeSeeder() {
    console.log('Post like seeding...');
    for (let i = 0; i < 50; i++) {
        await prisma.postLike.create({
            data: {
                postId: faker.number.int({ min: 1, max: 20 }),
                userId: faker.number.int({ min: 1,  max: 10 })
            }
        })
    }
    console.log('Post like seeding done.');
}