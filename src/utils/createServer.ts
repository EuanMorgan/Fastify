import fastify from "fastify";
import { todoRoute } from "../modules/todo/todo.route";
import { config } from "./config";
import { envToLogger } from "./logger";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { version } from "../../package.json";
export const createServer = async () => {
	const app = fastify({
		logger: envToLogger[config.NODE_ENV],
	});

	app.register(swagger, {
		swagger: {
			info: {
				title: "Todo API",
				description: "Todo API",
				version,
			},
		},
	});

	app.register(swaggerUi, {
		routePrefix: "/docs",
		staticCSP: true,
	});

	app.register(todoRoute, { prefix: "/api/todos" });

	return app;
};
