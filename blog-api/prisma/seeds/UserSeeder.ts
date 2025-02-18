import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function UserSeeder() {

    
    try {
        console.log('Seeding users...');

        for (let i = 0; i < 10; i++) {   
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();

            const name = `${firstName} ${lastName}`;
            const username = `${firstName}${lastName[0]}`.toLocaleLowerCase();
            const password = await bcrypt.hash('password', 10);
            const bio = faker.lorem.sentence();

            await prisma.user.upsert({
                where: { username },
                update: {},
                create: { name, username, password, bio }
            });
        }

        console.log('Users seeded successfully!');

    } catch (e) {
        console.error(e)
    }
}