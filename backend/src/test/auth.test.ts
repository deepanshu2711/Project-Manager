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

vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn().mockReturnValue("somerandomstingforjwttoken"),
  },
}));

describe("Testing auth routes", () => {
  describe("Testing user signup route", () => {
    it("should signup user successfully", async () => {
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

    it("should return user already exists", async () => {
      User.findOne.mockResolvedValue({
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

      expect(responce.status).toBe(200);
      expect(responce.body).toBe("A user already exists with this email!");
    });

    it("should return required fields are missing", async () => {
      const responce = await request(app).post("/api/auth/signup").send();
      expect(responce.status).toBe(200);
      expect(responce.body).toBe("Please enter all required fields");
    });
  });

  describe("Testing user signin routes", () => {
    it("should signin successfully", async () => {
      User.findOne.mockReturnValue({
        populate: vi.fn().mockResolvedValue({
          _id: "somerandom",
          email: "Deepanshusaini2711@gmail.com",
          password: "123",
          name: "Deepanshu",
          avatar: "https://somerandom.jpg",
          orgs: [],
        }),
      });

      const responce = await request(app).post("/api/auth/signin").send({
        email: "Deepanshusaini2711@gmail.com",
        password: "123",
      });

      expect(responce.status).toBe(201);
      expect(responce.body.message).toBe("Logged in successfully!");
      expect(responce.body.user).toEqual({
        _id: "somerandom",
        email: "Deepanshusaini2711@gmail.com",
        password: "123",
        name: "Deepanshu",
        avatar: "https://somerandom.jpg",
        orgs: [],
      });
    });

    it("should return user not found", async () => {
      User.findOne.mockReturnValue({
        populate: vi.fn().mockResolvedValue(null),
      });

      const responce = await request(app).post("/api/auth/signin").send({
        email: "Deepanshusaini2711@gmail.com",
        password: "123",
      });
      expect(responce.status).toBe(200);
      expect(responce.body).toBe("No user found!");
    });

    it("should return email is required", async () => {
      const responce = await request(app)
        .post("/api/auth/signin")
        .send({ password: "123" });
      expect(responce.status).toBe(200);
      expect(responce.body).toBe("email is required");
    });

    it("should return password  is required", async () => {
      const responce = await request(app)
        .post("/api/auth/signin")
        .send({ email: "Deepanshusaini2711@gamil.com" });
      expect(responce.status).toBe(200);
      expect(responce.body).toBe("password is required");
    });
  });
});
