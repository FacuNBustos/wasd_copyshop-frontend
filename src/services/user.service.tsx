import AxiosInstance from "./axios.connection"

export default new class UserService {
    async login(email: string, password:string) {
        const response = await AxiosInstance.post("auth/login", {
            email: email,
            password: password
        });
        return response.data;
    };

    async validate(token: any) {
        const response = await AxiosInstance.post(`auth/token`, {}, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    };
}