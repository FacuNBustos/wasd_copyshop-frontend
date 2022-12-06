import AxiosInstance from "./axios.connection"

export default new class PrintService {

    async delete(id: string, token:any) {
        await AxiosInstance.delete("prints/" + id , {
            headers: {
                Authorization: token
            }
        })
    };

    async putStatus(id: string, status: string, token: any) {
        await AxiosInstance.put("prints/status/" + id, {
            status: status
        }, {
            headers: {
                Authorization: token
            }
        })
    };

    async post(payload: any, token: any) {
        const response = await AxiosInstance.post("prints", payload, {
            headers: {
                Authorization: token
            }
        })
        return response.data
    };

    async list(data: any, token: any) {
        const response = await AxiosInstance.get(
            `prints?page=${data.page}&order=${data.order}&location=${data.location}&internalCode=${data.internalCode}&fullName=${data.fullName}&cellNumber=${data.cellNumber}&createAt=${data.datetime}&status=${data.status}`, {
            headers: {
                Authorization: token
            }
        })
        return response.data;
    }

}