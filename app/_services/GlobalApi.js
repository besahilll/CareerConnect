const { default: axios } = require('axios')

const postInterview = (data) => axios.post('/api/postInterview', data)

const getCompany = () => axios.get('/api/getCompanies')

const getCompanyStudents = (company) => axios.get(`/api/getCompanyStudents/${company}`);

const getInterviewExperience = (company, name) => axios.get(`/api/getCompanyStudents/${company}/${name}`);

const CreateNewUser = (data) => axios.post('/api/user', data)

const LoginUser = (data) => axios.post('/api/login', data);

const GetUserData = (token) => {
    return axios.get('/api/getUserData', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const UpdateUser = (data, token) => {

    return axios.put('/api/updateUser', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default {
    postInterview,
    getCompany,
    getCompanyStudents,
    getInterviewExperience,
    CreateNewUser,
    LoginUser,
    GetUserData,
    UpdateUser
}