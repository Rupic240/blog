import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

/***
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */

export function auth(req: Request, res: Response, next: NextFunction): void {
    try {
        const { authorization } = req.headers;
        const token = authorization && authorization.split(' ')[1];

        if (!token) {
            res.status(400).json({ msg: "token required" });
            return;
        }

        if (!process.env.JWT_SECRET) {
            res.status(500).json({ msg: "JWT secret not configured" });
            return;
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (!user) {
            res.status(401).json({ msg: "incorrect token" });
            return;
        }

        res.locals.user = user;

        next();

    } catch (e) {
        console.error(e);
    }
}

/***
 * @param {('post', 'comment')} type
 */
 
export function isOwner(type: string) {

    /***
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    return async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params; 
        const user = res.locals.user;

        if (type === 'post') {     
            const post = await prisma.post.findUnique({
                where: { id: Number(id) }
            });

            if (post?.userId === user.id) return next();
        }

        if (type === 'comment') {
            const comment = await prisma.comment.findUnique({
                where: { id: Number(id) },
                include: {
                    post: true
                }
            })

            if (comment?.userId === user.id || comment?.post.userId === user.id) return next();
        }
    }
}