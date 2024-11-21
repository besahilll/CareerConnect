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

const FetchSkills=()=>axios.get('/api/fetchSkills')

const FetchPackage=()=>axios.get('/api/fetchPackage')

const Predict = (file) => {
    const formData = new FormData();
    formData.append('resume', file);

    return axios.post('/api/predict', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
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
    UpdateUser,
    FetchSkills,
    FetchPackage,
    Predict
}