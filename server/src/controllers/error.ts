import { Request, Response, NextFunction } from 'express';

export function globalErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
	const message = err?.message ?? 'Internal Server Error';
	if (!res.headersSent) res.status(500).send(message);
}

export function notFoundErrorHandler(req: Request, res: Response, next: NextFunction): void {
	throw new Error('Page Not Found');
}