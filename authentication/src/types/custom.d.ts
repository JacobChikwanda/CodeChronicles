// custom.d.ts or another .d.ts file in your project
import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: any; // You can replace `any` with a more specific type according to your application
  }
}
