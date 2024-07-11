import { Request, Response, Router } from "express";
import { authenticate } from "../lib/middlewares/authenticate";
import { authorizeRoles } from "../lib/middlewares/authorize";

const testRouter = Router();
testRouter.get("/test1/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "test1" });
});

testRouter.get("/public/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "public" });
});

testRouter.get(
  "/protected/",
  authenticate,
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "protected" });
  }
);

testRouter.get(
  "/admin/",
  authenticate,
  authorizeRoles("ADMIN"),
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "admin" });
  }
);

export { testRouter };
