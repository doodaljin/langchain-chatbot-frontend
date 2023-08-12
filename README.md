# Langchain Chatbot Frontend

This is the frontend for a chatbot project built with Langchain and GPT.
## Prepare

Add a .env file like .env.example then add your PRIVATE API TOKEN generated from [Backend](https://github.com/doodaljin/langchain-chatbot-backend.git). 

## Run in terminal

### Install required packages
```
yarn install
```
### Start backend server with autoReload enabled
```
yarn develop
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Run with Docker

### Build image
```
docker build -t frontend:1.0 .
```
### Run a container for backend

```
docker run -d -p 3000:3000 --name frontend frontend:1.0
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!