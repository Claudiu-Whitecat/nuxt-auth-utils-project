// shared/types/auth.d.ts
declare module '#auth-utils' {
  interface User {
    id: number;
    name: string;
    email: string;
  }

  interface UserSession {
    lastLoggedIn: Date;
  }
}

export {};
