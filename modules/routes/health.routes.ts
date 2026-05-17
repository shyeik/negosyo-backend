import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Negosyo Track API is running" });
});

export default router;
