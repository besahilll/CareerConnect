const { default: axios } = require('axios')

const  postInterview= (data) => axios.post('/api/postInterview', data)

const getCompany =()=> axios.get('/api/getCompanies')

const getCompanyStudents = (company) => axios.get(`/api/getCompanyStudents/${company}`);

const getInterviewExperience = (company, name) => axios.get(`/api/getCompanyStudents/${company}/${name}`);  

export default{
    postInterview,
    getCompany,
    getCompanyStudents,
    getInterviewExperience
}