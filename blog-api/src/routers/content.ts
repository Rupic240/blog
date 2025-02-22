import { PrismaClient } from '@prisma/client';
import express from 'express';
import { auth, isOwner } from '../middlewares/auth';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/posts', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    try {
        const data = await prisma.post.findMany({
            include: {
                user: true,
                comments: true,
                postLikes: true,
            },
            orderBy: { id: "desc" },
            skip: skip,
            take: Number(limit)
        });

        res.json(data);

    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get('/posts/page/:page', async (req, res) => {
    const { page } = req.params;
    const pageSize = 10;
    const skip = (Number(page) - 1) * pageSize;

    try {
        const data = await prisma.post.findMany({
            include: {
                user: true,
                comments: true,
                postLikes: true,
            },
            orderBy: { id: "desc" },
            skip: skip,
            take: pageSize
        });

        res.json(data);

    } catch (e) {
        res.status(500).json({ error: e });
    }
});
router.get('/posts/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const data = await prisma.post.findFirst({
            where: { id: Number(id) },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true,
                        commentLikes: true
                    }
                },
                postLikes: true
            }
        });

        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/posts', auth, async (req, res) => {
    
    const { content } = req.body;
    const user = res.locals.user;

    if (!content) {
        res.status(400).json({ error: "Invalid input data" });
        return;
    }
    
    try {
        const post = await prisma.post.create({
            data: {
                content: String(content),
                userId: Number(user.id)
            }
        });

        const data = await prisma.post.findUnique({
            where: { id: Number(post.id) },
            include: {
                user: true,
                comments: {
                    include: { user: true }
                }
            }
        });

        res.json(data);

    } catch (e) {
        res.status(500).json({ error: e })
    }
});

router.post('/comments', auth, async (req, res) => {
    
    const { content, postId } = req.body;
    const user = res.locals.user;

    if (!content) {
        res.status(400).json({ error: "Invalid input data" });
        return;
    }

    try {
        const comment = await prisma.comment.create({
            data: {
                content: String(content),
                userId: Number(user.id),
                postId: Number(postId)
            }
        });

        const data = await prisma.comment.findUnique({
            where: { id: comment.id },
            include: { user: true }
        });

        res.json(data);

    } catch (e) {
        res.status(500).json({ error: e })
    }
})

router.delete('/posts/:id', auth, isOwner('post'), async (req, res) => {
    
    const { id } = req.params;
    try {
        await prisma.comment.deleteMany({
            where: { postId: Number(id) }
        });

        await prisma.post.delete({
            where: { id: Number(id) }
        });

        res.sendStatus(204);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});


router.delete('/comments/:id', auth, isOwner("comment"), async (req, res) => {

    const { id } = req.params;

    try {
        await prisma.comment.delete({
            where: { id: Number(id) }
        });

        res.sendStatus(204);
    } catch (e) {
        res.status(500).json({ error: e });
    }
})


router.post('/like/posts/:id', auth, async (req, res) => {
    const { id } = req.params;
    const user = res.locals.user;

    const like = await prisma.postLike.create({
        data: {
            postId: Number(id),
            userId: Number(user.id),
        }
    })
    
    res.json({ like });
})

router.delete('/unlike/posts/:id', auth, async (req, res) => {
    const { id } = req.params;
    const user = res.locals.user;

    await prisma.postLike.deleteMany({
        where: { 
            postId: Number(id),
            userId: Number(user.id)
        }
    })

    res.json({ msg: `Unlike post ${id}` })
})


router.post('/like/comments/:id', auth, async (req, res) => {
    const { id } = req.params;
    const user = res.locals.user;

    const like = await prisma.commentLike.create({
        data: {
            commentId: Number(id),
            userId: Number(user.id),
        }
    })
    
    res.json({ like });
});


router.delete('/unlike/comments/:id', auth, async (req, res) => {
    const { id } = req.params;
    const user = res.locals.user;

    await prisma.commentLike.deleteMany({
        where: { 
            commentId: Number(id),
            userId: Number(user.id)
        }
    })

    res.json({ msg: `Unlike comment ${id}` })
})

router.get('/likes/posts/:id', async (req, res) => {
    const { id } = req.params;

    const data = await prisma.postLike.findMany({
        where: { postId: Number(id) },
        include: {
            user: {
                include: {
                    followers: true,
                    following: true
                }
            }
        }
    })

    res.json(data);
});


router.get('/likes/comments/:id', async (req, res) => {
    const { id } = req.params;

    const data = await prisma.commentLike.findMany({
        where: { commentId: Number(id) },
        include: {
            user: {
                include: {
                    followers: true,
                    following: true
                }
            }
        }
    })

    res.json(data);
})



router.get('/following/posts', auth, async (req, res) => {
    const user = res.locals.user;

    const follow = await prisma.follow.findMany({
        where: {
            followerId: Number(user.id)
        }
    });

    const users = follow.map(item => item.followingId);

    const data = await prisma.post.findMany({
        where: {
            userId: {
                in: users
            }
        },
        include: {
            user: true,
            comments: true,
            postLikes: true,
        },
        take: 10,
    });

    res.json(data);
})



export { router as ContentRouter };