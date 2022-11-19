import { describe, it, vi, expect } from "vitest";
import { createServer } from "../../../utils/createServer";
import * as todoService from "../todo.service";
import { nanoid } from "nanoid";
describe('POST "/api/todos" route', () => {
	it("should call the createTodo service", async () => {
		const todo = {
			_id: "123",
			title: "A todo",
			shortId: nanoid(),
			complete: false,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		const createTodoSpy = vi.spyOn(todoService, "createTodo");

		expect(createTodoSpy.getMockName()).toEqual("createTodo");

		// We mock the resolved value because we don't actually want it to
		// create a todo in the database
		createTodoSpy.mockResolvedValue(todo);

		const server = await createServer();

		await server.ready();

		const payload = {
			title: "test todo",
		};
		// We use the server.inject method to simulate a request to the server
		const response = await server.inject({
			method: "POST",
			url: "/api/todos",
			payload,
		});

		// expect create todo called with correct payload and response is correct
		expect(response.json()).toEqual(todo);

		expect(createTodoSpy).toHaveBeenCalledWith(payload);
	});
});
