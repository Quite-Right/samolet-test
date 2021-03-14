import axios from "axios";

const instance = axios.create({
    baseURL: "https://data.gov.ru/opendata/"
})

export default instance;