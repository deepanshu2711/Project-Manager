import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import { app } from "../index";

describe("Testing all auth routes", () => {
  it("should signUp user successfully", async () => {
    const responce = await request(app).post("/api/auth/signup").send({
      email: "Deepanshusaini2711@gmail.com",
      password: "123",
      name: "Deepanshu",
      avatar: "https://somerandom.jpg",
    });
    expect(responce.status).toBe(201);
    expect(responce.body.message).toBe("Sign up successfully!");
  });
});
