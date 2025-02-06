import { test, expect, APIRequestContext } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.BASE_URL!;
const USERNAME = process.env.USERNAME!;
const PASSWORD = process.env.PASSWORD!;
const SIGNIN_EMAIL = process.env.SIGNIN_EMAIL!;
const SIGNIN_PASSWORD = process.env.SIGNIN_PASSWORD!;

test.describe("API Tests for Cars", () => {
    let apiContext: APIRequestContext;
    let carId: number;

    test.beforeAll(async ({ playwright }) => {
        apiContext = await playwright.request.newContext({
            baseURL: BASE_URL,
            httpCredentials: {
                username: USERNAME,
                password: PASSWORD,
            },
        });
    });

    test("POST: Should log in and receive a successful response", async () => {
        const loginResponse = await apiContext.post("/api/auth/signin", {
            data: {
                email: SIGNIN_EMAIL,
                password: SIGNIN_PASSWORD,
            },
        });

        expect(loginResponse.ok()).toBeTruthy();
    });

    test("GET: Should fetch list of car brands", async () => {
        const response = await apiContext.get("/api/cars/brands");
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body.data)).toBeTruthy();
    });

    test("GET: Should fetch list of car models", async () => {
        const response = await apiContext.get("/api/cars/models");
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body.data)).toBeTruthy();
    });

    test("POST: Should add a new car", async () => {
        const newCar = {
            carBrandId: 3,
            carModelId: 11,
            mileage: 1010,
        };

        const response = await apiContext.post("/api/cars", {
            data: newCar,
        });

        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.data).toHaveProperty("id");
        expect(body.data.carBrandId).toBe(newCar.carBrandId);
        expect(body.data.carModelId).toBe(newCar.carModelId);
        expect(body.data.mileage).toBe(newCar.mileage);

        carId = body.data.id;
    });


    test("POST: Should fail when required fields are missing", async () => {
        const invalidCar = {
            carBrandId: 1,
            mileage: 122,
        };

        const response = await apiContext.post("/api/cars", {
            data: invalidCar,
        });

        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.status).toBe("error");
        expect(body.message).toBe("Car model id is required");
    });

    test("POST: Should fail with invalid car brand ID", async () => {
        const invalidCar = {
            carBrandId: 9999,
            carModelId: 1,
            mileage: 122,
        };

        const response = await apiContext.post("/api/cars", {
            data: invalidCar,
        });

        expect(response.status()).toBe(404);
        const body = await response.json();
        expect(body.status).toBe("error");
        expect(body.message).toBe("Brand not found");
    });

    test("PUT: Should update car information", async () => {
        const updatedCar = {
            carBrandId: 3,
            carModelId: 11,
            mileage: 101010,
        };

        const response = await apiContext.put(`/api/cars/${carId}`, {
            data: updatedCar,
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data.mileage).toBe(updatedCar.mileage);
    });

    test("DELETE: Should delete the car", async () => {
        const response = await apiContext.delete(`/api/cars/${carId}`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data).toHaveProperty("carId", carId);
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });
});
