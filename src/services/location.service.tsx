import AxiosInstance from "./axios.connection"

export default new class LocationService {
    async list(token: any) {
        const respone = await AxiosInstance.get("locations", {
            headers: {
                Authorization: token
            }
        });
        return respone.data;
    }
}