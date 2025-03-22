# Next.js MongoDB Todo App

A simple Todo application built with Next.js and MongoDB, deployable on Netlify.

## Features

- Create, read, update, and delete todo items
- Mark todos as completed
- Responsive design with Tailwind CSS
- MongoDB database integration

## Prerequisites

- Node.js (version 18 or higher)
- MongoDB Atlas account (for cloud database)
- Netlify account (for deployment)

## Local Development

1. Clone the repository
```bash
git clone <repository-url>
cd my-nextjs-mongodb-app
```

2. Install dependencies
```bash
npm install
```

3. Set up your environment variables
   - Create a `.env.local` file in the root directory
   - Add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   ```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## MongoDB Setup

1. Create a MongoDB Atlas account if you don't have one: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster and database
3. Obtain your connection string and replace it in the `.env.local` file

## Netlify Deployment

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to your Netlify account
3. Click "New site from Git" and select your repository
4. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables:
   - Go to Site settings > Build & deploy > Environment
   - Add the environment variable `MONGODB_URI` with your MongoDB connection string
6. Deploy your site

## Important Notes for Deployment

- Make sure to use MongoDB Atlas or another cloud MongoDB provider for production
- Ensure your MongoDB connection string is properly set in Netlify environment variables
- The Netlify Next.js plugin will be automatically used based on the configuration in netlify.toml

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Netlify](https://www.netlify.com/) - Hosting and deployment platform

## License

MIT
