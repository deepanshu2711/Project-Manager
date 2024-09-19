import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { User } from "../__mocks__/models/user";
import { app } from "../index";

//moduleName: The path to the module you want to mock.
//factory: A callback function that returns the mock implementation of the module.
vi.mock("../models/user", () => ({
  User,
}));

vi.mock("bcryptjs", () => ({
  default: {
    hashSync: vi.fn().mockReturnValue("HashedPassword"),
    compareSync: vi.fn().mockReturnValue(true),
  },
}));

describe("Testing all auth routes", () => {
  it("should signUp user successfully", async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      _id: "SomeUserId",
      email: "Deepanshusaini2711@gmail.com",
      name: "Deepanshu",
      avatar: "https://somerandom.jpg",
    });

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
