# Quaerere - A Powerful Web Search Application

Quaerere is a full-stack web application that harnesses the capabilities of the Metaphor API to provide an enhanced web search experience.

## Technologies Used

1. **Frontend**: The application's frontend is built using the `React.js` library, offering a responsive and user-friendly interface. Design elements are crafted with the help of `Tailwind CSS`. Image recognition and image-to-text conversion are powered by `tensorflow.js` and `tesseract.js`.

2. **Backend**: The server is constructed using Node.js and the Express framework, ensuring robust and efficient functionality. MongoDB is employed as the database, and user authentication is handled via JSON Web Tokens (JWT).

## What Does It Do?

Quaerere empowers users with the ability to conduct web searches using the immense capabilities of large language models. Search queries can be based on keywords, URLs, or even images uploaded by the user.

## Getting Started

To run this project locally and experience its capabilities, follow these simple steps:

1. Clone this repository to your local machine.

2. Install the required dependencies for the client by executing `pnpm install`.

3. Install the necessary dependencies for the backend using `pnpm install`.

4. Create an `.env` file in both the `client` and `backend` folders. Copy the contents from `.env-sample` to these files, and fill in the essential API keys and URLs with your own credentials.

5. Start the backend server with the command `node index.js` and launch the frontend by running `pnpm run dev`.

Now, you are all set to explore the potential of Quaerere and enjoy a seamless web search experience.

Feel free to customize, extend, and improve this project according to your needs. Happy searching!
