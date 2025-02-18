import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { auth } from "../middlewares/auth";

const router = express.Router();
const prisma = new PrismaClient();

router.get('/verify', auth, async (req, res) => {
    const user = res.locals.user;
    res.json(user);
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (!username || !password) {
        res.status(400).json({ msg: "username and password required" });
        return;
    }

    if (!user) {
        res.status(401).json({ msg: "Incorrect username or password." });
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.status(401).json({ msg: "Incorrect username or password." });
        return;
    }

    if (!process.env.JWT_SECRET) {
        res.status(500).json({ msg: "JWT_SECRET is not defined." });
        return;
    }

    const token = jwt.sign(user, process.env.JWT_SECRET);
    res.json({ token, user });
});

router.get('/users', async (req, res) => {

    const data = await prisma.user.findMany({
        include: {
            posts: true,
            comments: true,
            followers: true,
            following: true
        },
        orderBy: { id: "desc" },
        take: 10
    });

    res.json(data);

});

router.get('/users/:id', async (req, res) => {

    const { id } = req.params;

    const data = await prisma.user.findFirst({
        where: { id: Number(id) },
        include: {
            posts: true,
            comments: true,
            followers: true,
            following: true
        }
    });

    res.json(data);

});


router.post('/users', async (req, res) => {

    const { name, username, bio, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { name, username, password: hash, bio }
    });

    res.json(user);

});

router.post('/follow/:id', auth, async (req, res) => {
    const { id } = req.params;
    const user = res.locals.user;

    const data = await prisma.follow.create({
        data: {
            followerId: Number(user.id),
            followingId: Number(id)
        }
    })

    res.json(data);
});


router.delete('/unfollow/:id', auth, async (req, res) => {
    const { id } = req.params;
    const user = res.locals.user;

    await prisma.follow.deleteMany({
        where: {
            followerId: Number(user.id),
            followingId: Number(id)
       }
    })

    res.json({ msg: `Unfollow user ${id}` });
});


router.get('/search', async (req, res) => {
    const q = req.query.q as string;

    const data = await prisma.user.findMany({
        where: {
            name: {
                contains: q,
            },
        },
        include: {
            followers: true,
            following: true
        },
        take: 20
    });

    res.json(data)
});


export { router as UserRouter };