const Endpoints = {
  AUTH: {
    LOGIN: 'http://localhost:3000/api/auth/login',
    REFRESH: 'http://localhost:3000/api/auth/refresh',
    LOGOUT: 'http://localhost:3000/api/auth/logout',
    PROFILE: 'http://localhost:3000/api/auth/profile',
  },
  SOCIAL_SERVICES: {
    SERVICES: 'http://localhost:3000/api/socialService',
  },
  PROFILE: {
    PROFILE: 'http://localhost:3000/api/profile',
    KIDS: 'http://localhost:3000/api/profile/kids',
  },
};
export default Endpoints;
