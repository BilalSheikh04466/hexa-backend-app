/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-rest-params */
import { NextFunction, Request, Response } from 'express';

// https://stackoverflow.com/questions/19215042/express-logging-response-body
export const logResponseBody = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const oldWrite: Function = res.write;
  const oldEnd: Function = res.end;
  const chunks: Buffer[] = [];

  res.write = function (chunk: any): boolean {
    chunks.push(Buffer.from(chunk));

    oldWrite.apply(res, arguments);
    return true;
  };

  res.end = function (chunk: any): any {
    if (chunk) {
      chunks.push(Buffer.from(chunk));
    }

    const body: string = Buffer.concat(chunks).toString('utf8');
    console.log(req.path);
    console.log(body);

    oldEnd.apply(res, arguments);
  };

  next();
};

export const logger = {
  log: function (message: string) {
    console.log(`[LOG] ${message}`);
  },
  error: function (message: string, error?: any) {
    console.error(`[ERROR] ${message}`, error);
  },
  warn: function (message: string) {
    console.warn(`[WARN] ${message}`);
  },
  info: function (message: string, item?: any) {
    console.info(`[INFO] ${message}`, item);
  },
};
