FROM node:16-alpine
# Alpine is a lightweight version

# Add to tmp dir
ADD package.json /tmp/package.json
ADD yarn.lock /tmp/yarn.lock

# Install dependencies
RUN cd /tmp && yarn --pure-lockfile

# Add all files to src dir
ADD ./ /src

# Copy dependencies from tmp to src
RUN cp -a /tmp/node_modules /src/

WORKDIR /src

# Build app
RUN npm run-script build

## TODO rm before deployment
## We will use Caddy to reverse proxy into the container
EXPOSE 4000

# Start app, we specified in tsconfig that the output is in build
CMD ["node", "build/src/app.js"]