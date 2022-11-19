import fastify from "fastify";
import { todoRoute } from "../modules/todo/todo.route";
import { config } from "./config";
import { envToLogger } from "./logger";

export const createServer = async () => {
	const app = fastify({
		logger: envToLogger[config.NODE_ENV],
	});

	app.register(todoRoute, { prefix: "/api/todos" });

	return app;
};
