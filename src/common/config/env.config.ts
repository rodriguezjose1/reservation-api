export const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3000,

    mongoUriConnection: process.env.MONGO_URI_CONNECTION,
});
