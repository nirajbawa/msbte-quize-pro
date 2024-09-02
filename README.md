Here's a README for your GitHub repository:

---

# MSBTEQuizPro

**MSBTEQuizPro** is a web application designed specifically for MSBTE students to prepare for their online subject examinations. This platform offers a comprehensive environment for practicing multiple-choice questions (MCQs), closely simulating the experience of the official MSBTE examination portal. Students can analyze their performance through both free and paid tests available on the platform.



## Demo Video

[![Watch the video](https://img.youtube.com/vi/kjNBOlsGMkE/maxresdefault.jpg)](https://youtu.be/kjNBOlsGMkE)



## Features

- **User-Facing Section:**
  - **Sign Up/Sign In:** Users can create an account or log in using OTP verification.
  - **Purchase Tests:** Users can buy MCQ tests through a seamless Razorpay payment gateway integration, which supports all major online payment methods.
  - **Cart Synchronization:** The app's cart is synced across all devices where the user is signed in, ensuring a smooth experience.
  - **Practice Tests:** Users can take the MCQ tests, which are designed to emulate the actual MSBTE exams.

- **Admin Panel:**
  - **Site Statistics:** Admins can view detailed statistics about site usage.
  - **Test Management:** Admins can create and edit MCQ tests, with all questions synchronized to the server in real-time.
  - **User Management:** Admins can view user profiles and monitor the tests purchased by users.

## Tech Stack

- **Frontend & Backend:** Built with **Next.js**, providing a powerful and flexible framework for both client-side and server-side rendering.
- **State Management:** Utilized **Zustand** for efficient test management.
- **Data Fetching:** Employed **React Query** to handle data fetching, caching, and synchronization.
- **Authentication:** Implemented **Next Auth** for robust authentication with OTP verification.
- **UI Components:** Designed using **ShadCN** for a polished and responsive user interface.
- **Type Safety:** Written entirely in **TypeScript** to ensure type safety across both frontend and backend code.
- **Database:** **MongoDB** is used as the primary database to store user data, test results, and more.
- **Form Management:** Leveraged **useForm** hook for handling forms efficiently across the application.
- **Payment Gateway:** Integrated **Razorpay** for managing online payments securely.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone git@github.com:nirajbawa/msbte-quiz-pro.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Mmsbte-quiz-pro
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add the necessary environment variables :

      ```bash
        MONGO_DB_URI=
        NEXT_AUTH_SECRET=
        RESEND_API_KEY=
        ADMIN_USERNAME=
        ADMIN_EMAIL=
        CONTACT_US_EMAIL=
        ADMIN_PASSWORD=
        CLOUDINARY_CLOUD_NAME=
        CLOUDINARY_API_KEY=
        CLOUDINARY_API_SECRET=
        RAZORPAY_KEY_ID=
        RAZORPAY_KEY_SECRET=
        BASE_URL=http://localhost:3000
        RESET_TOKEN_SECRET=
      ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss changes or improvements.

## License

This project is licensed under the MIT License.

---