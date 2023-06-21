**Trading Center** is the final project of the [JS Fullstack Course](https://go.hotmart.com/H75713532I) by [Thiago M. Medeiros](https://github.com/thiagommedeiros).

**Version 1.0 was developed using:**

- Next.js
- MongoDB local server
- Material UI
- Axios
- Next-auth

**Version 2.0 was a refactor of the original code, using:**

- AWS Amplify as backend/frontend as the hosting service.
- MongoDB Atlas (Serverless) as databaes.
- AWS S3 to store the image files.

**Live Preview**

Version 1.0 was able to be run only on local machine.
After finishing the JS Fullstack Course, I refactored the code to put the app online.
Version 2.0 can be accessed [HERE](https://tradingcenter.joaotextor.com)

**To deploy the project on your local machine:**

1. Clone to your local machine
2. Run ```npm i``` to install dependencies
3. Setup your AWS/Amplify account using ```amplify configure```
4. Start MongoDB Compass and create a new collection named 'tradingcenter'
5. Fill the .env.local.sample with the proper environment variables
6. Rename .env.local.sample to .env.local
8. Run 'npm run dev' to run the project on localhost.
9. Pray to the Old Gods and the New that it does work only by following these steps (I didn't have to clone my project yet)
