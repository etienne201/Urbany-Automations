FROM cypress/included:14.2.0
WORKDIR /app
COPY . .
RUN pnpm install
CMD ["pnpm", "exec", "cypress", "run"]