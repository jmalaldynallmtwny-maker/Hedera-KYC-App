FROM node:22

WORKDIR /app

# Set Node.js memory limit to 6GB (leaving 2GB for system)
ENV NODE_OPTIONS="--max-old-space-size=6144"

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Generate all Prisma clients with 6GB memory
RUN NODE_OPTIONS="--max-old-space-size=6144" npx prisma generate --schema prisma/schema/citizens/schema.prisma
RUN NODE_OPTIONS="--max-old-space-size=6144" npx prisma generate --schema prisma/schema/baybank/schema.prisma  
RUN NODE_OPTIONS="--max-old-space-size=6144" npx prisma generate --schema prisma/schema/oasisbank/schema.prisma
RUN NODE_OPTIONS="--max-old-space-size=6144" npx prisma generate --schema prisma/schema/zenbank/schema.prisma
RUN NODE_OPTIONS="--max-old-space-size=6144" npx prisma generate --schema prisma/schema/arcbank/schema.prisma
RUN NODE_OPTIONS="--max-old-space-size=6144" npx prisma generate --schema prisma/schema/nexbank/schema.prisma

# Copy source code
COPY . .

# Build the application with 6GB memory
RUN NODE_OPTIONS="--max-old-space-size=6144" npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]