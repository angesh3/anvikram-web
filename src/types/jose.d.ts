declare module 'jose' {
  export interface JWTPayload {
    [key: string]: any;
  }

  export class SignJWT {
    constructor(payload: JWTPayload);
    setProtectedHeader(header: { alg: string }): this;
    setJti(jti: string): this;
    setIssuedAt(): this;
    setExpirationTime(exp: string): this;
    sign(secret: Uint8Array): Promise<string>;
  }

  export function jwtVerify(
    token: string,
    secret: Uint8Array
  ): Promise<{ payload: JWTPayload; protectedHeader: { alg: string } }>;
} 